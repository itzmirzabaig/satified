import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 264
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4-8, intercept: 5-15, xValue: 6-12]
 * - Difficulty factors: [Simple evaluation]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Fill in blank]
 * - Figure generation: null
 */

export const generator_264 = {
  metadata: {
    id: "264",
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
      options: [],
      correctAnswer: result.toString(),
      explanation: `The correct answer is ${result}. Substituting ${xValue} for $x$ in the given equation yields $y = ${slope}(${xValue}) + ${intercept}$, or $y = ${slope * xValue} + ${intercept} = ${result}$. Therefore, the value of $y$ when $x = ${xValue}$ is ${result}.`
    };
  }
};
