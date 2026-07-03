import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 499
*
* ORIGINAL ANALYSIS:
* - Number ranges: [total cost: 27 (double-digit), unit cost: 3 (single-digit), answer: 9]
* - Difficulty factors: [Division, unit rate understanding]
* - Distractor patterns: [None - fill in blank, but common errors: 81 (multiplied), 24 (subtracted), 30 (added), 9 (correct)]
* - Constraints: [total cost must be divisible by unit cost for integer answer]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None - word problem]
*/

export const generator_499 = {
  metadata: {
    id: "499",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const unitCost = getRandomInt(2, 5);
    const quantity = getRandomInt(4, 12);
    const totalCost = unitCost * quantity;
    const poundsPurchased = totalCost / unitCost;

    const questionText = `A customer spent ${totalCost} to purchase oranges at ${unitCost} per pound. How many pounds of oranges did the customer purchase?`;
    const explanation = `The correct answer is ${poundsPurchased}. It's given that the customer spent $${totalCost} to purchase oranges at $${unitCost} per pound. Therefore, the number of pounds of oranges the customer purchased is $${totalCost}\\left(\\frac{1 \\text{ pound}}{${unitCost}}\\right)$, or ${poundsPurchased} pounds.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: poundsPurchased.toString(),
      explanation: explanation
    };
  }
};
