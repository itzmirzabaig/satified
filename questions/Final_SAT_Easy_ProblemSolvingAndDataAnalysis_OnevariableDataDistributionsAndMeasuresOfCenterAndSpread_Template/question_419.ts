import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 419
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [heights: 2-22 range]
 * - Difficulty factors: [Calculating mean]
 * - Constraints: [10 values, sum divisible by 10]
 * - Question type: [Raw Data→Fill in Blank]
 * - Figure generation: [No figure]
 */

export const generator_419 = {
  metadata: {
    id: "419",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const mean = getRandomInt(7, 12);
    const targetSum = mean * 10;
    const values = Array.from({ length: 9 }, () => getRandomInt(2, 20));
    const currentSum = values.reduce((a, b) => a + b, 0);
    values.push(targetSum - currentSum);

    return {
      questionText: `Each value in the data set shown represents the height, in centimeters, of a plant.\n\n${values.join(', ')}\n\nWhat is the mean height, in centimeters, of these plants?`,
      figureCode: null,
      options: [],
      correctAnswer: mean.toString(),
      explanation: `The sum of the heights is ${targetSum}. Dividing by 10 plants gives a mean of ${mean}.`
    };
  }
};
