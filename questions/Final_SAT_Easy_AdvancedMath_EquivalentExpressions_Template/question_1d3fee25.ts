import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1d3fee25
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 3, constant: 5, subtract: 6]
 * - Difficulty factors: [Distribution, then subtraction]
 * - Distractor patterns: [A: 3x-3 (forgets to distribute 3 to 5), B: 3x-1 (wrong), D: 15x-6 (multiplies 3 and 5 and attaches x)]
 * - Constraints: [Order of operations]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1d3fee25 = {
  metadata: {
    // id: "1d3fee25",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(2, 5);
    const b = getRandomInt(3, 8);
    const c = getRandomInt(4, 10);
    const distributed = a * b;
    const result = distributed - c;

    const correctText = `$${a}x${result >= 0 ? '+' : ''}${result}$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${a}x${(distributed - c - 3) >= 0 ? '+' : ''}${distributed - c - 3}$`, isCorrect: false },
      { text: `$${a}x${b - c >= 0 ? '+' : ''}${b - c}$`, isCorrect: false },
      { text: `$${a * b}x${-c >= 0 ? '+' : ''}${-c}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which of the following is equivalent to $${a}(x+${b})-${c}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Distribute $${a}$: $${a}(x+${b})=${a}x+${distributed}$. Then subtract $${c}$: $${a}x+${distributed}-${c}=${a}x${result >= 0 ? '+' : ''}${result}$.`
    };
  }
};

/**
 * Question ID: 772de699
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 23, 2, 9]
 * - Difficulty factors: [Factoring out x from all terms]
 * - Distractor patterns: [A: factors out 23x, B: factors out 9x, D: factors out 34]
 * - Constraints: [Must factor out common variable x]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */