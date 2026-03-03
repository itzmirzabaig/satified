import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 902871
*
* ORIGINAL ANALYSIS:
* - Number ranges: [a: 2-5, b: 2-6, c: 2-6, result: 5-12]
* - Difficulty factors: [Distributing, combining like terms]
* - Distractor patterns: [B: distribution error, C/D: large number]
* - Constraints: [Clean integer result]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_902871 = {
  metadata: {
    // id: "902871",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 6);
    const c = getRandomInt(2, 6);
    const result = getRandomInt(5, 12);
    const rightSide = (a + b) * result + b * c;

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: (result + 1).toString(), isCorrect: false, reason: "distribution error" },
      { text: (result * 8).toString(), isCorrect: false, reason: "calculation error" },
      { text: (result * 9 + 9).toString(), isCorrect: false, reason: "calculation error" }
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
      explanation: `Distribute: ${a}x + ${b}x + ${b * c} = ${rightSide}. Combine: ${a + b}x + ${b * c} = ${rightSide}. Subtract: ${a + b}x = ${rightSide - b * c}. Divide: x = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 4e77195b
*
* ORIGINAL ANALYSIS:
* - Number ranges: [addend: 2-8, rightSide: 20-100, multiplier: 4-10]
* - Difficulty factors: [Expression scaling]
* - Distractor patterns: [None - fill in blank]
* - Constraints: [Clean integer result]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
