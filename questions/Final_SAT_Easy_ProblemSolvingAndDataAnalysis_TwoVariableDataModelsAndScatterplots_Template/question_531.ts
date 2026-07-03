import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 531
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1 or -2, intercept: 5..8]
 * - Difficulty factors: [Identifying negative slope from scatterplot trend]
 * - Distractor patterns: [Wrong intercept sign, wrong slope (positive, large)]
 * - Constraints: [Negative slope, positive intercept]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative trend and line of best fit]
 *
 * FIXED:
 * - correctAnswer now equals the correct option's text exactly (was a
 *   differently formatted string that matched no option -> CORRECT_MISMATCH).
 * - Options use $...$ delimiters; slope coefficient rendered naturally
 *   (-x for a slope of -1) so no "-1x".
 * - Added per-distractor reasons keyed to each option's kind (not shuffle order).
 * - Rebuilt the Mafs figure as a plain SVG scatterplot whose points and line
 *   match the live slope/intercept every draw.
 */

export const generator_531 = {

  metadata: {
    id: "531",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    // --- Parameters: negative integer slope, positive intercept ---
    const slopeMag = getRandomInt(1, 2);   // 1 or 2
    const slope = -slopeMag;               // -1 or -2
    const intercept = getRandomInt(5, 8);  // positive

    // Natural rendering of the slope term "mx" (e.g. -x, -2x, 6x)
    const slopeTerm = (m: number) => {
      if (m === 1) return 'x';
      if (m === -1) return '-x';
      return `${m}x`;
    };

    // --- Scatter data hugging the line of best fit (x = 1..4) ---
    const dataPoints = [1, 2, 3, 4].map(x => {
      const yLine = slope * x + intercept;
      const jitter = getRandomInt(-1, 1) * 0.5; // -0.5, 0, or +0.5 -> clean halves
      return { x, y: yLine + jitter };
    });

    // --- Figure: plain SVG scatterplot + line of best fit ---
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 45 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const xLo = 0, xHi = 5;
    const yLo = -4, yHi = 9;
    const sx = (x: number) => margin.left + ((x - xLo) / (xHi - xLo)) * chartW;
    const sy = (y: number) => margin.top + chartH - ((y - yLo) / (yHi - yLo)) * chartH;

    const gridLines = [];
    for (let gx = 0; gx <= xHi; gx += 1) {
      const px = sx(gx);
      gridLines.push(
        `<line x1="${px}" y1="${margin.top}" x2="${px}" y2="${margin.top + chartH}" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />` +
        `<text x="${px}" y="${height - 22}" text-anchor="middle" font-size="11" fill="currentColor">${gx}</text>`
      );
    }
    for (let gy = yLo; gy <= yHi; gy += 2) {
      const py = sy(gy);
      gridLines.push(
        `<line x1="${margin.left}" y1="${py}" x2="${margin.left + chartW}" y2="${py}" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />` +
        `<text x="${margin.left - 8}" y="${py + 4}" text-anchor="end" font-size="11" fill="currentColor">${gy}</text>`
      );
    }

    // y = 0 axis emphasized (data crosses it for steep slopes)
    const zeroY = sy(0);
    const axisEmphasis = `<line x1="${margin.left}" y1="${zeroY}" x2="${margin.left + chartW}" y2="${zeroY}" stroke="currentColor" stroke-width="1.5"/>`;

    // Line of best fit across the visible x-range
    const lineSvg = `<line x1="${sx(xLo)}" y1="${sy(slope * xLo + intercept)}" x2="${sx(xHi)}" y2="${sy(slope * xHi + intercept)}" stroke="#ff2a7a" stroke-width="2.5" />`;

    const circles = dataPoints.map(p =>
      `<circle cx="${sx(p.x)}" cy="${sy(p.y)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />`
    ).join('');

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        ${gridLines.join('')}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartH}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${margin.top + chartH}" x2="${margin.left + chartW}" y2="${margin.top + chartH}" stroke="currentColor" stroke-width="2"/>
        ${axisEmphasis}
        ${lineSvg}
        ${circles}
        <text x="${margin.left + chartW / 2}" y="${height - 6}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">x</text>
        <text transform="rotate(-90, 14, ${margin.top + chartH / 2})" x="14" y="${margin.top + chartH / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">y</text>
      </svg>
    `;

    // --- Options: form y = mx + b ---
    // kinds: 'correct'   -> negative slope, positive intercept
    //        'intercept' -> negative slope, negative intercept
    //        'posSlopeP' -> positive slope (= intercept), +1
    //        'posSlopeM' -> positive slope (= intercept), -1
    const optionsData = [
      { text: `$y = ${slopeTerm(slope)} + ${intercept}$`, isCorrect: true,  kind: 'correct' },
      { text: `$y = ${slopeTerm(slope)} - ${intercept}$`, isCorrect: false, kind: 'intercept' },
      { text: `$y = ${slopeTerm(intercept)} + 1$`,        isCorrect: false, kind: 'posSlopeP' },
      { text: `$y = ${slopeTerm(intercept)} - 1$`,        isCorrect: false, kind: 'posSlopeM' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const reason = (kind: string) => {
      switch (kind) {
        case 'intercept':
          return 'has the correct negative slope but crosses the y-axis at a negative value, whereas the data trend crosses at a positive value';
        case 'posSlopeP':
        case 'posSlopeM':
          return 'has a positive slope, but the data show a decreasing (negative) trend';
        default:
          return '';
      }
    };

    const distractorText = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} is incorrect because it ${reason(o.kind)}.`)
      .join(' ');

    return {
      questionText: "Which of the following could be an equation for a line of best fit for the data in the scatterplot?",
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The data points fall as $x$ increases, so the line of best fit has a negative slope, and it crosses the y-axis at a positive value near $b = ${intercept}$. Only choice ${correctLetter} has a negative slope, where $m = ${slope}$, together with a positive y-intercept, where $b = ${intercept}$. ${distractorText}`
    };

  }

};
