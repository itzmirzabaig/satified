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
    const coeff = getRandomInt(2, 9);
    const rightSide = coeff * getRandomInt(3, 8);
    const targetCoeff = getRandomInt(2, 5) * coeff;
    const result = (targetCoeff / coeff) * rightSide;

    const distractorA = rightSide - coeff;
    const distractorC = (targetCoeff - coeff) * 3;
    const distractorD = targetCoeff * rightSide;

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
