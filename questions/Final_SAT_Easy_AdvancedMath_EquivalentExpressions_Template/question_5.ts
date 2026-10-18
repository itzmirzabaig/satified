import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [constants: 8, 3]
 * - Difficulty factors: [Combining constants]
 * - Distractor patterns: [A: multiplying, C: subtracting, D: negative result]
 * - Constraints: [Simple addition]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_5 = {
  metadata: {
    id: "5",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(5, 15);
    // a - b is a distractor constant; keep it at 2 or more so it never prints
    // as "+0" or "+-2".
    const b = getRandomInt(2, Math.min(7, a - 2));
    const sum = a + b;

    const correctText = `$d^2+${sum}$`;

    const optionsData = [
      { text: `$d^2+${a * b}$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$d^2+${a - b}$`, isCorrect: false },
      { text: `$d^2-${sum}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a} + d^2 + ${b}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Combine constants: $${a}+${b}=${sum}$.`
    };
  }
};
