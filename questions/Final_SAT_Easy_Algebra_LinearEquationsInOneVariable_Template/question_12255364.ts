import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 12255364
*
* ORIGINAL ANALYSIS:
* - Number ranges: [enrollment: 20-50, monthly: 15-25, months: 4-12]
* - Difficulty factors: [Word problem, two-step equation]
* - Distractor patterns: [A: too few months, B: close, D: too many]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_12255364 = {
  metadata: {
    // id: "12255364",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const enrollment = getRandomInt(20, 50);
    const monthly = getRandomInt(15, 25);
    const months = getRandomInt(4, 12);
    const total = enrollment + monthly * months;

    const distractorA = Math.floor((total - enrollment) / (monthly * 2));
    const distractorB = months - 3;
    const distractorD = months + 2;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "too few months" },
      { text: distractorB.toString(), isCorrect: false, reason: "close but wrong" },
      { text: months.toString(), isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "too many months" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A gym charges a one-time ${enrollment} enrollment fee and ${monthly} per month. After how many months will a member have paid a total of $${total}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: months.toString(),
      explanation: `Equation: ${enrollment} + ${monthly}x = ${total}. Subtract: ${monthly}x = ${total - enrollment}. Divide: x = ${months}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: b82a943c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-9, rightSide: 6-72, targetCoeff: 4-45]
* - Difficulty factors: [Expression evaluation, scaling]
* - Distractor patterns: [A: subtraction error, C: wrong mult, D: no division]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
