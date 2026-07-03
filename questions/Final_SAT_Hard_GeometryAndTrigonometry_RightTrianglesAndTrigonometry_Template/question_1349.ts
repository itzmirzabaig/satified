import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1349
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tan(A) = numerator/denominator, numerator in [20,60], denominator in [5,15]]
 * - Difficulty factors: [Similar triangles, complementary angles, reciprocal tangent]
 * - Constraints: [tan(E) = 1/tan(D) = 1/tan(A) since D and E are complementary]
 * - Question type: [Figure -> Fill in the blank]
 * - Figure generation: [Right triangle with labeled vertices]
 *
 * MATH: Triangle ABC ~ triangle DEF with A<->D, C<->F, and C, F right angles.
 *   Similarity preserves angle measures, so tan D = tan A = numerator/denominator.
 *   In right triangle DEF the right angle is at F, so D and E are complementary
 *   (D + E = 90 degrees). Hence tan E = 1/tan D = denominator/numerator.
 *   Since numerator >= 20 > 15 >= denominator for every draw, numerator > denominator
 *   always, so the reduced answer denominator/numerator is a proper fraction < 1
 *   (never an integer) -> valid plain a/b fill-in.
 *
 * FIXED:
 * - `getGCD` was undefined (THROWS on every draw) -> inlined a local `gcd`.
 * - correctAnswer was LaTeX `\frac{..}{..}` (FILLIN_FORMAT: students type the
 *   answer) -> now a plain `a/b` fraction string; question text tells the
 *   student to enter a fraction or decimal.
 * - `\\\\tan` / `\\\\frac` (render as a MathJax line break) -> `\\tan` / `\\frac`.
 * - Rebuilt the broken nested-IIFE figure (which drew only axes and mislabeled
 *   vertices, never the triangle) as a plain proportional SVG right triangle
 *   DEF with a right-angle mark at F and leg labels consistent with tan A.
 */

export const generator_1349 = {
  metadata: {
    id: "1349",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => {
      a = Math.abs(a); b = Math.abs(b);
      while (b) { const t = b; b = a % b; a = t; }
      return a || 1;
    };

    const numerator = getRandomInt(20, 60);   // opposite leg (EF) of angle D
    const denominator = getRandomInt(5, 15);  // adjacent leg (DF) of angle D

    // tan A = tan D = numerator/denominator. tan E = denominator/numerator.
    const g = gcd(numerator, denominator);
    const reducedNum = numerator / g;   // reduced numerator of tan D
    const reducedDen = denominator / g; // reduced denominator of tan D
    // Answer is the reciprocal of tan D, already in lowest terms:
    const ansNum = reducedDen;          // numerator of tan E
    const ansDen = reducedNum;          // denominator of tan E (>= 2 since num > den)

    // ── Figure: proportional right triangle DEF, right angle at F ────────────
    // F bottom-left (right-angle vertex), D bottom-right (DF horizontal =
    // adjacent to D), E above F (EF vertical = opposite D). Legs are scaled so
    // EF : DF = numerator : denominator, matching tan A = numerator/denominator.
    const W = 420, H = 300, P = 46;
    const spanX = W - 2 * P, spanY = H - 2 * P;
    const k = Math.min(spanX / denominator, spanY / numerator);
    const legX = denominator * k; // horizontal leg DF
    const legY = numerator * k;   // vertical leg EF
    const fx = P, fy = H - P;             // F (right-angle vertex)
    const dx = P + legX, dy = fy;         // D
    const ex = P, ey = fy - legY;         // E
    const rm = 16;                        // right-angle square size
    const figureCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${fx},${fy} ${dx},${dy} ${ex},${ey}" fill="#3b82f6" fill-opacity="0.10" stroke="#3b82f6" stroke-width="2"/>` +
      `<path d="M ${fx + rm} ${fy} L ${fx + rm} ${fy - rm} L ${fx} ${fy - rm}" fill="none" stroke="#3b82f6" stroke-width="1.5"/>` +
      `<circle cx="${fx}" cy="${fy}" r="3.5" fill="#3b82f6"/>` +
      `<circle cx="${dx}" cy="${dy}" r="3.5" fill="#3b82f6"/>` +
      `<circle cx="${ex}" cy="${ey}" r="3.5" fill="#3b82f6"/>` +
      `<text x="${fx - 10}" y="${fy + 18}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">F</text>` +
      `<text x="${dx + 12}" y="${dy + 18}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">D</text>` +
      `<text x="${ex - 12}" y="${ey - 6}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">E</text>` +
      `<text x="${ex - 14}" y="${(fy + ey) / 2}" text-anchor="middle" font-size="13" fill="currentColor">${numerator}</text>` +
      `<text x="${(fx + dx) / 2}" y="${fy + 20}" text-anchor="middle" font-size="13" fill="currentColor">${denominator}</text>` +
      `</svg></div>`;

    return {
      questionText: `Triangle $ABC$ is similar to triangle $DEF$, where angle $A$ corresponds to angle $D$ and angle $C$ corresponds to angle $F$. Angles $C$ and $F$ are right angles. If $\\tan (A) = \\frac{${numerator}}{${denominator}}$, what is the value of $\\tan (E)$? (Enter your answer as a fraction or decimal.)`,
      figureCode: figureCode,
      options: [], // Fill in the blank
      correctAnswer: `${ansNum}/${ansDen}`,
      explanation: `Because the triangles are similar, corresponding angles are equal, so $\\tan D = \\tan A = \\frac{${numerator}}{${denominator}}$. In right triangle $DEF$ the right angle is at $F$, so angles $D$ and $E$ are complementary and $\\tan E = \\frac{1}{\\tan D} = \\frac{${denominator}}{${numerator}} = \\frac{${ansNum}}{${ansDen}}$.`
    };
  }
};
