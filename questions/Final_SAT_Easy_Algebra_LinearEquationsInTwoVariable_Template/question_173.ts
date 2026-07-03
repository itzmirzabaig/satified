import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 173
 *
 * ORIGINAL ANALYSIS: [Sweaters and shirts substitution]
 * - Number ranges: [c1: 25-60, c2: 15-35, total: 120-200, x: 1-3]
 * - Difficulty factors: [Substitution in cost equation]
 * - Constraints: [Result should be integer]
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
    // Number of shirts: constructed as x + (2 or 3), so y is in 3-6 and the
    // four option values {y, y-1, y+1, x} are pairwise distinct every draw
    // (y - 1 >= x + 1 > x, so x can never collide with y or y +/- 1).
    const y = x + getRandomInt(2, 3);
    // Total built answer-first, so y is an integer by construction.
    const total = c1 * x + c2 * y;

    const optionsData = [
      { key: 'correct', text: y.toString(), isCorrect: true },
      { key: 'minusOne', text: (y - 1).toString(), isCorrect: false }, // subtraction error
      { key: 'plusOne', text: (y + 1).toString(), isCorrect: false },  // addition error
      { key: 'sweaters', text: x.toString(), isCorrect: false }        // uses sweater count
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const letterOf = (key: string) => shuffled.find(o => o.key === key)!.letter;

    return {
      questionText: `The equation $ ${c1}x + ${c2}y = ${total} $ gives the total cost, in dollars, of buying $x$ sweaters and $y$ shirts at a clothing store. If a customer spent this total and bought ${x} sweater${x === 1 ? '' : 's'}, how many shirts did the customer buy?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: `Choice ${letterOf('correct')} is correct. Substituting $x = ${x}$ into the equation gives $ ${c1}(${x}) + ${c2}y = ${total} $, which simplifies to $ ${c1 * x} + ${c2}y = ${total} $. Subtracting ${c1 * x} from both sides gives $ ${c2}y = ${total - c1 * x} $, so $ y = ${total - c1 * x} \\div ${c2} = ${y} $. The customer bought ${y} shirts. Choice ${letterOf('minusOne')} is incorrect; it is one less than the correct number of shirts. Choice ${letterOf('plusOne')} is incorrect; it is one more than the correct number of shirts. Choice ${letterOf('sweaters')} is incorrect; it is the number of sweaters the customer bought, not the number of shirts.`
    };
  }
};
