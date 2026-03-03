import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: fbb0ea7f
*
* ORIGINAL ANALYSIS:
* - Number ranges: [rate: 3000-8000, time: 15-30, remaining: 200000-400000]
* - Difficulty factors: [Large numbers, rate calculation, word problem]
* - Distractor patterns: [B: wrong division, C: miscalc, D: total not rate]
* - Constraints: [Integer division result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_fbb0ea7f = {
  metadata: {
    // id: "fbb0ea7f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rate = getRandomInt(3000, 8000);
    const time = getRandomInt(15, 30);
    const remaining = getRandomInt(200000, 400000);
    const initial = remaining + rate * time;

    const distractorB = Math.floor(remaining / time);
    const distractorC = Math.floor((initial - remaining) / 2);
    const distractorD = initial - remaining;

    const optionsData = [
      { text: rate.toLocaleString(), isCorrect: true },
      { text: distractorB.toLocaleString(), isCorrect: false, reason: "divides remaining by time" },
      { text: distractorC.toLocaleString(), isCorrect: false, reason: "miscalculation" },
      { text: distractorD.toLocaleString(), isCorrect: false, reason: "total burned, not rate per second" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A rocket contained ${initial.toLocaleString()} kg of propellant. After ${time} seconds, ${remaining.toLocaleString()} kg remained. On average, how much propellant burned each second?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: rate.toLocaleString(),
      explanation: `Burned: ${initial} - ${remaining} = ${initial - remaining}. Rate: ${initial - remaining}/${time} = ${rate}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

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
