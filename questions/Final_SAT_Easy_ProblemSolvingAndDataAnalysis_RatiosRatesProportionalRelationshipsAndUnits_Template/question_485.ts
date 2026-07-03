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
    const costPerPound = getRandomInt(8, 15);
    const pounds = getRandomInt(4, 8);
    const totalCost = costPerPound * pounds;

    const questionText = `A product costs ${costPerPound}.00 dollars per pound. What is the cost, in dollars, for ${pounds} pounds of the product?`;
    const explanation = `The correct answer is ${totalCost}. The cost for $${pounds}$ pounds is $\\left(\\frac{${costPerPound}.00 \\text{ dollars}}{1 \\text{ pound}}\\right) (${pounds} \\text{ pounds}) = ${totalCost}.00$ dollars.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: totalCost.toString(),
      explanation: explanation
    };
  }
};
