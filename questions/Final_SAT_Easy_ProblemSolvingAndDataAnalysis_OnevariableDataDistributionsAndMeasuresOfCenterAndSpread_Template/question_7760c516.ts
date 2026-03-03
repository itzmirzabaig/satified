import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7760c516
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [heights: 2-22 range]
 * - Difficulty factors: [Calculating mean]
 * - Constraints: [10 values, sum divisible by 10]
 * - Question type: [Raw Data→Fill in Blank]
 * - Figure generation: [No figure]
 */

export const generator_7760c516 = {
  metadata: {
    // id: "7760c516",
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
      options: null,
      correctAnswer: mean.toString(),
      explanation: `The sum of the heights is ${targetSum}. Dividing by 10 plants gives a mean of ${mean}.`
    };
  }
};

/**
 * Question ID: 374b18f9
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [acres: 4000-11000 range]
 * - Difficulty factors: [Reading median from box plot]
 * - Distractor patterns: [4399=min, 7067=median, 8831=max/2, 10595=max]
 * - Constraints: [Box plot shows Q1, median, Q3, min, max]
 * - Question type: [Box Plot→Multiple Choice Text]
 * - Figure generation: [Mafs box plot]
 */