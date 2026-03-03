import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d1042cf8
 *
 * ORIGINAL ANALYSIS: [Cost equation with decimals]
 * - Number ranges: [p1 fork price: 0.02-0.09, p2 plate price: 0.20-0.99, quantities: 100-999 each]
 * - Difficulty factors: [Setting up a two-variable cost equation with decimal prices]
 * - Constraints: [Easy - prices are small decimals, total is a reasonable amount]
 * - Question type: [Multiple Choice Text]
 */

export const generator_d1042cf8 = {
  metadata: {
    // id: "d1042cf8",
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
    const total = ((p1Cents * qForks + p2Cents * qPlates) / 100).toFixed(2);

    const optionsData = [
      { text: `$${p1}x + ${p2}y = ${total}$`, isCorrect: true },
      { text: `$${p2}x + ${p1}y = ${total}$`, isCorrect: false, reason: "swaps coefficients" },
      { text: `$${p1}x - ${p2}y = ${total}$`, isCorrect: false, reason: "uses subtraction" },
      { text: `$${p2}x - ${p1}y = ${total}$`, isCorrect: false, reason: "swaps and subtracts" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A restaurant purchased $x$ forks at \\$${p1} each and $y$ plates at \\$${p2} each for a total of \\$${total}. Which equation represents this situation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$${p1}x + ${p2}y = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. The total cost is the sum of unit costs: $${p1}x + ${p2}y = ${total}$.`
    };
  }
};

