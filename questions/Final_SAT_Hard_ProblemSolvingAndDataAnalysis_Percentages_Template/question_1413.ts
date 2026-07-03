import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1413
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5.00, 270%, 70% (money, percentages)]
 * - Difficulty factors: [Multi-step percentage calculations, "off" interpretation]
 * - Distractor patterns: [Percentage of wrong base, forgetting to subtract]
 * - Constraints: [Consumer price = 2.7 * 5, Discounted = 0.3 * consumer price]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - word problem with percentages]
 */

export const generator_1413 = {
  metadata: {
    id: "1413",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const wholesalePrice = getRandomInt(3, 12); // Purchase price (whole dollars)
    const markupPct = getRandomInt(200, 350); // Consumer price as % of purchase price
    const discountPct = getRandomInt(60, 85); // Discount off the consumer price

    // STEP 2: Calculate prices. wholesalePrice and markupPct are integers, so
    // consumerPrice has at most 2 decimal places (exact). The retained fraction
    // after the discount is (100 - discountPct)/100, also exact to 2 places.
    const retainPct = 100 - discountPct; // integer percent of consumer price kept
    const retainDecimalStr = (retainPct / 100).toFixed(2); // e.g. "0.30"
    const consumerPrice = Math.round(wholesalePrice * markupPct) / 100; // = W * markup/100, exact 2dp
    const discountedPrice = Math.round(consumerPrice * retainPct) / 100; // round to cents, exact

    return {
      questionText: `A reseller buys certain books for a purchase price of ${wholesalePrice.toFixed(2)} dollars each and then marks them each for sale at a consumer price that is ${markupPct}% of the purchase price. After 4 months, any remaining books not yet sold are marked at a discounted price that is ${discountPct}% off the consumer price. What is the discounted price of each of the remaining books, in dollars?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: discountedPrice.toString(),
      explanation: `The consumer price is ${markupPct}% of the purchase price, or ${(markupPct / 100).toFixed(2)} times \\$${wholesalePrice.toFixed(2)}, which equals \\$${consumerPrice.toFixed(2)}. A discount of ${discountPct}% off leaves ${retainPct}% of the consumer price, so the discounted price is ${retainDecimalStr} times \\$${consumerPrice.toFixed(2)}, which equals \\$${discountedPrice.toFixed(2)}. Therefore, the discounted price of each remaining book is \\$${discountedPrice.toFixed(2)}.`
    };
  }
};
