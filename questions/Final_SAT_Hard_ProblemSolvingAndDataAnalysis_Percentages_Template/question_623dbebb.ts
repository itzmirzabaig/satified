import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 623dbebb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5.00, 270%, 70% (money, percentages)]
 * - Difficulty factors: [Multi-step percentage calculations, "off" interpretation]
 * - Distractor patterns: [Percentage of wrong base, forgetting to subtract]
 * - Constraints: [Consumer price = 2.7 * 5, Discounted = 0.3 * consumer price]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - word problem with percentages]
 */

export const generator_623dbebb = {
  metadata: {
    // id: "623dbebb",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const wholesalePrice = getRandomInt(3, 12); // Purchase price
    const markupPct = getRandomInt(200, 350); // Markup percentage (200-350%)
    const discountPct = getRandomInt(60, 85); // Discount off consumer price
    
    // STEP 2: Calculate prices
    const consumerPrice = wholesalePrice * (markupPct / 100);
    const discountedPrice = Math.round(consumerPrice * (1 - discountPct / 100) * 100) / 100;
    
    return {
      questionText: `A reseller buys certain books for a purchase price of ${wholesalePrice.toFixed(2)} dollars each and then marks them each for sale at a consumer price that is ${markupPct}% of the purchase price. After 4 months, any remaining books not yet sold are marked at a discounted price that is ${discountPct}% off the consumer price. What is the discounted price of each of the remaining books, in dollars?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: discountedPrice.toString(),
      explanation: `The consumer price is ${markupPct}% of $${wholesalePrice.toFixed(2)}$, which is ${markupPct/100} × $${wholesalePrice.toFixed(2)} = $${consumerPrice.toFixed(2)}$. The discount is ${discountPct}% off this price, so the discounted price is (1 - ${discountPct/100}) × $${consumerPrice.toFixed(2)} = ${1 - discountPct/100} × $${consumerPrice.toFixed(2)} = $${discountedPrice.toFixed(2)}$.`
    };
  }
};

/**
 * Question ID: 2afd3cec
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20%, 360 marbles]
 * - Difficulty factors: [Reverse percentage problem, careful reading required]
 * - Distractor patterns: [20% of remaining, using 360 as total, wrong percentage]
 * - Constraints: [80% of original = 360, so original = 450, removed = 90]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */