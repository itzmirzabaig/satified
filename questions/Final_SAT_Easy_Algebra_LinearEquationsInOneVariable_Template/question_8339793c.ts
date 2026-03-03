import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 8339793c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [numBins: 5-15, unitPrice: 5-15, finalPrice: 20-50]
* - Difficulty factors: [Multi-step word problem, reverse operations]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_8339793c = {
  metadata: {
    // id: "8339793c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numBins = getRandomInt(5, 15);
    const unitPrice = getRandomInt(5, 15);
    const originalTotal = unitPrice * numBins;
    const finalPrice = getRandomInt(20, 50);
    const discount = originalTotal - finalPrice;

    return {
      questionText: `Nasir bought storage bins that were each the same price. He used a coupon for ${discount} off the entire purchase. The cost for the entire purchase after using the coupon was ${finalPrice}. If Nasir bought ${numBins} storage bins, what was the original price, in dollars, for one storage bin?`,
      figureCode: null,
      options: null,
      correctAnswer: unitPrice.toString(),
      explanation: `The original total before the discount is the final price plus the discount amount: ${finalPrice} + ${discount} = ${originalTotal}. The price for one storage bin is found by dividing the original total by the number of bins: ${originalTotal} / ${numBins} = ${unitPrice}.`
    };
  }
};

/**
* Question ID: 550b352c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-8, const1: 2-10, rightSide: 10-30]
* - Difficulty factors: [Number of solutions concept]
* - Distractor patterns: [A: no solution confusion, C: wrong count, D: infinite confusion]
* - Constraints: [Linear equation always has exactly one solution]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
