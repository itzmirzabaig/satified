import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 160
*
* ORIGINAL ANALYSIS:
* - Number ranges: [rate: 3000-8000, time: 15-30, remaining: 200000-400000]
* - Difficulty factors: [Large numbers, rate calculation, word problem]
* - Distractor patterns: [B: wrong division, C: miscalc, D: total not rate]
* - Constraints: [Integer division result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_160 = {
  metadata: {
    id: "160",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let rate = getRandomInt(3000, 8000);
    let time = getRandomInt(15, 30);
    let remaining = getRandomInt(200000, 400000);
    let initial = remaining + rate * time;

    let distractorB = Math.floor(remaining / time);
    let distractorC = Math.floor((initial - remaining) / 2);
    let distractorD = initial - remaining;

    // Guard: re-draw until all four option values are distinct so no
    // distractor collides with the correct answer (rate) or with each other.
    // e.g. rate=7000, time=30, remaining=210000 gives floor(210000/30)=7000=rate.
    let tries = 0;
    while (
      new Set([rate, distractorB, distractorC, distractorD]).size < 4 &&
      tries++ < 50
    ) {
      rate = getRandomInt(3000, 8000);
      time = getRandomInt(15, 30);
      remaining = getRandomInt(200000, 400000);
      initial = remaining + rate * time;
      distractorB = Math.floor(remaining / time);
      distractorC = Math.floor((initial - remaining) / 2);
      distractorD = initial - remaining;
    }

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
