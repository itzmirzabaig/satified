import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1175
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4/5, 1/3, RHS: 1]
 * - Difficulty factors: [Finding x-intercept with fraction coefficients]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Set y=0, solve for x]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_1175 = {
  metadata: {
    id: "1175",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // FIXED (review): the answer was rounded to 2 decimals (32/7 stored as
    // "4.57", shown with \approx), the coefficient fraction could be unreduced
    // (6/3, 4/6), and the explanation lacked "The correct answer is" and left
    // the fraction unreduced. Now num/den is in lowest terms with num < den and
    // the answer is the exact reduced fraction (or integer).
    const gcd = (p: number, q: number): number => (q === 0 ? p : gcd(q, p % q));
    let num = 2, den = 3;
    do {
      num = getRandomInt(2, 7);
      den = getRandomInt(3, 8);
    } while (num >= den || gcd(num, den) !== 1);
    const rhs = getRandomInt(1, 4);

    // x-intercept: (num/den)*x = rhs => x = rhs*den/num
    const top = rhs * den;
    const g = gcd(top, num);
    const rTop = top / g, rBot = num / g;
    const answerStr = rBot === 1 ? `${rTop}` : `${rTop}/${rBot}`;
    const answerTex = rBot === 1 ? `${rTop}` : `\\frac{${rTop}}{${rBot}}`;
    const unreducedTex = `\\frac{${top}}{${num}}`;
    const chain = (g === 1 && rBot !== 1) ? answerTex : `${unreducedTex} = ${answerTex}`;

    return {
      questionText: `The line with the equation $\\frac{${num}}{${den}}x + \\frac{1}{${den + 2}}y = ${rhs}$ is graphed in the $xy$-plane. What is the $x$-coordinate of the $x$-intercept of the line?`,
      figureCode: null,
      options: [],
      correctAnswer: answerStr,
      explanation: `The correct answer is ${answerStr}. The $x$-intercept is the point where $y = 0$. Substituting $0$ for $y$ gives $\\frac{${num}}{${den}}x + \\frac{1}{${den + 2}}(0) = ${rhs}$, which simplifies to $\\frac{${num}}{${den}}x = ${rhs}$. Multiplying both sides by $\\frac{${den}}{${num}}$ gives $x = ${rhs}\\cdot\\frac{${den}}{${num}} = ${chain}$. So the $x$-coordinate of the $x$-intercept is $${answerTex}$.`
    };
  }
};
