import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 1735436
*
* ORIGINAL ANALYSIS:
* - Number ranges: [initial: 3000-6000, daily: 50-100, days: 20-60]
* - Difficulty factors: [Word problem, linear decrease]
* - Distractor patterns: [A: too few, C: too many, D: way too many]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_1735436 = {
  metadata: {
    // id: "1735436",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(3000, 6000);
    const daily = getRandomInt(50, 100);
    const days = getRandomInt(20, 60);
    const target = initial - daily * days;

    const optionsData = [
      { text: (days - 20).toString(), isCorrect: false, reason: "too few days" },
      { text: days.toString(), isCorrect: true },
      { text: (days + 20).toString(), isCorrect: false, reason: "too many days" },
      { text: (days + 40).toString(), isCorrect: false, reason: "way too many" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Shop starts with ${initial} cups. Uses ${daily} per day. In how many days will supply reach ${target}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: days.toString(),
      explanation: `Equation: ${initial} - ${daily}d = ${target}. Solve: ${daily}d = ${initial - target}, so d = ${days}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: e53870b6
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-9, const1: 2-10]
* - Difficulty factors: [Infinite solutions concept]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [k must equal constant]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
