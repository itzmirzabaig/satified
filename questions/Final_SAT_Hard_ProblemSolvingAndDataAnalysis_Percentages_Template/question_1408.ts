import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1408
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [7.00, 290%, 80%]
 * - Difficulty factors: [Multi-step percentage, "off" interpretation]
 * - Distractor patterns: [Same as 623dbebb]
 * - Constraints: [Retail = 2.9 * 7, Discounted = 0.2 * retail]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - word problem]
 */

export const generator_1408 = {
  metadata: {
    id: "1408",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const wholesalePrice = getRandomInt(4, 15);
    const markupPct = getRandomInt(220, 350);
    const discountOff = getRandomInt(70, 90);
    
    // STEP 2: Calculate prices
    const retailPrice = wholesalePrice * (markupPct / 100);
    const discountedPrice = Math.round(retailPrice * (1 - discountOff / 100) * 100) / 100;
    
    return {
      questionText: `A gift shop buys souvenirs at a wholesale price of ${wholesalePrice.toFixed(2)} dollars each and resells them each at a retail price that is ${markupPct}% of the wholesale price. At the end of the season, any remaining souvenirs are marked at a discounted price that is ${discountOff}% off the retail price. What is the discounted price of each remaining souvenir, in dollars?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: discountedPrice.toString(),
      explanation: `The retail price is ${markupPct}% of $${wholesalePrice.toFixed(2)}, which is $${wholesalePrice.toFixed(2)} × ${markupPct/100} = $${retailPrice.toFixed(2)}$. The discounted price is ${discountOff}% off, meaning $(100 - ${discountOff})\\% = ${100 - discountOff}% of retail: $${retailPrice.toFixed(2)} × ${(100 - discountOff)/100} = $${discountedPrice.toFixed(2)}$.`
    };
  }
};
