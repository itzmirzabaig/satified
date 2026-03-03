import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

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

export const generator_70774aa4 = {
  metadata: {
    // id: "70774aa4",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 8);
    const rightSide = coeff * getRandomInt(3, 10);
    const multiplier = getRandomInt(2, 5);
    const result = multiplier * rightSide;

    const distractorA = multiplier + 2;
    const distractorB = multiplier + 7;
    const distractorC = result - 37;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "wrong value" },
      { text: distractorB.toString(), isCorrect: false, reason: "wrong calculation" },
      { text: distractorC.toString(), isCorrect: false, reason: "wrong addition" },
      { text: result.toString(), isCorrect: true }
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
