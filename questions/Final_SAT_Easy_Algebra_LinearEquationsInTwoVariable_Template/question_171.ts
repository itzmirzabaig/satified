import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 171
 *
 * ORIGINAL ANALYSIS: [Birch and maple tree substitution]
 * - Number ranges: [total: 150-400, x: 100-300]
 * - Difficulty factors: [Simple substitution in linear equation]
 * - Constraints: [x must be less than total]
 */

export const generator_171 = {
  metadata: {
    id: "171",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let total = 0;
    let x = 0;
    let y = 0;
    let tries = 0;
    do {
      // Randomize total (150-400) and x (100 to total-20)
      total = getRandomInt(150, 400);
      x = getRandomInt(100, total - 20);
      y = total - x;
      // The four option VALUES are {y, y-10, y+15, x}. Redraw until they are
      // pairwise distinct so the correct answer is never duplicated and no two
      // distractors coincide. (y-10, y+15 differ from y and each other always;
      // only the x-distractor can collide, when x == y, y-10, or y+15.)
    } while (tries++ < 50 && (x === y || x === y - 10 || x === y + 15));

    const optionsData = [
      { text: y.toString(), isCorrect: true },
      { text: (y - 10).toString(), isCorrect: false, reason: "calculation error" },
      { text: (y + 15).toString(), isCorrect: false, reason: "calculation error" },
      { text: x.toString(), isCorrect: false, reason: "uses maple count" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `$x+y=${total}$ relates maple ($x$) and birch ($y$) trees. If $x=${x}$, what is $y$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: `Choice ${correctLetter} is correct. Substitute $x=${x}$ into the equation: $${x} + y = ${total}$, so $y = ${y}$.`
    };
  }
};
