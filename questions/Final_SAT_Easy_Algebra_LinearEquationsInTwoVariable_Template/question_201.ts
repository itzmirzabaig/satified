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
    const sz1 = getRandomInt(1, 2);
    let sz2 = getRandomInt(2, 5);
    let tries = 0;
    while (sz2 === sz1 && tries++ < 50) sz2 = getRandomInt(2, 5);
    if (sz2 === sz1) sz2 = sz1 + 1; // sz1 is at most 2, so sz1+1 stays in range
    // Randomize total volume
    const total = getRandomInt(100, 400);

    const optionsData = [
      { text: `$${sz1}x + ${sz2}y = ${total}$`, isCorrect: true },
      { text: `$x + y = ${total}$`, isCorrect: false, reason: "ignores the bottle sizes" },
      { text: `$${sz2}x + ${sz2}y = ${total}$`, isCorrect: false, reason: "uses one size for both bottles" },
      { text: `$${sz2}x + ${sz1}y = ${total}$`, isCorrect: false, reason: "swaps the two bottle sizes" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `A collection has $x$ bottles that each hold ${sz1} liters and $y$ bottles that each hold ${sz2} liters, for a total of ${total} liters. Which equation represents this situation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Each of the x bottles holds ${sz1} liters, contributing $${sz1}x$ liters, and each of the y bottles holds ${sz2} liters, contributing $${sz2}y$ liters. Their sum is the total volume, so $${sz1}x + ${sz2}y = ${total}$. The other choices either drop the sizes entirely or apply the wrong size to a group of bottles.`
    };
  }
};
