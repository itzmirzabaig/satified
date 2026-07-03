import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 239
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 5-10, intercept: 1-5, x: 3-8]
 * - Difficulty factors: [Simple function evaluation]
 * - Constraints: [Clean arithmetic]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

export const generator_239 = {
  metadata: {
    id: "239",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(5, 10);

    const intercept = getRandomInt(1, 5);

    const xValue = getRandomInt(3, 8);

    const result = slope * xValue + intercept;

    return {
      questionText: `The function $f$ is defined by the equation $f(x) = ${slope}x + ${intercept}$. What is the value of $f(x)$ when $x = ${xValue}$?`,
      figureCode: null,
      options: [],
      correctAnswer: result.toString(),
      explanation: `Substituting ${xValue} for $x$ in the equation: $f(${xValue}) = ${slope}(${xValue}) + ${intercept} = ${slope * xValue} + ${intercept} = ${result}$.`
    };
  }
};
