import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 040f2a84
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [11.70, 80%, 30%]
 * - Difficulty factors: [Chained percentage reversals, multi-step]
 * - Distractor patterns: [Wrong base for each percentage]
 * - Constraints: [Sale = 0.2 * 11.70, sale = 1.3 * cost, so cost = sale/1.3]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - word problem]
 */

export const generator_040f2a84 = {
  metadata: {
    // id: "040f2a84",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const regularPrice = Math.round(getRandomInt(80, 200) / 10) / 10; // $8.00 to $20.00
    const discountPct = getRandomInt(60, 90); // Discount off regular
    const markupPct = getRandomInt(20, 50); // Sale price is this % greater than cost
    
    // STEP 2: Calculate prices
    const salePrice = Math.round(regularPrice * (1 - discountPct / 100) * 100) / 100;
    const storeCost = Math.round(salePrice / (1 + markupPct / 100) * 100) / 100;
    
    // Format numbers for display to avoid LaTeX issues
    const discountDecimal = (1 - discountPct / 100).toFixed(2);
    const markupDecimal = (1 + markupPct / 100).toFixed(2);
    
    return {
      questionText: `The regular price of a shirt at a store is \\$${regularPrice.toFixed(2)}. The sale price of the shirt is $${discountPct}\\%$ less than the regular price, and the sale price is $${markupPct}\\%$ greater than the store's cost for the shirt. What was the store's cost, in dollars, for the shirt? (Disregard the \\$ sign when entering your answer. For example, if your answer is \\$4.97, enter 4.97)`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: storeCost.toFixed(2),
      explanation: `The sale price is $${discountPct}\\%$ less than \\$${regularPrice.toFixed(2)}, so sale price $= ${regularPrice.toFixed(2)} \\times ${discountDecimal} = ${salePrice.toFixed(2)}$. This sale price is $${markupPct}\\%$ greater than cost, so $${salePrice.toFixed(2)} = ${markupDecimal} \\times \\text{cost}$. Therefore, $\\text{cost} = \\frac{${salePrice.toFixed(2)}}{${markupDecimal}} = ${storeCost.toFixed(2)}$.`
    };
  }
};