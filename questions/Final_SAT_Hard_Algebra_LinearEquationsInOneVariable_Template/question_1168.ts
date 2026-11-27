import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1168
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [3, 4, 13, 36 (small integers)]
 * - Difficulty factors: [No solution condition with parameter k]
 * - Distractor patterns: [N/A - fill-in-blank, but note: original answer 16/17 seems wrong]
 * - Constraints: [Must have no solution: a = c but b ≠ d in ax+b=cx+d form]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 * 
 * NOTE: The original explanation says "k = 16/17" but the math doesn't work.
 * 3(kx + 13) = 4x + 36
 * 3kx + 39 = 4x + 36
 * For no solution: 3k = 4 so k = 4/3, and 39 ≠ 36 ✓
 * So k should be 4/3, not 16/17.
 * Let me verify: 16/17 ≈ 0.94, and 3*(16/17) = 48/17 ≈ 2.82 ≠ 4
 * This appears to be an error in the original. Correct answer should be 4/3.
 * However, I'll preserve the difficulty and generate similar questions correctly.
 */

export const generator_1168 = {
  metadata: {
    id: "1168",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Form: a(kx + b) = cx + d. Distributing gives akx + ab = cx + d, so
    // no solution needs ak = c (k = c/a) and ab != d. Since ab >= 20 and
    // d <= 15, the constants always differ.
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    // c is redrawn until a does not divide it: an integer k (often 1, from
    // equal coefficients like 4 and 4) made this hard question trivial.
    const a = getRandomInt(2, 5);
    let c = getRandomInt(3, 9);
    while (c % a === 0) c = getRandomInt(3, 9);
    const b = getRandomInt(10, 20);
    const d = getRandomInt(5, 15);

    const divisor = gcd(c, a);
    const kNum = c / divisor;
    const kDen = a / divisor;
    const kValue = kNum / kDen;
    const kTex = kDen === 1 ? `${kNum}` : `\\frac{${kNum}}{${kDen}}`;
    const kSteps = divisor > 1 ? `\\frac{${c}}{${a}} = ${kTex}` : kTex;

    let enterNote = '';
    if (kDen !== 1) {
      const rounded = Number(kValue.toFixed(3));
      const decimal = Math.abs(rounded - kValue) < 1e-9 ? `${rounded}` : kValue.toFixed(3);
      enterNote = ` Note that ${kNum}/${kDen} and ${decimal} are acceptable ways to enter the answer.`;
    }

    // Before: the explanation wrote \\\\frac (two backslashes), so every fraction
    // broke on the page, left d/a unreduced, and showed a rounded decimal as if exact.
    const explanation = `The correct answer is $${kTex}$. A linear equation in one variable has no solution only when the coefficients of $x$ on each side are equal and the constant terms are not equal.

Distributing ${a} on the left side of the given equation gives $${a}kx + ${a * b} = ${c}x + ${d}$.

The coefficients of $x$ must be equal, so $${a}k = ${c}$, which gives $k = ${kSteps}$.

The constant terms are ${a * b} and ${d}, which are not equal, so for this value of $k$ the equation has no solution.${enterNote}`;

    return {
      questionText: `In the equation $${a}(kx + ${b}) = ${c}x + ${d}$, $k$ is a constant. The equation has no solution. What is the value of $k$?`,
      figureCode: null,
      options: [],
      correctAnswer: kDen === 1 ? `${kNum}` : `${kNum}/${kDen}`,
      explanation: explanation
    };
  }
};
