import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 301
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4/5, y-intercept: -7]
 * - Difficulty factors: [Graph to equation conversion, slope calculation from points]
 * - Distractor patterns: [A=correct y>=2/3x-6, B=wrong intercept sign, C=wrong intercept value, D=wrong intercept sign and value]
 * - Constraints: [Must calculate slope from two points on line]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [linear inequality y >= (rise/run)x + yIntercept, shaded region]
 *
 * FIXED (figure did not represent the options):
 * - figureCode was a Mafs JSX string. This pipeline injects figureCode as HTML,
 *   so <Mafs>/<Plot.Inequality> never mount (React components cannot come from
 *   a string), and the '>=' inside y={{ '>=': ... }} truncates the tag — the
 *   same failure class as Question 85.
 * - Even a mounted Mafs view would not have matched the options: its default
 *   ±5 window hides y-intercepts in [-10, -4], so the line would run off the
 *   bottom and the whole box would shade.
 * - Replaced with a self-contained SVG: solid boundary line (boundary included
 *   for >=), shaded region above it, numbered axes on both sides (1-2-5-10
 *   ladder + origin 0), light grid at the labeled steps, and an auto-scaled
 *   window that always contains the origin, the y-intercept, and the
 *   x-intercept — so slope, intercept, and shading side are all readable and
 *   the graph matches exactly one option in every generation.
 * - Generation logic untouched: same random ranges, distractor construction,
 *   options, explanation, metadata.
 */

export const generator_301 = {
  metadata: {
    id: "301",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rise = getRandomInt(1, 4);
    const run = getRandomInt(2, 5);
    const yIntercept = -getRandomInt(4, 10);
    const slope = rise / run;
    const xIntercept = (-yIntercept * run) / rise;

    const wrongIntercept1 = Math.abs(yIntercept);
    const wrongIntercept2 = yIntercept - 3;

    // ---- Figure: auto-scaled SVG, boundary line + shaded region above ----
    const width = 460;
    const height = 320;
    const margin = { top: 20, right: 20, bottom: 36, left: 44 };
    const gW = width - margin.left - margin.right;
    const gH = height - margin.top - margin.bottom;

    // Window: always contains the origin, the y-intercept, the x-intercept,
    // and the boundary across the full x-span (no clipping needed).
    const xMin = -3;
    const xMax = Math.ceil(xIntercept + 2);
    const yMin = Math.floor(slope * xMin + yIntercept) - 1;
    const yMax = Math.max(4, Math.ceil(slope * xMax + yIntercept) + 1);

    const sx = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y: number) => margin.top + gH - ((y - yMin) / (yMax - yMin)) * gH;

    // Boundary endpoints across the full window (both inside by construction).
    const by1 = slope * xMin + yIntercept;
    const by2 = slope * xMax + yIntercept;

    // Shaded region (y >= line): the boundary plus the top edge of the window.
    const region = `${sx(xMin)},${sy(by1)} ${sx(xMax)},${sy(by2)} ${sx(xMax)},${sy(yMax)} ${sx(xMin)},${sy(yMax)}`;

    // 0 is inside both windows by construction, so the axes pass through the
    // true origin.
    const axisX0 = sx(0);
    const axisY0 = sy(0);

    // Numbered ticks: 1-2-5-10 ladder targeting ~8 intervals per axis.
    const tickStep = (span: number): number => {
      const target = span / 8;
      return [1, 2, 5, 10].find(s => s >= target) ?? 10;
    };
    const xStep = tickStep(xMax - xMin);
    const yStep = tickStep(yMax - yMin);

    let grid = "";
    let ticks = "";
    for (let t = Math.ceil(xMin / xStep) * xStep; t <= xMax + 1e-9; t += xStep) {
      if (t === 0) continue; // 0 drawn once at the origin below
      grid += `<line x1="${sx(t)}" y1="${sy(yMin)}" x2="${sx(t)}" y2="${sy(yMax)}" stroke="currentColor" stroke-opacity="0.12" />`;
      ticks += `<line x1="${sx(t)}" y1="${axisY0 - 4}" x2="${sx(t)}" y2="${axisY0 + 4}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />`;
      ticks += `<text x="${sx(t)}" y="${axisY0 + 15}" text-anchor="middle" font-size="11" fill="currentColor">${t}</text>`;
    }
    for (let t = Math.ceil(yMin / yStep) * yStep; t <= yMax + 1e-9; t += yStep) {
      if (t === 0) continue;
      grid += `<line x1="${sx(xMin)}" y1="${sy(t)}" x2="${sx(xMax)}" y2="${sy(t)}" stroke="currentColor" stroke-opacity="0.12" />`;
      ticks += `<line x1="${axisX0 - 4}" y1="${sy(t)}" x2="${axisX0 + 4}" y2="${sy(t)}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />`;
      ticks += `<text x="${axisX0 - 8}" y="${sy(t) + 3.5}" text-anchor="end" font-size="11" fill="currentColor">${t}</text>`;
    }
    ticks += `<text x="${axisX0 - 7}" y="${axisY0 + 14}" text-anchor="end" font-size="11" fill="currentColor">0</text>`;

    const figureCode = `
      <div style="width:100%;max-width:${width}px;margin:0 auto;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;">
          ${grid}
          <polygon points="${region}" fill="#3b82f6" fill-opacity="0.18" />
          <line x1="${sx(xMin)}" y1="${axisY0}" x2="${sx(xMax)}" y2="${axisY0}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />
          <line x1="${axisX0}" y1="${sy(yMin)}" x2="${axisX0}" y2="${sy(yMax)}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />
          ${ticks}
          <line x1="${sx(xMin)}" y1="${sy(by1)}" x2="${sx(xMax)}" y2="${sy(by2)}" stroke="#3b82f6" stroke-width="3" />
          <text x="${width - margin.right}" y="${axisY0 - 6}" text-anchor="end" font-size="12" fill="currentColor">x</text>
          <text x="${axisX0 + 6}" y="${margin.top + 10}" font-size="12" fill="currentColor">y</text>
        </svg>
      </div>
    `;

    const optionsData = [
      { text: `$y \\ge \\frac{${rise}}{${run}}x ${yIntercept >= 0 ? '+' : '-'}${Math.abs(yIntercept)}$`, isCorrect: true },
      { text: `$y \\ge \\frac{${rise}}{${run}}x + ${wrongIntercept1}$`, isCorrect: false },
      { text: `$y \\ge \\frac{${rise}}{${run}}x ${wrongIntercept2 >= 0 ? '+' : '-'}${Math.abs(wrongIntercept2)}$`, isCorrect: false },
      { text: `$y \\ge \\frac{${rise}}{${run}}x + ${wrongIntercept1 + 3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The line passes through (0, ${yIntercept}) and (${xIntercept.toFixed(1)}, 0) with slope $\\frac{${rise}}{${run}}$. The shaded region is above the line, representing $y \\ge \\frac{${rise}}{${run}}x ${yIntercept >= 0 ? '+' : '-'}${Math.abs(yIntercept)}$.`;

    return {
      questionText: `The shaded region shown represents the solutions to which inequality?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};