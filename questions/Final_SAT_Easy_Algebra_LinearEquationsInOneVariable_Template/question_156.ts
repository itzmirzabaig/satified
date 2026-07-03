import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 156
*
* ORIGINAL ANALYSIS:
* - Number ranges: [multiplier: 2-4, addend: 2-8]
* - Difficulty factors: [Translating words to expression]
* - Distractor patterns: [A: wrong ops, B: wrong coeff, C: subtraction]
* - Constraints: [Proper algebraic translation]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*/

export const generator_156 = {
  metadata: {
    id: "156",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // addend must differ from multiplier, otherwise the swapped-coefficient
    // distractors become identical to the other options (bounded retry).
    const multiplier = getRandomInt(2, 4);
    let addend = getRandomInt(2, 8);
    let tries = 0;
    while (addend === multiplier && tries++ < 50) {
      addend = getRandomInt(2, 8);
    }
    if (addend === multiplier) {
      addend = multiplier + 1; // deterministic fallback, still within [2, 8]
    }

    const optionsData = [
      { text: `$${addend}n - ${multiplier}$`, isCorrect: false, reason: "it swaps the coefficient and the constant and also subtracts instead of adds" },
      { text: `$${addend}n + ${multiplier}$`, isCorrect: false, reason: "it swaps the coefficient and the constant" },
      { text: `$${multiplier}n - ${addend}$`, isCorrect: false, reason: "it represents subtraction instead of addition" },
      { text: `$${multiplier}n + ${addend}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A student has $n$ CDs. A classmate has ${addend} more than ${multiplier} times the number of CDs that the student has. In terms of $n$, how many CDs does the classmate have?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${multiplier}n + ${addend}$`,
      explanation: `"${multiplier} times the number of CDs" translates to $${multiplier}n$, and "${addend} more than" means adding ${addend}, giving $${multiplier}n + ${addend}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
