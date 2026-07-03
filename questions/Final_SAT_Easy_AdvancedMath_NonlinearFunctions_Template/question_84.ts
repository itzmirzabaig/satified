import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 84
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yInt: 2-5, k: 6-12]
 * - Difficulty factors: [Identifying f(0) from a graph]
 * - Distractor patterns: [Origin, negative intercept, vertical asymptote constant]
 * - Constraints: [Graph must have a clear y-intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Rational function plot]
 *
 * FIXED:
 * - DUP_OPTIONS / LETTER_MISMATCH: the asymptote constant m (3-6) could equal
 *   the y-intercept yInt (2-5), duplicating two options; the duplicate then
 *   made the checker resolve the wrong choice letter. Added a bounded retry
 *   guard (plus deterministic fallback m = yInt + 1, still in [3, 6]) so
 *   m !== yInt for every draw. The remaining options {yInt, 0, -yInt, m} are
 *   pairwise distinct since yInt >= 2 and m >= 3 are positive.
 * - Figure rebuilt as a plain SVG (house style): the old Mafs code relied on
 *   a `domain` prop that Plot.OfX does not support, so the two hyperbola
 *   branches were not actually separated at the asymptote, and the viewBox
 *   scaled with k (up to 30), making the y-intercept unreadable. The SVG now
 *   uses a fixed window x in [-m-4, m+2], y in [-8, 10] with a unit grid,
 *   even-integer tick labels, a dashed vertical asymptote at x = -m, and a
 *   marked point at (0, yInt). f(x) = k/(x+m) with k = yInt*m, so f(0) = yInt
 *   exactly for every draw.
 * - Explanation now covers every distractor with letters taken from the
 *   shuffled array.
 */

export const generator_84 = {
  metadata: {
    id: "84",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yInt = getRandomInt(2, 5);

    // Denominator constant m: f(x) = k / (x + m) with k = yInt * m, so the
    // vertical asymptote is x = -m and f(0) = k / m = yInt exactly.
    let m = getRandomInt(3, 6);
    let tries = 0;
    while (m === yInt && tries++ < 50) m = getRandomInt(3, 6);
    if (m === yInt) m = yInt + 1; // deterministic fallback, stays in [3, 6]

    const k = yInt * m;

    // Math window
    const xMin = -m - 4;
    const xMax = m + 2;
    const yMin = -8;
    const yMax = 10;

    // SVG layout
    const width = 450;
    const height = 300;
    const margin = { top: 15, right: 15, bottom: 30, left: 35 };
    const gw = width - margin.left - margin.right;
    const gh = height - margin.top - margin.bottom;
    const sx = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * gw;
    const sy = (y: number) => margin.top + ((yMax - y) / (yMax - yMin)) * gh;

    // Unit grid lines
    const grid: string[] = [];
    for (let gx = xMin; gx <= xMax; gx++) {
      grid.push(`<line x1="${sx(gx).toFixed(1)}" y1="${margin.top}" x2="${sx(gx).toFixed(1)}" y2="${height - margin.bottom}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />`);
    }
    for (let gy = yMin; gy <= yMax; gy++) {
      grid.push(`<line x1="${margin.left}" y1="${sy(gy).toFixed(1)}" x2="${width - margin.right}" y2="${sy(gy).toFixed(1)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />`);
    }

    // Tick labels every 2 units (0 omitted to keep the origin clean)
    const ticks: string[] = [];
    for (let gx = xMin; gx <= xMax; gx++) {
      if (gx === 0 || gx % 2 !== 0) continue;
      ticks.push(`<text x="${sx(gx).toFixed(1)}" y="${(sy(0) + 14).toFixed(1)}" text-anchor="middle" font-size="10" fill="currentColor">${gx}</text>`);
    }
    for (let gy = yMin; gy <= yMax; gy++) {
      if (gy === 0 || gy % 2 !== 0) continue;
      ticks.push(`<text x="${(sx(0) - 6).toFixed(1)}" y="${(sy(gy) + 3.5).toFixed(1)}" text-anchor="end" font-size="10" fill="currentColor">${gy}</text>`);
    }

    // Curve y = k / (x + m), split into branches at the vertical asymptote
    const segments: string[][] = [];
    let seg: string[] = [];
    for (let px = xMin; px <= xMax + 1e-9; px += 0.02) {
      const yv = k / (px + m);
      if (!isFinite(yv) || Math.abs(px + m) < 0.04 || yv < yMin || yv > yMax) {
        if (seg.length > 1) segments.push(seg);
        seg = [];
        continue;
      }
      seg.push(`${sx(px).toFixed(1)},${sy(yv).toFixed(1)}`);
    }
    if (seg.length > 1) segments.push(seg);
    const curvePaths = segments
      .map(pts => `<polyline points="${pts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5" />`)
      .join('\n    ');

    const figureCode = `<div style="display: flex; justify-content: center;">
  <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: ${width}px; height: auto; font-family: sans-serif; user-select: none;">
    ${grid.join('\n    ')}
    <!-- Axes -->
    <line x1="${margin.left}" y1="${sy(0).toFixed(1)}" x2="${width - margin.right}" y2="${sy(0).toFixed(1)}" stroke="currentColor" stroke-width="1.8" />
    <line x1="${sx(0).toFixed(1)}" y1="${margin.top}" x2="${sx(0).toFixed(1)}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.8" />
    <text x="${(width - margin.right + 8).toFixed(1)}" y="${(sy(0) + 4).toFixed(1)}" font-size="13" font-style="italic" fill="currentColor">x</text>
    <text x="${sx(0).toFixed(1)}" y="${(margin.top - 4).toFixed(1)}" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">y</text>
    ${ticks.join('\n    ')}
    <!-- Vertical asymptote -->
    <line x1="${sx(-m).toFixed(1)}" y1="${margin.top}" x2="${sx(-m).toFixed(1)}" y2="${height - margin.bottom}" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.5" stroke-dasharray="5 4" />
    <!-- Curve -->
    ${curvePaths}
    <!-- y-intercept -->
    <circle cx="${sx(0).toFixed(1)}" cy="${sy(yInt).toFixed(1)}" r="4.5" fill="#3b82f6" stroke="white" stroke-width="1.5" />
  </svg>
</div>`;

    const optionsData = [
      {
        text: `${yInt}`,
        isCorrect: true,
        reason: ""
      },
      {
        text: `0`,
        isCorrect: false,
        reason: `the graph does not pass through the origin; it crosses the $y$-axis above the $x$-axis`
      },
      {
        text: `-${yInt}`,
        isCorrect: false,
        reason: `the graph crosses the $y$-axis at a positive value, not a negative value`
      },
      {
        text: `${m}`,
        isCorrect: false,
        reason: `this results from misreading the dashed vertical asymptote at $x = ${-m}$; it is not the value of $f(0)$`
      }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(o => o.isCorrect)!;
    const incorrectOptions = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `The graph of $y = f(x)$ is shown in the $xy$-plane. What is the value of $f(0)$?`,
      figureCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The value of $f(0)$ is the $y$-coordinate of the point where the graph crosses the $y$-axis. The graph crosses the $y$-axis at the point $(0, ${yInt})$, so $f(0) = ${yInt}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};
