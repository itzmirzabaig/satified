import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 146
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-9, rightSide: 6-72, targetCoeff: 4-45]
* - Difficulty factors: [Expression evaluation, scaling]
* - Distractor patterns: [A: subtraction error, C: wrong mult, D: no division]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_146 = {
  metadata: {
    id: "146",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw until all four option values are distinct (collision only occurs
    // when multiplier === 3 * scale - 2, so this converges immediately).
    let coeff = 2, rightSide = 6, targetCoeff = 4, result = 12;
    let distractorA = 0, distractorC = 0, distractorD = 0;
    let tries = 0;
    do {
      coeff = getRandomInt(2, 9);
      rightSide = coeff * getRandomInt(3, 8);
      targetCoeff = getRandomInt(2, 5) * coeff;
      result = (targetCoeff / coeff) * rightSide;

      distractorA = rightSide - coeff;
      distractorC = (targetCoeff - coeff) * 3;
      distractorD = targetCoeff * rightSide;
      tries++;
    } while (
      new Set([result, distractorA, distractorC, distractorD]).size < 4 &&
      tries < 50
    );

    // Deterministic fallback: nudging C to 3 * targetCoeff cannot collide with
    // result, A, or D anywhere in the declared ranges when the loop condition fired.
    if (new Set([result, distractorA, distractorC, distractorD]).size < 4) {
      distractorC = targetCoeff * 3;
    }

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "results from subtracting instead of dividing" },
      { text: result.toString(), isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: "results from wrong multiplication" },
      { text: distractorD.toString(), isCorrect: false, reason: "multiplies without solving for x first" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $${coeff}x = ${rightSide}$, what is the value of $${targetCoeff}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `x = ${rightSide}/${coeff} = ${rightSide / coeff}, so ${targetCoeff}x = ${targetCoeff} × ${rightSide / coeff} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
