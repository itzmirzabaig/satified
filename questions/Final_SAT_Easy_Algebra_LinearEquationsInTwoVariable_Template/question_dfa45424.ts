import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: dfa45424
 *
 * ORIGINAL ANALYSIS: [10-ride pass cost equation]
 * - Number ranges: [p1: 10-20, p2: 1-3, total: 60-120]
 * - Difficulty factors: [Setting up cost equation]
 * - Constraints: [Prices should be reasonable]
 */

export const generator_dfa45424 = {
  metadata: {
    // id: "dfa45424",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize prices
    const p1 = (getRandomInt(100, 200) / 10).toFixed(2);
    const p2 = (getRandomInt(10, 30) / 10).toFixed(2);
    // Randomize total
    const total = getRandomInt(60, 120);

    const optionsData = [
      { text: `$${p1}g + ${p2}t = ${total}$`, isCorrect: true },
      { text: `$${p2}g + ${p1}t = ${total}$`, isCorrect: false, reason: "swaps prices" },
      { text: `$g + t = ${total}$`, isCorrect: false, reason: "confuses cost with count" },
      { text: `$g + t = ${(parseFloat(p1) + parseFloat(p2)).toFixed(2)}$`, isCorrect: false, reason: "adds prices incorrectly" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Multi-ride passes cost ${p1} each ($g$) and single-ride passes cost ${p2} each ($t$). The total cost is ${total}. Which equation represents this?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${p1}g + ${p2}t = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. The total cost is the sum of products: $${p1}g + ${p2}t = ${total}$.`
    };
  }
};

/**
 * Question ID: 6a12efbb
 *
 * ORIGINAL ANALYSIS: [Rug perimeter subtraction]
 */
