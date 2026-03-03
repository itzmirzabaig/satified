import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: eaab8bc1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 300, percentage: 80%]
 * - Difficulty factors: [Fill-in-the-blank, high percentage]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Clean integer result]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_eaab8bc1 = {
  metadata: {
    // id: "eaab8bc1",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(200, 500);
    const percentage = getRandomInt(60, 90);
    const result = Math.round((percentage / 100) * total);

    if ((total * percentage) % 100 !== 0) return generator_eaab8bc1.generate();

    return {
      questionText: `Out of ${total} seeds that were planted, ${percentage}% sprouted. How many of these seeds sprouted?`,
      figureCode: null,
      options: null,
      correctAnswer: `${result}`,
      explanation: `The correct answer is ${result}. It's given that ${percentage}% of the ${total} seeds sprouted. Calculate the number by multiplying: ${total} $\\times \\frac{${percentage}}{100} = ${result}$.`
    };
  }
};

/**
 * Question ID: 771ee744
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 320, percentage: 10%]
 * - Difficulty factors: [10% calculation, complement distractor]
 * - Distractor patterns: [288 = complement (90%), 320 = total, 352 = 110%]
 * - Constraints: [Ends in 0 for clean 10%]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */