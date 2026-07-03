import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1241
 * Skill: Systems Of Two Linear Equations In Two Variables
 * Difficulty: Hard
 *
 * Intent (from original analysis):
 * - System in variables w and r with a constant p.
 * - The system has NO SOLUTION -> the two lines are parallel but distinct.
 * - Fill-in-the-blank: find the value of p.
 *
 * Math:
 *   eq1:  p*w - den*r = b1
 *   eq2:  num*w - den*r = c2
 *   Both equations share the r-coefficient (-den), so parallel-lines
 *   requires the w-coefficients to match: p/num = (-den)/(-den) = 1  =>  p = num.
 *   Distinct (no solution, not infinitely many) requires b1 != c2, which is
 *   guaranteed by constructing c2 = b1 + positive offset.
 *
 * Fixes vs. corrupted original:
 * - Repaired import path (../../study/types).
 * - eq1 now shows the literal symbol p (was hard-coded to the numeric answer).
 * - Rebuilt the figure as a plain SVG template literal (was broken nested IIFEs
 *   with `const y = ((num);` syntax errors that failed to import). Figure now
 *   draws the two genuinely parallel lines from the live coefficients.
 * - Removed dangling duplicate comment block at end of file.
 */

export const generator_1241 = {
  metadata: {
    id: "1241",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Shared r-coefficient (den) forces p = num for parallel lines.
    const den = getRandomInt(5, 9);
    const num = getRandomInt(8, 15);   // coefficient of w in eq2  => p = num
    const p_answer = num;

    // Constants: keep them distinct so the lines are parallel-but-not-identical
    // (no solution). Constructing c2 above b1 guarantees b1 !== c2.
    const b1 = getRandomInt(2, 6);
    const c2 = b1 + getRandomInt(4, 9); // c2 in [6, 15], always > b1

    const eq1 = `pw - ${den}r = ${b1}`;
    const eq2 = `${num}w - ${den}r = ${c2}`;

    // ── Figure: two parallel lines r = (num*w - b1)/den and r = (num*w - c2)/den ──
    const W = 450, H = 250, P = 40;
    const xMin = -6, xMax = 6, yMin = -6, yMax = 6;
    const mx = (x: number) => P + (x - xMin) / (xMax - xMin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - yMin) / (yMax - yMin) * (H - 2 * P);

    // Build a clipped polyline for r as a function of w over [xMin, xMax].
    const lineFor = (rhs: number): string => {
      const pts: string[] = [];
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const x = xMin + (xMax - xMin) * (i / steps);
        const y = (num * x - rhs) / den;
        if (y >= yMin && y <= yMax) pts.push(`${mx(x).toFixed(1)},${my(y).toFixed(1)}`);
      }
      return pts.length
        ? `<polyline points="${pts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>`
        : '';
    };

    // Grid lines + axis tick labels.
    let grid = '';
    for (let x = xMin; x <= xMax; x++) {
      if (x === 0) continue;
      grid += `<line x1="${mx(x).toFixed(1)}" y1="${P}" x2="${mx(x).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.35"/>`;
      grid += `<text x="${mx(x).toFixed(1)}" y="${(my(0) + 14).toFixed(1)}" text-anchor="middle" font-size="9" fill="currentColor">${x}</text>`;
    }
    for (let y = yMin; y <= yMax; y++) {
      if (y === 0) continue;
      grid += `<line x1="${P}" y1="${my(y).toFixed(1)}" x2="${W - P}" y2="${my(y).toFixed(1)}" stroke="currentColor" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.35"/>`;
      grid += `<text x="${(mx(0) - 8).toFixed(1)}" y="${(my(y) + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="currentColor">${y}</text>`;
    }

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg">` +
      `<rect width="${W}" height="${H}" fill="transparent"/>` +
      grid +
      `<line x1="${P}" y1="${my(0).toFixed(1)}" x2="${W - P}" y2="${my(0).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(0).toFixed(1)}" y1="${P}" x2="${mx(0).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>` +
      `<text x="${W - P + 6}" y="${(my(0) + 3).toFixed(1)}" font-size="10" fill="currentColor">w</text>` +
      `<text x="${(mx(0) + 6).toFixed(1)}" y="${P - 6}" font-size="10" fill="currentColor">r</text>` +
      lineFor(b1) +
      lineFor(c2) +
      `</svg></div>`;

    return {
      questionText: `In the given system of equations, $p$ is a constant. If the system has no solution, what is the value of $p$? $$${eq1}$$ $$${eq2}$$`,
      figureCode,
      options: [],
      correctAnswer: p_answer.toString(),
      explanation: `For a system of two linear equations to have no solution, the lines must be parallel: the $w$- and $r$-coefficients are proportional while the constants are not. Both equations already have the same $r$-coefficient $(-${den})$, so the $w$-coefficients must be equal as well. Setting $\\frac{p}{${num}} = \\frac{-${den}}{-${den}} = 1$ gives $p = ${p_answer}$. With $p = ${p_answer}$ the two equations are $${num}w - ${den}r = ${b1}$ and $${num}w - ${den}r = ${c2}$, which are parallel and distinct (since $${b1} \\ne ${c2}$), so the system has no solution.`
    };
  }
};
