import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 150
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 5-20, result: 200-400]
* - Difficulty factors: [Simple subtraction]
* - Distractor patterns: [subtracting in the wrong order, adding instead of
*   subtracting, the value of k + addend]
* - Constraints: [Clean integer result]
*
* FIX NOTES:
* The distractors were floor(rightSide / addend), rightSide + addend and
* rightSide * addend, labeled "division error", "addition error" and
* "multiplication error"; the floored quotient and the product are not
* errors anyone makes solving k + a = b. Each choice now has a real reason.
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_150 = {
  metadata: {
    id: "150",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const addend = getRandomInt(5, 20);
    const result = getRandomInt(200, 400);
    const rightSide = result + addend;

    const optionsData = [
      { text: (-result).toString(), isCorrect: false, reason: `it results from subtracting ${rightSide} from ${addend} instead of subtracting ${addend} from ${rightSide}` },
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: (rightSide + addend).toString(), isCorrect: false, reason: `it results from adding ${addend} to ${rightSide} instead of subtracting it` },
      { text: rightSide.toString(), isCorrect: false, reason: `it is the value of $k + ${addend}$, not the value of $k$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the solution to the given equation? $$k + ${addend} = ${rightSide}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. Subtracting ${addend} from both sides of the given equation yields $k = ${rightSide} - ${addend}$, or $k = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
