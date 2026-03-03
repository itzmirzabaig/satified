import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 4de87c9a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [multiplier: 2-12, addend: 2-10, result: 10-200]
* - Difficulty factors: [Translating words to equation]
* - Distractor patterns: [A: mult notation wrong, B: wrong operation, C: swapped coeffs]
* - Constraints: [Proper algebraic translation]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_4de87c9a = {
  metadata: {
    // id: "4de87c9a",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const multiplier = getRandomInt(2, 12);
    const addend = getRandomInt(2, 10);
    const total = multiplier * getRandomInt(5, 15) + addend;

    const optionsData = [
      { text: `(${addend})(${multiplier})x = ${total}`, isCorrect: false, reason: "represents multiplication of constants, not 'more than'" },
      { text: `${multiplier}x = ${total} + ${addend}`, isCorrect: false, reason: "adds to wrong side" },
      { text: `${addend}x + ${multiplier} = ${total}`, isCorrect: false, reason: "swaps the coefficients" },
      { text: `${multiplier}x + ${addend} = ${total}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `${addend} more than ${multiplier} times a number x is equal to ${total}. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${multiplier}x + ${addend} = ${total}`,
      explanation: `"${multiplier} times x" = ${multiplier}x. "${addend} more than" = + ${addend}. So: ${multiplier}x + ${addend} = ${total}. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 12b04e68
*
* ORIGINAL ANALYSIS:
* - Number ranges: [total: 100-300, donors: 50-270]
* - Difficulty factors: [Word problem, simple subtraction]
* - Distractor patterns: [B: donors, C: total, D: added instead]
* - Constraints: [Simple integer arithmetic]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/
