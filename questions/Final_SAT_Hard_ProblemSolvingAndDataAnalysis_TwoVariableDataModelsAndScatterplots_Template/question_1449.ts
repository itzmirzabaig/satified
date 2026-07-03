import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1449
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [point1: (2, 6), point2: (4, 15), rate: 4.5]
 * - Difficulty factors: [Calculating rate of change from two points, interpreting in context]
 * - Constraints: [Average rate of change = (y2-y1)/(x2-x1)]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Scatter plot with the two labeled points read off the axes]
 *
 * FIXED:
 * - Fill-in answer is now a single clean value (the rate is always a multiple
 *   of 0.5, so answer.toString() satisfies the plain-number format).
 * - Built the scatterplot figure (previously null) so the question is
 *   answerable; drawn points match the flight times used in the answer.
 * - Corrected \frac escaping (single backslash at runtime).
 */

export const generator_1449 = {
  metadata: {
    id: "1449",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values that yield a clean rate of change.
    const x1 = getRandomInt(1, 4);
    const x2 = x1 + getRandomInt(2, 4); // separation of 2-4 days
    const y1 = getRandomInt(2, 10);
    // Rate is a multiple of 0.5 so the average rate of change is a clean value.
    const rate = getRandomElement([2, 2.5, 3, 3.5, 4, 4.5]);
    const y2 = y1 + rate * (x2 - x1); // stays <= 10 + 4.5*4 = 28

    const baseDay = getRandomInt(5, 15);
    const day1 = baseDay + x1;
    const day2 = baseDay + x2;
    const date1 = `January ${day1}`;
    const date2 = `January ${day2}`;

    // STEP 2: Answer — average rate of change (hours per day).
    const answer = rate; // (y2 - y1) / (x2 - x1) by construction

    // STEP 3: Build the scatterplot. Every integer day from x1..x2 gets a point
    // on the line y = y1 + rate*(x - x1), so the two named points read exactly.
    const width = 460;
    const height = 260;
    const margin = { top: 20, right: 24, bottom: 46, left: 52 };
    const graphW = width - margin.left - margin.right;
    const graphH = height - margin.top - margin.bottom;

    const xAxisMax = x2 + 1;              // leave a little room on the right
    const yValues: number[] = [];
    for (let x = x1; x <= x2; x++) yValues.push(y1 + rate * (x - x1));
    const yAxisMax = Math.ceil(Math.max(...yValues) + 2);

    const getX = (x: number) => margin.left + (x / xAxisMax) * graphW;
    const getY = (y: number) => margin.top + graphH - (y / yAxisMax) * graphH;

    // Y gridlines/labels (integer hours, step chosen to keep <= 8 lines)
    const yStep = yAxisMax > 16 ? 4 : 2;
    let yGrid = '';
    for (let y = 0; y <= yAxisMax; y += yStep) {
      const gy = getY(y);
      yGrid += `<line x1="${getX(0)}" y1="${gy}" x2="${getX(xAxisMax)}" y2="${gy}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />`;
      yGrid += `<text x="${getX(0) - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="currentColor">${y}</text>`;
    }

    // X ticks/labels (integer days after January baseDay)
    let xTicks = '';
    for (let x = 0; x <= xAxisMax; x++) {
      const gx = getX(x);
      xTicks += `<text x="${gx}" y="${height - 26}" text-anchor="middle" font-size="11" fill="currentColor">${x}</text>`;
    }

    // Data points; highlight the two queried days.
    let dots = '';
    for (let x = x1; x <= x2; x++) {
      const y = y1 + rate * (x - x1);
      const highlight = x === x1 || x === x2;
      dots += `<circle cx="${getX(x)}" cy="${getY(y)}" r="${highlight ? 5 : 4}" fill="#3b82f6" stroke="white" stroke-width="1.5" />`;
      if (highlight) {
        dots += `<text x="${getX(x)}" y="${getY(y) - 10}" text-anchor="middle" font-size="11" font-weight="bold" fill="#3b82f6">(${x}, ${y})</text>`;
      }
    }

    const figureCode = `<div style="text-align:center;">
  <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:sans-serif; user-select:none;">
    ${yGrid}
    <line x1="${getX(0)}" y1="${margin.top}" x2="${getX(0)}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
    <line x1="${getX(0)}" y1="${height - margin.bottom}" x2="${getX(xAxisMax)}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
    ${xTicks}
    ${dots}
    <text x="${margin.left + graphW / 2}" y="${height - 6}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Days after January ${baseDay}</text>
    <text transform="rotate(-90, 14, ${margin.top + graphH / 2})" x="14" y="${margin.top + graphH / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Flight time (hours)</text>
  </svg>
</div>`;

    // STEP 4: Return fill-in question.
    return {
      questionText: `The scatterplot shows the relationship between the length of time, in hours, a certain bird spent in flight and the number of days after January ${baseDay}.

What is the average rate of change, in hours per day, of the length of time the bird spent in flight from ${date1} to ${date2}?`,
      figureCode,
      options: [],
      correctAnswer: answer.toString(),
      explanation: `${date1} is ${x1} day${x1 === 1 ? '' : 's'} after January ${baseDay} ($x=${x1}$), where the flight time is ${y1} hours. ${date2} is ${x2} days after January ${baseDay} ($x=${x2}$), where the flight time is ${y2} hours. The average rate of change is $\\frac{${y2}-${y1}}{${x2}-${x1}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${answer}$ hours per day.`
    };
  }
};
