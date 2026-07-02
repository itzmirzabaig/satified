import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1447
 * 
 * FIXES:
 * - Implemented proper SVG scatterplot with line of best fit.
 * - Options formatted as equations.
 * - Logic: If y' = k * y, then the new line is y' = k(mx + b) = (km)x + (kb). Both slope and intercept scale.
 */

export const generator_1447 = {
  metadata: {
    id: "1447",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Original Line: y = mx + b
    const b = getRandomInt(10, 20); // y-intercept
    const m = parseFloat((getRandomInt(10, 30) / 10).toFixed(1)); // Slope e.g. 1.5
    
    // Transformation Multiplier k
    const k = parseFloat((getRandomInt(25, 45) / 10).toFixed(1)); // e.g. 3.5
    
    // New Line: y' = (k*m)x + (k*b)
    const newM = parseFloat((m * k).toFixed(1));
    const newB = parseFloat((b * k).toFixed(1));
    
    // Generate Scatter Points for Original Data
    // x range 0 to 20
    const points = [];
    for (let x = 2; x <= 18; x += 2) {
      const y = m * x + b + getRandomInt(-3, 3);
      points.push({ x, y });
    }
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 50, right: 30, top: 20, bottom: 50 };
    
    const xMax = 20;
    const yMax = m * 20 + b + 10;
    
    const mapX = (x: number) => padding.left + (x / xMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yMax) * (height - padding.top - padding.bottom);
    
    // Generate Scatter Points SVG
    const pointsSvg = points.map(p => 
      `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="3" fill="#3b82f6" stroke="white" stroke-width="1" />`
    ).join('');
    
    // Generate Line of Best Fit
    const lineX1 = 0;
    const lineY1 = b;
    const lineX2 = xMax;
    const lineY2 = m * xMax + b;
    
    const lineSvg = `<line x1="${mapX(lineX1)}" y1="${mapY(lineY1)}" x2="${mapX(lineX2)}" y2="${mapY(lineY2)}" stroke="#3b82f6" stroke-width="2" />`;
    
    // Axes and Grid
    const xTicks = [];
    for (let x = 0; x <= xMax; x += 5) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
      `);
    }
    
    const yTicks = [];
    for (let y = 0; y <= yMax; y += 10) {
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
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">x</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">y</text>
        </svg>
      </div>
    `;
    
    // 3. Options
    // Format: y = NewIntercept + NewSlope x
    // Or y = NewSlope x + NewIntercept. SAT usually puts const first or second? 
    // Standard is mx+b. The prompt might use b + mx. 
    // Let's use mx + b or b + mx depending on standard SAT practice for this specific Q.
    // The original prompt analysis implied "12 + 1.5x". Let's stick to b + mx format if implied.
    
    const correctEq = `y = ${newB.toFixed(1)} + ${newM.toFixed(1)}x`;
    
    const distractor1 = `y = ${newB.toFixed(1)} + ${m.toFixed(1)}x`; // Scaled intercept only
    const distractor2 = `y = ${b} + ${newM.toFixed(1)}x`; // Scaled slope only
    const distractor3 = `y = ${b} + ${m.toFixed(1)}x`; // No scale
    
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
      questionText: `The scatterplot shows the relationship between two variables, $x$ and $y$. A line of best fit is shown. A new data set is created by multiplying the y-coordinate of each data point from the original data set by ${k}. Which of the following could be an equation of a line of best fit for the new data set?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Analyze Original Line:**
    The line of best fit for the original data has a y-intercept of roughly ${b} and a slope of roughly ${m}.
    Equation: $y \\approx ${b} + ${m}x$.

2.  **Apply Transformation:**
    The new data set is created by multiplying every y-coordinate by ${k}.
    This transformation scales both the y-intercept and the slope by ${k}.
    New y-intercept: $${b} \\times ${k} = ${newB.toFixed(1)}$.
    New slope: $${m} \\times ${k} = ${newM.toFixed(1)}$.

3.  **Form New Equation:**
    The equation for the new data set is $y = ${newB.toFixed(1)} + ${newM.toFixed(1)}x$.`
    };
  }
};
