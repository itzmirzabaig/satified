import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 768
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4, y-intercept: -4, test point: (6, -2)]
 * - Difficulty factors: [Graph interpretation, point-in-region testing]
 * - Distractor patterns: [Points not in shaded region or on wrong side of boundary]
 * - Constraints: [Must satisfy y <= mx + b for the shaded region]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Half-plane inequality graph, rebuilt as plain SVG]
 *
 * FIXED:
 * - correctAnswer now EXACTLY equals the correct option's text ("$(x, y)$").
 * - Distractors are constructed strictly on the violating side of the SAME
 *   boundary line, so exactly one option satisfies the inequality for every
 *   draw (the old distractors satisfied the ">=" case constantly).
 * - Figure rebuilt as a self-contained SVG that actually draws the boundary
 *   line y = mx + b and shades the correct half-plane; drawn values match the
 *   question numbers. Window is derived from the live points every draw.
 * - Explanation math segments never start with a bare digit, so no bare "$d"
 *   can pair with a math "$" (clears DOLLAR_RISK); numbers are computed from
 *   the same live variables.
 */

export const generator_768 = {
  metadata: {
    id: "768",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Boundary line y = slope*x + yIntercept
    const slope = getRandomInt(2, 6);          // moderate positive slope
    const yIntercept = getRandomInt(-6, -2);   // negative y-intercept
    const useLe = getRandomInt(0, 1) === 0;    // true => y <= line, false => y >= line
    const sign = useLe ? '\\le' : '\\ge';

    // Value of the boundary line at a given x.
    const lineAt = (x: number) => slope * x + yIntercept;
    // Does point (x, y) satisfy the chosen inequality?
    const satisfies = (x: number, y: number) =>
      useLe ? y <= lineAt(x) : y >= lineAt(x);

    // STEP 2: Correct point — strictly on the satisfying side by a clear margin.
    const correctX = getRandomInt(2, 6);
    const marginC = getRandomInt(2, 5);
    const correctY = useLe ? lineAt(correctX) - marginC : lineAt(correctX) + marginC;

    // STEP 3: Three distractors — strictly on the VIOLATING side of the line,
    // with distinct x-values so the ordered pairs never collide. Bounded retry
    // guarantees uniqueness and that none accidentally satisfies the inequality.
    const options: Array<{ x: number; y: number; isCorrect: boolean }> = [
      { x: correctX, y: correctY, isCorrect: true }
    ];
    const usedX = new Set<number>([correctX]);
    const xPool = [-4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7];

    let guard = 0;
    while (options.length < 4 && guard++ < 200) {
      // pick an unused x
      let dx = xPool[getRandomInt(0, xPool.length - 1)];
      if (usedX.has(dx)) continue;
      // place y strictly on the violating side (opposite of the correct side)
      const off = getRandomInt(1, 5);
      const dy = useLe ? lineAt(dx) + off : lineAt(dx) - off;
      if (satisfies(dx, dy)) continue;            // must violate
      // guard against duplicate ordered pairs (different x already ensures this,
      // but keep the check explicit)
      if (options.some(o => o.x === dx && o.y === dy)) continue;
      usedX.add(dx);
      options.push({ x: dx, y: dy, isCorrect: false });
    }
    // Deterministic fallback (only if the pool got exhausted): fill remaining
    // slots with clearly-violating points using still-unused x values.
    for (const dx of xPool) {
      if (options.length >= 4) break;
      if (usedX.has(dx)) continue;
      const dy = useLe ? lineAt(dx) + 3 : lineAt(dx) - 3;
      usedX.add(dx);
      options.push({ x: dx, y: dy, isCorrect: false });
    }

    // STEP 4: Build figure window from the live points (+ origin) with padding.
    const xs = options.map(o => o.x).concat(0);
    const ys = options.map(o => o.y).concat(0, yIntercept);
    const xMin = Math.min(...xs) - 2;
    const xMax = Math.max(...xs) + 2;
    const yMin = Math.min(...ys) - 3;
    const yMax = Math.max(...ys) + 3;

    const W = 450, H = 300, P = 40;
    const gw = W - 2 * P, gh = H - 2 * P;
    const mx = (x: number) => P + ((x - xMin) / (xMax - xMin)) * gw;
    const my = (y: number) => P + gh - ((y - yMin) / (yMax - yMin)) * gh;

    // Axes (drawn at x=0 / y=0 if visible, else clamped to the frame edge).
    const x0 = Math.max(xMin, Math.min(xMax, 0));
    const y0 = Math.max(yMin, Math.min(yMax, 0));

    // Gridline / tick labels.
    const xStep = Math.max(1, Math.ceil((xMax - xMin) / 9));
    const yStep = Math.max(1, Math.ceil((yMax - yMin) / 7));
    let ticks = '';
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      ticks += `<line x1="${mx(x)}" y1="${P}" x2="${mx(x)}" y2="${H - P}" stroke="currentColor" stroke-opacity="0.08" stroke-width="1"/>`;
      ticks += `<text x="${mx(x)}" y="${my(y0) + 14}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
    }
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      ticks += `<line x1="${P}" y1="${my(y)}" x2="${W - P}" y2="${my(y)}" stroke="currentColor" stroke-opacity="0.08" stroke-width="1"/>`;
      ticks += `<text x="${mx(x0) - 8}" y="${my(y) + 3}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
    }

    // Boundary line across the visible x-range.
    const lx1 = xMin, ly1 = lineAt(xMin);
    const lx2 = xMax, ly2 = lineAt(xMax);

    // Shaded half-plane: clip the region { y <= line } or { y >= line } to the frame.
    // Sample the line across the window, then close along the top or bottom edge.
    const steps = 60;
    const linePts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i * (xMax - xMin)) / steps;
      linePts.push(`${mx(x)},${my(lineAt(x))}`);
    }
    const edgeY = useLe ? yMin : yMax;      // fill toward the satisfying side
    const closePts = `${mx(xMax)},${my(edgeY)} ${mx(xMin)},${my(edgeY)}`;
    const shade = `<polygon points="${linePts.join(' ')} ${closePts}" fill="#3b82f6" fill-opacity="0.12"/>`;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;user-select:none;" xmlns="http://www.w3.org/2000/svg">` +
      ticks +
      shade +
      `<line x1="${P}" y1="${my(y0)}" x2="${W - P}" y2="${my(y0)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(x0)}" y1="${P}" x2="${mx(x0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(lx1)}" y1="${my(ly1)}" x2="${mx(lx2)}" y2="${my(ly2)}" stroke="#3b82f6" stroke-width="2.5"/>` +
      `</svg></div>`;

    // STEP 5: Options — text and correctAnswer share the SAME string format.
    const fmt = (o: { x: number; y: number }) => `$(${o.x}, ${o.y})$`;
    const optionsData = options.map(o => ({ text: fmt(o), isCorrect: o.isCorrect }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctText = correctOption.text;

    // STEP 6: Explanation — numbers from live vars; math segments start with a
    // letter, "(" or "-" so no "$<digit>" can pair with a math "$".
    const bDisp = yIntercept >= 0 ? `+ ${yIntercept}` : `- ${Math.abs(yIntercept)}`;
    const explanation =
      `Choice ${correctOption.letter} is correct. The shaded region shows the solutions to $y ${sign} ${slope}x ${bDisp}$, ` +
      `so an ordered pair $(x, y)$ is a solution when its $y$-value is ${useLe ? 'at most' : 'at least'} the value of the boundary $y ${sign} ${slope}x ${bDisp}$ at that $x$. ` +
      `Testing $(${correctX}, ${correctY})$: the boundary value is $(${slope})(${correctX}) ${bDisp} = ${lineAt(correctX)}$, and $(${correctY}) ${sign} (${lineAt(correctX)})$ is true, ` +
      `so $(${correctX}, ${correctY})$ lies in the shaded region. Each other ordered pair fails the inequality (its point lies on the unshaded side of the boundary), so ${correctText} is the only solution.`;

    // STEP 7: Return
    return {
      questionText: `The shaded region shown represents the solutions to an inequality. Which ordered pair $(x, y)$ is a solution to this inequality?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
