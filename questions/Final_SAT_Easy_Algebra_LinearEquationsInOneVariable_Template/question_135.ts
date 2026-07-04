import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 135
*
* ORIGINAL ANALYSIS:
* - Number ranges: [numBins: 5-15, unitPrice: 5-15, finalPrice: 20-50]
* - Difficulty factors: [Multi-step word problem, reverse operations]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_135 = {
  metadata: {
    id: "135",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let numBins = getRandomInt(5, 15);
    let unitPrice = getRandomInt(5, 15);
    let originalTotal = unitPrice * numBins;
    let finalPrice = getRandomInt(20, 50);
    // The discount must be a positive amount for the coupon story to make sense,
    // so keep the final price strictly below the original total. Redraw (bounded).
    let tries = 0;
    while (originalTotal - finalPrice < 1 && tries++ < 50) {
      numBins = getRandomInt(5, 15);
      unitPrice = getRandomInt(5, 15);
      originalTotal = unitPrice * numBins;
      finalPrice = getRandomInt(20, 50);
    }
    const discount = originalTotal - finalPrice;

    return {
      questionText: `A customer bought storage bins that were each the same price. They used a coupon for ${discount} off the entire purchase. The cost for the entire purchase after using the coupon was ${finalPrice}. If they bought ${numBins} storage bins, what was the original price, in dollars, for one storage bin?`,
      figureCode: null,
      options: [],
      correctAnswer: unitPrice.toString(),
      explanation: `The original total before the discount is the final price plus the discount amount: ${finalPrice} + ${discount} = ${originalTotal}. The price for one storage bin is found by dividing the original total by the number of bins: ${originalTotal} / ${numBins} = ${unitPrice}.`
    };
  }
};
