import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 175
 *
 * ORIGINAL ANALYSIS: [Daylight subtraction]
 * - Number ranges: [total: 1200-1500, x: 500-800]
 * - Difficulty factors: [Simple subtraction in context]
 * - Constraints: [x must be less than total]
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
    // Guard against option collisions: y === x (total = 2x) or y - 50 === x
    // (total = 2x + 50). Shifting x by 1 changes 2x by 2, so neither
    // collision condition can hold after the nudge (ranges stay respected).
    if (total - x === x || total - x - 50 === x) {
      x = x < 800 ? x + 1 : x - 1;
    }
    const y = total - x;

    const optionsData = [
      { text: y.toString(), isCorrect: true, reason: "" },
      { text: x.toString(), isCorrect: false, reason: "is the number of daylight minutes, $x$, not $y$" },
      { text: (y - 50).toString(), isCorrect: false, reason: "results from a subtraction error" },
      { text: total.toString(), isCorrect: false, reason: "is the total number of minutes, not $y$" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;
    const incorrect = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `The equation $x + y = ${total}$ relates the number of minutes of daylight, $x$, and the number of minutes of darkness, $y$, over a certain period. If $x = ${x}$, what is the value of $y$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: y.toString(),
      explanation: `Choice ${correctLetter} is correct. Substituting $x = ${x}$ into the equation $x + y = ${total}$ gives $y = ${total} - ${x} = ${y}$. Choice ${incorrect[0].letter} is incorrect; it ${incorrect[0].reason}. Choice ${incorrect[1].letter} is incorrect; it ${incorrect[1].reason}. Choice ${incorrect[2].letter} is incorrect; it ${incorrect[2].reason}.`
    };
  }
};
