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
 * - Replaced legacy Mafs Plot.Inequality with a self-contained SVG that draws
 *   the boundary line and shades y >= m*x + b, auto-scaled to fit every draw.
 * - Guarded all distractors against collisions with each other and the answer
 *   (bounded retry) so DUP_OPTIONS can never occur.
 * - Every distractor is provably NOT a solution; the correct point provably IS.
 * - Explanation reads the correct letter from the shuffled array and recomputes
 *   its numbers from the same live variables.
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
    // padded, so the drawn line/region always matches the live equation.
    const xVals = allPoints.map(p => p.x);
    const yVals = allPoints.map(p => p.y);
    // include boundary y at the x-extremes so the line is always in view
    const xLo0 = Math.min(0, ...xVals);
    const xHi0 = Math.max(0, ...xVals);
    yVals.push(slope * xLo0 + intercept, slope * xHi0 + intercept, intercept);
    const xMin = Math.min(xLo0, -1) - 1;
    const xMax = Math.max(xHi0, 1) + 1;
    const yMin = Math.min(...yVals) - 1;
    const yMax = Math.max(...yVals) + 1;

    const sx = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y: number) => margin.top + gH - ((y - yMin) / (yMax - yMin)) * gH;

    // Boundary endpoints across the full x window.
    const bx1 = xMin, by1 = slope * xMin + intercept;
    const bx2 = xMax, by2 = slope * xMax + intercept;

    // Shaded region (y >= line) clipped to the window: polygon of line + top edge.
    const region = `${sx(bx1)},${sy(by1)} ${sx(bx2)},${sy(by2)} ${sx(bx2)},${sy(yMax)} ${sx(bx1)},${sy(yMax)}`;

    const axisX0 = sx(Math.max(xMin, Math.min(xMax, 0)));
    const axisY0 = sy(Math.max(yMin, Math.min(yMax, 0)));

    // Only the correct point is marked on the figure (it is the solution shown).
    const marker = `<circle cx="${sx(correctX)}" cy="${sy(correctY)}" r="5" fill="#3b82f6" stroke="white" stroke-width="2" />`;

    const figureCode = `
      <div style="width:100%;max-width:${width}px;margin:0 auto;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;">
          <polygon points="${region}" fill="#3b82f6" fill-opacity="0.18" />
          <line x1="${sx(xMin)}" y1="${axisY0}" x2="${sx(xMax)}" y2="${axisY0}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />
          <line x1="${axisX0}" y1="${sy(yMin)}" x2="${axisX0}" y2="${sy(yMax)}" stroke="currentColor" stroke-opacity="0.4" stroke-width="1" />
          <line x1="${sx(bx1)}" y1="${sy(by1)}" x2="${sx(bx2)}" y2="${sy(by2)}" stroke="#3b82f6" stroke-width="3" />
          ${marker}
          <text x="${sx(correctX) + 8}" y="${sy(correctY) - 8}" font-size="12" fill="currentColor">(${correctX}, ${correctY})</text>
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
