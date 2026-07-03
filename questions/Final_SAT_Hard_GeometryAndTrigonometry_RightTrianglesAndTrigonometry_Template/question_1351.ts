import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1351
 *
 * Shape: a trapezoid formed by three congruent equilateral triangles (two
 * upright on the bottom, one inverted on top between them). The two upright
 * triangles are shaded. Tracing the border, the perimeter is
 *   bottom(2s) + right leg(s) + top(s) + left leg(s) = 5s,
 * so s = perimeter / 5. Each equilateral triangle has area s^2·√3/4, and the
 * shaded region is two of them: 2·(s^2√3/4) = (s^2/2)√3.
 *
 * FIXES:
 * - DUP_OPTIONS: the old "wrong formula" distractor 2*side collided with the
 *   one-triangle distractor s^2/4 at side=8 (both 16). Replaced it with the
 *   "forgot to divide" coefficient s^2 (area treated as 2·(s^2√3/2)). The four
 *   coefficients are now s^2/4, s^2/2, 3s^2/4, s^2 = {1,2,3,4}·(s^2/4), which
 *   are distinct integers for every draw.
 * - DOLLAR_RISK: reworded the explanation so no math segment opens on a digit
 *   (side step now leads with $s$, area step leads with $\frac{...}$).
 */

export const generator_1351 = {
  metadata: {
    id: "1351",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const side = getRandomInt(4, 12) * 2; // even side, 8..24
    const perimeter = 5 * side;

    const sSquared = side * side;
    const coeffCorrect = sSquared / 2;      // 2 shaded triangles
    const coeffOneTri = sSquared / 4;       // only 1 triangle
    const coeffThreeTri = (sSquared * 3) / 4; // all 3 triangles (whole trapezoid)
    const coeffForgotHalf = sSquared;       // used triangle area = s^2√3/2, then ×2

    const optionsData = [
      { text: `${coeffCorrect}\\sqrt{3}`, isCorrect: true },
      { text: `${coeffOneTri}\\sqrt{3}`, isCorrect: false },
      { text: `${coeffThreeTri}\\sqrt{3}`, isCorrect: false },
      { text: `${coeffForgotHalf}\\sqrt{3}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // SVG: schematic trapezoid of three equilateral triangles; the two upright
    // (left & right) triangles are shaded, the middle inverted one is not.
    const width = 320;
    const height = 180;
    const drawSide = 80;
    const drawHeight = drawSide * Math.sqrt(3) / 2;
    const startX = (width - 2 * drawSide) / 2;
    const startY = height - 30;

    const p1 = { x: startX, y: startY };
    const p2 = { x: startX + drawSide, y: startY };
    const pTopLeft = { x: startX + drawSide / 2, y: startY - drawHeight };
    const p3 = { x: startX + 2 * drawSide, y: startY };
    const pTopRight = { x: startX + 1.5 * drawSide, y: startY - drawHeight };

    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 350px; height: auto; display: block; margin: 0 auto;">
        <polygon points="${p1.x},${p1.y} ${p2.x},${p2.y} ${pTopLeft.x},${pTopLeft.y}"
          fill="#3b82f6" fill-opacity="0.5" stroke="currentColor" stroke-width="2" />
        <polygon points="${pTopLeft.x},${pTopLeft.y} ${p2.x},${p2.y} ${pTopRight.x},${pTopRight.y}"
          fill="none" stroke="currentColor" stroke-width="2" />
        <polygon points="${p2.x},${p2.y} ${p3.x},${p3.y} ${pTopRight.x},${pTopRight.y}"
          fill="#3b82f6" fill-opacity="0.5" stroke="currentColor" stroke-width="2" />
      </svg>
    `;

    return {
      questionText: `A graphic designer is creating a logo, shown in the figure above. The logo is in the shape of a trapezoid and consists of three congruent equilateral triangles, with the two outer triangles shaded. If the perimeter of the logo is ${perimeter} centimeters, what is the combined area of the shaded regions, in square centimeters?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.

1. **Find the side length.** Tracing the border of the trapezoid gives a bottom base of two side-lengths, a top base of one side-length, and two slanted legs of one side-length each, for a perimeter of $s + s + s + s + s = 5s$. Setting this equal to the given perimeter, $s = \\frac{${perimeter}}{5} = ${side}$ centimeters.

2. **Find the shaded area.** The shaded region is the two outer equilateral triangles, and each equilateral triangle of side $s$ has area $\\frac{s^2\\sqrt{3}}{4}$. So the shaded area is $\\frac{2 \\cdot ${side}^2\\sqrt{3}}{4} = \\frac{${sSquared}\\sqrt{3}}{2} = ${coeffCorrect}\\sqrt{3}$ square centimeters.

Counting only one triangle gives $\\frac{${side}^2\\sqrt{3}}{4} = ${coeffOneTri}\\sqrt{3}$; counting all three gives $\\frac{3 \\cdot ${side}^2\\sqrt{3}}{4} = ${coeffThreeTri}\\sqrt{3}$; and using $\\frac{s^2\\sqrt{3}}{2}$ for a single triangle's area gives $\\frac{2 \\cdot ${side}^2\\sqrt{3}}{2} = ${coeffForgotHalf}\\sqrt{3}$.`
    };
  }
};
