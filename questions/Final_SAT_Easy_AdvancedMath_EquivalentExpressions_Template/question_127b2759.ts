import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 127b2759
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [constants: 8, 3]
 * - Difficulty factors: [Combining constants]
 * - Distractor patterns: [A: multiplying, C: subtracting, D: negative result]
 * - Constraints: [Simple addition]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_127b2759 = {
  metadata: {
    // id: "127b2759",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(5, 15);
    const b = getRandomInt(2, 7);
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

/**
 * Question ID: fb96a5b3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, inside: ab-3, add: 2]
 * - Difficulty factors: [Distribution then addition]
 * - Distractor patterns: [A: 2ab-1 (arithmetic error), C: 2ab-5, D: 2ab-8 (subtracts 2 instead of adding)]
 * - Constraints: [Must distribute to both terms]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */