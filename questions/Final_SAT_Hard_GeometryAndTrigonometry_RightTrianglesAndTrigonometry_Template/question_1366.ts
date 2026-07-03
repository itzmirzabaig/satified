import { getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1366
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2.9, tan(A) = 21/20]
 * - Difficulty factors: [Similar triangles, tangent to sine conversion, Pythagorean triple]
 * - Constraints: [tan(A) = 21/20 implies 21-20-29 triangle]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with labeled sides]
 *
 * FIXED:
 * - Removed call to undefined getGCD (caused THROWS on every draw); replaced
 *   with a local gcd() helper.
 * - correctAnswer is now a plain "a/b" fraction string (was LaTeX \frac{...},
 *   which fails the fill-in format rule and cannot be typed by a student).
 * - Question text now instructs the student to enter a fraction or decimal.
 * - Reduced quadruple backslashes to single-escaped \\ so MathJax renders
 *   \tan, \frac, \sin, \sqrt correctly (was rendering as a \\ line break).
 * - Rebuilt the broken axis-only figure as a plain SVG right triangle DEF whose
 *   drawn side lengths match the triple every draw (opposite = EF, adjacent =
 *   DF, hypotenuse = DE), with a right-angle marker at F.
 */

export const generator_1366 = {
  metadata: {
    id: "1366",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Original: tan(A) = 21/20, so triangle is 20-21-29; sin(A) = 21/29.
    // Since triangle ABC ~ DEF with A corresponding to D, sin(D) = sin(A).
    // Right angle is at C (and F), so the hypotenuse is opposite that vertex.
    // For angle A/D: opposite leg = BC/EF, adjacent leg = AC/DF, hyp = AB/DE.
    //   tan(A) = opposite/adjacent,  sin(D) = sin(A) = opposite/hypotenuse.

    // Primitive Pythagorean triples [opposite, adjacent, hypotenuse].
    const triples = [
      [20, 21, 29],
      [12, 35, 37],
      [11, 60, 61],
      [13, 84, 85]
    ];

    const triple = getRandomElement(triples) as [number, number, number];
    const opposite = triple[0];
    const adjacent = triple[1];
    const hypotenuse = triple[2];

    // Reduce sin(D) = opposite/hypotenuse. (These triples are primitive, so the
    // fraction is already in lowest terms, but reduce defensively.)
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(opposite, hypotenuse);
    const reducedNum = opposite / g;
    const reducedDen = hypotenuse / g;

    // ── Figure: right triangle DEF, right angle at F ──────────────────────────
    // D = bottom-left, F = bottom-right (right angle), E = top-right.
    //   DF = adjacent (horizontal leg), EF = opposite (vertical leg),
    //   DE = hypotenuse.  tan(D) = EF/DF = opposite/adjacent as required.
    const W = 450, H = 300, pad = 55;
    const usableW = W - 2 * pad;
    const usableH = H - 2 * pad;
    // Scale so the triangle fills the drawing area while keeping proportions.
    const scale = Math.min(usableW / adjacent, usableH / opposite);
    const Dx = pad;
    const Dy = H - pad;
    const Fx = pad + adjacent * scale;
    const Fy = H - pad;
    const Ex = pad + adjacent * scale;
    const Ey = H - pad - opposite * scale;
    const ra = 14; // right-angle marker size (px)

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${Dx},${Dy} ${Fx},${Fy} ${Ex},${Ey}" fill="#3b82f6" fill-opacity="0.12" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round"/>` +
      // right-angle marker at F
      `<path d="M ${Fx - ra} ${Fy} L ${Fx - ra} ${Fy - ra} L ${Fx} ${Fy - ra}" fill="none" stroke="currentColor" stroke-width="1.5"/>` +
      // vertex labels
      `<text x="${Dx - 14}" y="${Dy + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">D</text>` +
      `<text x="${Fx + 14}" y="${Fy + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">F</text>` +
      `<text x="${Ex + 14}" y="${Ey}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">E</text>` +
      // side-length labels
      `<text x="${(Dx + Fx) / 2}" y="${Dy + 22}" text-anchor="middle" font-size="13" fill="currentColor">${adjacent}</text>` +
      `<text x="${Fx + 20}" y="${(Fy + Ey) / 2 + 4}" text-anchor="middle" font-size="13" fill="currentColor">${opposite}</text>` +
      `<text x="${(Dx + Ex) / 2 - 12}" y="${(Dy + Ey) / 2 - 6}" text-anchor="middle" font-size="13" fill="currentColor">${hypotenuse}</text>` +
      `</svg></div>`;

    return {
      questionText: `Triangle $ABC$ is similar to triangle $DEF$, where $A$ corresponds to $D$ and $C$ corresponds to $F$. Angles $C$ and $F$ are right angles. If $\\tan(A) = \\frac{${opposite}}{${adjacent}}$, what is the value of $\\sin D$? (Enter your answer as a fraction or decimal.)`,
      figureCode,
      options: [], // Fill in the blank
      correctAnswer: `${reducedNum}/${reducedDen}`,
      explanation: `Since $\\triangle ABC \\sim \\triangle DEF$, corresponding angles are equal, so $\\angle D = \\angle A$ and $\\tan D = \\tan A = \\frac{${opposite}}{${adjacent}}$. In right triangle $DEF$ (right angle at $F$), the leg opposite $D$ is ${opposite} and the leg adjacent to $D$ is ${adjacent}. The hypotenuse is $DE = \\sqrt{${opposite}^2 + ${adjacent}^2} = \\sqrt{${opposite * opposite + adjacent * adjacent}} = ${hypotenuse}$. Therefore $\\sin D = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{${opposite}}{${hypotenuse}} = \\frac{${reducedNum}}{${reducedDen}}$.`
    };
  }
};
