import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: c3989ef8
*
* ORIGINAL ANALYSIS:
* - Number ranges: [buyPrice: 5-15, numBought: 2-5, rentalPrice: 1-4, numRentals: 10-30]
* - Difficulty factors: [Multi-step word problem, decimal arithmetic]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_c3989ef8 = {
  metadata: {
    // id: "c3989ef8",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const buyPrice = getRandomInt(5, 15);
    const numBought = getRandomInt(2, 5);
    const rentalPrice = getRandomInt(1, 4);
    const numRentals = getRandomInt(10, 30);
    const spent = buyPrice * numBought;
    const remaining = rentalPrice * numRentals;
    const giftCard = remaining + spent;

    const optionsData = [
      { text: (numRentals - 5).toString(), isCorrect: false, reason: "wrong calculation" },
      { text: numRentals.toString(), isCorrect: true },
      { text: (numRentals + 10).toString(), isCorrect: false, reason: "wrong subtraction" },
      { text: Math.floor(giftCard / rentalPrice).toString(), isCorrect: false, reason: "ignores movies bought" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Henry has a ${giftCard} dollar gift card. He buys ${numBought} movies at ${buyPrice} dollars each, then spends the rest of his balance renting movies at ${rentalPrice} dollars each. How many movies can he rent?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: numRentals.toString(),
      explanation: `First, calculate the amount spent on purchases: $${numBought} \\times ${buyPrice} = ${spent}$. The remaining balance is $${giftCard} - ${spent} = ${remaining}$. The number of rentals is $${remaining} \\div ${rentalPrice} = ${numRentals}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 46f68129
*
* ORIGINAL ANALYSIS:
* - Number ranges: [perChild: 2-5, numChildren: 10-30, leftover: 2-10]
* - Difficulty factors: [Word problem, setting up equation]
* - Distractor patterns: [A: wrong calc, C: too many, D: way too many]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/