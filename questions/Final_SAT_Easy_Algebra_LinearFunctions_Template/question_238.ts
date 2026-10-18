import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 238
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1.5-3.5 in steps of 0.5, intercept: 2-6]
 * - Difficulty factors: [Calculating slope from graph]
 * - Distractor patterns: [rise not divided by run, y-intercept, total cost for two miles]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 *
 * FIXED:
 * - DUP_OPTIONS/LETTER_MISMATCH: the intercept distractor could equal the
 *   correct slope (ranges [1,4] and [2,5] overlap on [2,4], e.g. slope=3,
 *   intercept=3). Constrain intercept != slope so all four options are
 *   distinct for every draw; the other three values can never coincide.
 * - Replaced legacy Mafs figure with a plain SVG line graph (house style)
 *   that actually plots y = slope*x + intercept, with axes/grid whose values
 *   match the question (base cost at x=0 is the intercept, rise per mile is
 *   the slope).
 */

export const generator_238 = {
  metadata: {
    id: "238",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The rate is a multiple of 0.50 dollars and the graph marks the points at
    // x = 0 and x = 2, both on $1 gridlines. The old graph labeled the y-axis
    // only every 4 dollars, so the marked values could not be read, and one
    // choice was the slope plus 0.60 ("a miscalculation").
    // Redraw until the base fare differs from the rate and from twice the rate.
    let slope = 2, intercept = 3;
    do {
      slope = getRandomInt(3, 7) / 2;
      intercept = getRandomInt(2, 6);
    } while (intercept === slope || intercept === 2 * slope);
    const cost2 = intercept + 2 * slope;

    // ── Plain SVG line graph of y = slope*x + intercept over x in [0, 4] ──
    const xMaxData = 4;
    const yMaxData = slope * xMaxData + intercept;

    const width = 450;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 45 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // Gridlines every dollar, labeled every 2 dollars.
    const yTop = Math.ceil(yMaxData / 2) * 2;

    const getX = (x: number) => margin.left + (x / xMaxData) * graphWidth;
    const getY = (y: number) => margin.top + graphHeight - (y / yTop) * graphHeight;

    const yGrid: string[] = [];
    for (let yVal = 0; yVal <= yTop; yVal++) {
      const y = getY(yVal);
      yGrid.push(
        `<line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="${yVal % 2 === 0 ? 0.2 : 0.1}" stroke-width="1" />` +
        (yVal % 2 === 0 ? `<text x="${margin.left - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${yVal}</text>` : '')
      );
    }

    // Vertical gridlines + x labels (0 .. xMaxData).
    const xGrid: string[] = [];
    for (let x = 0; x <= xMaxData; x++) {
      const px = getX(x);
      xGrid.push(
        `<line x1="${px}" y1="${margin.top}" x2="${px}" y2="${height - margin.bottom}" stroke="currentColor" stroke-opacity="0.2" stroke-width="1" />` +
        `<text x="${px}" y="${height - margin.bottom + 18}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>`
      );
    }

    // The line and its two marked points (0, intercept) and (2, cost2).
    const x1 = getX(0), y1 = getY(intercept);
    const x2 = getX(xMaxData), y2 = getY(yMaxData);
    const p0x = getX(0), p0y = getY(intercept);
    const p1x = getX(2), p1y = getY(cost2);

    const figureCode = `<div style="width:100%;max-width:${width}px;margin:0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;">
    ${yGrid.join('')}
    ${xGrid.join('')}
    <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
    <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#3b82f6" stroke-width="3" />
    <circle cx="${p0x}" cy="${p0y}" r="5" fill="#3b82f6" stroke="white" stroke-width="2" />
    <circle cx="${p1x}" cy="${p1y}" r="5" fill="#3b82f6" stroke="white" stroke-width="2" />
    <text x="${(margin.left + width - margin.right) / 2}" y="${height - 6}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Miles traveled</text>
    <text transform="rotate(-90, 12, ${height / 2})" x="12" y="${height / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Total cost ($)</text>
  </svg>
</div>`;

    const money = (n: number) => `\\$${n.toFixed(2)}`;
    const optionsData = [
      { text: slope.toFixed(2), isCorrect: true, reason: '' },
      { text: (2 * slope).toFixed(2), isCorrect: false, reason: `it is the increase in cost over 2 miles, from $x = 0$ to $x = 2$; that increase must be divided by 2 to find the cost for each mile` },
      { text: intercept.toFixed(2), isCorrect: false, reason: `it is the cost of a ride of 0 miles, the $y$-intercept of the graph, not the cost for each additional mile` },
      { text: cost2.toFixed(2), isCorrect: false, reason: `it is the total cost of a 2-mile ride, the $y$-coordinate of the point $(2, ${cost2})$, not the cost for each additional mile` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The line graphed in the $xy$-plane models the total cost $y$, in dollars, of a cab ride of $x$ miles. According to the graph, what is the cost, in dollars, for each additional mile traveled?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: slope.toFixed(2),
      explanation: `Choice ${correctOption.letter} is correct. The cost for each additional mile is the slope of the line. The graph passes through the points $(0, ${intercept})$ and $(2, ${cost2})$, so the slope is $\\frac{${cost2} - ${intercept}}{2} = \\frac{${cost2 - intercept}}{2} = ${slope}$. Therefore, each additional mile costs ${money(slope)}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
