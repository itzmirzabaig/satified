import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 292
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [package size: 12, needed: 50]
 * - Difficulty factors: [Ceiling function, discrete whole number constraint]
 * - Distractor patterns: [Fill-in-the-blank, exact calculation vs rounded up]
 * - Constraints: [Must round up to next whole number]
 * - Question type: [Word Problem→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_292 = {
  metadata: {
    id: "292",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The number needed is not a multiple of the package size, so the answer
    // requires rounding up. The explanation used to say "p >= 3.08" for
    // 40/13 = 3.0769..., a rounded bound that is slightly too large.
    let packageSize = 8, needed = 41;
    do {
      packageSize = getRandomInt(8, 15);
      needed = getRandomInt(40, 80);
    } while (needed % packageSize === 0);
    const minPackages = Math.ceil(needed / packageSize);
    const fewer = minPackages - 1;

    const explanation = `The correct answer is ${minPackages}. If $p$ is the number of packages bought, the number of dinner rolls is $${packageSize}p$, so the situation is represented by the inequality $${packageSize}p \\ge ${needed}$. Dividing both sides of this inequality by ${packageSize} yields $p \\ge \\frac{${needed}}{${packageSize}}$, which is about ${(needed / packageSize).toFixed(1)}. Since $p$ must be a whole number, ${fewer} packages, or ${fewer * packageSize} rolls, are not enough, and ${minPackages} packages, or ${minPackages * packageSize} rolls, are enough. Therefore, the minimum number of packages is ${minPackages}.`;

    return {
      questionText: `For a party, dinner rolls are needed. Dinner rolls are sold in packages of ${packageSize}. What is the minimum number of packages that should be bought for the party if ${needed} dinner rolls are needed?`,
      figureCode: null,
      options: [],
      correctAnswer: minPackages.toString(),
      explanation: explanation
    };
  }
};
