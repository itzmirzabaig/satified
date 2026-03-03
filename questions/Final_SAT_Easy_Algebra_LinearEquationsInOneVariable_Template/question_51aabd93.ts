import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 51aabd93
*
* ORIGINAL ANALYSIS:
* - Number ranges: [pAdd: 2-8, const1: 5-12, rightSide: 5-20]
* - Difficulty factors: [Combining constants, simple isolation]
* - Distractor patterns: [B, C, D: various arithmetic errors]
* - Constraints: [Result is negative integer]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_51aabd93 = {
  metadata: {
    // id: "51aabd93",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const pAdd = getRandomInt(2, 8);
    const const1 = getRandomInt(5, 12);
    const rightSide = getRandomInt(pAdd + const1 - 5, pAdd + const1 - 1);
    const result = rightSide - pAdd - const1;

    const distractorB = Math.abs(result);
    const distractorC = Math.abs(result) + getRandomInt(10, 20);
    const distractorD = Math.abs(result) + getRandomInt(15, 25);

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: distractorB.toString(), isCorrect: false, reason: "ignores the negative sign" },
      { text: distractorC.toString(), isCorrect: false, reason: "results from calculation errors" },
      { text: distractorD.toString(), isCorrect: false, reason: "results from calculation errors" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $p$ is the solution to the given equation? $$(p + ${pAdd}) + ${const1} = ${rightSide}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Simplify: $p + ${pAdd + const1} = ${rightSide}$. Subtract ${pAdd + const1}: $p = ${rightSide} - ${pAdd + const1} = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 349a5bc1
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-8, const1: 2-10, result: 20-100]
* - Difficulty factors: [Two-step equation]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
