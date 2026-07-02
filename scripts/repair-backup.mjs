// Repairs the systematic corruption in backup/ question files and copies the
// results into their matching questions/ folders. Two corruption modes exist
// (remnants of a broken meta-generation step):
//
//   1. Template text: placeholders missing their `}` terminator, e.g.
//      `(${x1, ${y1)</text>` for `(${x1}, ${y1})</text>`.
//   2. JS code (inside figure-building IIFEs that themselves live in template
//      placeholders): raw `${expr}` interpolation syntax leaked into plain
//      code, e.g. `const xmax=${maxItems + 1};` or `my(${fixedCost)`. The
//      referenced variables ARE in scope there, so the repair is
//      `${expr}` -> `(expr)` (with the same missing-`}` tolerance).
//
// A regex can't do this: placeholders legitimately contain calls, arithmetic,
// whole IIFEs with strings, comments and loops. So we run a small
// template-literal-aware lexer that tracks frame nesting (code / template /
// placeholder / leaked-interpolation) with paren/brace/bracket depth, string
// and comment states. A character that cannot continue an expression at zero
// depth — `)`, `,`, `;`, or `</` — terminates an unterminated placeholder.
//
// Usage: node scripts/repair-backup.mjs
import { readdirSync, readFileSync, writeFileSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { QUESTIONS_DIR, BACKUP_DIR, parseError } from './lib.mjs';

// Where the one stray root-level backup file belongs (Hard / Circles per its metadata).
const STRAY_DESTINATIONS = {
  'question_858fd1cf.ts': 'Final_SAT_Hard_GeometryAndTrigonometry_Circles_Template',
};

export function repairTemplatePlaceholders(src) {
  let out = '';
  let repairs = 0;
  // State stack. Frames:
  //   {t:'code', paren, brace, bracket}         top-level JS
  //   {t:'template'}                            inside `...`
  //   {t:'placeholder', paren, brace, bracket}  inside ${...} of a template
  //   {t:'leak', paren, brace, bracket}         `${` found in CODE/PLACEHOLDER
  //                                             context: emitted as `(`, its
  //                                             closing `}` is emitted as `)`.
  const stack = [{ t: 'code', paren: 0, brace: 0, bracket: 0 }];
  let i = 0;
  const n = src.length;
  let str = null; // active quote char inside code/placeholder/leak frames
  let lineComment = false, blockComment = false;

  const top = () => stack[stack.length - 1];

  while (i < n) {
    const c = src[i];
    const c2 = src.slice(i, i + 2);
    const frame = top();

    // Comment handling applies in code-like frames only (never entered in template state).
    if (lineComment) {
      if (c === '\n') lineComment = false;
      out += c; i++; continue;
    }
    if (blockComment) {
      if (c2 === '*/') { blockComment = false; out += c2; i += 2; continue; }
      out += c; i++; continue;
    }
    // String handling inside code-like frames.
    if (str) {
      if (c === '\\') { out += c2; i += 2; continue; }
      if (c === str) str = null;
      out += c; i++; continue;
    }

    if (frame.t === 'template') {
      if (c === '\\') { out += c2; i += 2; continue; }
      if (c === '`') { stack.pop(); out += c; i++; continue; }
      if (c2 === '${') {
        stack.push({ t: 'placeholder', paren: 0, brace: 0, bracket: 0 });
        out += c2; i += 2; continue;
      }
      out += c; i++; continue;
    }

    // Code-like frames: code, placeholder, leak.
    if (c2 === '//') { lineComment = true; out += c2; i += 2; continue; }
    if (c2 === '/*') { blockComment = true; out += c2; i += 2; continue; }
    if (c === "'" || c === '"') { str = c; out += c; i++; continue; }
    if (c === '`') { stack.push({ t: 'template' }); out += c; i++; continue; }

    if (c2 === '${') {
      // `${` is never valid in a code context — it's leaked interpolation
      // syntax. The referenced variables are in scope here, so rewrite the
      // whole placeholder as a parenthesized expression.
      stack.push({ t: 'leak', paren: 0, brace: 0, bracket: 0 });
      out += '('; repairs++; i += 2; continue;
    }

    if (c === '(') { frame.paren++; out += c; i++; continue; }
    if (c === '[') { frame.bracket++; out += c; i++; continue; }
    if (c === '{') { frame.brace++; out += c; i++; continue; }
    if (c === ']') { if (frame.bracket > 0) frame.bracket--; out += c; i++; continue; }

    if (c === '}') {
      if (frame.brace > 0) { frame.brace--; out += c; i++; continue; }
      if (frame.t === 'placeholder') { stack.pop(); out += c; i++; continue; } // closed normally
      if (frame.t === 'leak') { stack.pop(); out += ')'; i++; continue; }      // ${expr} -> (expr)
      out += c; i++; continue; // stray `}` in plain code — leave for esbuild to judge
    }

    if (frame.t === 'placeholder' || frame.t === 'leak') {
      const atZero = frame.paren === 0 && frame.brace === 0 && frame.bracket === 0;
      const closer = frame.t === 'placeholder' ? '}' : ')';
      if (c === ')') {
        if (frame.paren > 0) { frame.paren--; out += c; i++; continue; }
        // `)` can never continue an expression at zero depth: missing `}`.
        out += closer; repairs++; stack.pop(); continue; // reprocess `)` in parent frame
      }
      if (atZero && (c === ',' || c === ';' || c2 === '</')) {
        // These files never use the comma operator / statements in placeholders.
        out += closer; repairs++; stack.pop(); continue; // reprocess char in parent frame
      }
      out += c; i++; continue;
    }

    // plain code
    if (c === ')') { if (frame.paren > 0) frame.paren--; out += c; i++; continue; }
    out += c; i++;
  }
  return { out, repairs };
}

function main() {
  const rows = [];
  const entries = [];
  for (const entry of readdirSync(BACKUP_DIR).sort()) {
    const p = join(BACKUP_DIR, entry);
    if (statSync(p).isDirectory()) {
      for (const f of readdirSync(p).sort()) {
        if (f.startsWith('question_') && f.endsWith('.ts')) entries.push({ src: join(p, f), folder: entry });
      }
    } else if (entry.startsWith('question_') && entry.endsWith('.ts')) {
      const dest = STRAY_DESTINATIONS[entry];
      if (!dest) { console.error(`No destination mapped for stray file ${entry}`); process.exitCode = 1; continue; }
      entries.push({ src: p, folder: dest });
    }
  }

  for (const { src, folder } of entries) {
    const name = basename(src);
    const destDir = join(QUESTIONS_DIR, folder);
    if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });
    const destPath = join(destDir, name);
    // Skip only if a healthy copy already exists; broken copies get re-repaired.
    if (existsSync(destPath) && !parseError(readFileSync(destPath, 'utf8'))) {
      rows.push({ file: name, folder, status: 'SKIP_EXISTS' }); continue;
    }

    const original = readFileSync(src, 'utf8');
    const preError = parseError(original);
    let content = original, repairs = 0, status;
    if (preError) {
      const r = repairTemplatePlaceholders(original);
      content = r.out; repairs = r.repairs;
      const postError = parseError(content);
      // On failure keep the repaired attempt anyway — it's structurally closer
      // to valid and loses nothing (the lexer only inserts/rewrites brackets);
      // these files carry truncated expressions and need an agent rebuild.
      status = postError ? `PARSE_FAIL: ${postError}` : `REPAIRED(${repairs})`;
    } else {
      status = 'CLEAN';
    }
    writeFileSync(destPath, content, 'utf8');
    rows.push({ file: name, folder, status });
  }

  const counts = {};
  for (const r of rows) {
    const key = r.status.split('(')[0].split(':')[0];
    counts[key] = (counts[key] || 0) + 1;
  }
  console.log(JSON.stringify({ counts, rows }, null, 2));
}

if (process.argv[1] && import.meta.url.endsWith(basename(process.argv[1]))) main();
