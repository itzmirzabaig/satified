import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: a4d6fbec
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4-8, intercept: 5-15, xValue: 6-12]
 * - Difficulty factors: [Simple evaluation]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

export const generator_a4d6fbec = {
  metadata: {
    // id: "a4d6fbec",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(4, 8);

    const intercept = getRandomInt(5, 15);

    const xValue = getRandomInt(6, 12);

    const result = slope * xValue + intercept;

    return {
      questionText: `If $y=${slope}x+${intercept}$, what is the value of $y$ when $x=${xValue}$?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `Substituting ${xValue} for $x$: $y = ${slope}(${xValue}) + ${intercept} = ${slope * xValue} + ${intercept} = ${result}$.`
    };
  }
};

/**
 * Question ID: 5907e072
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercept: 25-40]
 * - Difficulty factors: [Evaluating constant parameter]
 * - Distractor patterns: [incorrect sign, negative reciprocal, reciprocal]
 * - Constraints: [None]
 * - Question type: [Find parameter→Multiple Choice Text]
 * - Figure generation: null
 */

