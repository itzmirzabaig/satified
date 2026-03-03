import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: ed18c4f7
*
* ORIGINAL ANALYSIS:
* - Number ranges: [multiplier: 2-4, addend: 2-8]
* - Difficulty factors: [Translating words to expression]
* - Distractor patterns: [A: wrong ops, B: wrong coeff, C: subtraction]
* - Constraints: [Proper algebraic translation]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_ed18c4f7 = {
  metadata: {
    // id: "ed18c4f7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const multiplier = getRandomInt(2, 4);
    const addend = getRandomInt(2, 8);

    const optionsData = [
      { text: `\\( ${addend}n - ${multiplier} \\)`, isCorrect: false, reason: "represents subtraction with wrong coefficient" },
      { text: `\\( ${addend}n + ${multiplier} \\)`, isCorrect: false, reason: "uses wrong coefficient for n" },
      { text: `\\( ${multiplier}n - ${addend} \\)`, isCorrect: false, reason: "represents subtraction instead of addition" },
      { text: `\\( ${multiplier}n + ${addend} \\)`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Cathy has \\( n \\) CDs. Gerry has ${addend} more than ${multiplier} times the number of CDs that Cathy has. In terms of \\( n \\), how many CDs does Gerry have?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `\\( ${multiplier}n + ${addend} \\)`,
      explanation: `"${multiplier} times n" = ${multiplier}n. "${addend} more than" = + ${addend}. So: ${multiplier}n + ${addend}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 0d685865
*
* ORIGINAL ANALYSIS:
* - Number ranges: [x: 5-15, addend: 15-30]
* - Difficulty factors: [Simple substitution]
* - Distractor patterns: [A: subtraction, B: constant only, D: doubling error]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
