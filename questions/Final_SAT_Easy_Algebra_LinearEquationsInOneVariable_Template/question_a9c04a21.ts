import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: a9c04a21
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-5, const1: 2-6, result: 2-6]
* - Difficulty factors: [Simple two-step equation]
* - Distractor patterns: [A: wrong substitution, B: wrong calc, D: wrong operation]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_a9c04a21 = {
  metadata: {
    // id: "a9c04a21",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 5);
    const const1 = getRandomInt(2, 6);
    const result = getRandomInt(2, 6);
    const rightSide = coeff * result + const1;

    const optionsData = [
      { text: (result - 1).toString(), isCorrect: false, reason: "wrong substitution" },
      { text: (result - 0.5).toString(), isCorrect: false, reason: "wrong calculation" },
      { text: result.toString(), isCorrect: true },
      { text: (result * 2).toString(), isCorrect: false, reason: "wrong operation" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the solution to the equation $${coeff}x + ${const1} = ${rightSide}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Subtract ${const1}: ${coeff}x = ${rightSide - const1}. Divide: x = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 6fa593f1
*
* ORIGINAL ANALYSIS:
* - Number ranges: [x: 20-60, addend: 3-12]
* - Difficulty factors: [Simple substitution]
* - Distractor patterns: [A: sub, B: x value, D: wrong add]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
