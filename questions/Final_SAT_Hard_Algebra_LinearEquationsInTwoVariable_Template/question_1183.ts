import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1183
 *
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Question type: Figure -> Fill in blank.
 * - Logic: Line k is drawn through its negative x- and y-intercepts. The
 *   student reads the slope of k off the two intercepts, then reports the slope
 *   of a perpendicular line j (negative reciprocal).
 * - Fixes: (1) Answer emitted in grader-safe form (plain integer or "a/b"),
 *   never LaTeX \frac. (2) Corrected the slope-sign bug in the old explanation
 *   (0 - xInt was written as 0 - |xInt|, flipping the run's sign). (3) Removed
 *   the unused rise/run variables. (4) Rebuilt the figure as a plain SVG whose
 *   drawn line passes through the two intercept points for every draw.
 */

export const generator_1183 = {
  metadata: {
    id: "1183",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Random intercepts (both negative integers).
    const xInt = -getRandomInt(4, 8); // x-intercept (xInt, 0), negative
    const yInt = -getRandomInt(3, 8); // y-intercept (0, yInt), negative

    // STEP 2: Slope of k from the two intercepts.
    //   points (xInt, 0) and (0, yInt)  ->  m_k = (yInt - 0) / (0 - xInt)
    // Both intercepts are negative, so m_k = yInt / (-xInt) is NEGATIVE.
    const slopeKNum = yInt;      // numerator (negative)
    const slopeKDen = -xInt;     // denominator (positive, since xInt < 0)

    // STEP 3: Slope of j = negative reciprocal of m_k = -(slopeKDen / slopeKNum)
    //   = -(-xInt) / yInt = xInt / yInt. Both intercepts negative -> POSITIVE.
    let perpNum = -slopeKDen;    // = xInt (negative)
    let perpDen = slopeKNum;     // = yInt (negative)
    // Normalise sign onto the numerator so the denominator is positive.
    if (perpDen < 0) { perpNum = -perpNum; perpDen = -perpDen; }

    // Reduce to lowest terms.
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
    const g = gcd(Math.abs(perpNum), perpDen) || 1;
    const rNum = perpNum / g;
    const rDen = perpDen / g;

    // Grader-safe fill-in answer: plain integer when the denominator reduces to
    // 1, otherwise "num/den".
    const answerStr = rDen === 1 ? `${rNum}` : `${rNum}/${rDen}`;
    const perpTex = rDen === 1 ? `${rNum}` : `\\frac{${rNum}}{${rDen}}`;

    // STEP 4: Figure. FIXED (review): tick labels were 9px and only on even
    // values, so an odd intercept such as -5 or -7 had no label; the axes had
    // no x and y letters; and the line was extended by a fixed 1.2 units, which
    // ran past the grid when the line was steep. The line is now clipped to the
    // window, both intercept points carry their coordinates, and the labels are
    // readable. Same scale on both axes, so the slope looks true.
    const width = 300;
    const height = 300;
    const pad = 28;
    const xMinW = -10, xMaxW = 2;
    const yMinW = -10, yMaxW = 2;
    const sx = (x: number) => pad + ((x - xMinW) / (xMaxW - xMinW)) * (width - 2 * pad);
    const sy = (y: number) => (height - pad) - ((y - yMinW) / (yMaxW - yMinW)) * (height - 2 * pad);
    const r2 = (v: number) => Math.round(v * 100) / 100;

    let grid = '';
    for (let gx = xMinW; gx <= xMaxW; gx++) {
      grid += `<line x1="${r2(sx(gx))}" y1="${r2(sy(yMinW))}" x2="${r2(sx(gx))}" y2="${r2(sy(yMaxW))}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />`;
      if (gx !== 0 && gx % 2 === 0) {
        grid += `<text x="${r2(sx(gx))}" y="${r2(sy(0) + 14)}" text-anchor="middle" font-size="11" fill="currentColor">${gx}</text>`;
      }
    }
    for (let gy = yMinW; gy <= yMaxW; gy++) {
      grid += `<line x1="${r2(sx(xMinW))}" y1="${r2(sy(gy))}" x2="${r2(sx(xMaxW))}" y2="${r2(sy(gy))}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />`;
      if (gy !== 0 && gy % 2 === 0) {
        grid += `<text x="${r2(sx(0) - 6)}" y="${r2(sy(gy) + 4)}" text-anchor="end" font-size="11" fill="currentColor">${gy}</text>`;
      }
    }

    const axes = `<line x1="${r2(sx(xMinW))}" y1="${r2(sy(0))}" x2="${r2(sx(xMaxW))}" y2="${r2(sy(0))}" stroke="currentColor" stroke-width="1.5" />` +
      `<line x1="${r2(sx(0))}" y1="${r2(sy(yMinW))}" x2="${r2(sx(0))}" y2="${r2(sy(yMaxW))}" stroke="currentColor" stroke-width="1.5" />` +
      `<text x="${r2(sx(xMaxW) + 6)}" y="${r2(sy(0) + 4)}" font-size="13" font-style="italic" fill="currentColor">x</text>` +
      `<text x="${r2(sx(0))}" y="${r2(sy(yMaxW) - 8)}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">y</text>`;

    // Line k: y = m x + yInt with m = yInt / (-xInt), clipped to the window.
    const m = yInt / -xInt;
    const clip = (x1: number, y1: number, x2: number, y2: number): [number, number, number, number] => {
      let t0 = 0, t1 = 1;
      const dx = x2 - x1, dy = y2 - y1;
      const p = [-dx, dx, -dy, dy];
      const q = [x1 - xMinW, xMaxW - x1, y1 - yMinW, yMaxW - y1];
      for (let i = 0; i < 4; i++) {
        if (p[i] === 0) continue;
        const r = q[i] / p[i];
        if (p[i] < 0) { if (r > t0) t0 = r; } else { if (r < t1) t1 = r; }
      }
      return [x1 + t0 * dx, y1 + t0 * dy, x1 + t1 * dx, y1 + t1 * dy];
    };
    const seg = clip(xMinW, m * xMinW + yInt, xMaxW, m * xMaxW + yInt);
    const lineK = `<line x1="${r2(sx(seg[0]))}" y1="${r2(sy(seg[1]))}" x2="${r2(sx(seg[2]))}" y2="${r2(sy(seg[3]))}" stroke="#3b82f6" stroke-width="2.5" />`;

    // Intercept points with coordinates placed on the side away from the line
    // (the line rises to the left), and a "k" label at the lower end.
    const points = `<circle cx="${r2(sx(xInt))}" cy="${r2(sy(0))}" r="4" fill="#3b82f6" />` +
      `<circle cx="${r2(sx(0))}" cy="${r2(sy(yInt))}" r="4" fill="#3b82f6" />` +
      `<text x="${r2(sx(xInt) + 6)}" y="${r2(sy(0) - 8)}" text-anchor="start" font-size="11" fill="currentColor">(${xInt}, 0)</text>` +
      `<text x="${r2(sx(0) + 7)}" y="${r2(sy(yInt) - 7)}" text-anchor="start" font-size="11" fill="currentColor">(0, ${yInt})</text>` +
      `<text x="${r2(sx(seg[2]) + 8)}" y="${r2(sy(seg[3]) + 4)}" font-size="13" font-style="italic" fill="#3b82f6">k</text>`;

    const figureCode = `<div style="width:100%;max-width:340px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${width + 10} ${height}" style="width:100%;height:auto;display:block;color:inherit;user-select:none;">` +
      grid + axes + lineK + points + `</svg></div>`;

    // STEP 5: Explanation, signs computed from the live intercepts. FIXED
    // (review): it did not open with "The correct answer is", wrote the slope
    // of k with the minus sign inside the numerator, and repeated the entry
    // instruction.
    const slopeKShown = `-\\frac{${-yInt}}{${-xInt}}`;
    const recipShown = `\\frac{${-xInt}}{${-yInt}}`;
    const mjChain = (g === 1 && rDen !== 1) ? recipShown : `${recipShown} = ${perpTex}`;
    const explanation = `The correct answer is ${answerStr}. Line $k$ passes through its $x$-intercept $(${xInt}, 0)$ and its $y$-intercept $(0, ${yInt})$. Moving from $(${xInt}, 0)$ to $(0, ${yInt})$, the value of $y$ changes by $${yInt}$ and the value of $x$ changes by $${-xInt}$, so the slope of line $k$ is $\\frac{${yInt}}{${-xInt}} = ${slopeKShown}$. Perpendicular lines have slopes that are negative reciprocals of each other, so the slope of line $j$ is $${mjChain}$.`;

    return {
      questionText: `Line $k$ is shown in the $xy$-plane. Line $j$ is perpendicular to line $k$. What is the slope of line $j$?`,
      figureCode,
      options: [],
      correctAnswer: answerStr,
      explanation
    };
  }
};
