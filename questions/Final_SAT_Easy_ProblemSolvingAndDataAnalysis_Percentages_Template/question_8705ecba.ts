import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8705ecba
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [price: $20 (double-digit), tax rate: 5% (single-digit percentage)]
 * - Difficulty factors: [Sales tax calculation, decimal multiplication]
 * - Distractor patterns: [20.05 = decimal error, 20.50 = half percentage, 25.00 = added 5 instead of 5%]
 * - Constraints: [Tax rate < 10% for simple calculation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8705ecba = {
  metadata: {
    // id: "8705ecba",
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

    const distractorA = (price + (taxRate / 100)).toFixed(2);
    const distractorB = (price + (price * (taxRate / 2) / 100)).toFixed(2);
    const distractorD = (price + taxRate).toFixed(2);

    const optionsData = [
      { text: `$${distractorA}`, isCorrect: false, reason: "results from calculating the tax as $${(taxRate/100).toFixed(2)} or misplacing the decimal, rather than calculating ${taxRate}% of $${price}" },
      { text: `$${distractorB}`, isCorrect: false, reason: "would be the result if the tax was calculated as ${(taxRate/2)}%, not ${taxRate}%" },
      { text: `$${formattedTotal}`, isCorrect: true },
      { text: `$${distractorD}`, isCorrect: false, reason: "results from simply adding ${taxRate} to the original price (treating ${taxRate}% as ${taxRate}), rather than calculating the percentage" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The cost of a certain shirt is ${price} before a ${taxRate}% sales tax is added. What is the total cost, including sales tax, to purchase the shirt?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${formattedTotal}`,
      explanation: `Choice ${correctOption.letter} is correct. The sales tax is ${taxRate}% of $$${price}, which is $${taxAmount.toFixed(2)}. Adding this to the original price gives $$${price} + $${taxAmount.toFixed(2)} = $${formattedTotal}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 191d167b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 200 (triple-digit), percentage: 147% (over 100%)]
 * - Difficulty factors: [Percentage over 100%, multiplication with decimals]
 * - Distractor patterns: [247 = added 47, 347 = miscalculation, 394 = calculation error]
 * - Constraints: [Result must be clean integer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */