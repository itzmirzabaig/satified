import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1c2f50a6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [discount: 20%, original price: $50]
 * - Difficulty factors: [Discount calculation, two methods possible]
 * - Distractor patterns: [12 = random, 30 = 40% off, 36 = miscalc]
 * - Constraints: [Clean dollar amounts]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1c2f50a6 = {
  metadata: {
    // id: "1c2f50a6",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const discountPercent = getRandomInt(15, 35);
    const originalPrice = getRandomInt(30, 80);
    const discountAmount = Math.round((discountPercent / 100) * originalPrice);
    const salePrice = originalPrice - discountAmount;

    const distractorA = getRandomInt(10, 20);
    const distractorB = originalPrice - Math.round((discountPercent * 2 / 100) * originalPrice);
    const distractorC = originalPrice - Math.round((discountPercent * 0.7 / 100) * originalPrice);

    const optionsData = [
      { text: `$${distractorA}`, isCorrect: false, reason: "might result from a random guess" },
      { text: `$${distractorB}`, isCorrect: false, reason: "would represent a discount of ${discountPercent * 2}% off" },
      { text: `$${distractorC}`, isCorrect: false, reason: "might be a miscalculation of the percentage" },
      { text: `$${salePrice}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `During a sale, the original prices of all the items in a clothing store have been reduced by $${discountPercent}%. What is the sale price of a jacket with an original price of $\$${originalPrice}$ ?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${salePrice}`,
      explanation: `Choice ${correctOption.letter} is correct. First calculate the discount: $$${originalPrice} \\times ${discountPercent}\\% = $$${discountAmount}. Then subtract from the original price: $$${originalPrice} - $$${discountAmount} = $$${salePrice}. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 34e18ce4
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 350, percentage: 4%]
 * - Difficulty factors: [Small percentage calculation]
 * - Distractor patterns: [4 = raw percentage, 70 = 20%, 346 = 350-4]
 * - Constraints: [Result must be integer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */