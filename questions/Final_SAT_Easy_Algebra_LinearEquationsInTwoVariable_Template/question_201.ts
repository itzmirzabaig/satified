import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 201
 *
 * ORIGINAL ANALYSIS: [Water bottle mixture equation]
 * - Number ranges: [sz1: 1-2, sz2: 2-5, total: 100-400]
 * - Difficulty factors: [Setting up capacity equation]
 * - Constraints: [Simple integers for Easy; the two bottle sizes must
 *   differ so all four option equations stay distinct.]
 */

export const generator_201 = {
  metadata: {
    id: "201",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize bottle sizes, keeping them distinct so the correct equation
    // (sz1*x + sz2*y) never coincides with the "swaps sizes" (sz2*x + sz1*y)
    // or "wrong unit size" (sz2*x + sz2*y) distractors.
    // Sizes start at 2 liters: a 1-liter size printed "1x" and "each hold 1 liters".
    const sz1 = getRandomInt(2, 3);
    const sz2 = getRandomInt(sz1 + 1, 6);
    // Randomize total volume
    const total = getRandomInt(100, 400);

    const optionsData = [
      { text: `$${sz1}x + ${sz2}y = ${total}$`, isCorrect: true, reason: '' },
      { text: `$x + y = ${total}$`, isCorrect: false, reason: `it gives the total number of bottles, not the total number of liters, as ${total}` },
      { text: `$${sz2}x + ${sz2}y = ${total}$`, isCorrect: false, reason: `it uses ${sz2} liters for both kinds of bottles, but each of the $x$ bottles holds ${sz1} liters` },
      { text: `$${sz2}x + ${sz1}y = ${total}$`, isCorrect: false, reason: `it swaps the two bottle sizes` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `A collection has $x$ bottles that each hold ${sz1} liters and $y$ bottles that each hold ${sz2} liters, for a total of ${total} liters. Which equation represents this situation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The $x$ bottles that each hold ${sz1} liters hold $${sz1}x$ liters in total, and the $y$ bottles that each hold ${sz2} liters hold $${sz2}y$ liters in total. Their sum is the total volume, so $${sz1}x + ${sz2}y = ${total}$. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
