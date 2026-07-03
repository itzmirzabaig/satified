import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1245
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: reduced fraction p/q, intercepts b1 and b2 (b2 > b1), answer: p/q]
 * - Difficulty factors: [No solution from graph, identifying c (matching slope) from parallel lines]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [For no solution the lines must be parallel but distinct, so c = slope]
 * - Question type: [Figure -> Fill in blank]
 * - Figure generation: [Two parallel lines with different y-intercepts]
 *
 * FIXED:
 * - Rebuilt corrupted figure IIFEs into a single plain-SVG template literal
 *   that draws BOTH parallel lines with the live slope and both intercepts.
 * - Repaired the broken slope-display logic: slope is reduced to lowest terms
 *   and rendered identically (integer or \frac{p}{q}) in the equation and the
 *   answer, so the fill-in answer is always a clean number or a/b fraction.
 * - Corrected import to ../../study/types and removed orphaned dead comment block.
 */

export const generator_1245 = {
  metadata: {
    id: "1245",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // ── Slope as a reduced fraction ───────────────────────────────────────────
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const rawNum = getRandomInt(1, 8);
    const rawDen = getRandomInt(2, 4);
    const g = gcd(rawNum, rawDen);
    const p = rawNum / g;            // reduced numerator (>= 1)
    const q = rawDen / g;            // reduced denominator (>= 1)
    const slope = p / q;            // float, used ONLY for figure geometry

    // Slope rendered the SAME way everywhere; answer string derived from it.
    const isInteger = q === 1;
    const slopeTeX = isInteger ? `${p}` : `\\frac{${p}}{${q}}`;
    const answer = isInteger ? `${p}` : `${p}/${q}`;

    // ── Distinct y-intercepts guarantee "no solution" (parallel but not equal) ─
    const b1 = getRandomInt(3, 9);
    const b2 = b1 + getRandomInt(2, 5);

    // Equations (LaTeX inside $...$). All coefficients/intercepts are positive,
    // so there are no sign glitches to guard.
    const eq1 = `y = ${slopeTeX}x + ${b1}`;
    const eq2 = `y = cx + ${b2}`;

    // ── Figure: two parallel lines with the live slope and both intercepts ────
    const W = 450, H = 260, P = 40;
    const xMin = -5, xMax = 5;
    // Line endpoints (x = xMin, x = xMax) for both intercepts.
    const y1a = slope * xMin + b1, y1b = slope * xMax + b1;
    const y2a = slope * xMin + b2, y2b = slope * xMax + b2;
    const yLo = Math.min(y1a, y1b, y2a, y2b);
    const yHi = Math.max(y1a, y1b, y2a, y2b);
    // Pad and snap to whole numbers so gridline labels are clean.
    const yMin = Math.floor(yLo - 1.5);
    const yMax = Math.ceil(yHi + 1.5);

    const mx = (x: number): number => P + ((x - xMin) / (xMax - xMin)) * (W - 2 * P);
    const my = (y: number): number => H - P - ((y - yMin) / (yMax - yMin)) * (H - 2 * P);

    // Vertical gridlines + x labels (skip axis at x=0).
    let grid = '';
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0) continue;
      grid += `<line x1="${mx(x).toFixed(1)}" y1="${P}" x2="${mx(x).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.15"/>`;
      grid += `<text x="${mx(x).toFixed(1)}" y="${(my(0) + 14).toFixed(1)}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
    }
    // Horizontal gridlines + y labels every 2 units to avoid crowding.
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue;
      if (y % 2 !== 0 && y !== yMin && y !== yMax) continue;
      grid += `<line x1="${P}" y1="${my(y).toFixed(1)}" x2="${W - P}" y2="${my(y).toFixed(1)}" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.15"/>`;
      grid += `<text x="${(mx(0) - 8).toFixed(1)}" y="${(my(y) + 3).toFixed(1)}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
    }

    // Axes (both visible because ranges straddle 0).
    const axes =
      `<line x1="${P}" y1="${my(0).toFixed(1)}" x2="${W - P}" y2="${my(0).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(0).toFixed(1)}" y1="${P}" x2="${mx(0).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`;

    // The two parallel lines (straight -> just the two endpoints each).
    const line1 = `<polyline points="${mx(xMin).toFixed(1)},${my(y1a).toFixed(1)} ${mx(xMax).toFixed(1)},${my(y1b).toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>`;
    const line2 = `<polyline points="${mx(xMin).toFixed(1)},${my(y2a).toFixed(1)} ${mx(xMax).toFixed(1)},${my(y2b).toFixed(1)}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>`;

    // Mark and label each y-intercept so the figure numbers match the equations.
    const int1 = `<circle cx="${mx(0).toFixed(1)}" cy="${my(b1).toFixed(1)}" r="3.5" fill="#3b82f6"/>` +
      `<text x="${(mx(0) + 8).toFixed(1)}" y="${(my(b1) - 5).toFixed(1)}" font-size="10" fill="currentColor">(0, ${b1})</text>`;
    const int2 = `<circle cx="${mx(0).toFixed(1)}" cy="${my(b2).toFixed(1)}" r="3.5" fill="#3b82f6"/>` +
      `<text x="${(mx(0) + 8).toFixed(1)}" y="${(my(b2) - 5).toFixed(1)}" font-size="10" fill="currentColor">(0, ${b2})</text>`;

    const figureCode =
      `<div style="width:100%;max-width:450px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<rect width="${W}" height="${H}" fill="transparent"/>` +
      grid + axes + line1 + line2 + int1 + int2 +
      `</svg></div>`;

    return {
      questionText: `The graph shows the two lines of the system of equations below, where $c$ is a constant. If the system has no solution, what is the value of $c$? Enter your answer as a fraction or decimal. $$${eq1}$$ $$${eq2}$$`,
      figureCode,
      options: [],
      correctAnswer: answer,
      explanation: `For a system of two linear equations to have no solution, the lines must be parallel but distinct: equal slopes with different $y$-intercepts. The first line has slope $m = ${slopeTeX}$, and the two lines cross the $y$-axis at the different heights ${b1} and ${b2}, so setting $c = ${slopeTeX}$ makes the lines parallel and the system has no solution.`
    };
  }
};
