import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 6fa593f1
*
* ORIGINAL ANALYSIS:
* - Number ranges: [x: 20-60, addend: 3-12]
* - Difficulty factors: [Simple substitution]
* - Distractor patterns: [A: sub, B: x value, D: wrong add]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_6fa593f1 = {
  metadata: {
    // id: "6fa593f1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = getRandomInt(20, 60);
    const addend = getRandomInt(3, 12);
    const result = x + addend;

    const optionsData = [
      { text: (x - addend).toString(), isCorrect: false, reason: "subtraction error" },
      { text: x.toString(), isCorrect: false, reason: "just the value of x" },
      { text: result.toString(), isCorrect: true },
      { text: (x + addend + 18).toString(), isCorrect: false, reason: "wrong addition" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `If $x = ${x}$, what is the value of $x + ${addend}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Substitute: ${x} + ${addend} = ${result}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};