import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 11e1ab81
 * 
 * FIXES:
 * - Replaced broken SVG code with a proper line graph through origin.
 * - Logic: Given line passing through (0,0) and (x,y), find d = km.
 */
export const generator_11e1ab81 = {
  metadata: {
    id: "11e1ab81",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // d = slope * m
    const slope = getRandomInt(2, 5); // Positive integer slope
    
    // Choose a point to highlight for clarity
    const xVal = 4;
    const yVal = slope * xVal;
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    const xMax = 6;
    const yMax = slope * xMax;
    
    const mapX = (x: number) => padding.left + (x / xMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yMax) * (height - padding.top - padding.bottom);
    
    // Line passing through (0,0)
    const lineSvg = `
      <line x1="${mapX(0)}" y1="${mapY(0)}" 
            x2="${mapX(xMax)}" y2="${mapY(yMax)}" 
            stroke="#3b82f6" stroke-width="3" />
    `;
    
    // Highlight Point
    const pointSvg = `
      <circle cx="${mapX(xVal)}" cy="${mapY(yVal)}" r="5" fill="#ef4444" stroke="white" stroke-width="1.5" />
      <text x="${mapX(xVal) - 20}" y="${mapY(yVal) - 10}" font-size="14" fill="currentColor">(${xVal}, ${yVal})</text>
    `;
    
    // Axes and Ticks
    const xTicks = [];
    for (let x = 0; x <= xMax; x += 1) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${padding.top}" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.2" />
      `);
    }
    
    const yTicks = [];
    const yStep = slope * 2; // Clean steps
    for (let y = 0; y <= yMax; y += yStep) {
      yTicks.push(`
        <text x="${padding.left - 10}" y="${mapY(y) + 4}" text-anchor="end" font-size="12" fill="currentColor">${y}</text>
        <line x1="${padding.left}" y1="${mapY(y)}" x2="${padding.left - 5}" y2="${mapY(y)}" stroke="currentColor" />
        <line x1="${padding.left}" y1="${mapY(y)}" x2="${width - padding.right}" y2="${mapY(y)}" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.2" />
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
          ${pointSvg}
          
          <!-- Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Time (m)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Distance (d)</text>
        </svg>
      </div>
    `;
    
    // 3. Options
    const correctEq = `d = ${slope}m`;
    const d1 = `d = -${slope}m`;
    const d2 = `d = m + ${slope}`;
    const d3 = `d = ${slope}m + ${slope}`;

    const optionsData = [
      { text: correctEq, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The graph above shows the distance traveled $d$, in feet, by a product on a conveyor belt $m$ minutes after the product is placed on the belt. Which of the following equations correctly relates $d$ and $m$?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify Points:**
    The line passes through the origin $(0, 0)$ and the point $(${xVal}, ${yVal})$.

2.  **Calculate Slope:**
    Slope $k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${yVal} - 0}{${xVal} - 0} = ${slope}$.

3.  **Form Equation:**
    Since the y-intercept is 0, the equation is $d = km \\Rightarrow d = ${slope}m$.`
    };
  }
};

/**
 * Question ID: 4fe4fd7c
 * 
 * ANALYSIS:
 * - Context: Linear Function Evaluation.
 * - Given: c(x) = mx + b.
 * - Data: c(x1) = y1, and usually intercept is given or calculable.
 * - Task: Find c(x2).
 */
export const generator_4fe4fd7c = {
  metadata: {
    id: "4fe4fd7c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const slope = getRandomInt(2, 6); // m
    const intercept = getRandomInt(400, 600); // b
    
    // c(x) = mx + b
    // Given point x1
    const x1 = 100;
    const y1 = slope * x1 + intercept;
    
    // Target point x2
    const x2 = 1000;
    const y2 = slope * x2 + intercept;
    
    // Question:
    // Function c(x) = mx + 500. c(100) = y1. What is c(1000)?
    // Here intercept is given as fixed 500 in prompt? Let's use the random intercept.
    
    return {
      questionText: `For the linear function $c$, $c(x) = mx + ${intercept}$, where $m$ is a constant. If $c(${x1}) = ${y1}$, what is the value of $c(${x2})$?`,
      figureCode: null,
      options: null, // Fill in the blank
      correctAnswer: y2.toString(),
      explanation: `To find the value of $m$, substitute $x = ${x1}$ and $c(x) = ${y1}$ into the equation:
      
$${y1} = m(${x1}) + ${intercept}$
$${y1} - ${intercept} = ${x1}m$
$${y1 - intercept} = ${x1}m$
$m = \\frac{${y1 - intercept}}{${x1}} = ${slope}$

Now substitute $m = ${slope}$ and $x = ${x2}$ into the original equation:
$c(${x2}) = ${slope}(${x2}) + ${intercept}$
$c(${x2}) = ${slope * x2} + ${intercept}$
$c(${x2}) = ${y2}$`
    };
  }
};