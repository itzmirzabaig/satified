import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 447fa970
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 5-10, intercept: 1-5, x: 3-8]
 * - Difficulty factors: [Simple function evaluation]
 * - Constraints: [Clean arithmetic]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

export const generator_447fa970 = {
  metadata: {
    // id: "447fa970",
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
      options: null,
      correctAnswer: result.toString(),
      explanation: `Substituting ${xValue} for $x$ in the equation: $f(${xValue}) = ${slope}(${xValue}) + ${intercept} = ${slope * xValue} + ${intercept} = ${result}$.`
    };
  }
};

/**
 * Question ID: 27198699
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initialHeight: 25-45, rate: 0.10-0.25]
 * - Difficulty factors: [Interpreting y-intercept in context]
 * - Distractor patterns: [end height, rate of change, time to zero]
 * - Constraints: [None]
 * - Question type: [Interpretation→Multiple Choice Text]
 * - Figure generation: null
 */

