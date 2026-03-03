import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 39617468
 *
 * ORIGINAL ANALYSIS: [Birch and maple tree substitution]
 * - Number ranges: [total: 150-400, x: 100-300]
 * - Difficulty factors: [Simple substitution in linear equation]
 * - Constraints: [x must be less than total]
 */

export const generator_39617468 = {
  metadata: {
    // id: "39617468",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize total (150-400)
    const total = getRandomInt(150, 400);
    // Randomize x (100 to total-20)
    const x = getRandomInt(100, total - 20);
    const y = total - x;

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

/**
 * Question ID: 174885f8
 *
 * ORIGINAL ANALYSIS: [Combined distance formula setup]
 */
