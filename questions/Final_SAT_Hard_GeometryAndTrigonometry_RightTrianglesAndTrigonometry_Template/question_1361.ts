import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1361
 *
 * Equilateral triangle with perimeter P, so side s = P/3. The height of an
 * equilateral triangle is h = (s/2)·√3. The height is given as k√3, so
 * k = s/2 = P/6. The student solves for k (fill-in).
 *
 * Construction: pick k in [50,150], set side = 2k and perimeter = 6k, so k is
 * always a clean integer and k = side/2 = perimeter/6.
 *
 * FIXES (was TEMPLATE_LEFTOVER):
 * - The legacy figure was a nested-IIFE scatter frame with meaningless axes; it
 *   also leaked a literal `${side` (inside single quotes) and a broken `ksqrt{3`
 *   label. Rebuilt as a plain SVG equilateral triangle with a dashed altitude,
 *   a right-angle marker, the base labeled with the side length, and the height
 *   labeled k√3 — matching the question's live values.
 * - Collapsed quadruple backslashes (\\\\sqrt, \\\\frac) to single-rendered
 *   \\sqrt / \\frac in the question text and explanation.
 * - Reworded the explanation so no math segment opens on a digit (clears
 *   DOLLAR_RISK): side and k steps lead with $s$ / $k$.
 */

export const generator_1361 = {
  metadata: {
    id: "1361",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const k = getRandomInt(50, 150);
    const side = 2 * k;
    const perimeter = 3 * side; // = 6k

    // Figure: a schematic equilateral triangle drawn with true equilateral
    // proportions in screen coordinates (height = base * sqrt(3)/2), with the
    // altitude drawn and labeled k√3 and the base labeled with the side length.
    const W = 420, H = 300;
    const baseLen = 260;                 // on-screen base length (px)
    const triH = baseLen * Math.sqrt(3) / 2; // on-screen height (px)
    const cx = W / 2;
    const baseY = 40 + triH;             // y of the base
    const apexY = 40;                    // y of the apex
    const leftX = cx - baseLen / 2;
    const rightX = cx + baseLen / 2;

    const figureCode = `
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:420px;height:auto;display:block;margin:0 auto;font-family:sans-serif;">
        <polygon points="${leftX},${baseY} ${rightX},${baseY} ${cx},${apexY}"
          fill="#3b82f6" fill-opacity="0.08" stroke="currentColor" stroke-width="2" />
        <line x1="${cx}" y1="${apexY}" x2="${cx}" y2="${baseY}"
          stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 4" />
        <polyline points="${cx - 12},${baseY} ${cx - 12},${baseY - 12} ${cx},${baseY - 12}"
          fill="none" stroke="currentColor" stroke-width="1.2" />
        <text x="${cx + 10}" y="${(apexY + baseY) / 2}" text-anchor="start" font-size="15" font-style="italic" fill="currentColor">k&#8730;3</text>
        <text x="${cx}" y="${baseY + 22}" text-anchor="middle" font-size="14" fill="currentColor">${side} cm</text>
      </svg>
    `;

    return {
      questionText: `The perimeter of an equilateral triangle is ${perimeter} centimeters. The height of this triangle is $k\\sqrt{3}$ centimeters, where $k$ is a constant. What is the value of $k$?`,
      figureCode,
      options: [], // Fill in the blank
      correctAnswer: k.toString(),
      explanation: `An equilateral triangle has three equal sides, so each side is $s = \\frac{${perimeter}}{3} = ${side}$ centimeters. The height of an equilateral triangle with side $s$ is $\\frac{s}{2}\\sqrt{3}$. Substituting the side length, the height is $\\frac{${side}}{2}\\sqrt{3} = ${k}\\sqrt{3}$ centimeters. Since the height is given as $k\\sqrt{3}$, it follows that $k = ${k}$.`
    };
  }
};
