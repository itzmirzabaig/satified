import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 252
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 3-9, denominator: 5-11, intercept: 40-70]
 * - Difficulty factors: [Fraction coefficient evaluation]
 * - Constraints: [Ensure clean division]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

export const generator_252 = {
  metadata: {
    id: "252",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numerator = getRandomInt(3, 9);

    const denominator = getRandomInt(5, 11);

    const intercept = getRandomInt(40, 70);

    const xValue = denominator * getRandomInt(2, 4);

    const result = (numerator * xValue / denominator) + intercept;

    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{${numerator}}{${denominator}}x + ${intercept}$. What is the value of $f(${xValue})$?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `The value of $f(${xValue})$ can be found by substituting ${xValue} for $x$ in the function: $f(${xValue}) = \\frac{${numerator}}{${denominator}}(${xValue}) + ${intercept} = ${numerator * xValue / denominator} + ${intercept} = ${result}$.`
    };
  }
};
