import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1446
 * 
 * FIXES:
 * - Implemented proper SVG scatterplot with line of best fit.
 * - Options formatted as equations.
 * - Options return type fixed to `string[]`.
 */

export const generator_1446 = {
  metadata: {
    id: "1446",
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
