import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c8e0f511
 *
 * ORIGINAL ANALYSIS: [Water bottle mixture equation]
 * - Number ranges: [sz1: 1-2, sz2: 2-5, total: 100-400]
 * - Difficulty factors: [Setting up capacity equation]
 * - Constraints: [Simple integers for Easy]
 */

export const generator_c8e0f511 = {
  metadata: {
    // id: "c8e0f511",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize bottle sizes
    const sz1 = getRandomInt(1, 2);
    const sz2 = getRandomInt(2, 5);
    // Randomize total volume
    const total = getRandomInt(100, 400);

    const optionsData = [
      { text: `$${sz1}x + ${sz2}y = ${total}$`, isCorrect: true },
      { text: `$x + y = ${total}$`, isCorrect: false, reason: "ignores bottle sizes" },
      { text: `$${sz2}x + ${sz2}y = ${total}$`, isCorrect: false, reason: "wrong unit size" },
      { text: `$${sz2}x + ${sz1}y = ${total}$`, isCorrect: false, reason: "swaps sizes" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `$x$ ${sz1}-liter bottles and $y$ ${sz2}-liter bottles total ${total} liters. Which equation represents this?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${sz1}x + ${sz2}y = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. Summing the capacities gives: $${sz1}x + ${sz2}y = ${total}$.`
    };
  }
};

/**
 * Question ID: 029c2dc2
 *
 * ORIGINAL ANALYSIS: [Weighted sum equation setup]
 */
