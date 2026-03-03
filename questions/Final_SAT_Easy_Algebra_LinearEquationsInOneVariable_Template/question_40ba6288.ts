import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 40ba6288
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, rightSide: 10-90, subtract: 5-20]
* - Difficulty factors: [Expression evaluation without solving for x]
* - Distractor patterns: [A: sign error, C: arithmetic error, D: added instead]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_40ba6288 = {
  metadata: {
    // id: "40ba6288",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 6);
    const rightSide = coeff * getRandomInt(5, 15);
    const subtract = getRandomInt(5, 20);
    const result = rightSide - subtract;

    const distractorA = -getRandomInt(1, 5);
    const distractorC = result + 4;
    const distractorD = rightSide + subtract;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "results from sign errors" },
      { text: result.toString(), isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "results from arithmetic errors" },
      { text: distractorD.toString(), isCorrect: false, reason: "results from adding instead of subtracting" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${coeff}x = ${rightSide}$, what is the value of $${coeff}x - ${subtract}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Since $${coeff}x = ${rightSide}$, substitute: $${coeff}x - ${subtract} = ${rightSide} - ${subtract} = ${result}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 6ac23de7
*
* ORIGINAL ANALYSIS:
* - Number ranges: [numer/denom: 2-6, multiplier: 2-6]
* - Difficulty factors: [Fractional coefficient, two-step solving]
* - Distractor patterns: [B: added, C: wrong order of ops, D: subtracted]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
