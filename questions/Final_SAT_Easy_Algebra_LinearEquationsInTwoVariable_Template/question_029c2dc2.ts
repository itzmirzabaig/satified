import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 029c2dc2
 *
 * ORIGINAL ANALYSIS: [Weighted sum equation setup]
 * - Number ranges: [p1: 1-3, p2: 2-5, total: 30-100]
 * - Difficulty factors: [Setting up linear equations from word problems]
 * - Constraints: [p1 and p2 should be small integers for Easy difficulty]
 */

export const generator_029c2dc2 = {
  metadata: {
    // id: "029c2dc2",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize point values for Easy difficulty (small integers)
    const p1 = getRandomInt(1, 3);
    const p2 = getRandomInt(2, 5);
    // Randomize total (30-100 for Easy)
    const total = getRandomInt(30, 100);

    const optionsData = [
      { text: `$${p1}x + ${p2}y = ${total}$`, isCorrect: true },
      { text: `$${p1 + p2}xy = ${total}$`, isCorrect: false, reason: "multiplies variables" },
      { text: `$${p1 + p2}(x+y) = ${total}$`, isCorrect: false, reason: "wrong unit values" },
      { text: `$${p2}x + ${p1}y = ${total}$`, isCorrect: false, reason: "swaps coefficients" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `An assignment has ${p1}-point questions ($x$) and ${p2}-point questions ($y$) totaling ${total} points. Which equation represents this?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${p1}x + ${p2}y = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. The weighted sum equation is $${p1}x + ${p2}y = ${total}$, where $x$ represents the number of ${p1}-point questions and $y$ represents the number of ${p2}-point questions.`
    };
  }
};

/**
 * Question ID: c5479c1a
 *
 * ORIGINAL ANALYSIS: [Box weights substitution]
 */
