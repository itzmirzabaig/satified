import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a04190b7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: 4.51, 6.07, total: 896.86]
 * - Difficulty factors: [Interpreting coefficient as unit price]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Direct interpretation]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_a04190b7 = {
  metadata: {
    // id: "a04190b7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const priceSmall = (getRandomInt(300, 600) / 100).toFixed(2);
    const priceLarge = (parseFloat(priceSmall) + getRandomInt(1, 3)).toFixed(2);
    const total = (parseFloat(priceSmall) * getRandomInt(50, 100) + parseFloat(priceLarge) * getRandomInt(50, 100)).toFixed(2);
    
    return {
      questionText: `A store sells two different-sized containers of blueberries. The store's sales of these blueberries totaled ${total} dollars last month. The equation $${priceSmall} x+${priceLarge} y=${total}$ represents this situation, where \\( x \\) is the number of smaller containers sold and \\( y \\) is the number of larger containers sold. According to the equation, what is the price, in dollars, of each smaller container?`,
      figureCode: null,
      options: null,
      correctAnswer: priceSmall,
      explanation: `The correct answer is ${priceSmall}. It's given that the equation $${priceSmall} x+${priceLarge} y=${total}$ represents this situation, where \\( x \\) is the number of smaller containers sold, \\( y \\) is the number of larger containers sold, and ${total} is the store's total sales. Therefore, $${priceSmall}x$ represents the store's sales from smaller containers, so each smaller container costs $${priceSmall}.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-00b9bd37.ts
/**
 * Question ID: 00b9bd37
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercepts: (0,35), (90,0), slope: -7/18]
 * - Difficulty factors: [Finding equation from intercepts]
 * - Distractor patterns: [A/C: slope-intercept wrong values, B: correct, D: swapped coefficients]
 * - Constraints: [Clean integer coefficients in standard form]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs line plot with intercepts]
 */
