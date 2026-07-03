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
 *   - Added a compact self-contained SVG of the boundary line (dashed for the strict
 *     inequality) with the solution region shaded below, drawn from the live slope/intercept.
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

    // STEP 6: SVG figure of the boundary line (dashed, strict) with region shaded below.
    const width = 300;
    const height = 300;
    const padding = 40;
    const xMin = 0;
    const xMax = Math.max(...xValues) + 2;
    const yMin = 0;
    const yMax = (slope * xMax + intercept) + 4;

    const mapX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const mapY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    // Boundary endpoints across the visible x-range.
    const bx1 = xMin, by1 = slope * xMin + intercept;
    const bx2 = xMax, by2 = slope * xMax + intercept;
    // Shade the region BELOW the line (down to the x-axis).
    const polyPoints = [
      `${mapX(bx1)},${mapY(by1)}`,
      `${mapX(bx2)},${mapY(by2)}`,
      `${mapX(bx2)},${mapY(yMin)}`,
      `${mapX(bx1)},${mapY(yMin)}`
    ].join(' ');

    const figureCode = `
    <div style="width: 100%; max-width: 360px; margin: 0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit; font-family: sans-serif;">
        <defs>
          <marker id="arrow1228" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
        <!-- Solution region (y < boundary), shaded below the line -->
        <polygon points="${polyPoints}" fill="#3b82f6" fill-opacity="0.15" />
        <!-- Axes -->
        <line x1="${mapX(xMin)}" y1="${mapY(0)}" x2="${width - padding + 8}" y2="${mapY(0)}" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow1228)" />
        <line x1="${mapX(0)}" y1="${height - padding}" x2="${mapX(0)}" y2="${padding - 8}" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow1228)" />
        <!-- Boundary line (dashed: strict inequality, boundary not included) -->
        <line x1="${mapX(bx1)}" y1="${mapY(by1)}" x2="${mapX(bx2)}" y2="${mapY(by2)}" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,5" />
        <!-- Labels -->
        <text x="${width - padding + 6}" y="${mapY(0) + 16}" fill="currentColor" text-anchor="middle" font-size="12">x</text>
        <text x="${mapX(0) - 14}" y="${padding - 4}" fill="currentColor" text-anchor="middle" font-size="12">y</text>
        <text x="${mapX(0) - 8}" y="${mapY(0) + 14}" fill="currentColor" font-size="10">O</text>
      </svg>
    </div>`;

    // Row-by-row verification for the correct table, computed from live values.
    const verifications = xValues.map((x, i) =>
      `for $x = ${x}$, $${correctYValues[i]} < ${slope}(${x}) + ${intercept} = ${thresholdValues[i]}$`
    ).join('; ');

    return {
      questionText: `For which of the following tables are all the values of $x$ and their corresponding values of $y$ solutions to the given inequality $y < ${slope}x + ${intercept}$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOptionIndex,
      explanation: `Choice ${correctLetter} is correct. Substituting each $x$-value from this table into $y < ${slope}x + ${intercept}$ shows every corresponding $y$-value is below the boundary: ${verifications}. Each of the other tables contains at least one pair whose $y$-value is equal to or greater than $${slope}x + ${intercept}$, so those pairs are not solutions.`
    };
  }
};
