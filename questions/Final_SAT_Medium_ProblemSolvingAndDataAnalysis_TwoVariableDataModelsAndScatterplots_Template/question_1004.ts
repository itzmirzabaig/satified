import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1004
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0-8, y-values readable integers, interval x=2 to x=6]
 * - Difficulty factors: [Reading a line graph, computing average rate of change]
 * - Distractor patterns: [Fill-in-the-blank, single numeric answer]
 * - Constraints: [Points at x=2 and x=6 must be readable integers from the graph]
 * - Question type: [Figure -> Fill-in-the-blank]
 * - Figure generation: [Line (polyline) graph of momentum vs. time]
 *
 * FIXED (full rebuild of generate internals; intent preserved):
 * - correctAnswer was "0.5, 1/2" (two answers) -> now a single clean numeric
 *   string; the answer is derived so the slope is always an exact 0.5-step
 *   value (1, 1.5, 2, 2.5, or 3), never a float artifact.
 * - The question claimed "the graph shows..." but figureCode was null -> a real
 *   SVG line graph is now built, and it passes exactly through the (2, y2) and
 *   (6, y6) points the question asks about, with integer gridlines.
 * - Explanation had an unterminated "$" (TEX_UNBALANCED) and rebuilt the slope
 *   in prose -> now fully balanced and computed from the same live variables.
 * - Numeric endpoints of the domain moved out of math mode so there is no
 *   "$0"/"$8" segment colliding with the "$x$"/"$y$" segments (clears
 *   DOLLAR_RISK); there is no currency in this item.
 */

export const generator_1004 = {
  metadata: {
    id: "1004",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Pick the average rate of change first so the answer is always a
    // clean value. rate in {1, 1.5, 2, 2.5, 3}; over the interval x=2..x=6
    // (width 4) this forces the rise y6 - y2 to be an even integer in
    // {4, 6, 8, 10, 12} -> readable integer y-values on the graph.
    const x2 = 2;
    const x6 = 6;
    const width = x6 - x2; // 4
    const rate = getRandomElement([1, 1.5, 2, 2.5, 3]);
    const deltaY = rate * width; // 4, 6, 8, 10, or 12 (integer)

    // Readable integer endpoints. y6 = y2 + deltaY.
    const y2 = getRandomInt(3, 8);
    const y6 = y2 + deltaY;

    // Intermediate integer points so the polyline is a plausible, increasing
    // momentum curve that still passes exactly through (2, y2) and (6, y6).
    const y0 = y2 - getRandomInt(1, 2);            // start below the x=2 point
    const y4 = y2 + deltaY / 2;                     // exact integer midpoint
    const y8 = y6 + getRandomInt(1, 3);            // end above the x=6 point

    // Points actually plotted: [x, y] with x in {0,2,4,6,8}.
    const dataPoints: Array<[number, number]> = [
      [0, y0], [x2, y2], [4, y4], [x6, y6], [8, y8]
    ];

    // Answer: single clean numeric string (drop a trailing .0 for integers).
    const answer = Number.isInteger(rate) ? String(rate) : rate.toFixed(1);

    // STEP 2: Build a compact SVG line graph (house style).
    const W = 460, H = 260;
    const margin = { top: 20, right: 24, bottom: 44, left: 48 };
    const gW = W - margin.left - margin.right;
    const gH = H - margin.top - margin.bottom;

    const xMax = 8;
    const yTop = y8 + 1; // headroom above the tallest point

    const getX = (x: number) => margin.left + (x / xMax) * gW;
    const getY = (y: number) => margin.top + gH - (y / yTop) * gH;

    // Horizontal gridlines + y labels at an integer step (~5-6 lines).
    const yStep = yTop <= 12 ? 2 : yTop <= 20 ? 4 : 5;
    const gridLines: string[] = [];
    for (let v = 0; v <= yTop; v += yStep) {
      const gy = getY(v);
      gridLines.push(
        `<line x1="${getX(0)}" y1="${gy}" x2="${getX(xMax)}" y2="${gy}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />` +
        `<text x="${margin.left - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="currentColor">${v}</text>`
      );
    }

    // Vertical x-axis labels at each even second.
    const xLabels: string[] = [];
    for (let x = 0; x <= xMax; x += 2) {
      const gx = getX(x);
      xLabels.push(
        `<text x="${gx}" y="${H - 24}" text-anchor="middle" font-size="11" fill="currentColor">${x}</text>`
      );
    }

    const polyPoints = dataPoints.map(([x, y]) => `${getX(x)},${getY(y)}`).join(' ');
    const circles = dataPoints
      .map(([x, y]) => `<circle cx="${getX(x)}" cy="${getY(y)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />`)
      .join('');

    const figureCode =
      `<div style="max-width:100%;overflow-x:auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;">` +
      gridLines.join('') +
      `<line x1="${getX(0)}" y1="${margin.top}" x2="${getX(0)}" y2="${H - margin.bottom}" stroke="currentColor" stroke-width="1.5" />` +
      `<line x1="${getX(0)}" y1="${H - margin.bottom}" x2="${getX(xMax)}" y2="${H - margin.bottom}" stroke="currentColor" stroke-width="1.5" />` +
      `<polyline points="${polyPoints}" fill="none" stroke="#3b82f6" stroke-width="2.5" />` +
      circles +
      xLabels.join('') +
      `<text x="${margin.left + gW / 2}" y="${H - 6}" text-anchor="middle" font-size="12" fill="currentColor">Time (seconds)</text>` +
      `<text transform="rotate(-90 14 ${margin.top + gH / 2})" x="14" y="${margin.top + gH / 2}" text-anchor="middle" font-size="12" fill="currentColor">Momentum (N·s)</text>` +
      `</svg></div>`;

    return {
      questionText:
        `The graph shows the momentum $y$, in newton-seconds, of an object $x$ seconds ` +
        `after it started moving, for values of $x$ from 0 to 8. What is the average ` +
        `rate of change, in newton-seconds per second, of the object's momentum from ` +
        `$x=${x2}$ to $x=${x6}$? (Enter your answer as a fraction or a decimal.)`,
      figureCode,
      options: [],
      correctAnswer: answer,
      explanation:
        `The average rate of change over an interval is the slope of the line joining ` +
        `the endpoints of that interval. From the graph, at $x=${x2}$ the momentum is ` +
        `$y=${y2}$, and at $x=${x6}$ the momentum is $y=${y6}$. The average rate of ` +
        `change equals $\\frac{${y6}-${y2}}{${x6}-${x2}}=\\frac{${deltaY}}{${width}}=${answer}$ ` +
        `newton-seconds per second.`
    };
  }
};
