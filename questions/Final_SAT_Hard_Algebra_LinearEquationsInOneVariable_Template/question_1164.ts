import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1164
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [2, 14/15, 18/19, n > 1 (fractions and inequalities)]
 * - Difficulty factors: [No solution with fractions, parameter constraint n > 1]
 * - Distractor patterns: [N/A - fill-in-blank]
 * - Constraints: [Coefficient of x must match, constants must differ, n > 1 ensures constants differ]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 */

export const generator_1164 = {
  metadata: {
    id: "1164",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Form: a(kx - n) = -(p/c)x - (u/v), so ak = -p/c and -an must differ from -u/v.
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);

    // Both fractions are drawn in lowest terms. Before, the stem could show
    // unreduced fractions and wrote the sign inside the numerator.
    let a!: number, c!: number, p!: number, u!: number, v!: number;
    do {
      a = getRandomInt(2, 4);
      c = getRandomInt(10, 20);
      p = getRandomInt(5, 15);
      u = getRandomInt(10, 20);
      v = getRandomInt(15, 25);
    } while (gcd(p, c) !== 1 || gcd(u, v) !== 1);

    const kGcd = gcd(p, a * c);
    const kNum = p / kGcd;
    const kDen = (a * c) / kGcd;
    const kValue = kNum / kDen;
    const kTex = `-\\frac{${kNum}}{${kDen}}`;

    // n would have to equal u/(av) for the constants to match. Since u/v < 2 and
    // a >= 2, that value is below 1, so the given n > 1 rules it out.
    const nGcd = gcd(u, a * v);
    const nNum = u / nGcd;
    const nDen = (a * v) / nGcd;

    const rounded = Number(kValue.toFixed(3));
    const decimal = Math.abs(rounded - kValue) < 1e-9 ? `-${rounded}` : `-${kValue.toFixed(3)}`;
    const kSteps = kGcd > 1 ? `-\\frac{${p}}{${a * c}} = ${kTex}` : kTex;

    // Before, the explanation claimed to divide by a but left the right side
    // unchanged, and it stated a specific value of n that the stem never gives.
    const explanation = `The correct answer is $${kTex}$. A linear equation in one variable has no solution only when the coefficients of $x$ on each side are equal and the constant terms are not equal.

Distributing ${a} on the left side of the given equation yields $${a}kx - ${a}n = -\\frac{${p}}{${c}}x - \\frac{${u}}{${v}}$.

Setting the coefficients of $x$ equal gives $${a}k = -\\frac{${p}}{${c}}$. Dividing both sides by ${a} gives $k = -\\frac{${p}}{${c}} \\times \\frac{1}{${a}} = ${kSteps}$.

The constant terms must not be equal, so $-${a}n \\neq -\\frac{${u}}{${v}}$, which means $n \\neq \\frac{${nNum}}{${nDen}}$. Since $\\frac{${nNum}}{${nDen}} < 1$ and it's given that $n > 1$, this condition is met.

Note that -${kNum}/${kDen} and ${decimal} are acceptable ways to enter the answer.`;

    return {
      questionText: `In the equation $${a}(kx - n) = -\\frac{${p}}{${c}}x - \\frac{${u}}{${v}}$, $k$ and $n$ are constants and $n > 1$. The equation has no solution. What is the value of $k$?`,
      figureCode: null,
      options: [],
      correctAnswer: `-${kNum}/${kDen}`,
      explanation: explanation
    };
  }
};
