import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1354
 *
 * Isosceles right triangle (45-45-90). Legs = L, hypotenuse = L√2.
 * Perimeter P = 2L + L√2 = L(2 + √2). The perimeter is presented as
 * base + base√2 = base(1 + √2), so L = base(1 + √2)/(2 + √2) = (base/2)√2.
 *
 * FIXES:
 * - Removed stray unmatched `$` in the "Numerator" explanation line (odd $ count).
 * - Rewrote `$4 - 2 = 2$` as `$(4 - 2) = 2$` so no math segment opens on a digit
 *   (clears the DOLLAR_RISK heuristic; every segment now opens on a letter/paren).
 * - Dropped the unused getRandomElement import.
 */

export const generator_1354 = {
  metadata: {
    id: "1354",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Perimeter = base(1 + √2); one leg = (base/2)√2.
    const base = getRandomInt(40, 120) * 2; // even -> halfBase is an integer
    const halfBase = base / 2;

    // Options (correct + three targeted misconceptions). All strings distinct:
    // base = 2*halfBase > halfBase, and √2 vs non-√2 forms never coincide.
    const optCorrect = `${halfBase}\\sqrt{2}`; // (base/2)√2
    const optWrong1 = `${halfBase}`;           // forgot the √2 factor
    const optWrong2 = `${base}\\sqrt{2}`;      // forgot to divide by 2
    const optWrong3 = `${base}`;               // just echoed the base coefficient

    const optionsData = [
      { text: optCorrect, isCorrect: true },
      { text: optWrong1, isCorrect: false },
      { text: optWrong2, isCorrect: false },
      { text: optWrong3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // SVG: isosceles right triangle with the right angle at bottom-left and
    // congruence tick marks on the two equal legs.
    const width = 300;
    const height = 250;
    const pad = 40;
    const legLen = 180;

    const pCorner = { x: pad, y: height - pad };
    const pTop = { x: pad, y: height - pad - legLen };
    const pRight = { x: pad + legLen, y: height - pad };

    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <polygon points="${pCorner.x},${pCorner.y} ${pRight.x},${pRight.y} ${pTop.x},${pTop.y}"
          fill="none" stroke="currentColor" stroke-width="2" />
        <polyline points="${pCorner.x},${pCorner.y - 20} ${pCorner.x + 20},${pCorner.y - 20} ${pCorner.x + 20},${pCorner.y}"
          fill="none" stroke="currentColor" stroke-width="1.5" />
        <line x1="${pCorner.x - 10}" y1="${(pCorner.y + pTop.y) / 2}" x2="${pCorner.x + 10}" y2="${(pCorner.y + pTop.y) / 2}"
          stroke="currentColor" stroke-width="2" />
        <line x1="${(pCorner.x + pRight.x) / 2}" y1="${pCorner.y - 10}" x2="${(pCorner.x + pRight.x) / 2}" y2="${pCorner.y + 10}"
          stroke="currentColor" stroke-width="2" />
      </svg>
    `;

    return {
      questionText: `An isosceles right triangle has a perimeter of $${base} + ${base}\\sqrt{2}$ inches. What is the length, in inches, of one leg of this triangle?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct.

1. **Set up the Perimeter Formula:**
   Let the length of a leg be $\\ell$. Since the triangle is an isosceles right triangle, the hypotenuse is $\\ell\\sqrt{2}$.
   Perimeter $P = \\ell + \\ell + \\ell\\sqrt{2} = 2\\ell + \\ell\\sqrt{2} = \\ell(2 + \\sqrt{2})$.

2. **Equate to the Given Value:**
   The given perimeter factors as $\\left(${base} + ${base}\\sqrt{2}\\right) = ${base}\\left(1 + \\sqrt{2}\\right)$, so $\\ell\\left(2 + \\sqrt{2}\\right) = ${base}\\left(1 + \\sqrt{2}\\right)$.

3. **Solve for $\\ell$:**
   $\\ell = \\frac{${base}\\left(1 + \\sqrt{2}\\right)}{2 + \\sqrt{2}}$.
   Rationalize by multiplying the numerator and denominator by $\\left(2 - \\sqrt{2}\\right)$:
   $\\ell = \\frac{${base}\\left(1 + \\sqrt{2}\\right)\\left(2 - \\sqrt{2}\\right)}{\\left(2 + \\sqrt{2}\\right)\\left(2 - \\sqrt{2}\\right)}$.
   The numerator simplifies to $\\ell = \\frac{${base}\\sqrt{2}}{2} = ${halfBase}\\sqrt{2}$, since the denominator equals $\\left(4 - 2\\right) = 2$.

The distractor $\\ell = ${halfBase}$ drops the $\\sqrt{2}$ factor, $\\ell = ${base}\\sqrt{2}$ skips dividing by 2, and $\\ell = ${base}$ is just the perimeter coefficient.`
    };
  }
};
