import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9d95e7ad
 * 
 * FIXES:
 * - Replaced broken SVG code with a proper scatterplot generator.
 * - Added data points and line of best fit to the figure.
 * - Added axis labels context (Protein vs Fat).
 * - Fixed options return type.
 */

export const generator_9d95e7ad = {
  metadata: {
    id: "9d95e7ad",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Slope: "Predicted increase in fat per gram of protein"
    // Range: roughly 1.0 to 2.0
    const slope = getRandomInt(12, 18) / 10; // e.g., 1.5
    const intercept = getRandomInt(2, 8);
    
    // Generate ~8 data points
    const xMinVal = 10;
    const xMaxVal = 40;
    
    const points = [];
    for (let i = 0; i < 8; i++) {
      const x = getRandomInt(xMinVal, xMaxVal);
      const noise = getRandomInt(-5, 5);
      const y = slope * x + intercept + noise;
      points.push({ x, y });
    }
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 50, right: 30, top: 20, bottom: 50 };
    
    // Determine bounds for plotting
    const xGraphMin = 0, xGraphMax = 50;
    const yGraphMin = 0, yGraphMax = slope * xGraphMax + intercept + 10;
    
    const mapX = (x: number) => padding.left + (x / xGraphMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yGraphMax) * (height - padding.top - padding.bottom);
    
    // Generate Points SVG
    const pointsSvg = points.map(p => 
      `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1" />`
    ).join('');
    
    // Generate Line of Best Fit
    // y = slope * x + intercept
    const lineX1 = xGraphMin;
    const lineY1 = slope * lineX1 + intercept;
    const lineX2 = xGraphMax;
    const lineY2 = slope * lineX2 + intercept;
    
    const lineSvg = `<line x1="${mapX(lineX1)}" y1="${mapY(lineY1)}" x2="${mapX(lineX2)}" y2="${mapY(lineY2)}" stroke="#3b82f6" stroke-width="2" />`;
    
    // Axes and Ticks
    const xTicks = [];
    for (let x = 0; x <= xGraphMax; x += 10) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
      `);
    }
    
    const yTicks = [];
    for (let y = 0; y <= yGraphMax; y += 20) {
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
          
          <!-- Graph Content -->
          ${lineSvg}
          ${pointsSvg}
          
          <!-- Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Total Protein (g)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Total Fat (g)</text>
        </svg>
      </div>
    `;
    
    // 3. Options
    // Correct slope
    const correctVal = slope.toFixed(1);
    
    // Distractors
    const d1 = (slope + 1.0).toFixed(1);
    const d2 = (slope + 0.5).toFixed(1);
    const d3 = Math.max(0.5, slope - 0.5).toFixed(1);
    
    const optionsData = [
      { text: correctVal, isCorrect: true },
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
      questionText: `The scatterplot above shows the numbers of grams of both total protein and total fat for eight sandwiches on a restaurant menu. The line of best fit for the data is also shown. According to the line of best fit, which of the following is closest to the predicted increase in total fat, in grams, for every increase of $1$ gram in total protein?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify the Question:**
    The "predicted increase in total fat... for every increase of 1 gram in total protein" refers to the **slope** of the line of best fit.

2.  **Estimate the Slope:**
    The slope is the rise over run ($\\frac{\\Delta \\text{Fat}}{\\Delta \\text{Protein}}$).
    Looking at the line, for every 10 units of protein (x-axis), the fat (y-axis) increases by approximately ${slope * 10} units.
    Slope $\\approx \\frac{${slope * 10}}{10} = ${slope}$.

3.  **Select Best Option:**
    The value closest to ${slope} is ${correctVal}.`
    };
  }
};