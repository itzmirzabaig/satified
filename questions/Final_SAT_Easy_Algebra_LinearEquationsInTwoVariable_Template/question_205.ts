import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 205
 *
 * ORIGINAL ANALYSIS: [10-ride pass cost equation]
 * - Number ranges: [p1: 10-20, p2: 1-3, total: 60-120]
 * - Difficulty factors: [Setting up cost equation]
 * - Constraints: [Prices should be reasonable]
 */

export const generator_205 = {
  metadata: {
    id: "205",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Prices in dimes; the numbers of passes are chosen first so the purchase
    // is actually possible (a random total often had no whole-number solution).
    const p1Dimes = getRandomInt(100, 200);
    const p2Dimes = getRandomInt(10, 30);
    const p1 = (p1Dimes / 10).toFixed(2);
    const p2 = (p2Dimes / 10).toFixed(2);
    const g = getRandomInt(2, 5);
    const t = getRandomInt(5, 20);
    const total = ((p1Dimes * g + p2Dimes * t) / 10).toFixed(2);

    const optionsData = [
      { text: `$${p1}g + ${p2}t = ${total}$`, isCorrect: true, reason: '' },
      { text: `$${p2}g + ${p1}t = ${total}$`, isCorrect: false, reason: `it applies the price of a single-ride pass to the multi-ride passes and the price of a multi-ride pass to the single-ride passes` },
      { text: `$g + t = ${total}$`, isCorrect: false, reason: `it sets the number of passes, not their cost, equal to ${total}` },
      { text: `$g + t = ${(parseFloat(p1) + parseFloat(p2)).toFixed(2)}$`, isCorrect: false, reason: `it sets the number of passes equal to the sum of the two prices` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A transit system sells multi-ride passes for \\$${p1} each and single-ride passes for \\$${p2} each. A group spent a total of \\$${total} on $g$ multi-ride passes and $t$ single-ride passes. Which equation represents this situation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${p1}g + ${p2}t = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. The $g$ multi-ride passes cost $${p1}g$ dollars, and the $t$ single-ride passes cost $${p2}t$ dollars. Their sum is the total amount spent, so $${p1}g + ${p2}t = ${total}$. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
