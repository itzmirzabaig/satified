import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 705
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [smaller price 3.00-6.00, larger price = smaller + 1..3, integer counts]
 * - Difficulty factors: [Interpreting a coefficient as a unit price]
 * - Distractor patterns: [Not applicable - fill in the blank]
 * - Constraints: [Direct interpretation; clean 2-decimal money values]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 *
 * MATH: total = priceSmall*nSmall + priceLarge*nLarge. Both prices carry exactly
 * two decimals and the counts are integers, so total has at most two decimals
 * (no float artifact). The coefficient of x IS the smaller-container price, so
 * the fill-in answer is priceSmall. All currency is written as \$ (escaped) and
 * the equation lives inside \( ... \) so there is never a stray, unbalanced $.
 */

export const generator_705 = {
  metadata: {
    id: "705",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate clean two-decimal money parameters.
    const priceSmall = (getRandomInt(300, 600) / 100).toFixed(2);
    const priceLarge = (parseFloat(priceSmall) + getRandomInt(1, 3)).toFixed(2);
    const nSmall = getRandomInt(50, 100);
    const nLarge = getRandomInt(50, 100);
    const total = (parseFloat(priceSmall) * nSmall + parseFloat(priceLarge) * nLarge).toFixed(2);

    // The equation, kept entirely inside math delimiters (no bare $).
    const equation = `${priceSmall}x + ${priceLarge}y = ${total}`;

    return {
      questionText: `A store sells two different-sized containers of blueberries. The store's sales of these blueberries totaled \\$${total} last month. The equation \\( ${equation} \\) represents this situation, where \\( x \\) is the number of smaller containers sold and \\( y \\) is the number of larger containers sold. According to the equation, what is the price, in dollars, of each smaller container?`,
      figureCode: null,
      options: [],
      correctAnswer: priceSmall,
      explanation: `The correct answer is ${priceSmall}. In the equation \\( ${equation} \\), \\( x \\) is the number of smaller containers sold, \\( y \\) is the number of larger containers sold, and ${total} is the store's total sales in dollars. The term \\( ${priceSmall}x \\) represents the sales from the smaller containers, so the coefficient of \\( x \\) is the price of one smaller container. Therefore, each smaller container costs \\$${priceSmall}.`
    };
  }
};
