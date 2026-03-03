import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 23758540
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-5, const1: 100-400, result: 10-50]
* - Difficulty factors: [Two-step equation with larger numbers]
* - Distractor patterns: [A: division error, C: wrong operation, D: ignored coefficient]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_23758540 = {
  metadata: {
    // id: "23758540",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 5);
    const const1 = getRandomInt(100, 400);
    const result = getRandomInt(10, 50);
    const rightSide = coeff * result + const1;

    const optionsData = [
      { text: (result - 20).toString(), isCorrect: false, reason: "division error" },
      { text: result.toString(), isCorrect: true },
      { text: (result + 23).toString(), isCorrect: false, reason: "wrong operation" },
      { text: (rightSide - 25).toString(), isCorrect: false, reason: "ignored coefficient" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $p$ satisfies the equation $${coeff}p + ${const1} = ${rightSide}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Subtract ${const1}: ${coeff}p = ${rightSide - const1}. Divide: p = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

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
