import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 203
 *
 * ORIGINAL ANALYSIS: [Cost equation with decimals]
 * - Number ranges: [p1 fork price: 0.02-0.09, p2 plate price: 0.20-0.99, quantities: 100-999 each]
 * - Difficulty factors: [Setting up a two-variable cost equation with decimal prices]
 * - Constraints: [Easy - prices are small decimals, total is a reasonable amount]
 * - Question type: [Multiple Choice Text]
 */

export const generator_203 = {
  metadata: {
    id: "203",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate prices as multiples of 0.01 to avoid floating point issues
    const p1Cents = getRandomInt(2, 9);   // fork price in cents (e.g., 0.04)
    const p2Cents = getRandomInt(20, 99); // plate price in cents (e.g., 0.48)
    const p1 = (p1Cents / 100).toFixed(2);
    const p2 = (p2Cents / 100).toFixed(2);

    // Generate quantities and compute total
    const qForks = getRandomInt(100, 999);
    const qPlates = getRandomInt(100, 999);
    // Totals can pass $1,000, so group thousands with a comma.
    const total = ((p1Cents * qForks + p2Cents * qPlates) / 100)
      .toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const optionsData = [
      { text: `$${p1}x + ${p2}y = ${total}$`, isCorrect: true, reason: '' },
      { text: `$${p2}x + ${p1}y = ${total}$`, isCorrect: false, reason: `it applies the price of a plate to the forks and the price of a fork to the plates` },
      { text: `$${p1}x - ${p2}y = ${total}$`, isCorrect: false, reason: `it subtracts the cost of the plates instead of adding it` },
      { text: `$${p2}x - ${p1}y = ${total}$`, isCorrect: false, reason: `it swaps the two prices and subtracts instead of adding` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A restaurant purchased $x$ forks at \\$${p1} each and $y$ plates at \\$${p2} each for a total of \\$${total}. Which equation represents this situation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${p1}x + ${p2}y = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. The $x$ forks cost \\$${p1} each, for a total of $${p1}x$ dollars, and the $y$ plates cost \\$${p2} each, for a total of $${p2}y$ dollars. The total cost is the sum of these amounts, so $${p1}x + ${p2}y = ${total}$. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};

