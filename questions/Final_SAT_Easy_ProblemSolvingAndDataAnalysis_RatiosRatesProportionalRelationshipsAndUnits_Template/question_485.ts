import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 485
*
* ORIGINAL ANALYSIS:
* - Number ranges: [cost: $11.00/pound, amount: 6 pounds, answer: $66]
* - Difficulty factors: [Unit rate multiplication, decimal handling]
* - Distractor patterns: [None - fill in blank, common errors: 17 (added), 66 (correct), 660 (extra 0), 5 (subtracted)]
* - Constraints: [Simple multiplication]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/

export const generator_485 = {
  metadata: {
    id: "485",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Prices are written as money ($13.00 per pound); the stem used to say
    // "13.00 dollars per pound." A price ending in .50 comes with an even
    // number of pounds, so the total is still a whole number of dollars.
    const half = getRandomInt(0, 1) === 1;
    const costPerPound = getRandomInt(8, 15) + (half ? 0.5 : 0);
    const pounds = half ? 2 * getRandomInt(2, 4) : getRandomInt(4, 8);
    const totalCost = costPerPound * pounds;
    const price = costPerPound.toFixed(2);

    const questionText = `A product costs \\$${price} per pound. What is the cost, in dollars, for ${pounds} pounds of the product?`;
    const explanation = `The correct answer is ${totalCost}. The cost for ${pounds} pounds is $\\left(\\frac{${price} \\text{ dollars}}{1 \\text{ pound}}\\right)(${pounds} \\text{ pounds}) = ${totalCost.toFixed(2)}$ dollars, or \\$${totalCost.toFixed(2)}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: totalCost.toString(),
      explanation: explanation
    };
  }
};
