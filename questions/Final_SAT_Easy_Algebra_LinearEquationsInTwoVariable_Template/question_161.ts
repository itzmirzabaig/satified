import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 161
 *
 * ORIGINAL ANALYSIS: [Weighted sum equation setup]
 * - Number ranges: [p1: 1-3, p2: 2-5, total: 30-100]
 * - Difficulty factors: [Setting up linear equations from word problems]
 * - Constraints: [p1 and p2 should be small integers for Easy difficulty]
 */

export const generator_161 = {
  metadata: {
    id: "161",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize point values for Easy difficulty (small integers).
    // p2 is chosen from its declared range 2-5 EXCLUDING p1, so the
    // swapped-coefficient distractor can never equal the correct equation.
    const p1 = getRandomInt(1, 3);
    const p2 = getRandomElement([2, 3, 4, 5].filter(v => v !== p1));
    // Randomize total (30-100 for Easy)
    const total = getRandomInt(30, 100);

    // Render a coefficient SAT-style (omit an explicit 1)
    const coef = (k: number): string => (k === 1 ? '' : String(k));
    const correctText = `$${coef(p1)}x + ${coef(p2)}y = ${total}$`;

    const optionsData = [
      { text: correctText, isCorrect: true, reason: "" },
      { text: `$${p1 + p2}xy = ${total}$`, isCorrect: false, reason: `multiplies the two variables together instead of adding the points from each question type` },
      { text: `$${p1 + p2}(x + y) = ${total}$`, isCorrect: false, reason: `treats every question as if it were worth ${p1 + p2} points` },
      { text: `$${coef(p2)}x + ${coef(p1)}y = ${total}$`, isCorrect: false, reason: `swaps the point values of the two question types` }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;
    const incorrect = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `An assignment has ${p1}-point questions ($x$) and ${p2}-point questions ($y$) totaling ${total} points. Which equation represents this situation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The ${p1}-point questions contribute $\\,${coef(p1)}x$ points in total and the ${p2}-point questions contribute $\\,${coef(p2)}y$ points, so the total is $\\,${coef(p1)}x + ${coef(p2)}y = ${total}$. ${incorrect.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};
