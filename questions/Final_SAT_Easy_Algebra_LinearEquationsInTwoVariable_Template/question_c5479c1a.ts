import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c5479c1a
 *
 * ORIGINAL ANALYSIS: [Box weights substitution]
 * - Number ranges: [w1: 3-8, w2: 8-15, total: 150-300, n2: 8-18]
 * - Difficulty factors: [Substitution in weight equation]
 * - Constraints: [Result must be integer]
 */

export const generator_c5479c1a = {
  metadata: {
    // id: "c5479c1a",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize weights
    const w1 = getRandomInt(3, 8);
    const w2 = getRandomInt(8, 15);
    // Randomize number of heavier boxes
    const n2 = getRandomInt(8, 18);
    // Randomize number of lighter boxes
    const n1 = getRandomInt(10, 30);
    // Calculate total
    const total = w1 * n1 + w2 * n2;

    const optionsData = [
      { text: n1.toString(), isCorrect: true },
      { text: n2.toString(), isCorrect: false, reason: "uses large box count" },
      { text: w1.toString(), isCorrect: false, reason: "uses weight as count" },
      { text: w2.toString(), isCorrect: false, reason: "uses weight as count" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A shipment of ${w1}-lb and ${w2}-lb boxes totals ${total} lbs. If there are ${n2} ${w2}-lb boxes, how many ${w1}-lb boxes are there?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: n1.toString(),
      explanation: `Choice ${correctLetter} is correct. The ${w2}-lb boxes weigh ${w2 * n2} lbs. The remaining weight for ${w1}-lb boxes is $${total} - ${w2 * n2} = ${total - w2 * n2}$ lbs, so there are ${n1} ${w1}-lb boxes.`
    };
  }
};

/**
 * Question ID: 1efd8202
 *
 * ORIGINAL ANALYSIS: [Table values for large slope equation]
 */
