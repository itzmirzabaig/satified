import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 109
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-5, const1: 100-400 (a multiple of coeff), result: 10-50]
* - Difficulty factors: [Two-step equation with larger numbers]
* - Distractor patterns: [value of coeff*p (stopping before dividing), dividing the
*   right side by coeff without subtracting const1, adding const1 instead of subtracting]
* - Constraints: [const1 is a multiple of coeff so every distractor is an integer;
*   redraw until all four choices are distinct]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*
* FIX NOTES:
* The distractors were arbitrary offsets (result - 20, result + 23,
* rightSide - 25) whose stated reasons ("ignored coefficient", "wrong
* operation") did not produce those values, and result - 20 could be negative.
* Each distractor now comes from the error its explanation names, and the
* explanation is written out with the math typeset.
*/

export const generator_109 = {
  metadata: {
    id: "109",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let coeff = 2, m = 50, const1 = 100, result = 10, rightSide = 120;
    let values: number[] = [];
    do {
      coeff = getRandomInt(2, 5);
      m = getRandomInt(Math.ceil(100 / coeff), Math.floor(400 / coeff));
      const1 = coeff * m;
      result = getRandomInt(10, 50);
      rightSide = coeff * result + const1;
      values = [result, coeff * result, result + m, result + 2 * m];
    } while (new Set(values).size !== 4);

    const optionsData = [
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: (coeff * result).toString(), isCorrect: false, reason: `this is the value of $${coeff}p$, not the value of $p$` },
      { text: (result + m).toString(), isCorrect: false, reason: `this may result from dividing ${rightSide} by ${coeff} without first subtracting ${const1}` },
      { text: (result + 2 * m).toString(), isCorrect: false, reason: `this may result from adding ${const1} to ${rightSide} instead of subtracting it, which gives $${coeff}p = ${rightSide + const1}$` }
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
      explanation: `Choice ${correctLetter} is correct. Subtracting ${const1} from both sides of the given equation yields $${coeff}p = ${rightSide - const1}$. Dividing both sides of this equation by ${coeff} yields $p = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
