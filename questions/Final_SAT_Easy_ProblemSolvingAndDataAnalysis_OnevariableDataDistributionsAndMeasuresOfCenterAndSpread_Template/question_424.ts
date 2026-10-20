import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 424
 *
 * ORIGINAL ANALYSIS: [Calculating mean from bar graph - defective lightbulbs]
 * - Number ranges: [defective bulbs per trial: 1-8, 5 trials, Easy difficulty]
 * - Difficulty factors: [Calculating mean from a bar graph with 5 bars]
 * - Constraints: [Easy - small integers, mean has 1 decimal place]
 * - Question type: [Bar Graph → Multiple Choice Text]
 * - Figure generation: [SVG bar chart]
 *
 * FIXED (figure unreadable):
 * - The old figureCode was bare Mafs fragments with no <Mafs> wrapper, drew the
 *   "bars" as 40px-thick Line.Segments, and had no y-axis numbers or value
 *   labels — so no bar height could be read, making the mean unanswerable.
 * - Replaced with the house-style SVG bar chart (same structure as Question
 *   406): wrapper div with max-width (prevents the clipping from 406),
 *   numbered y-axis (step 2) with gridlines, trial labels 1-5 under the axis,
 *   bold value labels on top of each bar so all five data values are directly
 *   readable, axis titles, currentColor throughout for theme support.
 * - Wrong choices: the median, the sum, and the sum divided by 4 (they were
 *   the mean plus or minus small amounts).
 */

export const generator_424 = {
  metadata: {
    id: "424",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate 5 random defect counts; ensure sum is not divisible by 5 for non-integer mean
    let defects: number[];
    let sum: number;
    do {
      defects = [
        getRandomInt(2, 6), getRandomInt(2, 6), getRandomInt(2, 6),
        getRandomInt(2, 6), getRandomInt(2, 6)
      ];
      sum = defects.reduce((a, b) => a + b, 0);
      // Avoid a whole-number mean, and keep the median (a wrong choice) apart
      // from the sum divided by 4 (another wrong choice).
    } while (sum % 5 === 0 || [...defects].sort((a, b) => a - b)[2] === sum / 4);

    const mean = sum / 5;
    const meanStr = mean.toFixed(1);

    // ---- Figure: house-style SVG bar chart ----
    const width = 460;
    const height = 300;
    const margin = { top: 26, bottom: 54, left: 46, right: 16 };
    const plotHeight = height - margin.top - margin.bottom;
    const plotWidth = width - margin.left - margin.right;

    // Y scale: round max up to even + headroom for the top value labels.
    const maxDefects = Math.max(...defects);
    const yMax = Math.ceil(maxDefects / 2) * 2 + 2;
    const getY = (v: number) => margin.top + plotHeight - (v / yMax) * plotHeight;

    // Gridlines + numbered y-axis (step 2).
    const gridLines: string[] = [];   // ← was: const gridLines = [];
    const step = 2;
    for (let v = 0; v <= yMax; v += step) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.2" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 5}" text-anchor="end" font-size="12" fill="currentColor" style="font-family: sans-serif; opacity: 0.8;">${v}</text>
      `);
    }

    // Bars + bold value labels (top) + trial labels (below axis).
    const barWidth = 44;
    const spacing = (plotWidth - defects.length * barWidth) / (defects.length + 1);

    const bars = defects.map((d, i) => {
      const x = margin.left + spacing + i * (barWidth + spacing);
      const y = getY(d);
      const h = getY(0) - y;
      const labelY = height - margin.bottom + 20;

      return `
        <!-- Bar -->
        <rect x="${x}" y="${y}" width="${barWidth}" height="${h}" fill="#3b82f6" fill-opacity="0.9" />
        <!-- Value Label (Top of bar) -->
        <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor" style="font-family: sans-serif">${d}</text>
        <!-- Trial Label (Bottom) -->
        <text x="${x + barWidth / 2}" y="${labelY}" text-anchor="middle" font-size="14" fill="currentColor" style="font-family: sans-serif">${i + 1}</text>
      `;
    }).join('');

    const figureCode = `
      <div style="width:100%;max-width:${width}px;margin:0 auto;">
        <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; display: block; user-select: none;">
          <!-- Grid -->
          ${gridLines.join('')}
          <!-- X Axis Line -->
          <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
          <!-- Bars and Labels -->
          ${bars}
          <!-- Axis Titles -->
          <text x="${margin.left - 36}" y="${margin.top - 10}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Defective Lightbulbs</text>
          <text x="${width / 2 + margin.left / 2}" y="${height - 14}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Trial</text>
        </svg>
      </div>
    `;

    // Wrong choices are real slips; they used to be the mean plus or minus
    // 0.2 and plus 0.4. The mean is not a whole number, the median is, the
    // sum is at least 10, and the loop above separates the median from the
    // sum divided by 4.
    const median = [...defects].sort((a, b) => a - b)[2];
    const byFour = sum / 4;
    const optionsData = [
      { text: meanStr, isCorrect: true, reason: '' },
      { text: median.toString(), isCorrect: false, reason: `${median} is the median number of defective lightbulbs, the middle value when the five values are listed in order, not the mean` },
      { text: sum.toString(), isCorrect: false, reason: `${sum} is the total number of defective lightbulbs; the total must be divided by the number of trials, 5` },
      { text: byFour.toString(), isCorrect: false, reason: `it results from dividing the total, ${sum}, by 4 instead of by the number of trials, 5` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "The bar graph shows the number of defective lightbulbs found in each of five trials. What is the mean number of defective lightbulbs for the five trials?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: meanStr,
      explanation: `Choice ${correctOption.letter} is correct. The bar graph shows ${defects.join(', ')} defective lightbulbs in the five trials. The sum of these values is $${defects.join(' + ')} = ${sum}$, so the mean is $\\frac{${sum}}{5} = ${meanStr}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};