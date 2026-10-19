import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 250
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator: 5-15, numerator and input numerator: 1 to den-1]
 * - Difficulty factors: [Fraction arithmetic in function evaluation]
 * - Constraints: [Both fractions proper and in lowest terms]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

export const generator_250 = {
  metadata: {
    id: "250",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Both fractions are proper and in lowest terms. The input numerator used
    // to range up to 10 regardless of the denominator, giving questions such
    // as f(10/10) with f(x) = x + 4/10 and an unreduced answer of 14/10.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let denominator = 7, numerator = 2, xValue = 3;
    do {
      denominator = getRandomInt(5, 15);
      numerator = getRandomInt(1, denominator - 1);
      xValue = getRandomInt(1, denominator - 1);
    } while (gcd(numerator, denominator) !== 1 || gcd(xValue, denominator) !== 1 || xValue === numerator);

    const sum = xValue + numerator;
    const g = gcd(sum, denominator);
    const top = sum / g, bottom = denominator / g;
    const finalAnswer = bottom === 1 ? `${top}` : `${top}/${bottom}`;
    const simplify = g === 1
      ? ''
      : bottom === 1
        ? ` This simplifies to ${top}.`
        : ` Dividing the numerator and denominator by ${g} simplifies this to $\\frac{${top}}{${bottom}}$.`;

    return {
      questionText: `The function $f$ is defined by $f(x) = x + \\frac{${numerator}}{${denominator}}$. What is the value of $f\\left(\\frac{${xValue}}{${denominator}}\\right)$?`,
      figureCode: null,
      options: [],
      correctAnswer: finalAnswer,
      explanation: `The correct answer is ${bottom === 1 ? top : `$\\frac{${top}}{${bottom}}$`}. Substituting $\\frac{${xValue}}{${denominator}}$ for $x$ in the given function yields $f\\left(\\frac{${xValue}}{${denominator}}\\right) = \\frac{${xValue}}{${denominator}} + \\frac{${numerator}}{${denominator}}$. Since the fractions have the same denominator, adding the numerators gives $\\frac{${xValue} + ${numerator}}{${denominator}} = \\frac{${sum}}{${denominator}}$.${simplify}`
    };
  }
};
