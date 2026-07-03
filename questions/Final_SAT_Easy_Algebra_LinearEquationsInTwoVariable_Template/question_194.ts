import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 194
 *
 * ORIGINAL ANALYSIS: [Linear setup with decimals]
 *
 * Intent: A worker prepares two food items, each with a fixed per-unit time.
 * Given the total time spent, choose the linear equation relating the number
 * of each item (x = sandwiches, y = salads). Correct model: t1*x + t2*y = total.
 *
 * Fixes: x and y are the item COUNTS (not the times, as the prose previously
 * mislabeled). t1 and t2 are forced distinct so the "swapped coefficients"
 * distractor can never equal the correct equation, and every option string is
 * distinct for every draw. total is derived from clean sample counts so it is
 * a tidy one-decimal number.
 */

export const generator_194 = {
  metadata: {
    id: "194",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Per-unit times, one decimal place, forced distinct so the swapped-
    // coefficient distractor differs from the correct equation.
    const t1 = getRandomInt(11, 29) / 10; // 1.1 .. 2.9 min per sandwich
    let t2 = getRandomInt(11, 29) / 10;   // 1.1 .. 2.9 min per salad
    let guard = 0;
    while (t2 === t1 && guard++ < 50) {
      t2 = getRandomInt(11, 29) / 10;
    }

    // Sample counts used only to make the stated total a realistic, tidy number.
    const nSandwich = getRandomInt(4, 12);
    const nSalad = getRandomInt(4, 12);
    // total is exact to one decimal (times have one decimal, counts integer).
    const total = Math.round((t1 * nSandwich + t2 * nSalad) * 10) / 10;

    // Sum of the two per-unit times, one decimal (used by the distribution
    // distractor). Distinct from t1 and t2 since both are >= 1.1.
    const tSum = Math.round((t1 + t2) * 10) / 10;

    const t1s = t1.toFixed(1);
    const t2s = t2.toFixed(1);
    const totals = total.toFixed(1);
    const tSums = tSum.toFixed(1);

    const optionsData = [
      { text: `$${t1s}x + ${t2s}y = ${totals}$`, isCorrect: true },
      { text: `$${t2s}x + ${t1s}y = ${totals}$`, isCorrect: false, reason: "swaps which time goes with which item count" },
      { text: `$x + y = ${totals}$`, isCorrect: false, reason: "ignores the per-item minutes" },
      { text: `$${tSums}(x + y) = ${totals}$`, isCorrect: false, reason: "applies one combined rate to both item counts" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A worker makes sandwiches and salads. Each sandwich takes ${t1s} minutes to prepare and each salad takes ${t2s} minutes. In total, ${totals} minutes are spent. Which equation relates the number of sandwiches, $x$, and the number of salads, $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${t1s}x + ${t2s}y = ${totals}$`,
      explanation: `Choice ${correctLetter} is correct. Each sandwich contributes ${t1s} minutes and each salad contributes ${t2s} minutes, so the total preparation time is $${t1s}x + ${t2s}y = ${totals}$.`
    };
  }
};
