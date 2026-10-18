import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 175
 *
 * ORIGINAL ANALYSIS: [Daylight subtraction]
 * - Number ranges: [total: 1200-1500, x: 500-800]
 * - Difficulty factors: [Simple subtraction in context]
 * - Constraints: [x must be less than total]
 *
 * FIX NOTES:
 * One distractor was y - 50, "a subtraction error". It is now total + x
 * (adding instead of subtracting). Four digit values show a thousands comma
 * (1,325), and the reasons read "is incorrect because it ...".
 */

export const generator_175 = {
  metadata: {
    id: "175",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize total minutes (1200-1500)
    const total = getRandomInt(1200, 1500);
    // Randomize daylight minutes (500-800)
    let x = getRandomInt(500, 800);
    // Guard against y === x (total = 2x). Shifting x by 1 changes 2x by 2, so
    // the collision cannot hold after the nudge (ranges stay respected). The
    // other choices never collide: x, y < total < total + x.
    if (total - x === x) {
      x = x < 800 ? x + 1 : x - 1;
    }
    const y = total - x;
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: fmt(y), isCorrect: true, reason: "" },
      { text: fmt(x), isCorrect: false, reason: "is the number of minutes of daylight, $x$, not $y$" },
      { text: fmt(total + x), isCorrect: false, reason: `results from adding ${fmt(x)} to ${fmt(total)} instead of subtracting ${fmt(x)} from ${fmt(total)}` },
      { text: fmt(total), isCorrect: false, reason: "is the total number of minutes, not $y$" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;
    const incorrect = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `The equation $x + y = ${fmt(total)}$ relates the number of minutes of daylight, $x$, and the number of minutes of darkness, $y$, over a certain period. If $x = ${x}$, what is the value of $y$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: fmt(y),
      explanation: `Choice ${correctLetter} is correct. Substituting ${x} for $x$ in the equation $x + y = ${fmt(total)}$ gives $${x} + y = ${fmt(total)}$. Subtracting ${x} from both sides gives $y = ${fmt(total)} - ${x} = ${fmt(y)}$. ${incorrect.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
