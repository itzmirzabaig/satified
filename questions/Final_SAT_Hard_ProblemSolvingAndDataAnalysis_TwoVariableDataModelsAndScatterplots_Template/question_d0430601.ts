import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: d0430601
 * 
 * FIXES:
 * - LaTeX Syntax: Fixed `^\\\\circ` to `^{\\circ}` to prevent "missing open brace" error.
 * - SVG: Implemented proper scatterplot with line of best fit.
 * - Logic: Given slope m, calculate change in y for change in x of 'tempIncrease'.
 */

export const generator_d0430601 = {
  metadata: {
    id: "d0430601",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Slope: visitors per degree (e.g. 50)
    const slope = getRandomInt(40, 80); 
    // Target X increase: e.g. 5 degrees
    const tempIncrease = getRandomInt(3, 8); 
    
    // Answer = slope * tempIncrease
    const answer = slope * tempIncrease;
    
    // Generate Scatter Points
    // Base temperature around 25-35 C
    const baseTemp = 25;
    const points = [];
    const numPoints = 11;
    
    // Intercept (visitors at 0 deg C - purely theoretical for linear model)
    const intercept = getRandomInt(100, 300);
    
    for (let i = 0; i < numPoints; i++) {
      // Temperatures range from baseTemp to baseTemp + 15
      const temp = baseTemp + i * 1.5 + (Math.random() * 2); 
      // Visitors = slope * temp + intercept + noise
      const visitors = slope * temp + intercept + getRandomInt(-50, 50);
      points.push({ x: temp, y: visitors });
    }
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    // Bounds
    const xMin = 20, xMax = 45;
    const yMin = 0, yMax = slope * xMax + intercept + 200;
    
    const mapX = (x: number) => padding.left + ((x - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - ((y - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);
    
    // Generate Points SVG
    const pointsSvg = points.map(p => 
      `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="3" fill="#3b82f6" stroke="white" stroke-width="1" />`
    ).join('');
    
    // Generate Line of Best Fit
    const lineX1 = xMin;
    const lineY1 = slope * lineX1 + intercept;
    const lineX2 = xMax;
    const lineY2 = slope * lineX2 + intercept;
    
    const lineSvg = `<line x1="${mapX(lineX1)}" y1="${mapY(lineY1)}" x2="${mapX(lineX2)}" y2="${mapY(lineY2)}" stroke="#3b82f6" stroke-width="2" />`;
    
    // Axes and Ticks
    const xTicks = [];
    for (let x = xMin; x <= xMax; x += 5) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
      `);
    }
    
    const yTicks = [];
    // Dynamic step based on range
    const yStep = Math.ceil((yMax - yMin) / 5 / 100) * 100; 
    for (let y = 0; y <= yMax; y += yStep) {
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
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Visitors</text>
        </svg>
      </div>
    `;
    
    // 3. Return Question Data
    return {
      questionText: `Each dot in the scatterplot above represents the temperature and the number of people who visited a beach in Lagos, Nigeria, on one of ${numPoints} different days. The line of best fit for the data is also shown. The line of best fit for the data has a slope of approximately ${slope}. According to this estimate, how many additional people per day are predicted to visit the beach for each $${tempIncrease}^{\\circ}\\text{C}$ increase in average temperature?`,
      figureCode: svgCode,
      options: null, // Fill-in-the-blank
      correctAnswer: answer.toString(),
      explanation: `The slope of the line of best fit represents the predicted change in the number of visitors for each $1^{\\circ}\\text{C}$ increase in temperature.
      
Given:
- Slope = ${slope} visitors per degree.
- Temperature increase = $${tempIncrease}^{\\circ}\\text{C}$.

Predicted increase in visitors = Slope $\\times$ Temperature Change
$= ${slope} \\times ${tempIncrease} = ${answer}$.`
    };
  }
};

/**
 * Question ID: e821a26d
 * 
 * ANALYSIS:
 * - Context: Quadratic Model fitting data.
 * - Graph: Parabola opening downward (inverted U).
 * - Identifying features: 
 *   - Leading coefficient 'a' must be negative (opens down).
 *   - y-intercept (constant term 'c') must be positive (based on typical data context like height or profit).
 *   - Axis of symmetry location (-b/2a).
 */

export const generator_e821a26d = {
  metadata: {
    id: "e821a26d",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // y = ax^2 + bx + c
    // a < 0 (opens down)
    // c > 0 (y-intercept)
    // b > 0 (vertex in quadrant 1)
    
    const a = parseFloat((-1 * (getRandomInt(10, 25) / 10)).toFixed(1)); // e.g. -1.5
    const b = parseFloat((getRandomInt(10, 30)).toFixed(1)); // e.g. 20
    const c = getRandomInt(500, 800); // e.g. 700
    
    // Generate points for scatterplot
    const points = [];
    const xMax = 25;
    for (let x = 0; x <= xMax; x += 2) {
      const yModel = a * x * x + b * x + c;
      const noise = getRandomInt(-20, 20);
      points.push({ x, y: yModel + noise });
    }
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    // Vertex y-coord estimation: c - b^2/4a approx? No, max height.
    // Vertex x = -b/2a = -20 / -3 = 6.6.
    // Max y at vertex.
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;
    
    const yMaxGraph = vertexY + 50;
    
    const mapX = (x: number) => padding.left + (x / xMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yMaxGraph) * (height - padding.top - padding.bottom);
    
    // Generate Scatter Points SVG
    const pointsSvg = points.map(p => 
      `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="3" fill="#3b82f6" stroke="white" stroke-width="1" />`
    ).join('');
    
    // Generate Curve of Best Fit
    let pathD = `M ${mapX(0)} ${mapY(c)}`;
    for (let x = 1; x <= xMax; x++) {
      const y = a * x * x + b * x + c;
      pathD += ` L ${mapX(x)} ${mapY(y)}`;
    }
    
    const lineSvg = `<path d="${pathD}" fill="none" stroke="#3b82f6" stroke-width="2" />`;
    
    // Axes
    const xTicks = [];
    for (let x = 0; x <= xMax; x += 5) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
      `);
    }
    
    const yTicks = [];
    const yStep = 100;
    for (let y = 0; y <= yMaxGraph; y += yStep) {
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
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Time (s)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Height (m)</text>
        </svg>
      </div>
    `;

    // 3. Options
    // Correct: y = ax^2 + bx + c
    const correctEq = `y = ${a}x^2 + ${b}x + ${c}`;
    
    // Distractors
    const d1 = `y = ${Math.abs(a)}x^2 + ${b}x + ${c}`; // Opens up (wrong sign on a)
    const d2 = `y = ${a}x^2 - ${b}x - ${c}`; // Negative intercept (wrong)
    const d3 = `y = ${Math.abs(a)}x^2 - ${b}x + ${c}`; // Opens up
    
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
      questionText: `The scatterplot above shows the height $y$, in meters, of a projectile $x$ seconds after it was launched. A quadratic model of best fit is shown. Which of the following equations best represents the model shown?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Analyze the Shape:**
    The graph is a parabola that opens downward. This means the coefficient of the $x^2$ term must be negative ($a < 0$).
    This eliminates equations where the $x^2$ coefficient is positive.

2.  **Analyze the Y-Intercept:**
    The projectile starts at a height greater than 0 (at $x=0$, $y > 0$).
    Therefore, the constant term ($c$) must be positive.
    
    The equation $y = ${a}x^2 + ${b}x + ${c}$ matches these characteristics: it has a negative leading coefficient (${a}) and a positive constant term (${c}).`
    };
  }
};