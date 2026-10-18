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
    const numBins = getRandomInt(5, 15);
    const unitPrice = getRandomInt(5, 15);
    const originalTotal = unitPrice * numBins; // at least 25
    // The coupon must take a positive amount off, so the final cost is drawn
    // strictly below the original total.
    const finalPrice = getRandomInt(20, Math.min(50, originalTotal - 1));
    const discount = originalTotal - finalPrice;

    return {
      questionText: `A customer bought storage bins that were each the same price. They used a coupon for \\$${discount} off the entire purchase. The cost for the entire purchase after using the coupon was \\$${finalPrice}. If they bought ${numBins} storage bins, what was the original price, in dollars, for one storage bin?`,
      figureCode: null,
      options: [],
      correctAnswer: unitPrice.toString(),
      explanation: `The original cost of the entire purchase, in dollars, is the cost after the coupon plus the amount of the coupon: $${finalPrice} + ${discount} = ${originalTotal}$. Since the customer bought ${numBins} bins that were each the same price, the original price, in dollars, for one storage bin is $\\frac{${originalTotal}}{${numBins}} = ${unitPrice}$.`
    };
  }
};
