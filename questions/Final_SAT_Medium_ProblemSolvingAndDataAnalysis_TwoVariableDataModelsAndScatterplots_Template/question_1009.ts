import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1009
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 1-7, y-values: 4-26, interval: 5 to 7]
 * - Difficulty factors: [Reading scatterplot, calculating average rate of change]
 * - Distractor patterns: [Fill-in-the-blank]
 * - Constraints: [Must have readable points at x=5 and x=7]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Scatterplot]
 *
 * REBUILT:
 * - Root cause (two figure bugs): the scatter points were computed but never
 *   drawn into the SVG (only axes and a single segment were injected), and that
 *   segment's upper endpoint (7, y7) ran OFF the top of the chart whenever
 *   y7 exceeded yMax=25. The student could neither see the points nor read the
 *   value at x=7.
 * - Fix: answer-first construction with an integer rate, EVEN readable y-values
 *   at x=5 and x=7 that always land on the (every-2) horizontal gridlines, and a
 *   generous yMax=30 so every point is on-screen with headroom. Figure rebuilt
 *   as a plain SVG scatterplot (house style, per question_1001): all 7 points
 *   are drawn as circles and the values at x=5 and x=7 are readable off the grid.
 */

export const generator_1009 = {
  metadata: {
    id: "1009",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first. Pick an integer rate, then readable EVEN endpoints.
    const rate = getRandomInt(4, 6);            // average rate of change (integer)
    const y5 = getRandomInt(4, 7) * 2;          // even: 8, 10, 12, or 14
    const y7 = y5 + 2 * rate;                    // even; max 14 + 12 = 26 (< yMax)

    // Remaining scatter points (integers), forming a rising trend but not on the
    // x=5..x=7 answer segment. Kept strictly within [0, yMax] for every draw.
    const points = [
      { x: 1, y: getRandomInt(2, 5) },
      { x: 2, y: getRandomInt(5, 8) },
      { x: 3, y: getRandomInt(8, 11) },
      { x: 4, y: Math.max(0, y5 - getRandomInt(2, 4)) },
      { x: 5, y: y5 },
      { x: 6, y: Math.round((y5 + y7) / 2) },
      { x: 7, y: y7 }
    ];

    // STEP 2: Figure — plain SVG scatterplot (house style).
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 44 };
    const graphW = width - margin.left - margin.right;
    const graphH = height - margin.top - margin.bottom;

    const xMin = 0, xMax = 8;
    const yMin = 0, yMax = 30;
    const mapX = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * graphW;
    const mapY = (y: number) => margin.top + graphH - ((y - yMin) / (yMax - yMin)) * graphH;

    // Vertical grid lines + x labels (every 1 minute).
    let gridX = '';
    for (let v = 1; v <= 8; v += 1) {
      const x = mapX(v);
      gridX += `<line x1="${x.toFixed(1)}" y1="${mapY(yMax).toFixed(1)}" x2="${x.toFixed(1)}" y2="${mapY(yMin).toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      gridX += `<text x="${x.toFixed(1)}" y="${(height - margin.bottom + 15)}" text-anchor="middle" font-size="9" fill="currentColor">${v}</text>`;
    }

    // Horizontal grid lines + y labels (every 2 °C so even values sit on a line).
    let gridY = '';
    for (let v = 2; v <= yMax; v += 2) {
      const y = mapY(v);
      gridY += `<line x1="${mapX(xMin).toFixed(1)}" y1="${y.toFixed(1)}" x2="${mapX(xMax).toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      gridY += `<text x="${(margin.left - 8)}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="currentColor">${v}</text>`;
    }

    // Data points.
    const circles = points.map((p) =>
      `<circle cx="${mapX(p.x).toFixed(1)}" cy="${mapY(p.y).toFixed(1)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5"/>`
    ).join('');

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;display:block;font-family:sans-serif;user-select:none;" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="transparent"/>
        ${gridX}
        ${gridY}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5"/>
        ${circles}
        <text x="${(margin.left + (width - margin.right)) / 2}" y="${height - 6}" text-anchor="middle" font-size="10" fill="currentColor">Time (minutes)</text>
        <text transform="rotate(-90, 12, ${height / 2})" x="12" y="${height / 2}" text-anchor="middle" font-size="10" fill="currentColor">Temperature (°C)</text>
      </svg>
    </div>`;

    return {
      questionText: "The scatterplot shows the recorded temperature $y$, in °C, of the air in a chamber $x$ minutes after the start of a study. What was the average rate of change, in °C per minute, of the recorded temperature from $x=5$ to $x=7$?",
      figureCode: figureCode,
      options: [],
      correctAnswer: rate.toString(),
      explanation: `At $x=5$, the temperature is $y=${y5}$, and at $x=7$, the temperature is $y=${y7}$. The average rate of change is the change in temperature divided by the change in time: $\\frac{${y7} - ${y5}}{7 - 5} = \\frac{${y7 - y5}}{2} = ${rate}$ °C per minute.`
    };
  }
};
