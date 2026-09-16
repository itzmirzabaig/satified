import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 290
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -4, intercept: 8]
 * - Difficulty factors: [Graph interpretation, inequality testing]
 * - Distractor patterns: [points on/below the boundary line or left of origin; correct point in shaded region]
 * - Constraints: [Must generate valid linear inequality graph]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [linear inequality y >= m*x + b, shaded region]
 *
 * FIXED:
 * - Answer leak removed: the figure drew the correct option as a labeled blue
 *   dot — the answer, plotted. Marker and coordinate label deleted. The data
 *   window still spans all four option coordinates so each candidate can be
 *   checked against the graph by eye.
 * - Numbered axes: tick marks and labels on both axes (1-2-5-10 ladder, at
 *   most ~8 intervals per axis) plus a 0 at the origin.
 * - Companion fix required by numbering: the y-window could exclude y = 0,
 *   and the old code clamped the x-axis onto the window edge — a fake axis
 *   at nonzero y that numeric labels would make actively wrong. The window
 *   now always includes y = 0, so the axis is the real axis.
 * - Generation logic untouched: same random ranges, distractor construction,
 *   guard loops, options, explanation.
 */

export const generator_290 = {
  metadata: {
    id: "290",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Boundary line y = slope*x + intercept, shaded region y >= line.
    const slope = getRandomInt(-3, -1);      // negative slope
    const intercept = getRandomInt(6, 12);

    // Correct point: strictly inside the shaded region (y > line).
    const correctX = getRandomInt(1, 4);
    const boundaryAtCorrect = slope * correctX + intercept; // integer
    const correctY = boundaryAtCorrect + getRandomInt(2, 5);

    const isSolution = (x: number, y: number): boolean => y >= slope * x + intercept;

    // Build three distinct distractor points, each provably NOT a solution,
    // distinct from one another and from the correct point.
    const usedKeys = new Set<string>([`${correctX},${correctY}`]);
    const distractors: { x: number; y: number }[] = [];
    let tries = 0;
    while (distractors.length < 3 && tries++ < 200) {
      let cand: { x: number; y: number };
      const kind = distractors.length; // deterministic variety, still guarded
      if (kind === 0) {
        // On the y-axis, below the intercept (not a solution: y < intercept).
        cand = { x: 0, y: getRandomInt(intercept - 5, intercept - 1) };
      } else if (kind === 1) {
        // Below the boundary line at a positive x.
        const x = getRandomInt(1, 5);
        const lineY = slope * x + intercept;
        cand = { x, y: lineY - getRandomInt(2, 5) };
      } else {
        // Left of the origin, below the (raised) boundary there.
        const x = -getRandomInt(1, 4);
        const lineY = slope * x + intercept;
        cand = { x, y: lineY - getRandomInt(3, 8) };
      }
      const key = `${cand.x},${cand.y}`;
      if (!isSolution(cand.x, cand.y) && !usedKeys.has(key)) {
        usedKeys.add(key);
        distractors.push(cand);
      }
    }
    // Fallback guarantee (loop is bounded): fill any shortfall with guaranteed
    // non-solution points far below the line at distinct x-values.
    let fillX = 6;
    while (distractors.length < 3) {
      const x = fillX++;
      const cand = { x, y: slope * x + intercept - (10 + x) };
      const key = `${cand.x},${cand.y}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        distractors.push(cand);
      }
    }

    const allPoints = [{ x: correctX, y: correctY }, ...distractors];

    // ---- Figure: auto-scaled SVG showing boundary line + shaded region ----
    const width = 450;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 36, left: 44 };
    const gW = width - margin.left - margin.right;
    const gH = height - margin.top - margin.bottom;

    // Data window from the boundary over the visible x-span plus all points,
    // padded, so every option coordinate stays plottable against the graph.
    const xVals = allPoints.map(p => p.x);
    const yVals = allPoints.map(p => p.y);
    // include boundary y at the x-extremes so the line is always in view
    const xLo0 = Math.min(0, ...xVals);
    const xHi0 = Math.max(0, ...xVals);
    yVals.push(slope * xLo0 + intercept, slope * xHi0 + intercept, intercept);
    const xMin = Math.min(xLo0, -1) - 1;
    const xMax = Math.max(xHi0, 1) + 1;
    const yMin = Math.min(...yVals, 0) - 1; // always include y = 0 → real x-axis
    const yMax = Math.max(...yVals) + 1;

    const sx = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y: number) => margin.top + gH - ((y - yMin) / (yMax - yMin)) * gH;

    // Boundary endpoints across the full x window.
    const bx1 = xMin, by1 = slope * xMin + intercept;
    const bx2 = xMax, by2 = slope * xMax + intercept;

    // Shaded region (y >= line) clipped to the window: polygon of line + top edge.
    const region = `${sx(bx1)},${sy(by1)} ${sx(bx2)},${sy(by2)} ${sx(bx2)},${sy(yMax)} ${sx(bx1)},${sy(yMax)}`;

    // 0 is inside both windows by construction, so the axes pass through the
    // true origin (no clamping to a window edge).
    const axisX0 = sx(0);
    const axisY0 = sy(0);

    // Numbered ticks: 1-2-5-10 ladder targeting ~8 intervals per axis.
    const tickStep = (span: number): number => {
      const target = span / 8;
      return [1, 2, 5, 10].find(s => s >= target) ?? 10;
    };
    const xStep = tickStep(xMax - xMin);
    const yStep = tickStep(yMax - yMin);

    let ticks = "";
    for (let t = Math.ceil(xMin / xStep) * xStep; t <= xMax + 1e-9; t += xStep) {
      if (t === 0) continue; // 0 drawn once at the origin below
      ticks += `<line x1="${sx(t)}" y1="${axisY0 - 4}" x2="${sx(t)}" y2="${axisY0 + 4}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />`;
      ticks += `<text x="${sx(t)}" y="${axisY0 + 15}" text-anchor="middle" font-size="11" fill="currentColor">${t}</text>`;
    }
    for (let t = Math.ceil(yMin / yStep) * yStep; t <= yMax + 1e-9; t += yStep) {
      if (t === 0) continue;
      ticks += `<line x1="${axisX0 - 4}" y1="${sy(t)}" x2="${axisX0 + 4}" y2="${sy(t)}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />`;
      ticks += `<text x="${axisX0 - 8}" y="${sy(t) + 3.5}" text-anchor="end" font-size="11" fill="currentColor">${t}</text>`;
    }
    ticks += `<text x="${axisX0 - 7}" y="${axisY0 + 14}" text-anchor="end" font-size="11" fill="currentColor">0</text>`;

    const figureCode = `
      <div style="width:100%;max-width:${width}px;margin:0 auto;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;">
          <polygon points="${region}" fill="#3b82f6" fill-opacity="0.18" />
          <line x1="${sx(xMin)}" y1="${axisY0}" x2="${sx(xMax)}" y2="${axisY0}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />
          <line x1="${axisX0}" y1="${sy(yMin)}" x2="${axisX0}" y2="${sy(yMax)}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />
          ${ticks}
          <line x1="${sx(bx1)}" y1="${sy(by1)}" x2="${sx(bx2)}" y2="${sy(by2)}" stroke="#3b82f6" stroke-width="3" />
          <text x="${width - margin.right}" y="${axisY0 - 6}" text-anchor="end" font-size="12" fill="currentColor">x</text>
          <text x="${axisX0 + 6}" y="${margin.top + 10}" font-size="12" fill="currentColor">y</text>
        </svg>
      </div>
    `;

    const optionsData = [
      { text: `$(${correctX}, ${correctY})$`, isCorrect: true },
      { text: `$(${distractors[0].x}, ${distractors[0].y})$`, isCorrect: false },
      { text: `$(${distractors[1].x}, ${distractors[1].y})$`, isCorrect: false },
      { text: `$(${distractors[2].x}, ${distractors[2].y})$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The shaded region represents $y \\ge ${slope}x + ${intercept}$. A point is a solution when its $y$-value is at least $${slope}x + ${intercept}$. Testing $(${correctX}, ${correctY})$: the boundary value is $${slope}(${correctX}) + ${intercept} = ${boundaryAtCorrect}$, and $${correctY} \\ge ${boundaryAtCorrect}$ is true, so this point lies in the shaded region. Each other point fails this test because its $y$-value is below $${slope}x + ${intercept}$ at its $x$-value.`;

    return {
      questionText: `The shaded region shown represents the solutions to a linear inequality. Which ordered pair $(x, y)$ is a solution to this inequality?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};