import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 524
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1.9, intercept: 10.1]
 * - Difficulty factors: [Identifying negative slope and positive intercept]
 * - Distractor patterns: [Wrong signs on slope / intercept]
 * - Constraints: [Negative slope, positive intercept]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative slope line of best fit]
 *
 * FIXED:
 * - Slope math bug: original `-(1 + Math.random()*2).toFixed(1)` mixed a unary
 *   minus with a string, and correctAnswer ("y=...") matched none of the "$...$"
 *   options. correctAnswer now equals the correct option string exactly.
 * - Rebuilt the broken Mafs snippet as a compact house-style SVG scatterplot
 *   whose falling best-fit line and points use the SAME live slope/intercept.
 * - Distractors built from sign variations so no two options can ever collide.
 * - Explanation reads the correct letter from the shuffled array.
 */

export const generator_524 = {

  metadata: {
    id: "524",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    // Negative slope (magnitude in tenths, 0.6..2.0) and positive integer
    // intercept (8..12). Both render as clean strings (no float artifacts).
    const mag = getRandomInt(6, 20) / 10;   // 0.6 .. 2.0
    const b = getRandomInt(8, 12);          // positive intercept
    const magStr = String(mag);             // e.g. "1.9"
    const bStr = String(b);                 // e.g. "10"
    const slopeVal = -mag;                  // actual (negative) slope

    // ---- Figure: SVG scatterplot with a negative-slope best-fit line ----------
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 30, bottom: 40, left: 45 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const xMax = 6;
    const xVals = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];
    const jitter = [0.5, -0.6, 0.5, -0.5, 0.6, -0.4];
    const dataPoints = xVals.map((x, i) => ({
      x,
      y: slopeVal * x + b + jitter[i]
    }));

    // Fit y-range so the whole falling line and every point are visible.
    const lineYAtXMax = slopeVal * xMax + b;   // lowest point of the fitted line
    const rawYMax = Math.max(b, ...dataPoints.map(p => p.y));
    const rawYMin = Math.min(lineYAtXMax, ...dataPoints.map(p => p.y), 0);
    const yMax = Math.ceil((rawYMax + 1) / 2) * 2;
    const yMin = Math.min(0, Math.floor(rawYMin / 2) * 2);
    const ySpan = yMax - yMin;

    const getX = (x: number) => margin.left + (x / xMax) * chartWidth;
    const getY = (y: number) => margin.top + chartHeight - ((y - yMin) / ySpan) * chartHeight;

    const yStep = ySpan / 5;
    const gridLines: string[] = [];
    for (let v = yMin; v <= yMax + 1e-9; v += yStep) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="currentColor">${Math.round(v)}</text>`);
    }
    const xLabels: string[] = [];
    for (let v = 0; v <= xMax; v += 1) {
      const x = getX(v);
      xLabels.push(`<text x="${x}" y="${height - margin.bottom + 18}" text-anchor="middle" font-size="11" fill="currentColor">${v}</text>`);
    }

    const lineX1 = getX(0), lineY1 = getY(b);
    const lineX2 = getX(xMax), lineY2 = getY(lineYAtXMax);

    const circles = dataPoints
      .map(p => `<circle cx="${getX(p.x).toFixed(1)}" cy="${getY(p.y).toFixed(1)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />`)
      .join('');

    const figureCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        ${gridLines.join('')}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${lineX1.toFixed(1)}" y1="${lineY1.toFixed(1)}" x2="${lineX2.toFixed(1)}" y2="${lineY2.toFixed(1)}" stroke="#ef4444" stroke-width="2.5"/>
        ${circles}
        ${xLabels.join('')}
        <text x="${margin.left + chartWidth / 2}" y="${height - 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">x</text>
        <text transform="rotate(-90, 12, ${height / 2})" x="12" y="${height / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">y</text>
      </svg>
    `;

    // ---- Options (correct + three sign-variant distractors) -------------------
    const optionsData = [
      { text: `$y=-${magStr}x+${bStr}$`, isCorrect: true },   // negative slope, positive intercept
      { text: `$y=-${magStr}x-${bStr}$`, isCorrect: false },  // negative slope, negative intercept
      { text: `$y=${magStr}x+${bStr}$`, isCorrect: false },   // positive slope, positive intercept
      { text: `$y=${magStr}x-${bStr}$`, isCorrect: false }    // positive slope, negative intercept
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The scatterplot shows the relationship between two variables, along with a line of best fit. Which equation best represents the line of best fit shown?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The line of best fit falls from left to right, so its slope is negative (about ${slopeVal}), and it crosses the y-axis above the origin, so the y-intercept is positive (${bStr}). Only $y=-${magStr}x+${bStr}$ has both a negative slope and a positive y-intercept. The other choices are incorrect because they use a positive slope (a line that rises from left to right) or a negative y-intercept (crossing the y-axis below the origin), neither of which matches the graph.`
    };

  }

};
