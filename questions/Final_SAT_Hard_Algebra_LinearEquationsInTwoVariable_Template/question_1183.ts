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
    // Pretty (LaTeX) forms for the explanation only.
    const slopeKTex = `\\frac{${slopeKNum}}{${slopeKDen}}`;
    const perpTex = rDen === 1 ? `${rNum}` : `\\frac{${rNum}}{${rDen}}`;

    // STEP 4: Figure — plain SVG showing line k through both intercepts.
    const width = 300;
    const height = 300;
    const pad = 24;
    // World window: enough to show both negative intercepts and the origin.
    const xMinW = -10, xMaxW = 2;
    const yMinW = -10, yMaxW = 2;
    const sx = (x: number) => pad + ((x - xMinW) / (xMaxW - xMinW)) * (width - 2 * pad);
    const sy = (y: number) => (height - pad) - ((y - yMinW) / (yMaxW - yMinW)) * (height - 2 * pad);

    // Gridlines + tick labels on each integer.
    let grid = '';
    for (let gx = xMinW; gx <= xMaxW; gx++) {
      const px = sx(gx);
      grid += `<line x1="${px}" y1="${sy(yMinW)}" x2="${px}" y2="${sy(yMaxW)}" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />`;
      if (gx !== 0 && gx % 2 === 0) {
        grid += `<text x="${px}" y="${sy(0) + 12}" text-anchor="middle" font-size="9" fill="currentColor" fill-opacity="0.7">${gx}</text>`;
      }
    }
    for (let gy = yMinW; gy <= yMaxW; gy++) {
      const py = sy(gy);
      grid += `<line x1="${sx(xMinW)}" y1="${py}" x2="${sx(xMaxW)}" y2="${py}" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />`;
      if (gy !== 0 && gy % 2 === 0) {
        grid += `<text x="${sx(0) - 5}" y="${py + 3}" text-anchor="end" font-size="9" fill="currentColor" fill-opacity="0.7">${gy}</text>`;
      }
    }

    // Axes through the origin.
    const axes = `
      <line x1="${sx(xMinW)}" y1="${sy(0)}" x2="${sx(xMaxW)}" y2="${sy(0)}" stroke="currentColor" stroke-width="1.5" />
      <line x1="${sx(0)}" y1="${sy(yMinW)}" x2="${sx(0)}" y2="${sy(yMaxW)}" stroke="currentColor" stroke-width="1.5" />
    `;

    // Line k: extend a little past each intercept along the line for looks.
    // Direction from (xInt,0) to (0,yInt): dx = -xInt, dy = yInt.
    const ax = xInt - 1.2, ay = 0 - 1.2 * (yInt / -xInt);         // one end (below-left)
    const bx = 0 + 1.2, by = yInt + 1.2 * (yInt / -xInt);         // other end (above-right)
    const lineK = `<line x1="${sx(ax).toFixed(1)}" y1="${sy(ay).toFixed(1)}" x2="${sx(bx).toFixed(1)}" y2="${sy(by).toFixed(1)}" stroke="#3b82f6" stroke-width="3" />`;

    // Intercept points and a "k" label near the line.
    const points = `
      <circle cx="${sx(xInt)}" cy="${sy(0)}" r="4" fill="#3b82f6" />
      <circle cx="${sx(0)}" cy="${sy(yInt)}" r="4" fill="#3b82f6" />
      <text x="${sx(bx).toFixed(1)}" y="${(sy(by) - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-style="italic" fill="#3b82f6">k</text>
    `;

    const figureCode = `
      <div style="width: 100%; max-width: 320px; margin: 0 auto;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit; user-select: none;">
          ${grid}
          ${axes}
          ${lineK}
          ${points}
        </svg>
      </div>
    `;

    // STEP 5: Explanation — signs computed from the live intercepts.
    const explanation = `
      The slope of line $k$ comes from its two intercepts, $(${xInt}, 0)$ and $(0, ${yInt})$:
      $$ m_k = \\frac{${yInt} - 0}{0 - (${xInt})} = ${slopeKTex} $$
      Line $j$ is perpendicular to line $k$, so its slope is the negative reciprocal of $m_k$:
      $$ m_j = -\\frac{1}{m_k} = -\\frac{${slopeKDen}}{${slopeKNum}} = ${perpTex} $$
      Enter your answer as a fraction or a decimal.
    `;

    return {
      questionText: `Line $k$ is shown in the $xy$-plane. Line $j$ is perpendicular to line $k$. What is the slope of line $j$? Enter your answer as a fraction or a decimal.`,
      figureCode,
      options: [],
      correctAnswer: answerStr,
      explanation
    };
  }
};
