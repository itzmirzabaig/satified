import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 407
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 70s-90s range]
 * - Difficulty factors: [Finding median of 9 ordered values]
 * - Constraints: [Odd count, already ordered]
 * - Question type: [Raw Data→Fill in Blank]
 * - Figure generation: [No figure]
 */

export const generator_407 = {
  metadata: {
    id: "407",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(60, 75);
    const values = Array.from({ length: 9 }, (_, i) => base + (i * 2) + getRandomInt(0, 1)).sort((a, b) => a - b);
    const median = values;

    return {
      questionText: `What is the median of the data shown?\n\n${values.join(', ')}`,
      figureCode: null,
      options: null,
      correctAnswer: median.toString(),
      explanation: `The median of an ordered data set with 9 values is the 5th value. In the list ${values.join(', ')}, the 5th value is ${median}.`
    };
  }
};
