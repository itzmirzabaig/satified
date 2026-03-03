import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8452c42b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 50, 5]
 * - Difficulty factors: [Adding like terms]
 * - Distractor patterns: [A: multiplying, B: dividing, C: subtracting]
 * - Constraints: [Simple addition]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8452c42b = {
  metadata: {
    // id: "8452c42b",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(40, 60);
    const b = getRandomInt(3, 10);
    const sum = a + b;

    const correctText = `$${sum}x^{2}$`;

    const optionsData = [
      { text: `$${a * b}x^{2}$`, isCorrect: false },
      { text: `$${Math.floor(a / b)}x^{2}$`, isCorrect: false },
      { text: `$${a - b}x^{2}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^{2} + ${b}x^{2}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Add coefficients: $${a}+${b}=${sum}$.`
    };
  }
};

/**
 * Question ID: 0536ad4f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 20, 4, 3]
 * - Difficulty factors: [Distributing negative, combining like terms]
 * - Distractor patterns: [A: 10w (wrong arithmetic), C: 19w (forgets to distribute negative to 3w), D: 21w (ignores subtraction)]
 * - Constraints: [Must simplify inside parentheses first]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */