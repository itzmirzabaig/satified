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
    // Redraw until the value of x differs from the correct answer.
    let coeff = 2, x = 5, rightSide = 10, subtract = 5, result = 5;
    do {
      coeff = getRandomInt(2, 6);
      x = getRandomInt(5, 15);
      rightSide = coeff * x; // 10..90
      // Cap subtract below rightSide so the result is always a positive integer.
      subtract = getRandomInt(5, Math.min(20, rightSide - 1));
      result = rightSide - subtract; // >= 1
    } while (x === result);

    // result >= 1, so -result < 0 is distinct from every other (nonnegative) option.
    const distractorA = -result;
    // x <= rightSide < rightSide + subtract, and x !== result by the redraw above.
    const distractorC = x;
    const distractorD = rightSide + subtract;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: `results from subtracting ${rightSide} from ${subtract} instead of ${subtract} from ${rightSide}` },
      { text: result.toString(), isCorrect: true },
      { text: distractorC.toString(), isCorrect: false, reason: `is the value of $x$, not the value of $${coeff}x - ${subtract}$` },
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
      explanation: `Choice ${correctLetter} is correct. Since $${coeff}x = ${rightSide}$, substituting ${rightSide} for $${coeff}x$ in the expression $${coeff}x - ${subtract}$ gives $${rightSide} - ${subtract} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
