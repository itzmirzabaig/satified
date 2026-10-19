import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 295
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shirt: $15, pants: $25, budget: $120]
 * - Difficulty factors: [Cost modeling, "at most" interpretation]
 * - Distractor patterns: [A=correct with <=, B=wrong sign >=, C=swapped prices, D=swapped prices with wrong sign]
 * - Constraints: [Must match price to correct variable]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_295 = {
  metadata: {
    id: "295",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const shirtPrice = getRandomInt(10, 25);
    // Pants must cost a different amount than shirts, otherwise the
    // "swapped prices" distractors become identical to the correct option
    // (duplicate options + ambiguous correctAnswer resolution). Bounded redraw.
    let pantsPrice = getRandomInt(20, 40);
    let tries = 0;
    while (pantsPrice === shirtPrice && tries++ < 50) {
      pantsPrice = getRandomInt(20, 40);
    }
    const budget = getRandomInt(80, 150);

    const optionsData = [
      { text: `$${shirtPrice}s + ${pantsPrice}p \\leq ${budget}$`, isCorrect: true },
      { text: `$${shirtPrice}s + ${pantsPrice}p \\geq ${budget}$`, isCorrect: false, reason: `it says the customer spends at least \\$${budget}; spending at most \\$${budget} means the total is less than or equal to ${budget}` },
      { text: `$${pantsPrice}s + ${shirtPrice}p \\leq ${budget}$`, isCorrect: false, reason: `it multiplies the number of shirts by ${pantsPrice}, the price of a pair of pants, and the number of pairs of pants by ${shirtPrice}, the price of a shirt` },
      { text: `$${pantsPrice}s + ${shirtPrice}p \\geq ${budget}$`, isCorrect: false, reason: `it reverses the two prices and says the customer spends at least \\$${budget} instead of at most \\$${budget}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. A customer buys $s$ shirts at \\$${shirtPrice} each and $p$ pairs of pants at \\$${pantsPrice} each, so the total cost is $${shirtPrice}s + ${pantsPrice}p$. Spending at most \\$${budget} means this total can be no more than the budget: $${shirtPrice}s + ${pantsPrice}p \\leq ${budget}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A clothing store is having a sale on shirts and pants. During the sale, the cost of each shirt is \\$${shirtPrice} and the cost of each pair of pants is \\$${pantsPrice}. A customer can spend at most \\$${budget} at the store. If the customer buys $s$ shirts and $p$ pairs of pants, which of the following must be true?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
