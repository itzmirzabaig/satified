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

    // Build 9 heights, then force the 10th so the total is exactly targetSum.
    // Every plant height must be a valid positive value (2-20 cm), so retry
    // (bounded) until the forced 10th value also lands in [2, 20].
    let values: number[] = [];
    let tries = 0;
    do {
      const first9 = Array.from({ length: 9 }, () => getRandomInt(2, 20));
      const tenth = targetSum - first9.reduce((a, b) => a + b, 0);
      if (tenth >= 2 && tenth <= 20) {
        values = [...first9, tenth];
      }
    } while (values.length === 0 && tries++ < 50);

    // Guaranteed fallback (never negative): all ten heights equal the mean.
    if (values.length === 0) {
      values = Array.from({ length: 10 }, () => mean);
    }

    return {
      questionText: `Each value in the data set shown represents the height, in centimeters, of a plant.\n\n${values.join(', ')}\n\nWhat is the mean height, in centimeters, of these plants?`,
      figureCode: null,
      options: [],
      correctAnswer: mean.toString(),
      explanation: `The sum of the heights is ${targetSum}. Dividing by 10 plants gives a mean of ${mean}.`
    };
  }
};
