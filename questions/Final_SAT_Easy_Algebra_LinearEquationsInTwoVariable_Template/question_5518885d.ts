import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5518885d
 *
 * ORIGINAL ANALYSIS: [Daylight subtraction]
 * - Number ranges: [total: 1200-1500, x: 500-800]
 * - Difficulty factors: [Simple subtraction in context]
 * - Constraints: [x must be less than total]
 */

export const generator_5518885d = {
  metadata: {
    // id: "5518885d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize total minutes (1200-1500)
    const total = getRandomInt(1200, 1500);
    // Randomize daylight minutes (500-800)
    const x = getRandomInt(500, 800);
    const y = total - x;

    const optionsData = [
      { text: y.toString(), isCorrect: true },
      { text: x.toString(), isCorrect: false, reason: "uses daylight value" },
      { text: (y - 50).toString(), isCorrect: false, reason: "calculation error" },
      { text: total.toString(), isCorrect: false, reason: "uses total value" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `$x+y=${total}$ relates daylight minutes ($x$) and non-daylight minutes ($y$) in a day. If $x=${x}$, what is $y$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: `Choice ${correctLetter} is correct. Substitute $x=${x}$ into the equation: $${x} + y = ${total}$, so $y = ${y}$.`
    };
  }
};

/**
 * Question ID: 2d0e13a6
 *
 * ORIGINAL ANALYSIS: [Parallel slope fraction value]
 */
