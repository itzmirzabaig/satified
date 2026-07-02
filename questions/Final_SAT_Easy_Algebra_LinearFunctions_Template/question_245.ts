import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 245
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 5-9, intercept: 1-4, x: 5-10]
 * - Difficulty factors: [Simple evaluation]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

export const generator_245 = {
  metadata: {
    id: "245",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(5, 9);

    const intercept = getRandomInt(1, 4);

    const xValue = getRandomInt(5, 10);

    const result = slope * xValue + intercept;

    return {
      questionText: `The function $f(x) = ${slope}x + ${intercept}$ gives the total number of people on a company retreat with $x$ managers. What is the total number of people on a company retreat with ${xValue} managers?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Substituting ${xValue} for $x$: $f(${xValue}) = ${slope}(${xValue}) + ${intercept} = ${slope * xValue} + ${intercept} = ${result}$.`
    };
  }
};
