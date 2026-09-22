import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 885
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [threshold: 55-70 degrees]
 * - Difficulty factors: [Parallel lines, same-side interior angles, inequality reasoning]
 * - Distractor patterns: [A: wrong inequality direction, C: always true but not what asked, D: impossible]
 * - Constraints: [x + y = 180, y < threshold implies x > 180 - threshold]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parallel vertical lines cut by transversal]
 *
 * FIXED (figure was missing — question unanswerable):
 * - figureCode was null, with dead scaffold variables (lineX1, lineX2,
 *   transX1, ...) left over from a gutted figure, while the stem says "In
 *   the figure shown" — and x and y are defined ONLY by the figure (as the
 *   same-side interior angles), so the question could not be answered.
 * - Figure rebuilt: parallel vertical lines r and s cut by transversal m,
 *   with x and y arced and labeled on the same-side interior angles (both
 *   between the lines, same side of m — supplementary by construction:
 *   drawn y = 30°, x = 150°, consistent with the stem's hypothesis
 *   y < 55..70 in every draw). Matching chevrons mark r ∥ s.
 *
 * FIXED (italicized "parallel" in the explanation — Q1333-class):
 * - The explanation used $r \\\\parallel s$ — a double backslash at runtime —
 *   so the renderer printed "parallel" as italic math text. Now the standard
 *   two-in-source form. No question logic changed.
 */

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;

export const generator_885 = {
  metadata: {
    id: "885",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random threshold
    const threshold = getRandomInt(55, 70);
    const complement = 180 - threshold;
    
    // STEP 2: Figure — parallel vertical lines r and s cut by transversal m
    // (math coords, y up). Lines at x = ±0.9; transversal through the origin
    // at 60° above horizontal. P = m ∩ r (lower), Q = m ∩ s (upper). x and y
    // mark the same-side interior angles: y between ray P→Q (60°) and ray
    // P→up (90°) at P, and x between ray Q→up (90°) and ray Q→P (240°) at Q.
    // Both wedges lie inside the strip and on the same side of m, so the
    // drawn pair is supplementary (30° + 150° = 180°) — matching the
    // explanation's x + y = 180.
    const theta = 60;
    const d: Pt = { x: Math.cos(rad(theta)), y: Math.sin(rad(theta)) };
    const halfGap = 0.9;
    const lineTop = 2.5, lineBot = -2.5;
    const tP = -halfGap / d.x, tQ = halfGap / d.x;
    const P: Pt = { x: tP * d.x, y: tP * d.y };
    const Q: Pt = { x: tQ * d.x, y: tQ * d.y };
    const tEnd = 2.4;
    const mBot: Pt = { x: -tEnd * d.x, y: -tEnd * d.y };
    const mTop: Pt = { x: tEnd * d.x, y: tEnd * d.y };

    // Mapper (uniform scale so angles render true).
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 340, H = 460, PAD = 22;
    const rLbl: Pt = { x: -halfGap, y: -2.82 };
    const sLbl: Pt = { x: halfGap, y: -2.82 };
    const mLbl: Pt = { x: mTop.x + 0.26, y: mTop.y + 0.12 };
    const yLbl: Pt = { x: P.x + 0.62 * Math.cos(rad(75)), y: P.y + 0.62 * Math.sin(rad(75)) };
    const xLbl: Pt = { x: Q.x + 0.78 * Math.cos(rad(165)), y: Q.y + 0.78 * Math.sin(rad(165)) };
    const xs = [mBot.x, mTop.x, mLbl.x, rLbl.x, sLbl.x, yLbl.x, xLbl.x];
    const ys = [lineBot, lineTop, mBot.y, mTop.y, mLbl.y, rLbl.y, yLbl.y, xLbl.y];
    const xmin = Math.min(...xs) - 0.35, xmax = Math.max(...xs) + 0.35;
    const ymin = Math.min(...ys) - 0.35, ymax = Math.max(...ys) + 0.35;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(H - (oy + (v - ymin) * sc));

    const seg = (A: Pt, B: Pt) =>
      `<line x1="${mx(A.x)}" y1="${my(A.y)}" x2="${mx(B.x)}" y2="${my(B.y)}" stroke="currentColor" stroke-width="2"/>`;
    const dot = (V: Pt) => `<circle cx="${mx(V.x)}" cy="${my(V.y)}" r="2.5" fill="currentColor"/>`;
    const text = (V: Pt, t: string, color = "currentColor", size = 15) =>
      `<text x="${mx(V.x)}" y="${my(V.y) + 4}" text-anchor="middle" font-size="${size}" font-style="italic" fill="${color}">${t}</text>`;
    // CCW arc from direction a1 to a2 (symbolic angles — no atan2, so the
    // Q1341 branch-cut bug class cannot occur).
    const arc = (V: Pt, a1: number, a2: number, r: number, color = "currentColor") => {
      let dd = "";
      for (let i = 0; i <= 16; i++) {
        const t = rad(a1 + ((a2 - a1) * i) / 16);
        dd += `${i === 0 ? "M" : "L"}${mx(V.x + r * Math.cos(t))} ${my(V.y + r * Math.sin(t))} `;
      }
      return `<path d="${dd}" fill="none" stroke="${color}" stroke-width="1.6"/>`;
    };
    // Matching upward chevrons on r and s — parallel marks.
    const chevron = (cx: number, cy: number) => {
      const s = 0.09;
      return `<path d="M ${mx(cx - s).toFixed(1)} ${my(cy - s).toFixed(1)} L ${mx(cx).toFixed(1)} ${my(cy + s).toFixed(1)} L ${mx(cx + s).toFixed(1)} ${my(cy - s).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    };

    const figureCode =
      `<div style="width:100%;max-width:340px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      seg({ x: -halfGap, y: lineBot }, { x: -halfGap, y: lineTop }) +  // line r
      seg({ x: halfGap, y: lineBot }, { x: halfGap, y: lineTop }) +   // line s
      seg(mBot, mTop) +                                                // transversal m
      chevron(-halfGap, -2.2) + chevron(halfGap, -2.2) +               // r ∥ s marks
      arc(P, theta, 90, 0.3) +                                        // GIVEN variable: y at P
      arc(Q, 90, 180 + theta, 0.45, "#3b82f6") +                      // ASKED variable: x at Q
      dot(P) + dot(Q) +
      text(rLbl, "r") + text(sLbl, "s") + text(mLbl, "m") +
      text(yLbl, "y") +
      text(xLbl, "x", "#3b82f6") +
      `</svg></div>`;

    // STEP 3: Create options
    const optionsData = [
      { text: `x < ${complement}`, isCorrect: false, reason: "reverses the inequality direction" },
      { text: `x > ${complement}`, isCorrect: true },
      { text: `x + y < 180`, isCorrect: false, reason: "is always false since x + y = 180 for parallel lines" },
      { text: `x + y > 180`, isCorrect: false, reason: "is always false since x + y = 180 for parallel lines" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `In the figure shown, lines $r$ and $s$ are parallel, and line $m$ intersects both lines. If $y < ${threshold}$, which of the following must be true?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `x > ${complement}`,
      explanation: `Choice ${correctOption.letter} is correct. Angles $x$ and $y$ are same-side interior angles. Since $r \\parallel s$, $x + y = 180$. We are given $y < ${threshold}$. Subtracting $y$ from 180 gives $x = 180 - y$. Since $y < ${threshold}$, then $-y > -${threshold}$, so $180 - y > 180 - ${threshold}$, which simplifies to $x > ${complement}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};