import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 517
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 0.9, intercept: 2.2]
 * - Difficulty factors: [Identifying positive slope from scatterplot]
 * - Distractor patterns: [Negative slopes / wrong intercept sign]
 * - Constraints: [Positive slope, positive intercept]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Scatterplot with positive slope line of best fit]
 *
 * FIXED:
 * - correctAnswer now equals the correct option string exactly (was a bare
 *   "y=..." string that matched none of the LaTeX options).
 * - Rebuilt the broken Mafs snippet as a compact house-style SVG scatterplot
 *   whose best-fit line and points use the SAME live slope/intercept.
 * - Distractors built from sign variations so no two options can ever collide.
 * - Explanation reads the correct + distractor letters from the shuffled array.
 */

export const generator_517 = {

  metadata: {
    id: "517",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    // Positive slope (tenths, 0.6..1.5) and positive integer intercept (1..5).
    // Both render as clean strings (e.g. "0.7", "3") with no float artifacts.
    const m = getRandomInt(6, 15) / 10;
    const b = getRandomInt(1, 5);
    const mStr = String(m);       // e.g. "0.9"
    const bStr = String(b);       // e.g. "2"

    // ---- Figure: SVG scatterplot with a positive-slope best-fit line ----------
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 30, bottom: 40, left: 45 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const xVals = [1, 2, 4, 6, 8, 9];
    // Small deterministic vertical scatter around the model line (line of best fit).
    const jitter = [0.5, -0.6, 0.4, -0.5, 0.6, -0.4];
    const dataPoints = xVals.map((x, i) => ({
      x,
      y: m * x + b + jitter[i]
    }));

    const xMax = 10;
    const lineYAtXMax = m * xMax + b;          // top of the fitted line
    const rawYMax = Math.max(lineYAtXMax, ...dataPoints.map(p => p.y));
    const yMax = Math.ceil((rawYMax + 1) / 2) * 2; // round up to even for tidy grid

    const getX = (x: number) => margin.left + (x / xMax) * chartWidth;
    const getY = (y: number) => margin.top + chartHeight - (y / yMax) * chartHeight;

    // Y grid + labels
    const yStep = yMax / 5;
    const gridLines: string[] = [];
    for (let v = 0; v <= yMax + 1e-9; v += yStep) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="currentColor">${Math.round(v)}</text>`);
    }
    // X labels (every 2 units)
    const xLabels: string[] = [];
    for (let v = 0; v <= xMax; v += 2) {
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
      { text: `$y=${mStr}x+${bStr}$`, isCorrect: true },   // positive slope, positive intercept
      { text: `$y=-${mStr}x+${bStr}$`, isCorrect: false },  // negative slope
      { text: `$y=-${mStr}x-${bStr}$`, isCorrect: false },  // negative slope, negative intercept
      { text: `$y=${mStr}x-${bStr}$`, isCorrect: false }    // positive slope, negative intercept
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrect = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "The scatterplot shows the relationship between two variables, along with a line of best fit. Which equation best represents the line of best fit shown?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The line of best fit rises from left to right, so its slope is positive (about ${mStr}), and it crosses the y-axis above the origin, so the y-intercept is positive (${bStr}). Only $y=${mStr}x+${bStr}$ has both a positive slope and a positive y-intercept. The other choices are incorrect because they use a negative slope (a line that falls from left to right) or a negative y-intercept (crossing the y-axis below the origin), neither of which matches the graph.`
    };

  }

};
