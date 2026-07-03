import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 636
 *
 * Given the graphs of a system in the xy-plane, identify the system.
 * Correct system: y = x^2 + c (parabola opening up, vertex (0, c))
 *                 y = c - x   (line, y-intercept c, slope -1)
 * The two curves intersect at (0, c) and (-1, c + 1).
 *
 * FIXES:
 * - Rebuilt the broken Mafs/JSX figure (it contained HTML comments and
 *   out-of-scope refs) as a plain SVG line graph per house style. Drawn
 *   curves use the live constant c so the figure matches the answer.
 * - Wrapped each option's equations in $...$ so MathJax renders them.
 * - Fixed unbalanced $ in the explanation (stray "is c$" / "intercept c and").
 */
export const generator_636 = {
  metadata: {
    id: "636",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math setup
    const c = getRandomInt(2, 5);

    // Parabola y = x^2 + c opens up, vertex (0, c).
    // Line y = c - x has y-intercept c and slope -1.
    // Intersections: x^2 + c = c - x  =>  x^2 + x = 0  =>  x = 0 or x = -1.
    //   (0, c) and (-1, c + 1)

    // 2. SVG figure (plain template literal, values derived from c)
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const gW = width - margin.left - margin.right;
    const gH = height - margin.top - margin.bottom;

    const xMin = -3, xMax = 3;
    const yMin = 0, yMax = c + 6; // captures vertex (0,c) and both intersections

    const sx = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * gW;
    const sy = (y: number) => margin.top + gH - ((y - yMin) / (yMax - yMin)) * gH;

    // Parabola samples
    const paraPts: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const x = xMin + (i / 60) * (xMax - xMin);
      const y = x * x + c;
      if (y >= yMin && y <= yMax) paraPts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
    }
    // Line samples y = c - x
    const linePts: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const x = xMin + (i / 60) * (xMax - xMin);
      const y = c - x;
      if (y >= yMin && y <= yMax) linePts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
    }

    // Gridlines / y-axis ticks every 2 units
    const gridLines: string[] = [];
    for (let gy = yMin; gy <= yMax; gy += 2) {
      const y = sy(gy);
      gridLines.push(
        `<line x1="${sx(xMin).toFixed(1)}" y1="${y.toFixed(1)}" x2="${sx(xMax).toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />` +
        `<text x="${(sx(xMin) - 8).toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="currentColor">${gy}</text>`
      );
    }
    // Vertical gridlines / x-axis ticks
    for (let gx = xMin; gx <= xMax; gx++) {
      const x = sx(gx);
      gridLines.push(
        `<line x1="${x.toFixed(1)}" y1="${sy(yMin).toFixed(1)}" x2="${x.toFixed(1)}" y2="${sy(yMax).toFixed(1)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />` +
        `<text x="${x.toFixed(1)}" y="${(sy(yMin) + 16).toFixed(1)}" text-anchor="middle" font-size="11" fill="currentColor">${gx}</text>`
      );
    }

    const figureCode = `
      <div style="width:100%;max-width:${width}px;margin:0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;" role="img" aria-label="Graph of a parabola opening upward and a line with negative slope">
        ${gridLines.join('')}
        <line x1="${sx(xMin).toFixed(1)}" y1="${sy(yMin).toFixed(1)}" x2="${sx(xMax).toFixed(1)}" y2="${sy(yMin).toFixed(1)}" stroke="currentColor" stroke-width="2" />
        <line x1="${sx(0).toFixed(1)}" y1="${sy(yMin).toFixed(1)}" x2="${sx(0).toFixed(1)}" y2="${sy(yMax).toFixed(1)}" stroke="currentColor" stroke-width="2" />
        <polyline points="${paraPts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5" />
        <polyline points="${linePts.join(' ')}" fill="none" stroke="#ef4444" stroke-width="2.5" />
        <circle cx="${sx(0).toFixed(1)}" cy="${sy(c).toFixed(1)}" r="4" fill="#111827" />
        <circle cx="${sx(-1).toFixed(1)}" cy="${sy(c + 1).toFixed(1)}" r="4" fill="#111827" />
        <text x="${(sx(0) + 8).toFixed(1)}" y="${(sy(c) - 6).toFixed(1)}" font-size="11" fill="currentColor">(0, ${c})</text>
      </svg>
      </div>
    `;

    // 3. Options (each equation wrapped in $...$ for MathJax)
    const optCorrect = `$y = x^2 + ${c}$ and $y = ${c} - x$`;
    const optDown = `$y = -x^2 + ${c}$ and $y = ${c} - x$`;
    const optPosSlope = `$y = x^2 + ${c}$ and $y = x + ${c}$`;
    const optShift = `$y = x^2 - ${c}$ and $y = ${c} - x$`;

    const optionsData = [
      { text: optCorrect, isCorrect: true },
      { text: optDown, isCorrect: false },
      { text: optPosSlope, isCorrect: false },
      { text: optShift, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The graphs of a system of equations are shown in the $xy$-plane. Which system of equations is represented by the graphs?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The parabola opens upward, so the coefficient of $x^2$ is positive, and its vertex is at $(0, ${c})$, giving $y = x^2 + ${c}$. The line has $y$-intercept ${c} and slopes downward with slope $-1$, giving $y = ${c} - x$. So the system is $y = x^2 + ${c}$ and $y = ${c} - x$. The choice with $-x^2$ is incorrect because that parabola would open downward; the choice with $y = x + ${c}$ is incorrect because that line has positive slope; and the choice with $x^2 - ${c}$ is incorrect because that parabola's vertex would be at $(0, ${-c})$.`
    };
  }
};
