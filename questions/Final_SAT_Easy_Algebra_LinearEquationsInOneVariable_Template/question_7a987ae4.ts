import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 7a987ae4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, rightSide: 20-180, subtract: 1-5]
* - Difficulty factors: [Expression evaluation with scaling]
* - Distractor patterns: [A: n-1, C: 2n value, D: 4n-1]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_7a987ae4 = {
  metadata: {
    // id: "7a987ae4",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 6);
    const rightSide = coeff * getRandomInt(10, 30);
    const subtract = getRandomInt(1, 5);
    const result = rightSide - subtract;

    const distractorA = (rightSide / coeff) - subtract;
    const distractorC = rightSide;
    const distractorD = 2 * rightSide - subtract;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "finds n-1 instead of ${coeff}n-1" },
      { text: result.toString(), isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "finds ${coeff}n instead of ${coeff}n-1" },
      { text: distractorD.toString(), isCorrect: false, reason: "uses wrong coefficient" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${coeff}n = ${rightSide}$, what is the value of $${coeff}n - ${subtract}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Substitute ${rightSide} for ${coeff}n: ${rightSide} - ${subtract} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 56e1b09e
*
* ORIGINAL ANALYSIS:
* - Number ranges: [decimals: 1.0-4.0]
* - Difficulty factors: [Decimal subtraction]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Decimal result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
