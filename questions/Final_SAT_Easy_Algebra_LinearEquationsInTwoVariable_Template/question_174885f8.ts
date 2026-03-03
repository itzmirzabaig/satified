import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 174885f8
 *
 * ORIGINAL ANALYSIS: [Combined distance formula setup]
 * - Number ranges: [speed1: 2-5, speed2: 4-8, total: 10-25]
 * - Difficulty factors: [Setting up distance equation from rates and times]
 * - Constraints: [Simple integers for Easy difficulty]
 */

export const generator_174885f8 = {
  metadata: {
    // id: "174885f8",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize speeds (2-5 mph and 4-8 mph for Easy)
    const s1 = getRandomInt(2, 5);
    const s2 = getRandomInt(4, 8);
    // Randomize total distance (10-25 miles)
    const total = getRandomInt(10, 25);

    const optionsData = [
      { text: `$${s1}w + ${s2}r = ${total}$`, isCorrect: true },
      { text: `$\\frac{1}{${s1}}w + \\frac{1}{${s2}}r = ${total}$`, isCorrect: false, reason: "divides instead of multiplying" },
      { text: `$\\frac{1}{${s1}}w + \\frac{1}{${s2}}r = ${total * s1}$`, isCorrect: false, reason: "divides and wrong total" },
      { text: `$${s1}w + ${s2}r = ${total * s1}$`, isCorrect: false, reason: "wrong total" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Jay walks at ${s1} mph ($w$ hours) and runs at ${s2} mph ($r$ hours) for a total of ${total} miles. Which equation represents this?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${s1}w + ${s2}r = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. Distance = rate × time, so the distances sum to: $${s1}w + ${s2}r = ${total}$.`
    };
  }
};

/**
 * Question ID: 8da536c6
 *
 * ORIGINAL ANALYSIS: [Weighted growth rate equation]
 */
