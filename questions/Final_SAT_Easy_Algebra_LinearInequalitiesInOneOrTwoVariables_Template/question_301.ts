import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 301
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: proper fraction in lowest terms, y-intercept: -4 to -10]
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
    // The slope is a proper fraction in lowest terms (draws such as 2/2 and
    // 2/4 used to appear), and the rise divides the intercept so the
    // x-intercept is a whole number that can be read from the graph.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let rise = 1, run = 2, yIntercept = -4;
    do {
      rise = getRandomInt(1, 4);
      run = getRandomInt(2, 5);
      yIntercept = -getRandomInt(4, 10);
    } while (rise >= run || gcd(rise, run) !== 1 || yIntercept % rise !== 0);
    const slope = rise / run;
    const xIntercept = (-yIntercept * run) / rise;

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
    // Faint gridlines at every whole y-value, and dots on both intercepts:
    // with labels only every 2 units in y and every 5 in x, intercepts such as
    // -7 and 28 fell between gridlines and the slope could not be read.
    if (yMax - yMin <= 24) {
      for (let t = Math.ceil(yMin); t <= yMax + 1e-9; t += 1) {
        if (t % yStep === 0) continue;
        grid += `<line x1="${sx(xMin)}" y1="${sy(t)}" x2="${sx(xMax)}" y2="${sy(t)}" stroke="currentColor" stroke-opacity="0.06" />`;
      }
    }
    const dots = [[0, yIntercept], [xIntercept, 0]]
      .map(([px, py]) => `<circle cx="${sx(px)}" cy="${sy(py)}" r="4.5" fill="#3b82f6" stroke="white" stroke-width="1.5" />`)
      .join('')
      + `<text x="${sx(0) + 8}" y="${sy(yIntercept) + 16}" font-size="12" fill="currentColor">(0, ${yIntercept})</text>`
      + `<text x="${sx(xIntercept) - 6}" y="${sy(0) - 10}" text-anchor="end" font-size="12" fill="currentColor">(${xIntercept}, 0)</text>`;

    const figureCode = `
      <div style="width:100%;max-width:${width}px;margin:0 auto;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;">
          ${grid}
          <polygon points="${region}" fill="#3b82f6" fill-opacity="0.18" />
          <line x1="${sx(xMin)}" y1="${axisY0}" x2="${sx(xMax)}" y2="${axisY0}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />
          <line x1="${axisX0}" y1="${sy(yMin)}" x2="${axisX0}" y2="${sy(yMax)}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />
          ${ticks}
          <line x1="${sx(xMin)}" y1="${sy(by1)}" x2="${sx(xMax)}" y2="${sy(by2)}" stroke="#3b82f6" stroke-width="3" />
          ${dots}
          <text x="${width - margin.right}" y="${axisY0 - 6}" text-anchor="end" font-size="12" fill="currentColor">x</text>
          <text x="${axisX0 + 6}" y="${margin.top + 10}" font-size="12" fill="currentColor">y</text>
        </svg>
      </div>
    `;

    // Each wrong choice is a single real misreading of the graph. The old
    // ones moved the intercept by 3 or flipped its sign and then moved it.
    const c = Math.abs(yIntercept);
    const m = `\\frac{${rise}}{${run}}`;
    const recip = rise === 1 ? `${run}` : `\\frac{${run}}{${rise}}`;
    const lineTex = `${m}x - ${c}`;
    const optionsData = [
      { text: `$y \\ge ${lineTex}$`, isCorrect: true, reason: '' },
      { text: `$y \\ge ${m}x + ${c}$`, isCorrect: false, reason: `the graph of $y = ${m}x + ${c}$ crosses the $y$-axis at $(0, ${c})$, but the boundary line shown crosses it at $(0, ${yIntercept})$` },
      { text: `$y \\le ${lineTex}$`, isCorrect: false, reason: `this inequality describes the region below the boundary line, but the shaded region is above it` },
      { text: `$y \\ge ${recip}x - ${c}$`, isCorrect: false, reason: `its boundary line has a slope of $${recip}$, the reciprocal of the slope of the line shown` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. The boundary line passes through the points $(0, ${yIntercept})$ and $(${xIntercept}, 0)$, so its slope is $\\frac{0 - (${yIntercept})}{${xIntercept} - 0} = \\frac{${c}}{${xIntercept}} = ${m}$, and its $y$-intercept is $(0, ${yIntercept})$. An equation of the line is $y = ${lineTex}$. The shaded region is above the line and the line is solid, so the region represents $y \\ge ${lineTex}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The shaded region shown represents the solutions to which inequality?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};