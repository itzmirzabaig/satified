import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4b09f783
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: single digit to 20s]
 * - Difficulty factors: [Calculating mean of 10 values]
 * - Constraints: [Sum must be divisible by 10 for clean answer]
 * - Question type: [Raw Data→Fill in Blank]
 * - Figure generation: [No figure]
 */

export const generator_4b09f783 = {
  metadata: {
    // id: "4b09f783",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const mean = getRandomInt(8, 15);
    const targetSum = mean * 10;
    const values = Array.from({ length: 9 }, () => getRandomInt(2, 20));
    const currentSum = values.reduce((a, b) => a + b, 0);
    values.push(targetSum - currentSum);

    return {
      questionText: `A list of 10 data values is shown.\n\n${values.join(', ')}\n\nWhat is the mean of these data?`,
      figureCode: null,
      options: null,
      correctAnswer: mean.toString(),
      explanation: `The mean is the sum of the values divided by the count. The sum is ${targetSum}, and there are 10 values, so the mean is ${targetSum}/10 = ${mean}.`
    };
  }
};

/**
 * Question ID: bfa8a85c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 6-21, median 8]
 * - Difficulty factors: [Finding matching median across data sets]
 * - Distractor patterns: [A=median 6, B=median 8, C=median 10, D=median 9]
 * - Constraints: [Original has 7 values (odd), options have 6 (even)]
 * - Question type: [Raw Data→Multiple Choice Text]
 * - Figure generation: [No figure]
 */