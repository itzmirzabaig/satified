import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 409
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: single digit to 20s]
 * - Difficulty factors: [Calculating mean of 10 values]
 * - Constraints: [Sum must be divisible by 10 for clean answer]
 * - Question type: [Raw Data→Fill in Blank]
 * - Figure generation: [No figure]
 */

export const generator_409 = {
  metadata: {
    id: "409",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The tenth value balances the sum. It used to be anything from about
    // -100 to 130 and always came last; now it is redrawn until it is between
    // -5 and 25, and the list is shuffled.
    const mean = getRandomInt(8, 15);
    const targetSum = mean * 10;
    let values: number[] = [];
    do {
      values = Array.from({ length: 9 }, () => getRandomInt(2, 20));
      values.push(targetSum - values.reduce((a, b) => a + b, 0));
    } while (values[9] < -5 || values[9] > 25);
    values = shuffle(values);
    const show = (v: number) => (v < 0 ? `−${-v}` : `${v}`);

    return {
      questionText: `A list of 10 data values is shown.\n\n${values.map(show).join(', ')}\n\nWhat is the mean of these data?`,
      figureCode: null,
      options: [],
      correctAnswer: mean.toString(),
      explanation: `The correct answer is ${mean}. The mean of a data set is the sum of the values divided by the number of values. The sum of the 10 values is ${targetSum}, so the mean is $\\frac{${targetSum}}{10} = ${mean}$.`
    };
  }
};
