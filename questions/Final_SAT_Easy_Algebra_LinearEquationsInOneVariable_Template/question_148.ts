import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 148
*
* ORIGINAL ANALYSIS:
* - Number ranges: [buyPrice: 5-15, numBought: 2-5, rentalPrice: 1-4, numRentals: 10-30]
* - Difficulty factors: [Multi-step word problem, decimal arithmetic]
* - Constraints: [Clean integer result]
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
    // Redraw until all four option values are distinct. The only possible
    // collision is floor(giftCard / rentalPrice) === numRentals + 10, which
    // needs floor(spent / rentalPrice) === 10, so this converges immediately.
    let buyPrice = 5, numBought = 2, rentalPrice = 1, numRentals = 10;
    let spent = 10, remaining = 10, giftCard = 20;
    let distractorA = 5, distractorC = 20, distractorD = 20;
    let tries = 0;
    do {
      buyPrice = getRandomInt(5, 15);
      numBought = getRandomInt(2, 5);
      rentalPrice = getRandomInt(1, 4);
      numRentals = getRandomInt(10, 30);
      spent = buyPrice * numBought;
      remaining = rentalPrice * numRentals;
      giftCard = remaining + spent;

      distractorA = numRentals - 5;
      distractorC = numRentals + 10;
      distractorD = Math.floor(giftCard / rentalPrice);
      tries++;
    } while (
      new Set([numRentals, distractorA, distractorC, distractorD]).size < 4 &&
      tries < 50
    );

    // Deterministic fallback: D only ever collides with C, so shifting it by 1
    // (still far above the correct answer) restores uniqueness.
    if (distractorD === distractorC) {
      distractorD = distractorD + 1;
    }

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "it results from a subtraction error when finding the remaining balance" },
      { text: numRentals.toString(), isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "it results from an arithmetic error in the final division" },
      { text: distractorD.toString(), isCorrect: false, reason: "it results from dividing the entire gift card balance by the rental price, ignoring the movies bought" }
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
      explanation: `First, calculate the amount spent on purchases: $${numBought} \\times ${buyPrice} = ${spent}$. The remaining balance is $${giftCard} - ${spent} = ${remaining}$. The number of rentals is $${remaining} \\div ${rentalPrice} = ${numRentals}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
