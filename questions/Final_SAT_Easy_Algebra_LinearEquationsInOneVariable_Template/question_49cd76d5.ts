import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 49cd76d5
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-10, rightSide: 3-10, multiplier: 3-10]
* - Difficulty factors: [Expression scaling]
* - Distractor patterns: [A: wrong value, B: wrong calc, D: wrong add]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_49cd76d5 = {
  metadata: {
    // id: "49cd76d5",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 10);
    const rightSide = getRandomInt(3, 10);
    const multiplier = getRandomInt(3, 10);
    const result = multiplier * rightSide;

    const distractorA = rightSide - 3;
    const distractorB = multiplier + rightSide;
    const distractorD = result + 3;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "wrong value" },
      { text: distractorB.toString(), isCorrect: false, reason: "wrong calculation" },
      { text: result.toString(), isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "wrong addition" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${coeff}x = ${rightSide}$, what is the value of $${multiplier * coeff}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `${multiplier * coeff}x = ${multiplier} × ${coeff}x = ${multiplier} × ${rightSide} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 70774aa4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-8, rightSide: 6-80, multiplier: 2-5]
* - Difficulty factors: [Expression scaling]
* - Distractor patterns: [A/B: wrong value, C: wrong add]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
