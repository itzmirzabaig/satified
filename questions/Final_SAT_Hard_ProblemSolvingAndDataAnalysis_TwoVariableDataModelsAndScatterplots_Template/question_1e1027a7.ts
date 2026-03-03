import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 1e1027a7
 * 
 * FIXES:
 * - Implemented proper SVG scatterplot with line of best fit.
 * - Options formatted as equations.
 * - Options return type fixed to `string[]`.
 */

export const generator_1e1027a7 = {
  metadata: {
    id: "1e1027a7",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Slope ~ 33, Intercept ~ 84
    const slope = getRandomInt(25, 45); 
    const intercept = getRandomInt(70, 100);
    
    // Temperature range (x-axis)
    const tMin = 10;
    const tMax = 26;
    
    // Generate Scatter Points
    const points = [];
    for (let t = tMin; t <= tMax; t += 2) {
      // Add noise
      const noise = getRandomInt(-50, 50);
      const d = slope * t + intercept + noise;
      points.push({ x: t, y: d });
    }
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    const xMinGraph = 8, xMaxGraph = 30;
    const yMinGraph = 0, yMaxGraph = slope * xMaxGraph + intercept + 50;
    
    const mapX = (x: number) => padding.left + ((x - xMinGraph) / (xMaxGraph - xMinGraph)) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - ((y - yMinGraph) / (yMaxGraph - yMinGraph)) * (height - padding.top - padding.bottom);
    
    // Generate Scatter Points SVG
    const pointsSvg = points.map(p => 
      `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="3" fill="#3b82f6" stroke="white" stroke-width="1" />`
    ).join('');
    
    // Generate Line of Best Fit
    // y = slope * x + intercept
    const lineX1 = xMinGraph;
    const lineY1 = slope * lineX1 + intercept;
    const lineX2 = xMaxGraph;
    const lineY2 = slope * lineX2 + intercept;
    
    const lineSvg = `<line x1="${mapX(lineX1)}" y1="${mapY(lineY1)}" x2="${mapX(lineX2)}" y2="${mapY(lineY2)}" stroke="#3b82f6" stroke-width="2" />`;
    
    // Axes and Grid
    const xTicks = [];
    for (let x = 10; x <= 30; x += 5) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
      `);
    }
    
    const yTicks = [];
    for (let y = 0; y <= yMaxGraph; y += 200) {
      yTicks.push(`
        <text x="${padding.left - 10}" y="${mapY(y) + 4}" text-anchor="end" font-size="12" fill="currentColor">${y}</text>
        <line x1="${padding.left}" y1="${mapY(y)}" x2="${padding.left - 5}" y2="${mapY(y)}" stroke="currentColor" />
      `);
    }

    const svgCode = `
      <div style="width: 100%; max-width: 450px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          
          <!-- Ticks -->
          <g>${xTicks.join('')}</g>
          <g>${yTicks.join('')}</g>
          
          <!-- Graph -->
          ${lineSvg}
          ${pointsSvg}
          
          <!-- Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Temperature (°C)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Sales ($)</text>
        </svg>
      </div>
    `;
    
    // 3. Options
    const correctEq = `d = ${slope}t + ${intercept}`;
    
    // Distractors
    const wrongSlope1 = parseFloat((1 / slope).toFixed(2));
    const wrongSlope2 = getRandomInt(5, 15);
    const wrongIntercept = intercept + getRandomInt(200, 300);
    
    const distractor1 = `d = ${wrongSlope1}t + ${wrongIntercept}`;
    const distractor2 = `d = ${wrongSlope2}t + ${wrongIntercept}`;
    const distractor3 = `d = ${slope}t + ${wrongIntercept}`;
    
    const optionsData = [
      { text: correctEq, isCorrect: true },
      { text: distractor1, isCorrect: false },
      { text: distractor2, isCorrect: false },
      { text: distractor3, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The scatterplot above shows a company's ice cream sales $d$, in dollars, and the high temperature $t$, in degrees Celsius (°C), on ${points.length} different days. A line of best fit for the data is also shown. Which of the following could be an equation of the line of best fit?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Estimate Slope:** Pick two points on the line.
    At $t=${tMin}$, $d \\approx ${slope*tMin + intercept}$.
    At $t=${tMax}$, $d \\approx ${slope*tMax + intercept}$.
    Slope $m \\approx \\frac{${slope*tMax + intercept} - ${slope*tMin + intercept}}{${tMax} - ${tMin}} = ${slope}$.

2.  **Estimate Intercept:**
    The y-intercept (where $t=0$) is approximately $${intercept}$.
    
    The equation matching these parameters is $d = ${slope}t + ${intercept}$.`
    };
  }
};

/**
 * Question ID: 7b52985c
 * 
 * ANALYSIS:
 * - Context: Calculating rate of change.
 * - Data: Two points (x1, y1) and (x2, y2).
 * - Task: Calculate (y2 - y1) / (x2 - x1).
 * - Result is likely a decimal.
 */
export const generator_7b52985c = {
  metadata: {
    id: "7b52985c",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // Ensure clean arithmetic.
    // x values: e.g., 2 and 6.
    // y values: e.g., 10 and 28.
    // Rate = (28-10)/(6-2) = 18/4 = 4.5
    
    const x1 = getRandomInt(1, 3);
    const deltaX = getRandomInt(2, 5);
    const x2 = x1 + deltaX;
    
    // Rate (can be decimal, e.g. 2.5, 4.5)
    // Let numerator be divisible by deltaX? Or just allow terminating decimals.
    // To ensure simple decimal, pick rate = integer or integer.5
    const rateBase = getRandomInt(2, 6);
    const isHalf = Math.random() < 0.5;
    const rate = isHalf ? rateBase + 0.5 : rateBase;
    
    const y1 = getRandomInt(5, 15);
    const y2 = y1 + rate * deltaX;
    
    // 2. SVG Generation
    const width = 300;
    const height = 250;
    const padding = { left: 50, right: 30, top: 20, bottom: 50 };
    
    const xMax = x2 + 2;
    const yMax = y2 + 10;
    
    const mapX = (x: number) => padding.left + (x / xMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yMax) * (height - padding.top - padding.bottom);
    
    const p1 = { x: x1, y: y1 };
    const p2 = { x: x2, y: y2 };
    
    const pointsSvg = `
      <circle cx="${mapX(p1.x)}" cy="${mapY(p1.y)}" r="4" fill="#3b82f6" />
      <circle cx="${mapX(p2.x)}" cy="${mapY(p2.y)}" r="4" fill="#3b82f6" />
      <text x="${mapX(p1.x) + 5}" y="${mapY(p1.y) - 5}" font-size="12" fill="currentColor">(${p1.x}, ${p1.y})</text>
      <text x="${mapX(p2.x) + 5}" y="${mapY(p2.y) - 5}" font-size="12" fill="currentColor">(${p2.x}, ${p2.y})</text>
    `;
    
    const svgCode = `
      <div style="width: 100%; max-width: 350px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          
          <!-- Points -->
          ${pointsSvg}
          
          <!-- Axis Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Time (s)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Distance (m)</text>
        </svg>
      </div>
    `;

    return {
      questionText: `The graph above shows the distance an object travels over time. What is the average rate of change, in meters per second, between $t=${x1}$ and $t=${x2}$?`,
      figureCode: svgCode,
      options: null, // Fill in the blank
      correctAnswer: rate.toString(),
      explanation: `
1.  **Identify Points:**
    The graph shows two points: $(${x1}, ${y1})$ and $(${x2}, ${y2})$.

2.  **Calculate Average Rate of Change:**
    Rate = $\\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}$
    Rate = $\\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${deltaX}} = ${rate}$.`
    };
  }
};