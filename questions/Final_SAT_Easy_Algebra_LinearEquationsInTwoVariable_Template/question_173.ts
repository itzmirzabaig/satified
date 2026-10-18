import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 173
 *
 * ORIGINAL ANALYSIS: [Sweaters and shirts substitution]
 * - Number ranges: [c1: 25-60, c2: 15-35, total: 120-200, x: 1-3]
 * - Difficulty factors: [Substitution in cost equation]
 * - Constraints: [Result should be integer]
 *
 * FIX NOTES:
 * Two distractors were y - 1 and y + 1 ("one less/one more than the correct
 * number of shirts"). They are now the total number of items and the dollars
 * spent on shirts, and the explanation lists every choice in letter order.
 */

export const generator_173 = {
  metadata: {
    id: "173",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize costs
    const c1 = getRandomInt(25, 60);
    const c2 = getRandomInt(15, 35);
    // Number of sweaters (1-3)
    const x = getRandomInt(1, 3);
    // Number of shirts: x + (2 or 3), so y is in 3-6. The four option values
    // {y, x, x + y, c2 * y} are pairwise distinct every draw: x < y < x + y <= 9
    // < 45 <= c2 * y.
    const y = x + getRandomInt(2, 3);
    // Total built answer-first, so y is an integer by construction.
    const total = c1 * x + c2 * y;

    const optionsData = [
      { key: 'correct', text: y.toString(), isCorrect: true, reason: '' },
      { key: 'sweaters', text: x.toString(), isCorrect: false, reason: `it is the number of sweaters the customer bought, not the number of shirts` },
      { key: 'items', text: (x + y).toString(), isCorrect: false, reason: `it is the total number of sweaters and shirts the customer bought` },
      { key: 'shirtCost', text: (c2 * y).toString(), isCorrect: false, reason: `it is the amount, in dollars, the customer spent on shirts, $${c2}y$; this amount must still be divided by ${c2}` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const letterOf = (key: string) => shuffled.find(o => o.key === key)!.letter;

    return {
      questionText: `The equation $${c1}x + ${c2}y = ${total}$ gives the total cost, in dollars, of buying $x$ sweaters and $y$ shirts at a clothing store. If a customer spent this total and bought ${x} sweater${x === 1 ? '' : 's'}, how many shirts did the customer buy?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: `Choice ${letterOf('correct')} is correct. Substituting ${x} for $x$ in the given equation yields $${c1}(${x}) + ${c2}y = ${total}$, or $${c1 * x} + ${c2}y = ${total}$. Subtracting ${c1 * x} from both sides yields $${c2}y = ${total - c1 * x}$, and dividing both sides by ${c2} yields $y = ${y}$. ${shuffled.filter(o => !o.isCorrect).map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
