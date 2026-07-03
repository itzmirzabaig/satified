import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 529
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: negative one-decimal, y-intercept: positive integer]
 * - Difficulty factors: [Identifying slope and y-intercept from line of best fit]
 * - Distractor patterns: [Wrong slope sign, wrong intercept sign, both wrong]
 * - Constraints: [Negative slope, positive y-intercept]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative slope line of best fit]
 *
 * FIXED:
 * - correctAnswer now equals the correct option's text exactly (was a
 *   differently formatted string that matched no option -> CORRECT_MISMATCH).
 * - Slope rendered from integer tenths so no float artifacts; sign shown as a
 *   real minus ("- 0.6x") so no "+ -" sign glitch.
 * - Distractor reasons keyed to each option's kind, not to shuffle position.
 * - Rebuilt the Mafs figure as a plain SVG scatterplot whose points and line
 *   match the live slope/intercept every draw.
 */

export const generator_529 = {

  metadata: {
    id: "529",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    // --- Parameters: negative slope, positive y-intercept ---
    const slopeTenths = getRandomInt(5, 9);      // 5..9 -> slope -0.5 .. -0.9
    const slope = -slopeTenths / 10;             // exact one-decimal value
    const slopeStr = `-0.${slopeTenths}`;        // exact display, no float artifact
    const absSlopeStr = `0.${slopeTenths}`;
    const yIntercept = getRandomInt(10, 16);     // positive intercept

    // --- Scatter data hugging the line of best fit ---
    const xMax = 14;
    const dataPoints = [];
    for (let i = 0; i < 10; i++) {
      const x = getRandomInt(1, xMax);
      const yLine = slope * x + yIntercept;
      const variation = getRandomInt(-2, 2);
      dataPoints.push({ x, y: yLine + variation });
    }

    // --- Figure: plain SVG scatterplot + line of best fit ---
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 45 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    // Data-space bounds. y ranges from ~ (slope*xMax + intercept) up to intercept+.
    const xLo = 0, xHi = xMax;
    const yLo = 0, yHi = 20;
    const sx = (x: number) => margin.left + ((x - xLo) / (xHi - xLo)) * chartW;
    const sy = (y: number) => margin.top + chartH - ((y - yLo) / (yHi - yLo)) * chartH;

    const gridLines = [];
    for (let gx = 0; gx <= xHi; gx += 2) {
      const px = sx(gx);
      gridLines.push(
        `<line x1="${px}" y1="${margin.top}" x2="${px}" y2="${margin.top + chartH}" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />` +
        `<text x="${px}" y="${height - 22}" text-anchor="middle" font-size="11" fill="currentColor">${gx}</text>`
      );
    }
    for (let gy = 0; gy <= yHi; gy += 5) {
      const py = sy(gy);
      gridLines.push(
        `<line x1="${margin.left}" y1="${py}" x2="${margin.left + chartW}" y2="${py}" stroke="currentColor" stroke-opacity="0.08" stroke-width="1" />` +
        `<text x="${margin.left - 8}" y="${py + 4}" text-anchor="end" font-size="11" fill="currentColor">${gy}</text>`
      );
    }

    // Line of best fit across the visible x-range (clamped to y-bounds visually).
    const lineX1 = xLo, lineY1 = slope * xLo + yIntercept;
    const lineX2 = xHi, lineY2 = slope * xHi + yIntercept;
    const lineSvg = `<line x1="${sx(lineX1)}" y1="${sy(lineY1)}" x2="${sx(lineX2)}" y2="${sy(lineY2)}" stroke="#1a7cff" stroke-width="2.5" />`;

    const circles = dataPoints.map(p =>
      `<circle cx="${sx(p.x)}" cy="${sy(p.y)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />`
    ).join('');

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        ${gridLines.join('')}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + chartH}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${margin.top + chartH}" x2="${margin.left + chartW}" y2="${margin.top + chartH}" stroke="currentColor" stroke-width="2"/>
        ${lineSvg}
        ${circles}
        <text x="${margin.left + chartW / 2}" y="${height - 6}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">x</text>
        <text transform="rotate(-90, 14, ${margin.top + chartH / 2})" x="14" y="${margin.top + chartH / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">y</text>
      </svg>
    `;

    // --- Options: form y = a + bx (rendered with real +/- signs) ---
    // kinds: 'correct' (a>0,b<0), 'slope' (a>0,b>0), 'intercept' (a<0,b<0),
    //        'both' (a<0,b>0).
    const build = (aPos: boolean, bNeg: boolean) => {
      const aTerm = aPos ? `${yIntercept}` : `-${yIntercept}`;
      const bTerm = bNeg ? `- ${absSlopeStr}x` : `+ ${absSlopeStr}x`;
      return `$y = ${aTerm} ${bTerm}$`;
    };

    const optionsData = [
      { text: build(true, true),   isCorrect: true,  kind: 'correct' },
      { text: build(true, false),  isCorrect: false, kind: 'slope' },
      { text: build(false, true),  isCorrect: false, kind: 'intercept' },
      { text: build(false, false), isCorrect: false, kind: 'both' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const reason = (kind: string) => {
      switch (kind) {
        case 'slope':
          return 'represents a line that has a positive slope, not a negative slope';
        case 'intercept':
          return 'represents a line that intersects the y-axis at a negative y-value, not a positive y-value';
        case 'both':
          return 'represents a line that intersects the y-axis at a negative y-value, not a positive y-value, and has a positive slope, not a negative slope';
        default:
          return '';
      }
    };

    const distractorText = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} is incorrect because this equation ${reason(o.kind)}.`)
      .join(' ');

    return {
      questionText: "Which of the following equations best represents the line of best fit shown?",
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The line of best fit shown intersects the y-axis at a positive y-value and has a negative slope. The graph of an equation of the form $y=a+bx$, where $a$ and $b$ are constants, intersects the y-axis at a y-value of $a$ and has a slope of $b$. Only choice ${correctLetter} represents a line that intersects the y-axis at a positive y-value, where $a = ${yIntercept}$, and has a negative slope, where $b = ${slopeStr}$. ${distractorText}`
    };

  }

};
