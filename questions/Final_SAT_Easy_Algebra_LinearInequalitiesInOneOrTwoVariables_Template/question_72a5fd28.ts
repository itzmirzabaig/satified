import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 72a5fd28
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [package size: 12, needed: 50]
 * - Difficulty factors: [Ceiling function, discrete whole number constraint]
 * - Distractor patterns: [Fill-in-the-blank, exact calculation vs rounded up]
 * - Constraints: [Must round up to next whole number]
 * - Question type: [Word Problem→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_72a5fd28 = {
  metadata: {
    // id: "72a5fd28",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const packageSize = getRandomInt(8, 15);
    const needed = getRandomInt(40, 80);
    const rawCalc = needed / packageSize;
    const minPackages = Math.ceil(rawCalc);

    const explanation = `The inequality $${packageSize}p \\ge ${needed}$ represents the situation, where $p$ is packages. Dividing: $p \\ge ${(rawCalc).toFixed(2)}$. Since packages must be whole numbers, the minimum is ${minPackages}.`;

    return {
      questionText: `For a party, dinner rolls are needed. Dinner rolls are sold in packages of ${packageSize}. What is the minimum number of packages that should be bought for the party if ${needed} dinner rolls are needed?`,
      figureCode: null,
      options: null,
      correctAnswer: minPackages.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: e006209c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [needed: 67, collected: 63]
 * - Difficulty factors: [Simple subtraction, "at least" interpretation]
 * - Distractor patterns: [A=sum, B=collected, C=correct difference, D=zero]
 * - Constraints: [Result must be positive]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */