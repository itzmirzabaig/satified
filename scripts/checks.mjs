// Shared check catalog for the question audit harness. Used by both the
// worker pool (audit-questions.mjs) and the single-file smoke gate (smoke.mjs).
//
// A file is audited by importing its generator, then calling generate() N
// times under a SEEDED Math.random (mulberry32 keyed by fileId + draw index),
// so every flag is reproducible by re-running the same draw index.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { basename } from 'node:path';

// ── Seeded RNG ────────────────────────────────────────────────────────────────
export function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Answer-format helpers (mirror study/app.ts grading semantics) ─────────────
export function getOptText(o) {
  return typeof o === 'string' ? o : (o && typeof o === 'object' && 'text' in o) ? String(o.text) : String(o);
}

export function parseNumeric(raw) {
  let s = String(raw).trim().toLowerCase()
    .replace(/\\\$|\$|,|%/g, '')
    .replace(/\\frac\{(-?\d+(?:\.\d+)?)\}\{(-?\d+(?:\.\d+)?)\}/, '$1/$2')
    .trim();
  const frac = s.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (frac) {
    const den = parseFloat(frac[2]);
    if (den === 0) return null;
    return parseFloat(frac[1]) / den;
  }
  if (/^-?(\d+\.?\d*|\.\d+)$/.test(s)) return parseFloat(s);
  return null;
}

export function numericallyEqual(a, b) {
  const na = parseNumeric(a), nb = parseNumeric(b);
  return na !== null && nb !== null && Math.abs(na - nb) < 1e-9;
}

// ── Personal names (user requirement: no names, generic roles + pronouns) ─────
// Deliberately conservative: only names unlikely to appear as ordinary words.
const NAMES = [
  'Aaliyah','Aisha','Alejandro','Alina','Amir','Ananya','Andre','Aniyah','Anna','Antonio',
  'Ava','Ayesha','Benjamin','Bianca','Camila','Carlos','Charlotte','Chen','Damian','Daniela',
  'Darnell','Deshawn','Diego','Dmitri','Elena','Emeka','Emilia','Emily','Emma','Ethan',
  'Fatima','Fernando','Gabriela','Hana','Hassan','Hiro','Imani','Isabella','Ivan','Jada',
  'Jamal','James','Jasmine','Javier','Jayden','Jenna','Jessica','Jorge','Jose','Juan',
  'Julia','Kai','Kayla','Keisha','Kevin','Kiara','Kofi','Lakshmi','Latoya','Liam',
  'Lucas','Lucia','Malik','Marcus','Maria','Mariana','Marisol','Mateo','Maya','Mei',
  'Mia','Miguel','Ming','Mohammed','Naomi','Natasha','Nia','Noah','Nour','Olivia',
  'Omar','Paulo','Pedro','Priya','Rafael','Rahul','Ravi','Ricardo','Rosa','Sana',
  'Santiago','Sara','Sarah','Sofia','Sophia','Takumi','Tariq','Tomas','Tyler','Valeria',
  'Wei','Xavier','Yara','Yuki','Yusuf','Zara','Zoe',
  // Added after Phase D verifiers caught names the original list missed. Kept to
  // unambiguous given names — NO words that double as colors, gems, flowers,
  // months, times of day, or common nouns/verbs (those false-positive on real
  // word problems and would block the final gate).
  'Nasir','Lorenzo','Vivian','Gabriella','Sadie','Angela','Tilly','Theresa','Immanuel',
  'Aaron','Abby','Adam','Adrian','Albert','Alexis','Alicia','Allison','Amanda','Andrea',
  'Andrew','Angelo','Anita','Annie','Arjun','Arthur','Ashley','Aubrey','Audrey','Austin',
  'Beatriz','Becky','Bianca','Bobby','Brandon','Brenda','Brian','Brianna','Bruno','Bryan',
  'Caleb','Cameron','Carla','Carmen','Caroline','Cassie','Catherine','Cecilia','Cesar','Chloe',
  'Christian','Christina','Cindy','Claire','Clarissa','Colin','Connor','Cora','Cynthia','Daniel',
  'Danny','Daphne','Darius','David','Debra','Denise','Dennis','Derek','Desmond','Devon',
  'Diana','Dominic','Donald','Donna','Doris','Douglas','Duncan','Dustin','Eddie','Edgar',
  'Eduardo','Edward','Edwin','Eileen','Elaine','Eleanor','Elias','Elijah','Elise','Eliza',
  'Ella','Ellen','Ellie','Elliot','Eloise','Elsa','Emanuel','Enrique','Eric','Erica',
  'Erin','Ernesto','Esteban','Esther','Eugene','Evan','Evelyn','Ezra','Felix','Fiona',
  'Frankie','Franklin','Freddie','Gabriel','Gavin','George','Georgia','Gerald','Gina','Gloria',
  'Gordon','Gregory','Gwen','Harold','Harriet','Harvey','Heather','Hector','Heidi','Helen',
  'Henry','Hugo','Ines','Ingrid','Irene','Isaac','Isabel','Isaiah','Ismael','Jackie',
  'Jacob','Jake','Janet','Janice','Jared','Jason','Jayla','Jeffrey','Jeremy','Jerome',
  'Jesse','Jill','Jimmy','Joanna','Joel','Johnny','Jonah','Jonathan','Joseph','Josephine',
  'Joshua','Joyce','Judith','Julian','Juliana','Julie','Juliet','Justin','Kara','Karen',
  'Katherine','Kathy','Katie','Katrina','Keith','Kelsey','Kendra','Kenneth','Kimberly','Kira',
  'Kirsten','Kristen','Kurt','Kyle','Lana','Lance','Larry','Laura','Lauren','Laurie',
  'Leah','Lena','Leon','Leonard','Levi','Lewis','Lila','Linda','Lisa','Logan',
  'Lola','Lorna','Louis','Louise','Luca','Lucy','Luis','Luke','Lydia','Lyle',
  'Mabel','Madeline','Madison','Manuel','Marcia','Margaret','Marie','Mario','Marisa','Marlon',
  'Marshall','Martha','Martin','Marvin','Mason','Matthew','Maureen','Maurice','Maxine','Megan',
  'Melanie','Melissa','Melvin','Meredith','Micah','Michael','Michelle','Mildred','Miranda','Miriam',
  'Mitchell','Molly','Monica','Muriel','Myra','Nadia','Nancy','Nathan','Nathaniel','Nelson',
  'Nicholas','Nicole','Nikki','Nina','Nolan','Norman','Octavia','Olga','Oliver','Oscar',
  'Owen','Pablo','Pamela','Patricia','Patrick','Paula','Pauline','Percy','Peter','Philip',
  'Phoebe','Phyllis','Preston','Rachel','Ralph','Ramon','Raymond','Rebecca','Regina','Reginald',
  'Rhonda','Rita','Robert','Roberto','Rodney','Roland','Ronald','Rosalind','Rosemary','Ruben',
  'Russell','Ryan','Sabrina','Sally','Salvador','Samantha','Samuel','Sandra','Scott','Sean',
  'Sebastian','Selena','Serena','Shannon','Sharon','Shaun','Sheila','Shelby','Sherry','Shirley',
  'Simon','Sonia','Stacy','Stanley','Stella','Stephanie','Stephen','Steven','Susan','Suzanne',
  'Sylvia','Tabitha','Tamara','Tanya','Ted','Teresa','Terrance','Tessa','Thelma','Theodore',
  'Thomas','Tiffany','Timothy','Tina','Toby','Tony','Travis','Trevor','Tricia','Trisha',
  'Ursula','Valerie','Vanessa','Veronica','Vernon','Victor','Victoria','Vincent','Virginia','Wallace',
  'Walter','Wanda','Warren','Wendy','Wesley','Whitney','Wilbur','William','Willie','Wilson',
  'Winston','Wyatt','Yolanda','Yvonne','Zachary',
];
const NAME_RE = new RegExp(`\\b(${NAMES.join('|')})(?:'s)?\\b`, 'g');

// ── Field-level checks ────────────────────────────────────────────────────────
const HARD = new Set([
  'IMPORT_FAIL', 'NO_GENERATOR', 'THROWS', 'TIMEOUT',
  'CORRECT_MISMATCH', 'DUP_OPTIONS', 'OPT_COUNT', 'LETTER_MISMATCH',
  'NAN_OUTPUT', 'FLOAT_ARTIFACT', 'FILLIN_FORMAT', 'TEMPLATE_LEFTOVER',
  'FIGURE_BAD', 'TEX_UNBALANCED', 'NAME_HIT',
]);
export const isHardFlag = (code) => HARD.has(code);

function texFields(d) {
  return {
    questionText: d.questionText ?? '',
    explanation: d.explanation ?? '',
    options: (d.options ?? []).map(getOptText),
    correctAnswer: String(d.correctAnswer ?? ''),
  };
}

function checkDraw(d, drawIndex) {
  const flags = [];
  const add = (code, detail) => flags.push({ code, detail: String(detail).slice(0, 300), drawIndex });
  const f = texFields(d);
  const visible = [f.questionText, ...f.options, f.explanation, f.correctAnswer];
  const everything = [...visible, d.figureCode ?? ''];

  // Bad runtime values leaking into output
  for (const s of everything) {
    if (/\bNaN\b|\bInfinity\b|\bundefined\b|\[object Object\]/.test(s)) {
      add('NAN_OUTPUT', s.match(/.{0,40}(NaN|Infinity|undefined|\[object Object\]).{0,40}/)?.[0] ?? s.slice(0, 80));
      break;
    }
  }
  // Leftover interpolation syntax
  for (const s of everything) {
    if (s.includes('${')) { add('TEMPLATE_LEFTOVER', s.slice(Math.max(0, s.indexOf('${') - 40), s.indexOf('${') + 40)); break; }
  }
  // Float artifacts in user-visible text (not figure coords)
  for (const s of visible) {
    const m = s.match(/-?\d+\.\d{5,}/);
    if (m) { add('FLOAT_ARTIFACT', m[0]); break; }
  }

  const isFillIn = !d.options || d.options.length === 0;
  if (isFillIn) {
    const ca = String(d.correctAnswer ?? '').trim();
    const ok = /^-?\d+(\.\d{1,4})?$/.test(ca) || /^-?\d+\/[1-9]\d*$/.test(ca);
    if (!ok) add('FILLIN_FORMAT', `correctAnswer=${JSON.stringify(ca)} — students type answers; must be a plain number or a/b fraction`);
  } else {
    if (d.options.length !== 4) add('OPT_COUNT', `${d.options.length} options (SAT MC needs 4)`);
    // Duplicate options (exact or numerically equivalent)
    const texts = f.options.map(t => t.trim());
    for (let a = 0; a < texts.length; a++) {
      for (let b = a + 1; b < texts.length; b++) {
        if (texts[a] === texts[b] || numericallyEqual(texts[a], texts[b])) {
          add('DUP_OPTIONS', `options ${a} and ${b} are both ${JSON.stringify(texts[a])}`);
          a = texts.length; break;
        }
      }
    }
    // correctAnswer resolution (mirrors hardened resolveCorrect)
    let ci = -1;
    if (typeof d.correctAnswer === 'number') {
      ci = d.correctAnswer;
      if (ci < 0 || ci >= d.options.length) add('CORRECT_MISMATCH', `index ${ci} out of range`);
    } else {
      const s = String(d.correctAnswer).trim();
      ci = texts.findIndex(t => t === s);
      if (ci === -1) {
        const collapse = (t) => t.replace(/\s+/g, ' ').trim();
        ci = texts.findIndex(t => collapse(t) === collapse(s));
        if (ci === -1) ci = texts.findIndex(t => numericallyEqual(t, s));
        if (ci === -1) add('CORRECT_MISMATCH', `correctAnswer ${JSON.stringify(s.slice(0, 80))} matches no option`);
        else add('CORRECT_FUZZY', `correctAnswer only matches option ${ci} after normalization`);
      }
    }
    // Explanation letter consistency (letters are only meaningful post-shuffle)
    if (ci >= 0 && ci < 4 && f.explanation) {
      const m = f.explanation.match(/Choice\s+([A-D])\s+is\s+correct/i);
      const expected = String.fromCharCode(65 + ci);
      if (m && m[1].toUpperCase() !== expected) {
        add('LETTER_MISMATCH', `explanation says Choice ${m[1]} but correct option is ${expected}`);
      }
      const incorrectLetters = [...f.explanation.matchAll(/Choice\s+([A-D])\s+is\s+incorrect/gi)].map(x => x[1].toUpperCase());
      if (incorrectLetters.includes(expected)) {
        add('LETTER_MISMATCH', `explanation lists correct letter ${expected} as incorrect`);
      }
    }
  }

  // TeX sanity per field
  for (const s of visible) {
    if (!s) continue;
    const unescaped = (s.match(/(?<!\\)\$/g) || []).length;
    if (unescaped % 2 !== 0) { add('TEX_UNBALANCED', `odd $ count in ${JSON.stringify(s.slice(0, 80))}`); break; }
    if (/\\{3,}/.test(s)) { add('TEX_UNBALANCED', `backslash run: ${s.match(/.{0,30}\\{3,}.{0,20}/)[0]}`); break; }
    // Math segments with unbalanced braces
    let bal = 0, inMath = false;
    for (let k = 0; k < s.length; k++) {
      if (s[k] === '$' && s[k - 1] !== '\\') inMath = !inMath;
      else if (inMath && s[k] === '{') bal++;
      else if (inMath && s[k] === '}') bal--;
    }
    if (bal !== 0) { add('TEX_UNBALANCED', `unbalanced {} in math of ${JSON.stringify(s.slice(0, 80))}`); break; }
  }
  // Sign glitches / stray slashes (soft)
  for (const s of visible) {
    const m = s.match(/\+\s*-|-\s*--|\+-|(?<![a-zA-Z0-9])\\(?![a-zA-Z(){}\\$%&#_^~,;! ])/);
    if (m) { add('SIGN_GLITCH', `${JSON.stringify(s.slice(Math.max(0, m.index - 30), m.index + 30))}`); break; }
  }
  // Currency $ colliding with math-$ heuristics (soft)
  for (const s of visible) {
    if (/(?<!\\)\$\d/.test(s) && /(?<!\\)\$[a-zA-Z\\]/.test(s)) { add('DOLLAR_RISK', s.slice(0, 100)); break; }
  }

  // Figure sanity
  const fig = d.figureCode;
  if (fig && typeof fig === 'string') {
    if (/\bNaN\b|\bundefined\b|\bInfinity\b/.test(fig)) add('FIGURE_BAD', 'NaN/undefined/Infinity in figure');
    const isHtml = /^\s*<(div|table|svg)/i.test(fig);
    if (isHtml) {
      if (fig.includes('<svg') && !fig.includes('</svg>')) add('FIGURE_BAD', 'unclosed <svg>');
      if (fig.includes('<table') && !fig.includes('</table>')) add('FIGURE_BAD', 'unclosed <table>');
    } else {
      const mafs = ['<Mafs', '<Plot', '<Circle', '<Polygon', '<Polyline', '<Point', '<Line', '<LaTeX', '<Text', '<Vector', '<Transform', '<Coordinates'];
      if (!mafs.some(t => fig.includes(t))) add('FIGURE_BAD', `figureCode is neither HTML nor recognizable Mafs: ${fig.slice(0, 80)}`);
    }
  }
  return flags;
}

function staticChecks(source) {
  const flags = [];
  // Names in authored strings (template literals) — scan whole source; agents
  // confirm and reword. Reset lastIndex since NAME_RE is global.
  NAME_RE.lastIndex = 0;
  const seen = new Set();
  let m;
  while ((m = NAME_RE.exec(source)) !== null) seen.add(m[1]);
  if (seen.size > 0) flags.push({ code: 'NAME_HIT', detail: [...seen].join(', '), drawIndex: -1 });
  return flags;
}

// ── Per-file audit ────────────────────────────────────────────────────────────
export async function runChecksOnFile(absPath, draws = 200, sampleCount = 3) {
  const fileId = basename(absPath, '.ts');
  const result = { file: absPath, id: fileId, flags: [], samples: [], drawsRun: 0 };

  let source = '';
  try { source = readFileSync(absPath, 'utf8'); } catch (e) {
    result.flags.push({ code: 'IMPORT_FAIL', detail: `unreadable: ${e.message}`, drawIndex: -1 });
    return result;
  }
  result.flags.push(...staticChecks(source));

  let mod;
  try {
    mod = await import(pathToFileURL(absPath).href);
  } catch (e) {
    result.flags.push({ code: 'IMPORT_FAIL', detail: String(e.message).slice(0, 300), drawIndex: -1 });
    return result;
  }
  const key = Object.keys(mod).find(k => k.startsWith('generator_'));
  const gen = key ? mod[key] : null;
  if (!gen || typeof gen.generate !== 'function') {
    result.flags.push({ code: 'NO_GENERATOR', detail: `exports: ${Object.keys(mod).join(', ')}`, drawIndex: -1 });
    return result;
  }

  const realRandom = Math.random;
  const seenFlagKeys = new Set();
  try {
    for (let i = 0; i < draws; i++) {
      Math.random = mulberry32(fnv1a(`${fileId}:${i}`));
      let d;
      try {
        d = gen.generate();
      } catch (e) {
        const k = `THROWS|${e.message}`;
        if (!seenFlagKeys.has(k)) {
          seenFlagKeys.add(k);
          result.flags.push({ code: 'THROWS', detail: String(e.message).slice(0, 300), drawIndex: i });
        }
        continue;
      } finally {
        result.drawsRun = i + 1;
      }
      if (i < sampleCount) result.samples.push(d);
      for (const flag of checkDraw(d, i)) {
        const k = `${flag.code}|${flag.detail.slice(0, 60)}`;
        if (!seenFlagKeys.has(k)) { seenFlagKeys.add(k); result.flags.push(flag); }
      }
    }
  } finally {
    Math.random = realRandom;
  }
  return result;
}
