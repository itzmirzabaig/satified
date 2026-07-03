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
    const originalPrice = 20 * getRandomInt(2, 5);   // 40, 60, 80, 100
    const discountPercent = 5 * getRandomInt(2, 7);  // 10, 15, 20, 25, 30, 35
    const discountAmount = (discountPercent * originalPrice) / 100; // exact integer
    const salePrice = originalPrice - discountAmount;

    // Plausible-misconception distractors, chosen so that all four options are
    // provably distinct for every draw in the declared range (verified across
    // all originalPrice x discountPercent combinations):
    //   - amount == salePrice would need discountPercent = 50 (out of range);
    //   - orig-2*amount, amount, and orig+amount are pairwise distinct because
    //     discountPercent is between 10 and 35, so amount is never 0, orig/3, etc.
    const dReturnedDiscount = discountAmount;                    // gave the discount, not the price paid
    const dDoubleDiscount = originalPrice - 2 * discountAmount;  // used twice the discount
    const dAddedDiscount = originalPrice + discountAmount;       // added the discount instead of subtracting

    const optionsData = [
      { text: `\\$${dReturnedDiscount}`, isCorrect: false, reason: `is the size of the discount itself, not the price paid after the discount` },
      { text: `\\$${dDoubleDiscount}`, isCorrect: false, reason: `applies twice the discount, a reduction of ${discountPercent * 2}% off` },
      { text: `\\$${dAddedDiscount}`, isCorrect: false, reason: `adds the discount to the original price instead of subtracting it` },
      { text: `\\$${salePrice}`, isCorrect: true }
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
      explanation: `Choice ${correctOption.letter} is correct. The discount is ${discountPercent}% of \\$${originalPrice}, which is \\$${discountAmount}. Subtracting the discount from the original price gives \\$${originalPrice} - \\$${discountAmount} = \\$${salePrice}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
