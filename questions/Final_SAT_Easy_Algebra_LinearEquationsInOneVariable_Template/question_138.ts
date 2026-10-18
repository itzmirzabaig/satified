import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 138
*
* ORIGINAL ANALYSIS:
* - Number ranges: [a: 2-5, b: 2-6, c: (a + b) or 2(a + b), result: 5-12]
* - Difficulty factors: [Distributing, combining like terms]
* - Distractor patterns: [value of (a + b)x, distributing b to x only,
*   adding bc instead of subtracting]
* - Constraints: [Clean integer result; redraw until all choices differ]
*
* FIX NOTES:
* The distractors were result + 1, result * 8 and result * 9 + 9 (fixed
* numbers that ignored the equation shown), labeled "distribution error" and
* "calculation error". Each now comes from the error its reason names.
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_138 = {
  metadata: {
    id: "138",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // c is a multiple of (a + b), so each error below gives an integer:
    //   distributing b to x only: (rightSide - c) / (a + b) = result + m(b - 1)
    //   adding bc instead of subtracting: (rightSide + bc) / (a + b) = result + 2bm
    let a = 2, b = 2, m = 1, c = 4, result = 5, values: number[] = [];
    do {
      a = getRandomInt(2, 5);
      b = getRandomInt(2, 6);
      m = getRandomInt(1, 2);
      c = (a + b) * m;
      result = getRandomInt(5, 12);
      values = [result, (a + b) * result, result + m * (b - 1), result + 2 * b * m];
    } while (new Set(values).size !== 4);
    const rightSide = (a + b) * result + b * c;

    const optionsData = [
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: values[1].toString(), isCorrect: false, reason: `it is the value of $${a + b}x$, not the value of $x$` },
      { text: values[2].toString(), isCorrect: false, reason: `it results from distributing ${b} to $x$ but not to ${c}, which gives $${a + b}x + ${c} = ${rightSide}$` },
      { text: values[3].toString(), isCorrect: false, reason: `it results from adding ${b * c} to ${rightSide} instead of subtracting it, which gives $${a + b}x = ${rightSide + b * c}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What value of $x$ is the solution to the given equation? $$${a}x + ${b}(x + ${c}) = ${rightSide}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. Distributing ${b} on the left side of the given equation yields $${a}x + ${b}x + ${b * c} = ${rightSide}$. Combining like terms yields $${a + b}x + ${b * c} = ${rightSide}$. Subtracting ${b * c} from both sides yields $${a + b}x = ${rightSide - b * c}$, and dividing both sides by ${a + b} yields $x = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
