import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 248
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2.5 or 5, intercept: 75-150 in steps of 25, xValue: 40-70 in steps of 10]
 * - Difficulty factors: [Reading value from graph]
 * - Distractor patterns: [neighboring gridline on either side, cost without the y-intercept]
 * - Constraints: [every value lands on a gridline]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [SVG line graph]
 */

export const generator_248 = {
  metadata: {
    id: "248",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Every value the student reads lands on a gridline: x gridlines every 10
    // rings and y gridlines every 25 dollars. The old graph had y gridlines
    // every 50 with costs such as 295 between them, x values such as 55
    // between x gridlines, and it marked the answer with dashed guide lines.
    const slope = getRandomInt(1, 2) * 2.5;
    const intercept = getRandomInt(3, 6) * 25;
    const xValue = getRandomInt(4, 7) * 10;
    const yValue = slope * xValue + intercept;

    // Distinct for every draw: the neighbors differ from the answer by
    // 10 * slope (25 or 50), and slope * xValue differs from the answer by the
    // intercept (at least 75).
    const nextLine = yValue + 10 * slope;
    const prevLine = yValue - 10 * slope;
    const noIntercept = slope * xValue;

    const optionsData = [
      { text: yValue.toString(), isCorrect: true, reason: '' },
      { text: nextLine.toString(), isCorrect: false, reason: `it is the cost to make ${xValue + 10} rings, read at the next vertical gridline` },
      { text: prevLine.toString(), isCorrect: false, reason: `it is the cost to make ${xValue - 10} rings, read at the previous vertical gridline` },
      { text: noIntercept.toString(), isCorrect: false, reason: `it is only the increase in cost from 0 rings to ${xValue} rings; it leaves out the cost of ${intercept} dollars shown at 0 rings` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // ── Figure: SVG line graph of y = slope*x + intercept.
    const width = 460;
    const height = 320;
    const margin = { top: 20, right: 24, bottom: 40, left: 56 };
    const graphW = width - margin.left - margin.right;
    const graphH = height - margin.top - margin.bottom;

    const xMax = 90;
    const yMax = Math.ceil((slope * xMax + intercept) / 50) * 50;

    const px = (x: number) => margin.left + (x / xMax) * graphW;
    const py = (y: number) => margin.top + graphH - (y / yMax) * graphH;

    // Grid: x every 10 (labeled), y every 25 (labeled every 50).
    const xGrid: string[] = [];
    for (let x = 0; x <= xMax; x += 10) {
      xGrid.push(`
      <line x1="${px(x).toFixed(1)}" y1="${py(0).toFixed(1)}" x2="${px(x).toFixed(1)}" y2="${margin.top}" stroke="currentColor" stroke-opacity="0.18" stroke-width="1" />
      <text x="${px(x).toFixed(1)}" y="${(height - margin.bottom + 18).toFixed(1)}" text-anchor="middle" font-size="11" fill="currentColor">${x}</text>`);
    }
    const yGrid: string[] = [];
    for (let y = 0; y <= yMax; y += 25) {
      const labeled = y % 50 === 0;
      yGrid.push(`
      <line x1="${margin.left}" y1="${py(y).toFixed(1)}" x2="${width - margin.right}" y2="${py(y).toFixed(1)}" stroke="currentColor" stroke-opacity="${labeled ? 0.18 : 0.09}" stroke-width="1" />` +
        (labeled ? `
      <text x="${(margin.left - 8).toFixed(1)}" y="${(py(y) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="currentColor">${y}</text>` : ''));
    }

    const figureCode = `<div style="width:100%;max-width:${width}px;margin:0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;" role="img" aria-label="Line graph of cost versus number of rings">
    ${yGrid.join('')}
    ${xGrid.join('')}
    <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${(height - margin.bottom).toFixed(1)}" stroke="currentColor" stroke-width="2" />
    <line x1="${margin.left}" y1="${(height - margin.bottom).toFixed(1)}" x2="${(width - margin.right).toFixed(1)}" y2="${(height - margin.bottom).toFixed(1)}" stroke="currentColor" stroke-width="2" />
    <line x1="${px(0).toFixed(1)}" y1="${py(intercept).toFixed(1)}" x2="${px(xMax).toFixed(1)}" y2="${py(slope * xMax + intercept).toFixed(1)}" stroke="#3b82f6" stroke-width="3" />
    <text x="${((margin.left + width - margin.right) / 2).toFixed(1)}" y="${(height - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Number of rings</text>
    <text transform="rotate(-90, 14, ${(margin.top + graphH / 2).toFixed(1)})" x="14" y="${(margin.top + graphH / 2).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Cost (dollars)</text>
  </svg>
</div>`;

    return {
      questionText: `The cost, in dollars, for a manufacturer to make rings is represented by the line shown. What is the cost, in dollars, for the manufacturer to make ${xValue} rings?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: yValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The vertical gridline at ${xValue} rings meets the line at a cost of ${yValue} dollars, so the line passes through the point $(${xValue}, ${yValue})$. Therefore, the cost to make ${xValue} rings is \\$${yValue}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
