import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 703
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/d, a, b, c]
 * - Difficulty factors: [Distributing and combining like terms with fraction]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Clean fraction result]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 *
 * Intent: slope of y = (1/d)(a x + b) + c x = (a/d)x + b/d + c x,
 * so slope m = a/d + c = (a + c*d)/d.
 */

export const generator_703 = {
  metadata: {
    id: "703",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const d = getRandomInt(2, 6);
    const a = getRandomInt(15, 40);
    const b = getRandomInt(5, 30);
    const c = getRandomInt(3, 12);

    const gcd = (x: number, y: number): number => y === 0 ? Math.abs(x) : gcd(y, x % y);

    // Slope m = a/d + c = (a + c*d)/d, reduced.
    const slopeNum = a + c * d;
    const slopeDivisor = gcd(slopeNum, d);
    const finalNum = slopeNum / slopeDivisor;
    const finalDen = d / slopeDivisor;

    // LaTeX form of the slope (used in the explanation).
    const slopeTex = finalDen === 1 ? `${finalNum}` : `\\frac{${finalNum}}{${finalDen}}`;
    // Grader-safe answer: plain integer or a/b fraction (no LaTeX, units, or prose).
    const answerStr = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;

    // y-intercept term b/d, reduced (only shown in the explanation).
    const interDivisor = gcd(b, d);
    const interNum = b / interDivisor;
    const interDen = d / interDivisor;
    const interTex = interDen === 1 ? `${interNum}` : `\\frac{${interNum}}{${interDen}}`;

    // Only advertise a decimal alternative when the value terminates exactly
    // (reduced denominator's only prime factors are 2 and 5), so the suggested
    // entry actually grades as equal to the fraction. finalDen divides d in
    // [2,6], so it is one of {1,2,3,4,5,6}; {2,4,5} terminate, {3,6} repeat.
    let den = finalDen;
    while (den % 2 === 0) den /= 2;
    while (den % 5 === 0) den /= 5;
    const terminates = den === 1;
    const decimalStr = (finalNum / finalDen).toFixed(4).replace(/\.?0+$/, '');
    const altNote = (finalDen !== 1 && terminates)
      ? ` Note that \\( ${slopeTex} \\) and \\( ${decimalStr} \\) are examples of ways to enter a correct answer.`
      : ``;

    return {
      questionText: `What is the slope of the graph of \\( y=\\frac{1}{${d}}(${a} x+${b})+${c} x \\) in the xy-plane? Enter your answer as a fraction or a decimal.`,
      figureCode: null,
      options: [],
      correctAnswer: answerStr,
      explanation: `The correct answer is \\( ${slopeTex} \\). In the xy-plane, the graph of an equation in the form \\( y=mx+b \\), where \\( m \\) and \\( b \\) are constants, has a slope of \\( m \\) and a y-intercept of \\( (0, b) \\). Applying the distributive property to the right-hand side of the given equation yields \\( y=\\frac{${a}}{${d}} x+\\frac{${b}}{${d}}+${c} x \\). Combining like terms yields \\( y=${slopeTex} x+${interTex} \\). This equation is in the form \\( y=mx+b \\), where \\( m=${slopeTex} \\) and \\( b=${interTex} \\). It follows that the slope is \\( ${slopeTex} \\).${altNote}`
    };
  }
};
