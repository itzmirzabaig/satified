import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 7fac16fb_v2
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 3-9, denominator: 5-11, intercept: 40-70]
 * - Difficulty factors: [Fraction coefficient evaluation]
 * - Constraints: [Ensure clean division]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

export const generator_7fac16fb_v2 = {
  metadata: {
    // id: "7fac16fb_v2",
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

/**
 * Question ID: 06fc1726
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeffs: 2-5, constant: 1-5, x: 3-8]
 * - Difficulty factors: [Fraction function evaluation, order of operations]
 * - Distractor patterns: [wrong denominator, adding instead of subtracting, forgetting division]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

