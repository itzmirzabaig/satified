import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 436
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [discount: 20%, original price: $50]
 * - Difficulty factors: [Discount calculation, two methods possible]
 * - Distractor patterns: [12 = random, 30 = 40% off, 36 = miscalc]
 * - Constraints: [Clean dollar amounts]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_436 = {
  metadata: {
    id: "436",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first: originalPrice is a multiple of 20 and discountPercent is a
    // multiple of 5, so originalPrice * discountPercent is divisible by 100 and
    // the discount amount (and sale price) are always exact integers. This makes
    // the explanation's "original x percent = discount" exact for every draw.
    // 100 is left out: there, subtracting the percent as dollars would give
    // the sale price.
    const originalPrice = [40, 60, 80, 120][getRandomInt(0, 3)];
    const discountPercent = 5 * getRandomInt(2, 7);  // 10, 15, 20, 25, 30, 35
    const discountAmount = (discountPercent * originalPrice) / 100; // exact integer
    const salePrice = originalPrice - discountAmount;

    // Wrong choices: the discount itself, the discount added instead of
    // subtracted, and the percent subtracted as if it were dollars. The last
    // replaced "applied twice the discount," an unlikely slip.
    const optionsData = [
      { text: `\\$${salePrice}`, isCorrect: true, reason: '' },
      { text: `\\$${discountAmount}`, isCorrect: false, reason: `\\$${discountAmount} is the amount of the discount, not the sale price` },
      { text: `\\$${originalPrice + discountAmount}`, isCorrect: false, reason: `\\$${originalPrice + discountAmount} results from adding the discount to the original price instead of subtracting it` },
      { text: `\\$${originalPrice - discountPercent}`, isCorrect: false, reason: `\\$${originalPrice - discountPercent} results from subtracting ${discountPercent} dollars from the original price instead of ${discountPercent}% of it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `During a sale, the original prices of all the items in a clothing store are reduced by ${discountPercent}%. What is the sale price of a jacket with an original price of \\$${originalPrice}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `\\$${salePrice}`,
      explanation: `Choice ${correctOption.letter} is correct. The discount is ${discountPercent}% of \\$${originalPrice}, which is $${originalPrice} \\times ${discountPercent / 100} = ${discountAmount}$, or \\$${discountAmount}. Subtracting the discount from the original price gives a sale price of $${originalPrice} - ${discountAmount} = ${salePrice}$, or \\$${salePrice}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
