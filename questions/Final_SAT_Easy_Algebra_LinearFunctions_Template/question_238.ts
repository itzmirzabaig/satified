import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 238
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-4, intercept: 2-5]
 * - Difficulty factors: [Calculating slope from graph]
 * - Distractor patterns: [miscalculation, y-intercept as slope, total cost for one mile]
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
    const slope = getRandomInt(1, 4);
    // intercept in [2,5] but never equal to slope, so the "y-intercept"
    // distractor can never collide with the correct slope value.
    let intercept = getRandomInt(2, 5);
    let tries = 0;
    while (intercept === slope && tries++ < 50) {
      intercept = getRandomInt(2, 5);
    }

    // ── Plain SVG line graph of y = slope*x + intercept over x in [0, 4] ──
    const xMaxData = 4;
    const yMaxData = slope * xMaxData + intercept;

    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 45 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // Round the y-axis up to a tidy maximum for gridlines.
    const yTop = Math.ceil(yMaxData / 4) * 4;

    const getX = (x: number) => margin.left + (x / xMaxData) * graphWidth;
    const getY = (y: number) => margin.top + graphHeight - (y / yTop) * graphHeight;

    // Horizontal gridlines + y labels (0 .. yTop in 4 steps).
    const yGrid: string[] = [];
    for (let k = 0; k <= 4; k++) {
      const yVal = (yTop / 4) * k;
      const y = getY(yVal);
      yGrid.push(
        `<line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />` +
        `<text x="${margin.left - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${yVal}</text>`
      );
    }

    // Vertical gridlines + x labels (0 .. xMaxData).
    const xGrid: string[] = [];
    for (let x = 0; x <= xMaxData; x++) {
      const px = getX(x);
      xGrid.push(
        `<line x1="${px}" y1="${margin.top}" x2="${px}" y2="${height - margin.bottom}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />` +
        `<text x="${px}" y="${height - margin.bottom + 18}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>`
      );
    }

    // The line and its two labelled reference points (0, intercept) and (1, slope+intercept).
    const x1 = getX(0), y1 = getY(intercept);
    const x2 = getX(xMaxData), y2 = getY(yMaxData);
    const p0x = getX(0), p0y = getY(intercept);
    const p1x = getX(1), p1y = getY(slope + intercept);

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

    const optionsData = [
      { text: slope.toFixed(2), isCorrect: true },
      { text: (slope + 0.6).toFixed(2), isCorrect: false, reason: "results from a miscalculation of the slope" },
      { text: intercept.toFixed(2), isCorrect: false, reason: "is the y-intercept (base cost), not the cost per mile" },
      { text: (slope + intercept).toFixed(2), isCorrect: false, reason: "is the total cost for one mile, not the rate" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The line graphed in the $xy$-plane above models the total cost, in dollars, for a cab ride, $y$, based on the number of miles traveled, $x$. What is the cost for each additional mile traveled?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: slope.toFixed(2),
      explanation: `Choice ${correctOption.letter} is correct. The cost for each additional mile is represented by the slope of the line. Using the points $(0, ${intercept})$ and $(1, ${slope + intercept})$, the slope is $\\frac{${slope + intercept} - ${intercept}}{1 - 0} = ${slope}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
