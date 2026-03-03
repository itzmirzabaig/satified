import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 84d0d07e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shirt: $15, pants: $25, budget: $120]
 * - Difficulty factors: [Cost modeling, "at most" interpretation]
 * - Distractor patterns: [A=correct with <=, B=wrong sign >=, C=swapped prices, D=swapped prices with wrong sign]
 * - Constraints: [Must match price to correct variable]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_84d0d07e = {
  metadata: {
    // id: "84d0d07e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const shirtPrice = getRandomInt(10, 25);
    const pantsPrice = getRandomInt(20, 40);
    const budget = getRandomInt(80, 150);

    const optionsData = [
      { text: `$${shirtPrice}s + ${pantsPrice}p \\leq ${budget}$`, isCorrect: true },
      { text: `$${shirtPrice}s + ${pantsPrice}p \\ge ${budget}$`, isCorrect: false, reason: "uses 'at least' instead of 'at most'" },
      { text: `$${pantsPrice}s + ${shirtPrice}p \\leq ${budget}$`, isCorrect: false, reason: "swaps the prices for shirts and pants" },
      { text: `$${pantsPrice}s + ${shirtPrice}p \\ge ${budget}$`, isCorrect: false, reason: "swaps prices and uses wrong inequality direction" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Geoff buys $s$ shirts at $${shirtPrice} each and $p$ pants at $${pantsPrice} each, spending at most $${budget}: $${shirtPrice}s + ${pantsPrice}p \\leq ${budget}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `A clothing store is having a sale on shirts and pants. During the sale, the cost of each shirt is ${shirtPrice} and the cost of each pair of pants is ${pantsPrice}. Geoff can spend at most ${budget} at the store. If Geoff buys $s$ shirts and $p$ pairs of pants, which of the following must be true?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: c9355dec
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4/5, y-intercept: -7]
 * - Difficulty factors: [Graph to equation conversion, slope calculation from points]
 * - Distractor patterns: [A=correct y>=2/3x-6, B=wrong intercept sign, C=wrong intercept value, D=wrong intercept sign and value]
 * - Constraints: [Must calculate slope from two points on line]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs: linear inequality y >= (4/5)x - 7]
 */