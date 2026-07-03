import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 766
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [graph: y = 20x + 50, slope interpretation]
 * - Difficulty factors: [Interpreting slope in cost context]
 * - Distractor patterns: [B = y-intercept, C = wrong values, D = total cost]
 * - Constraints: [Must have figure]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [SVG line graph of y = hourlyRate * x + fee]
 */

export const generator_766 = {
  metadata: {
    id: "766",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // Hourly rate (slope): 15-40. One-time fee (y-intercept): 40-80.
    const hourlyRate = getRandomInt(15, 40);
    const fee = getRandomInt(40, 80);
    const maxX = 4; // graph domain 0..maxX hours

    // STEP 2: Build the SVG line graph for y = hourlyRate * x + fee.
    // The drawn line matches the question's model for every draw: it starts at
    // (0, fee) and rises with slope = hourlyRate.
    const width = 450;
    const height = 260;
    const margin = { top: 20, right: 30, bottom: 40, left: 55 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const yMaxData = hourlyRate * maxX + fee; // top of the line at x = maxX
    // Round the y-axis top up to a clean multiple of 50 above the data.
    const yMax = Math.ceil((yMaxData + 20) / 50) * 50;

    const getX = (x: number) => margin.left + (x / maxX) * graphWidth;
    const getY = (y: number) => margin.top + graphHeight - (y / yMax) * graphHeight;

    // Horizontal grid lines + y labels every 50 dollars.
    let gridLines = '';
    for (let v = 0; v <= yMax; v += 50) {
      const gy = getY(v);
      gridLines += `<line x1="${margin.left}" y1="${gy}" x2="${width - margin.right}" y2="${gy}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      gridLines += `<text x="${margin.left - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="currentColor">${v}</text>`;
    }

    // Vertical grid lines + x labels at each whole hour.
    let xLabels = '';
    for (let h = 0; h <= maxX; h++) {
      const gx = getX(h);
      xLabels += `<line x1="${gx}" y1="${margin.top}" x2="${gx}" y2="${height - margin.bottom}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      xLabels += `<text x="${gx}" y="${height - margin.bottom + 18}" text-anchor="middle" font-size="11" fill="currentColor">${h}</text>`;
    }

    // The line from (0, fee) to (maxX, hourlyRate*maxX + fee).
    const x0 = getX(0), y0 = getY(fee);
    const x1 = getX(maxX), y1 = getY(yMaxData);

    const svgContent = `<div style="width:100%;max-width:${width}px;margin:0 auto;"><svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;display:block;font-family:sans-serif;user-select:none;">
      <rect width="${width}" height="${height}" fill="transparent"/>
      ${gridLines}
      ${xLabels}
      <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
      <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
      <polyline points="${x0},${y0} ${x1},${y1}" fill="none" stroke="#3b82f6" stroke-width="3"/>
      <circle cx="${x0}" cy="${y0}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5"/>
      <circle cx="${x1}" cy="${y1}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5"/>
      <text x="${margin.left + graphWidth / 2}" y="${height - 6}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Hours of work</text>
      <text transform="rotate(-90, 14, ${margin.top + graphHeight / 2})" x="14" y="${margin.top + graphHeight / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Total charge (dollars)</text>
    </svg></div>`;

    // STEP 3: Create options.
    const optionsData = [
      { text: `The electrician's hourly rate`, isCorrect: true },
      { text: `The electrician's one-time fee`, isCorrect: false, reason: "describes the y-intercept of the graph, not the slope" },
      { text: `The maximum amount that the electrician charges`, isCorrect: false, reason: "describes a single point on the graph, not its rate of change" },
      { text: `The total amount that the electrician charges`, isCorrect: false, reason: "describes the value of the function, not the slope" }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 5: Return question data. Currency escaped as \$ throughout.
    return {
      questionText: `The graph represents the total charge, in dollars, by an electrician for $x$ hours of work. The electrician charges a one-time fee plus an hourly rate. What is the best interpretation of the slope of the graph?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `The electrician's hourly rate`,
      explanation: `Choice ${correctLetter} is correct. In a linear model $y = mx + b$, the slope $m$ is the rate of change of the total charge with respect to the number of hours. Here that rate is the additional cost per hour, which is the hourly rate of \\$${hourlyRate} per hour. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
