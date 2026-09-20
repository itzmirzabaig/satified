import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1228
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 *
 * Description: Identifies which table of (x, y) pairs are all solutions to y < slope*x + intercept.
 *   Correct table: every y strictly below the boundary slope*x + intercept.
 *   Distractors each contain at least one pair that fails.
 * Fixes (repair pass):
 *   - correctAnswer was the string "Table B" while options are full HTML tables, so it
 *     matched no option (CORRECT_MISMATCH on every draw). Switched to the numeric index
 *     convention used by the sibling table question (question_1221).
 *   - Removed dead <Mafs> code that referenced an unavailable renderer and was never used.
 *   - Removed the SVG boundary-line figure per review — the inequality is stated in
 *     the stem with its actual coefficients and the options are the tables, so the
 *     question remains fully answerable; the graph-building code went with it.
 *   - Table headers use $x$/$y$ and currentColor borders for theme consistency.
 *   - Explanation derives the choice letter from the shuffled index and verifies each row
 *     from the same live values.
 */

export const generator_1228 = {
  metadata: {
    id: "1228",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Random values for the inequality y < slope*x + intercept
    const slope = getRandomInt(3, 7);
    const intercept = getRandomInt(2, 10);
    const startX = getRandomInt(2, 4);
    const xGap = getRandomInt(1, 3);
    const xValues = [startX, startX + xGap, startX + 2 * xGap];

    // STEP 2: Boundary (threshold) y-value for each x
    const thresholdValues = xValues.map(x => slope * x + intercept);

    // STEP 3: Table data
    // Correct table: every y strictly below its threshold (margin 1..4).
    const correctYValues = thresholdValues.map(t => t - getRandomInt(1, 4));

    // Distractor 1: one pair lands exactly on the boundary (y = threshold, not < ).
    const distractor1Y = [...correctYValues];
    distractor1Y[1] = thresholdValues[1];

    // Distractor 2: one pair exceeds the boundary.
    const distractor2Y = [...correctYValues];
    distractor2Y[2] = thresholdValues[2] + getRandomInt(1, 5);

    // Distractor 3: every pair is above the boundary.
    const distractor3Y = thresholdValues.map(t => t + getRandomInt(1, 3));
    // (All four tables are provably distinct: correct[i] < threshold[i] for all i,
    //  while each distractor sets at least one entry >= its threshold.)

    // STEP 4: Table HTML
    const buildTable = (yVals: number[]) => {
      const rows = xValues.map((x, i) => `
        <tr>
          <td style="border: 1px solid currentColor; padding: 6px; text-align: center;">${x}</td>
          <td style="border: 1px solid currentColor; padding: 6px; text-align: center;">${yVals[i]}</td>
        </tr>`).join('');
      return `
        <table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; font-size: 0.9em;">
          <thead>
            <tr>
              <th style="border: 1px solid currentColor; padding: 6px;">$x$</th>
              <th style="border: 1px solid currentColor; padding: 6px;">$y$</th>
            </tr>
          </thead>
          <tbody>${rows}
          </tbody>
        </table>`;
    };

    // STEP 5: Options + shuffle (index-based correctAnswer)
    const optionsData = [
      { text: buildTable(correctYValues), isCorrect: true },
      { text: buildTable(distractor1Y), isCorrect: false },
      { text: buildTable(distractor2Y), isCorrect: false },
      { text: buildTable(distractor3Y), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData);
    const correctOptionIndex = shuffledOptions.findIndex(o => o.isCorrect);
    const correctLetter = String.fromCharCode(65 + correctOptionIndex);

    // Row-by-row verification for the correct table, computed from live values.
    const verifications = xValues.map((x, i) =>
      `for $x = ${x}$, $${correctYValues[i]} < ${slope}(${x}) + ${intercept} = ${thresholdValues[i]}$`
    ).join('; ');

    return {
      questionText: `For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given inequality $y < ${slope}x + ${intercept}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOptionIndex,
      explanation: `Choice ${correctLetter} is correct. Substituting each $x$-value from this table into $y < ${slope}x + ${intercept}$ shows every corresponding $y$-value is below the boundary: ${verifications}. Each of the other tables contains at least one pair whose $y$-value is equal to or greater than $${slope}x + ${intercept}$, so those pairs are not solutions.`
    };
  }
};