import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 144
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-5, const1: a multiple of coeff up to 10, result: 2-6]
* - Difficulty factors: [Simple two-step equation]
* - Distractor patterns: [value of coeff*x, dividing before subtracting,
*   adding const1 instead of subtracting]
* - Constraints: [Clean integer result; redraw until all choices differ]
*
* FIX NOTES:
* The distractors were result - 1, result - 0.5 and 2 * result, labeled
* "wrong substitution", "wrong calculation" and "wrong operation". Each now
* comes from the error its reason names, and the explanation is typeset.
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_144 = {
  metadata: {
    id: "144",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // const1 = coeff * j, so dividing before subtracting (result + j) and adding
    // const1 instead of subtracting (result + 2j) both give integers.
    let coeff = 2, j = 1, result = 2, values: number[] = [];
    do {
      coeff = getRandomInt(2, 5);
      j = getRandomInt(1, Math.floor(10 / coeff));
      result = getRandomInt(2, 6);
      values = [result, coeff * result, result + j, result + 2 * j];
    } while (new Set(values).size !== 4);
    const const1 = coeff * j;
    const rightSide = coeff * result + const1;

    const optionsData = [
      { text: values[1].toString(), isCorrect: false, reason: `it is the value of $${coeff}x$, not the value of $x$` },
      { text: values[2].toString(), isCorrect: false, reason: `it results from dividing ${rightSide} by ${coeff} without first subtracting ${const1}` },
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: values[3].toString(), isCorrect: false, reason: `it results from adding ${const1} to ${rightSide} instead of subtracting it, which gives $${coeff}x = ${rightSide + const1}$` }
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
      explanation: `Choice ${correctLetter} is correct. Subtracting ${const1} from both sides of the given equation yields $${coeff}x = ${rightSide - const1}$. Dividing both sides of this equation by ${coeff} yields $x = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
