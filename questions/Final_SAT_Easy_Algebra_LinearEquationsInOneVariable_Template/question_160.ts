import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 160
*
* ORIGINAL ANALYSIS:
* - Number ranges: [rate: 3000-8000, time: 15-30, remaining: 200000-400000]
* - Difficulty factors: [Large numbers, rate calculation, word problem]
* - Distractor patterns: [remaining / time, initial / time, total burned]
* - Constraints: [Integer division results; remaining is a multiple of time]
*
* FIX NOTES:
* One distractor was half the amount burned, labeled "miscalculation", and
* remaining / time was floored. The distractors now come from real errors and
* divide evenly, and the explanation is typeset with comma grouped numbers.
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
    // remaining is a multiple of time, so dividing the remaining amount (or the
    // initial amount) by the time gives a whole number. Redraw until that
    // quotient differs from the rate; the other choices are always larger.
    let rate = 3000, time = 15, perSec = 15000;
    do {
      rate = getRandomInt(3000, 8000);
      time = getRandomInt(15, 30);
      perSec = getRandomInt(Math.ceil(200000 / time), Math.floor(400000 / time));
    } while (perSec === rate);
    const remaining = perSec * time;
    const initial = remaining + rate * time;
    const burned = initial - remaining;
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: fmt(rate), isCorrect: true, reason: '' },
      { text: fmt(perSec), isCorrect: false, reason: `it results from dividing the amount that remained, ${fmt(remaining)} kg, by ${time} instead of dividing the amount that burned` },
      { text: fmt(initial / time), isCorrect: false, reason: `it results from dividing the initial amount, ${fmt(initial)} kg, by ${time} instead of dividing the amount that burned` },
      { text: fmt(burned), isCorrect: false, reason: `it is the total amount of propellant that burned in ${time} seconds, not the amount that burned each second` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A rocket contained ${initial.toLocaleString('en-US')} kg of propellant. After ${time} seconds, ${remaining.toLocaleString('en-US')} kg remained. On average, how much propellant burned each second?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: rate.toLocaleString('en-US'),
      explanation: `Choice ${correctLetter} is correct. The amount of propellant that burned in ${time} seconds is $${fmt(initial)} - ${fmt(remaining)} = ${fmt(burned)}$ kilograms. On average, the amount that burned each second is $\\frac{${fmt(burned)}}{${time}} = ${fmt(rate)}$ kilograms. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
