import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 57
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shift: 4-7]
 * - Difficulty factors: [Solving for x-intercept of an exponential function]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Exponential function must have a whole number intercept]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Exponential growth plot]
 *
 * FIXED:
 * - The previous Mafs figure had a malformed viewBox (`x:,`) which the
 *   renderer could not parse, so it fell back to x in [-5, 5] and the
 *   x-intercept (x = shift+1, always in [5, 8]) rendered off-screen — the
 *   answer was unreadable from the graph.
 * - Replaced it with a self-contained plain SVG plot (house style) whose axes
 *   are centred on the intercept, with numbered x-axis ticks and the crossing
 *   point marked, so the x-intercept is clearly readable from the figure for
 *   every draw.
 */

export const generator_57 = {
  metadata: {
    id: "57",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const shift = getRandomInt(4, 7);
    const intercept = shift + 1;                 // solves 2^(x-shift) - 2 = 0

    // The curve y = 2^(x - shift) - 2.
    const f = (x: number) => Math.pow(2, x - shift) - 2;

    // Data ranges chosen so the x-intercept sits comfortably on-screen with
    // room either side, and the y=0 crossing is visible.
    const xMin = shift - 3;                       // intercept is at shift+1, so 4 units of margin
    const xMax = shift + 3;
    const yMin = -3;
    const yMax = 7;

    // SVG layout (compact, house exemplar ~450x250).
    const width = 460;
    const height = 260;
    const margin = { top: 20, right: 20, bottom: 36, left: 44 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;

    const sx = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * plotW;
    const sy = (y: number) => margin.top + (1 - (y - yMin) / (yMax - yMin)) * plotH;

    // Vertical grid lines + numbered x-axis ticks at every integer x.
    const xTicks: string[] = [];
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      const px = sx(x);
      xTicks.push(
        `<line x1="${px.toFixed(1)}" y1="${margin.top}" x2="${px.toFixed(1)}" y2="${(height - margin.bottom).toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />` +
        `<text x="${px.toFixed(1)}" y="${(height - margin.bottom + 16).toFixed(1)}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>`
      );
    }

    // Horizontal grid lines + numbered y-axis ticks at every 2 units.
    const yTicks: string[] = [];
    for (let y = Math.ceil(yMin / 2) * 2; y <= Math.floor(yMax); y += 2) {
      const py = sy(y);
      yTicks.push(
        `<line x1="${margin.left}" y1="${py.toFixed(1)}" x2="${(width - margin.right).toFixed(1)}" y2="${py.toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />` +
        `<text x="${(margin.left - 8).toFixed(1)}" y="${(py + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="currentColor">${y}</text>`
      );
    }

    // The curve as a dense polyline.
    const samples = 120;
    const curvePts: string[] = [];
    for (let i = 0; i <= samples; i++) {
      const x = xMin + (i / samples) * (xMax - xMin);
      const y = f(x);
      if (y < yMin - 1 || y > yMax + 1) continue;  // clip off-screen tails
      curvePts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
    }

    // Axis positions (x-axis is y=0, y-axis is x=xMin edge for the vertical line).
    const xAxisY = sy(0);
    const yAxisX = margin.left;

    // Marked x-intercept point.
    const ix = sx(intercept);
    const iy = sy(0);

    const figureCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        ${yTicks.join('')}
        ${xTicks.join('')}
        <line x1="${yAxisX}" y1="${margin.top}" x2="${yAxisX}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5" />
        <line x1="${margin.left}" y1="${xAxisY.toFixed(1)}" x2="${width - margin.right}" y2="${xAxisY.toFixed(1)}" stroke="currentColor" stroke-width="1.5" />
        <polyline points="${curvePts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5" />
        <circle cx="${ix.toFixed(1)}" cy="${iy.toFixed(1)}" r="4.5" fill="#3b82f6" stroke="white" stroke-width="1.5" />
        <text x="${width - margin.right}" y="${(margin.top + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="currentColor">y = f(x)</text>
      </svg>`;

    return {
      questionText: `What is the $x$-coordinate of the $x$-intercept of the graph shown?`,
      figureCode,
      options: [],
      correctAnswer: intercept.toString(),
      explanation: `The $x$-intercept is the point where the graph crosses the $x$-axis, so $y = 0$. Setting $2^{x-${shift}} - 2 = 0$ gives $2^{x-${shift}} = 2$, so $2^{x-${shift}} = 2^{1}$. Matching exponents, $x - ${shift} = 1$, which gives $x = ${intercept}$.`
    };
  }
};
