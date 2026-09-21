import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1342
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle expression (7x-250)°]
 * - Difficulty factors: [Parallel lines, transversals, angle sums, algebraic manipulation]
 * - Distractor patterns: [A: -14x+1540, B: 14x-320, C: -28x+1720, D: 360]
 * - Constraints: [Acute/obtuse angle relationships with parallel lines]
 * - Question type: [Figure→Multiple Choice]
 *
 * FIXED (red "Missing open brace for superscript" banner — same as Q1341):
 * - The stem and explanation used FOUR backslashes before LaTeX commands
 *   (^\\\\circ, \\\\ne) — two backslashes at runtime — so the renderer took
 *   \\ as a row break and failed on the superscript. Now the standard
 *   two-in-source form (^\\circ, \\ne). No other text changed.
 *
 * FIXED (figure missing the given angle — question's only given was absent):
 * - The old figure drew the coordinate-plane scaffolding, the two parallel
 *   lines, and the transversal — and nothing else. The angle measuring
 *   (ax - b)° was not marked anywhere: no arc, no expression label, so the
 *   student could not see which of the eight angles the given named.
 * - Rebuilt: two parallel lines (with matching chevron marks), the
 *   transversal, and one of the four acute angles marked with an arc and
 *   labeled with its algebraic measure "(ax - b)°". No coordinate scaffolding
 *   (house rule: none under pure geometry figures). The marked angle is one
 *   of the acute ones, matching the explanation's setup.
 * - Question logic, options, answer, and explanation content unchanged.
 */

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
// CCW span from direction a1 to a2, normalized into [0, 360).
const ccwSpan = (a1: number, a2: number) => (((a2 - a1) % 360) + 360) % 360;

export const generator_1342 = {
  metadata: {
    id: "1342",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate coefficient and constant for angle expression
    const a = getRandomInt(6, 10);
    const b = getRandomInt(200, 300);
    
    // STEP 2: Build the four options.
    // With one acute angle A = ax - b and its supplement (obtuse) O = 180 - A,
    // the sum of any four of the eight angles is one of: 4A, 3A+O, 2A+2O, A+3O, 4O.
    // Three distractors are REAL achievable sums; the correct answer is an
    // expression with slope -2a but a constant too large to equal A+3O (= 2b + 540),
    // so it can never be a valid sum for any x.
    const correctConst = 2 * b + getRandomInt(1400, 1600); // > 2b + 540, so unachievable
    // Constants of the achievable four-angle sums (in ax-form):
    const sumA3O = 2 * b + 540; // A + 3O = -2a x + (2b + 540) — the only sum with slope -2a
    const optionsData = [
      {
        text: `$${-2 * a}x + ${correctConst}$`,
        isCorrect: true,
        reason: "does not correspond to any valid sum of four of the angles"
      },
      {
        text: `$${4 * a}x - ${4 * b}$`, // 4A: sum of the four acute angles
        isCorrect: false,
        reason: "is the sum of the four acute angles"
      },
      {
        text: `$${-4 * a}x + ${4 * b + 720}$`, // 4O: sum of the four obtuse angles
        isCorrect: false,
        reason: "is the sum of the four obtuse angles"
      },
      {
        text: `$360$`, // 2A + 2O
        isCorrect: false,
        reason: "is the sum of two acute and two obtuse angles"
      }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 5: Figure — two parallel lines cut by a transversal, with one of the
    // four acute angles marked with its algebraic measure. Math coords, y up.
    // The transversal's direction is theta (the drawn acute angle size); the
    // marked angle sits at the bottom intersection, between the bottom line's
    // rightward ray and the transversal's upward ray.
    const theta = getRandomInt(55, 68);
    const Npt: Pt = { x: -0.45, y: -1 };                          // bottom intersection
    const Mpt: Pt = { x: -0.45 + 2 / Math.tan(rad(theta)), y: 1 }; // top intersection
    const dirT: Pt = { x: Math.cos(rad(theta)), y: Math.sin(rad(theta)) };
    const halfLen = 2.6;
    const topA: Pt = { x: -halfLen, y: 1 }, topB: Pt = { x: halfLen, y: 1 };
    const botA: Pt = { x: -halfLen, y: -1 }, botB: Pt = { x: halfLen, y: -1 };
    const tTop: Pt = { x: Mpt.x + 0.95 * dirT.x, y: Mpt.y + 0.95 * dirT.y };
    const tBot: Pt = { x: Npt.x - 0.95 * dirT.x, y: Npt.y - 0.95 * dirT.y };

    // Marked-angle label: inside the acute wedge at N, biased toward the
    // horizontal side for clearance from the transversal.
    const lblDir = theta / 2 - 6;
    const lblPt: Pt = { x: Npt.x + 1.35 * Math.cos(rad(lblDir)), y: Npt.y + 1.35 * Math.sin(rad(lblDir)) };

    // Uniform-scale mapper (so the drawn angles look true).
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 460, H = 310, PAD = 22;
    const xs = [topA.x, topB.x, tTop.x, tBot.x, lblPt.x + 0.65];
    const ys = [tTop.y, tBot.y, lblPt.y - 0.2];
    const xmin = Math.min(...xs) - 0.35, xmax = Math.max(...xs) + 0.35;
    const ymin = Math.min(...ys) - 0.35, ymax = Math.max(...ys) + 0.35;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(H - (oy + (v - ymin) * sc));

    const line = (P: Pt, Q: Pt) =>
      `<line x1="${mx(P.x)}" y1="${my(P.y)}" x2="${mx(Q.x)}" y2="${my(Q.y)}" stroke="currentColor" stroke-width="2"/>`;

    // CCW arc from direction a1 to a2 (all directions symbolic multiples of
    // theta — no atan2, so the Q1341 branch-cut bug class cannot occur).
    const arc = (V: Pt, a1: number, a2: number, r: number) => {
      const span = ccwSpan(a1, a2);
      let d = "";
      for (let i = 0; i <= 16; i++) {
        const t = rad(a1 + (span * i) / 16);
        d += `${i === 0 ? "M" : "L"}${mx(V.x + r * Math.cos(t))} ${my(V.y + r * Math.sin(t))} `;
      }
      return `<path d="${d}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    };

    // Matching chevron on each parallel line marks them as parallel.
    const chevron = (cx: number, cy: number) => {
      const s = 0.16;
      return `<path d="M ${mx(cx - s * 0.8)} ${my(cy + s)} L ${mx(cx + s * 0.8)} ${my(cy)} L ${mx(cx - s * 0.8)} ${my(cy - s)}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    };

    const text = (P: Pt, s: string, size = 13) =>
      `<text x="${mx(P.x)}" y="${my(P.y) + 4.5}" text-anchor="middle" font-size="${size}" fill="currentColor">${s}</text>`;

    const figureCode =
      `<div style="width:100%;max-width:460px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      line(topA, topB) + line(botA, botB) +       // the two parallel lines
      line(tBot, tTop) +                          // the transversal
      chevron(-1.75, 1) + chevron(-1.75, -1) +    // parallel marks
      arc(Npt, 0, theta, 0.42) +                  // GIVEN: one acute angle, marked
      `<circle cx="${mx(Npt.x)}" cy="${my(Npt.y)}" r="2.5" fill="currentColor"/>` +
      `<circle cx="${mx(Mpt.x)}" cy="${my(Mpt.y)}" r="2.5" fill="currentColor"/>` +
      text(lblPt, `(${a}x - ${b})\u00B0`, 12.5) +
      `</svg></div>`;
    
    return {
      questionText: `A line intersects two parallel lines, forming four acute angles and four obtuse angles. The measure of one of these eight angles is $(${a}x - ${b})^\\circ$. The sum of the measures of four of the eight angles is $k^\\circ$. Which of the following could NOT be equivalent to $k$, for all values of $x$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Each acute angle measures $(${a}x - ${b})^\\circ$ and each obtuse angle measures $(180 - (${a}x - ${b}))^\\circ = (${-a}x + ${b + 180})^\\circ$. The sum of four of the eight angles is one of five values: four acute ($${4*a}x - ${4*b}$), four obtuse ($${-4*a}x + ${4*b + 720}$), two acute and two obtuse ($360$), one acute and three obtuse ($${-2*a}x + ${sumA3O}$), or three acute and one obtuse ($${2*a}x - ${2*b - 180}$). The only one of these with an $x$-coefficient of $${-2*a}$ is $${-2*a}x + ${sumA3O}$, and $${correctConst} \\ne ${sumA3O}$, so $${-2*a}x + ${correctConst}$ ${correctOption.reason}. The other three choices are the four-acute, four-obtuse, and two-acute-two-obtuse sums.`
    };
  }
};