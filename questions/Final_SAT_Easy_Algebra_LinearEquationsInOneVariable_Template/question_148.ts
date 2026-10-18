import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 148
*
* ORIGINAL ANALYSIS:
* - Number ranges: [buyPrice: 5-15 (a multiple of rentalPrice), numBought: 2-5,
*   rentalPrice: 2-4, numRentals: 10-30]
* - Difficulty factors: [Multi-step word problem]
* - Distractor patterns: [remaining balance in dollars, dividing the whole card
*   by the rental price, subtracting the price of only one purchased movie]
* - Constraints: [Clean integer result; redraw until all choices differ]
*
* FIX NOTES:
* Two distractors were numRentals - 5 and numRentals + 10, labeled
* "subtraction error" and "arithmetic error in the final division". Each
* distractor now comes from a real error and is a whole number.
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_148 = {
  metadata: {
    id: "148",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // buyPrice is a multiple of rentalPrice (buyPrice = rentalPrice * k), so
    // every distractor below is a whole number. Redraw until all four differ.
    let rentalPrice = 2, k = 3, buyPrice = 6, numBought = 2, numRentals = 10;
    let values: number[] = [];
    do {
      rentalPrice = getRandomInt(2, 4);
      k = getRandomInt(Math.ceil(5 / rentalPrice), Math.floor(15 / rentalPrice));
      buyPrice = rentalPrice * k;
      numBought = getRandomInt(2, 5);
      numRentals = getRandomInt(10, 30);
      values = [numRentals, rentalPrice * numRentals, numRentals + k * numBought, numRentals + k * (numBought - 1)];
    } while (new Set(values).size !== 4);
    const spent = buyPrice * numBought;
    const remaining = rentalPrice * numRentals;
    const giftCard = remaining + spent;

    const optionsData = [
      { text: numRentals.toString(), isCorrect: true, reason: '' },
      { text: values[1].toString(), isCorrect: false, reason: `it is the remaining balance, in dollars, not the number of movies she can rent` },
      { text: values[2].toString(), isCorrect: false, reason: `it results from dividing the entire \\$${giftCard} balance by \\$${rentalPrice}, ignoring the movies she bought` },
      { text: values[3].toString(), isCorrect: false, reason: `it results from subtracting the price of only one purchased movie, \\$${buyPrice}, from \\$${giftCard} instead of the cost of all ${numBought} movies` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A customer has a \\$${giftCard} gift card. She buys ${numBought} movies at \\$${buyPrice} each, then spends the rest of her balance renting movies at \\$${rentalPrice} each. How many movies can she rent?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: numRentals.toString(),
      explanation: `Choice ${correctLetter} is correct. The customer spends $${numBought}(${buyPrice}) = ${spent}$ dollars buying movies, so the remaining balance is $${giftCard} - ${spent} = ${remaining}$ dollars. Since each rental costs \\$${rentalPrice}, she can rent $\\frac{${remaining}}{${rentalPrice}} = ${numRentals}$ movies. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
