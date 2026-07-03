import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 248
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-3, intercept: 80-120, xValue: 50-70 ending in 0 or 5]
 * - Difficulty factors: [Reading value from graph]
 * - Distractor patterns: [rings-only cost, doubled fixed cost, gridline misread]
 * - Constraints: [xValue must end in 0 or 5 to align with grid lines]
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
    const slope = getRandomInt(1, 3);
    const intercept = getRandomInt(80, 120);
    // xValue ends in 0 or 5 so it lands on an x grid line: 50, 55, 60, 65, 70
    const xValue = getRandomInt(10, 14) * 5;
    const yValue = slope * xValue + intercept;

    // ── Distractors as offsets from the correct value, so they are provably
    //    distinct from the answer and from each other for every draw:
    //    intercept ∈ [80,120] and slope*5 ∈ {5,10,15}, so the three offsets
    //    (-intercept, +intercept, +slope*5) are pairwise distinct and nonzero.
    const ringsOnly = yValue - intercept;   // forgot the fixed startup cost (= slope*xValue)
    const doubleFixed = yValue + intercept; // added the fixed startup cost twice
    const gridMisread = yValue + slope * 5; // read one x grid line (5 rings) too far

    const optionsData = [
      { text: yValue.toString(), isCorrect: true },
      { text: ringsOnly.toString(), isCorrect: false, reason: "is the cost of the rings alone, without the fixed startup cost" },
      { text: doubleFixed.toString(), isCorrect: false, reason: "adds the fixed startup cost a second time" },
      { text: gridMisread.toString(), isCorrect: false, reason: "reads the line one grid line too far along the horizontal axis" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // ── Figure: compact SVG line graph of y = slope*x + intercept, with the
    //    data point (xValue, yValue) highlighted by dashed guide lines. Every
    //    drawn value is derived from the same live variables as the question.
    const width = 460;
    const height = 260;
    const margin = { top: 20, right: 24, bottom: 40, left: 56 };
    const graphW = width - margin.left - margin.right;
    const graphH = height - margin.top - margin.bottom;

    // Axis maxima give a little headroom past the plotted point.
    const xMax = xValue + 10;
    const yMax = yValue + 20;

    const px = (x: number) => margin.left + (x / xMax) * graphW;
    const py = (y: number) => margin.top + graphH - (y / yMax) * graphH;

    // Grid + labels: x every 10, y every 50.
    const xTicks: number[] = [];
    for (let x = 0; x <= xMax; x += 10) xTicks.push(x);
    const yTicks: number[] = [];
    for (let y = 0; y <= yMax; y += 50) yTicks.push(y);

    const xGrid = xTicks.map(x => `
      <line x1="${px(x).toFixed(1)}" y1="${py(0).toFixed(1)}" x2="${px(x).toFixed(1)}" y2="${margin.top}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
      <text x="${px(x).toFixed(1)}" y="${(height - margin.bottom + 18).toFixed(1)}" text-anchor="middle" font-size="11" fill="currentColor">${x}</text>`).join('');

    const yGrid = yTicks.map(y => `
      <line x1="${margin.left}" y1="${py(y).toFixed(1)}" x2="${width - margin.right}" y2="${py(y).toFixed(1)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
      <text x="${(margin.left - 8).toFixed(1)}" y="${(py(y) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="currentColor">${y}</text>`).join('');

    // The line from x=0 to x=xMax.
    const lineX1 = px(0), lineY1 = py(intercept);
    const lineX2 = px(xMax), lineY2 = py(slope * xMax + intercept);

    const figureCode = `<div style="width:100%;max-width:${width}px;margin:0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;" role="img" aria-label="Line graph of cost versus number of rings">
    ${yGrid}
    ${xGrid}
    <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${(height - margin.bottom).toFixed(1)}" stroke="currentColor" stroke-width="2" />
    <line x1="${margin.left}" y1="${(height - margin.bottom).toFixed(1)}" x2="${(width - margin.right).toFixed(1)}" y2="${(height - margin.bottom).toFixed(1)}" stroke="currentColor" stroke-width="2" />
    <line x1="${lineX1.toFixed(1)}" y1="${lineY1.toFixed(1)}" x2="${lineX2.toFixed(1)}" y2="${lineY2.toFixed(1)}" stroke="#3b82f6" stroke-width="3" />
    <line x1="${px(xValue).toFixed(1)}" y1="${py(yValue).toFixed(1)}" x2="${px(xValue).toFixed(1)}" y2="${py(0).toFixed(1)}" stroke="#3b82f6" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="4 3" />
    <line x1="${px(xValue).toFixed(1)}" y1="${py(yValue).toFixed(1)}" x2="${margin.left}" y2="${py(yValue).toFixed(1)}" stroke="#3b82f6" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="4 3" />
    <circle cx="${px(xValue).toFixed(1)}" cy="${py(yValue).toFixed(1)}" r="5" fill="#3b82f6" stroke="white" stroke-width="2" />
    <text x="${((margin.left + width - margin.right) / 2).toFixed(1)}" y="${(height - 6).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Number of rings</text>
    <text transform="rotate(-90, 14, ${(margin.top + graphH / 2).toFixed(1)})" x="14" y="${(margin.top + graphH / 2).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Cost (dollars)</text>
  </svg>
</div>`;

    return {
      questionText: `The cost, in dollars, for a manufacturer to make rings is represented by the line shown. What is the cost, in dollars, for the manufacturer to make ${xValue} rings?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: yValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. From the graph, when $x = ${xValue}$ rings, follow the vertical grid line up to the line and across to the vertical axis to read the cost of \\$${yValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
