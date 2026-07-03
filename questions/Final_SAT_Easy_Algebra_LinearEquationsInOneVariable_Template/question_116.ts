import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 116
*
* ORIGINAL ANALYSIS:
* - Number ranges: [coeff: 2-6, rightSide: 10-90, subtract: 5-20 (capped below rightSide)]
* - Difficulty factors: [Expression evaluation without solving for x]
* - Distractor patterns: [sign error (-result), arithmetic error (result + 2..5), added instead (rightSide + subtract)]
* - Constraints: [Simple integer arithmetic; result always >= 1 so distractors can never collide]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_116 = {
  metadata: {
    id: "116",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 6);
    const rightSide = coeff * getRandomInt(5, 15); // 10..90
    // Cap subtract below rightSide so the result is always a positive integer.
    const subtract = getRandomInt(5, Math.min(20, rightSide - 1));
    const result = rightSide - subtract; // >= 1

    // result >= 1, so -result < 0 is distinct from every other (nonnegative) option.
    const distractorA = -result;
    // result + 2..5 differs from result, and from distractorD by at least
    // 2*subtract - 5 >= 5, so no collision is possible.
    const distractorC = result + getRandomInt(2, 5);
    const distractorD = rightSide + subtract;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "results from a sign error and gives the opposite of the correct value" },
      { text: result.toString(), isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: `results from an arithmetic error when subtracting ${subtract} from ${rightSide}` },
      { text: distractorD.toString(), isCorrect: false, reason: `results from adding ${subtract} to ${rightSide} instead of subtracting it` }
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
