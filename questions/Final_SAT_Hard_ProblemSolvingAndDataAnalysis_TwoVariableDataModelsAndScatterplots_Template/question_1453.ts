import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1453
 * 
 * FIXES:
 * - LaTeX Syntax: Fixed `^\\\\circ` to `^{\\circ}` to prevent "missing open brace" error.
 * - SVG: Implemented proper scatterplot with line of best fit.
 * - Logic: Given slope m, calculate change in y for change in x of 'tempIncrease'.
 */

export const generator_1453 = {
  metadata: {
    id: "1453",
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
      options: [], // Fill-in-the-blank
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
