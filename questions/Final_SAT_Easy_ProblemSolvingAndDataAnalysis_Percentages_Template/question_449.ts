import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 449
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [price: $20 (double-digit), tax rate: 5% (single-digit percentage)]
 * - Difficulty factors: [Sales tax calculation, decimal multiplication]
 * - Distractor patterns: [20.05 = decimal error, 20.50 = half percentage, 25.00 = added 5 instead of 5%]
 * - Constraints: [Tax rate < 10% for simple calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_449 = {
  metadata: {
    id: "449",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const price = getRandomInt(15, 50);
    const taxRate = getRandomInt(4, 9);
    const taxAmount = (price * taxRate) / 100;
    const totalCost = price + taxAmount;
    const formattedTotal = totalCost.toFixed(2);
    const formattedTax = taxAmount.toFixed(2);
    const halfRate = taxRate / 2;

    // Distractors (all provably distinct from the correct total across the
    // full range 15<=price<=50, 4<=taxRate<=9 — verified: no collisions):
    //  A: treats the tax as $tax_rate/100 in dollars (decimal misplacement)
    //  B: uses half the tax rate
    //  D: adds the tax rate as dollars instead of a percentage
    const distractorA = (price + taxRate / 100).toFixed(2);
    const distractorB = (price + price * halfRate / 100).toFixed(2);
    const distractorD = (price + taxRate).toFixed(2);

    const optionsData = [
      { text: `\\$${distractorA}`, isCorrect: false, reason: `results from adding only \\$${(taxRate / 100).toFixed(2)} of tax (misplacing the decimal) instead of computing ${taxRate}% of \\$${price}` },
      { text: `\\$${distractorB}`, isCorrect: false, reason: `would be the result if the tax rate were ${halfRate}% instead of ${taxRate}%` },
      { text: `\\$${formattedTotal}`, isCorrect: true, reason: "" },
      { text: `\\$${distractorD}`, isCorrect: false, reason: `results from adding ${taxRate} dollars to the price (treating ${taxRate}% as \\$${taxRate}) instead of computing the percentage` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The cost of a certain shirt is \\$${price} before a ${taxRate}% sales tax is added. What is the total cost, including sales tax, to purchase the shirt?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `\\$${formattedTotal}`,
      explanation: `Choice ${correctOption.letter} is correct. The sales tax is ${taxRate}% of \\$${price}, which is \\$${formattedTax}. Adding this to the original price gives \\$${price} + \\$${formattedTax} = \\$${formattedTotal}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
