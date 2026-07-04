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
    const keepPct = 100 - discountOff; // percent of retail the customer pays

    // STEP 2: Calculate prices with EXACT integer-cent arithmetic.
    // wholesalePrice, markupPct, discountOff are integers, so the retail price
    // in cents (wholesalePrice * markupPct) and the discounted price in cents
    // are computed without float underflow. Dividing an integer by 100 and
    // rounding gives a correct half-up rounding to the nearest cent — the naive
    // form retail*(1-d/100) rounds half-cent products DOWN (e.g. 38.50*0.23 =
    // 8.85499… instead of 8.855) and marks the true answer 8.86 wrong.
    const retailPrice = (wholesalePrice * markupPct) / 100; // exact to the cent
    const discountedPrice = Math.round(wholesalePrice * markupPct * keepPct / 100) / 100;

    const retailStr = retailPrice.toFixed(2);
    const discountedStr = discountedPrice.toFixed(2);
    const keepFactor = keepPct / 100; // e.g. 0.23

    return {
      questionText: `A gift shop buys souvenirs at a wholesale price of \\$${wholesalePrice.toFixed(2)} each and resells them each at a retail price that is ${markupPct}% of the wholesale price. At the end of the season, any remaining souvenirs are marked at a discounted price that is ${discountOff}% off the retail price. What is the discounted price of each remaining souvenir, in dollars?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: discountedPrice.toString(),
      explanation: `The retail price is ${markupPct}% of \\$${wholesalePrice.toFixed(2)}, so the retail price $= ${wholesalePrice.toFixed(2)} \\times ${markupPct / 100} = ${retailStr}$ dollars. A discount of ${discountOff}% off means the customer pays $(100 - ${discountOff})\\% = ${keepPct}\\%$ of the retail price, so the discounted price $= ${retailStr} \\times ${keepFactor} = ${discountedStr}$ dollars (rounded to the nearest cent).`
    };
  }
};
