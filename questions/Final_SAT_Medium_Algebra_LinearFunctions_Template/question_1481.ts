import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1481
 *
 * ANALYSIS:
 * - Context: Linear function given as a table of (x, f(x)) values.
 * - Given: rows at x = 0, 2, 6 for f(x) = m*x + b.
 * - Task: Find f(3) (a value not listed in the table).
 * - Logic: read b from the x = 0 row, m from any two rows, then evaluate.
 *
 * Ranges: m in [2,5], b in [-5,5]. targetX = 3, so the answer is f(3) = 3m + b.
 *
 * Distractors (each a specific reasoning error, recomputed from live m, b):
 *   - 3m       : used the slope only and forgot to add the intercept b.
 *   - 2m + b   : evaluated f(2) instead of f(3) (read the table row at x = 2).
 *   - 4m + b   : evaluated f(4) instead of f(3).
 * The "forgot intercept" value 3m equals the correct answer when b = 0, and the
 * f(2)/f(4) values can coincide with 3m for particular b, so a bounded retry
 * (<= 50) redraws until all four option values are distinct. Verified: acceptance
 * is fast (avg ~1.38 tries, max 10 over 300k trials); the loop never nears the
 * bound. As a side effect b = 0 is skipped, so the intercept is always visible.
 */

export const generator_1481 = {
  metadata: {
    id: "1481",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const targetX = 3;

    // Draw slope/intercept; retry (bounded) until the four option values differ.
    let m = 0, b = 0;
    let targetY = 0, dForgot = 0, dTwo = 0, dFour = 0;
    let tries = 0;
    do {
      m = getRandomInt(2, 5);   // slope
      b = getRandomInt(-5, 5);  // y-intercept
      targetY = m * targetX + b; // correct: f(3)
      dForgot = m * targetX;     // forgot the intercept
      dTwo = m * 2 + b;          // evaluated f(2)
      dFour = m * 4 + b;         // evaluated f(4)
    } while (
      tries++ < 50 &&
      new Set([targetY, dForgot, dTwo, dFour]).size !== 4
    );

    // Table rows at x = 0, 2, 6 (all derived from the live m, b).
    const xVals = [0, 2, 6];
    const yVals = xVals.map(x => m * x + b);

    const tableHTML = `
      <table style="border-collapse: collapse; margin: 20px auto; min-width: 200px; font-family: sans-serif; border: 1px solid currentColor;">
        <thead>
          <tr style="background-color: rgba(0,0,0,0.05);">
            <th style="border: 1px solid currentColor; padding: 8px;">$x$</th>
            <th style="border: 1px solid currentColor; padding: 8px;">$f(x)$</th>
          </tr>
        </thead>
        <tbody>
          ${xVals.map((x, i) => `
            <tr>
              <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x}</td>
              <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yVals[i]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const optionsData = [
      { text: targetY.toString(), isCorrect: true, reason: "" },
      { text: dForgot.toString(), isCorrect: false, reason: `uses only the slope, $${m}\\times${targetX}$, and forgets to add the intercept $b = ${b}$` },
      { text: dTwo.toString(), isCorrect: false, reason: `is $f(2)$, the value at $x = 2$, not $f(${targetX})$` },
      { text: dFour.toString(), isCorrect: false, reason: `is $f(4)$, not $f(${targetX})$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Sign-aware rendering of the intercept in the equation and evaluation.
    const bSign = b < 0 ? '-' : '+';
    const bAbs = Math.abs(b);

    return {
      questionText: `The table shows some values of $x$ and their corresponding values of $f(x)$ for the linear function $f$.

${tableHTML}

What is the value of $f(${targetX})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The slope is $m = \\frac{${yVals[1]} - (${yVals[0]})}{2 - 0} = \\frac{${yVals[1] - yVals[0]}}{2} = ${m}$, and the row at $x = 0$ gives the intercept $b = ${yVals[0]}$, so $f(x) = ${m}x ${bSign} ${bAbs}$. Then $f(${targetX}) = ${m}(${targetX}) ${bSign} ${bAbs} = ${m * targetX} ${bSign} ${bAbs} = ${targetY}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
