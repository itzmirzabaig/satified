import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1189
 *
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Question type: Text -> fill-in.
 * - Logic: For (num1 x)/den1 = -(num2 y)/den2 + c, the y-intercept is where x = 0.
 *          At x = 0 the left side is 0, so 0 = -(num2 y)/den2 + c
 *          => (num2/den2) y = c  =>  y = c * den2 / num2.
 * - Fixes:
 *    1. correctAnswer is now a plain number or "a/b" string (no LaTeX) so the
 *       fill-in grader accepts it.
 *    2. Explanation reworked so no math span begins with a bare digit -> clears
 *       the DOLLAR_RISK heuristic (there is no currency here).
 *    3. Integer-only arithmetic; answer reduced to lowest terms.
 */

export const generator_1189 = {
  metadata: {
    id: "1189",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    // STEP 1: Random values.
    const num1 = getRandomInt(2, 5);
    const den1 = getRandomInt(5, 9);
    const num2 = getRandomInt(3, 7);
    const den2 = getRandomInt(7, 11);
    const c = getRandomInt(15, 30);

    // STEP 2: y-intercept (set x = 0): y = c * den2 / num2.
    const num = c * den2;   // numerator
    const den = num2;       // denominator
    const divisor = gcd(num, den) || 1;
    const rNum = num / divisor;
    const rDen = den / divisor;

    const isInteger = rDen === 1;
    // Plain-text answer for the grader: integer or "a/b".
    const answerStr = isInteger ? `${rNum}` : `${rNum}/${rDen}`;

    // Trailing equality chain for the explanation, always ending at the reduced
    // answer. Kept as one $...$ span that starts with the letter "y" so no math
    // segment begins with a bare digit (which would trip the DOLLAR_RISK heuristic).
    let finalChain: string;
    if (isInteger) {
      finalChain = `\\frac{${num}}{${den}} = ${rNum}`;                 // show integer result
    } else if (divisor > 1) {
      finalChain = `\\frac{${num}}{${den}} = \\frac{${rNum}}{${rDen}}`; // show reduction
    } else {
      finalChain = `\\frac{${num}}{${den}}`;                           // already lowest terms
    }

    return {
      questionText: `What is the $y$-coordinate of the $y$-intercept of the graph of $\\frac{${num1}x}{${den1}} = -\\frac{${num2}y}{${den2}} + ${c}$ in the $xy$-plane? (Enter your answer as a fraction or decimal.)`,
      figureCode: null,
      options: [],
      correctAnswer: answerStr,
      explanation: `The $y$-intercept is the point where $x = 0$. Substituting $x = 0$ makes the left side equal to zero, which gives the equation $-\\frac{${num2}y}{${den2}} + ${c} = 0$. Then $\\frac{${num2}y}{${den2}} = ${c}$, so $y = \\frac{${c} \\cdot ${den2}}{${num2}} = ${finalChain}$.`
    };
  }
};
