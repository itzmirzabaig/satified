import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fdfc90e4
 * 
 * ANALYSIS:
 * - Skill: Scatterplot and Line of Best Fit (Prediction)
 * - Issue Fixed: "No visible scatterplot". Previous code failed to inject point elements into the SVG.
 * - Fix: Added rendering for data points and the regression line using raw SVG.
 */

export const generator_fdfc90e4 = {
  metadata: {
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Model Parameters
    const slope = -1;
    const intercept = getRandomInt(33, 35); // e.g., 34
    const targetX = 32;
    const predictedY = slope * targetX + intercept; // Exact value on line
    
    // STEP 2: Generate Scatter Points
    const points: {x: number, y: number}[] = [];
    for (let x = 24; x <= 34; x += 1) {
        // Skip occasional x for randomness
        if (Math.random() < 0.2) continue;
        
        const noise = (Math.random() - 0.5) * 2; // +/- 1
        const y = slope * x + intercept + noise;
        // Ensure y doesn't go below 0 for visual cleanliness
        points.push({ x, Math: Math.max(0, y) } as any);
        // Fix TS error in conceptual logic above by just using the calculated y
        points[points.length-1].y = Math.max(0, y); 
    }
    
    // STEP 3: SVG Configuration
    const xMin = 20, xMax = 40;
    const yMin = 0, yMax = 15;
    const width = 400;
    const height = 300;
    const padding = 40;
    
    // Coordinate mapping
    const mapX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const mapY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);
    
    // Grid Generation
    let gridSVG = '';
    // Vertical Grid
    for (let x = xMin; x <= xMax; x += 2) {
        const mx = mapX(x);
        gridSVG += `<line x1="${mx}" y1="${padding}" x2="${mx}" y2="${height - padding}" stroke="currentColor" stroke-width="0.5" opacity="0.2"/>`;
        if (x % 4 === 0) {
             gridSVG += `<text x="${mx}" y="${height - padding + 15}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
        }
    }
    // Horizontal Grid
    for (let y = yMin; y <= yMax; y += 1) {
        const my = mapY(y);
        gridSVG += `<line x1="${padding}" y1="${my}" x2="${width - padding}" y2="${my}" stroke="currentColor" stroke-width="0.5" opacity="0.2"/>`;
        if (y % 2 === 0) {
            gridSVG += `<text x="${padding - 8}" y="${my + 4}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
        }
    }
    
    // Data Points
    const pointsSVG = points.map(p => 
        `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="3" fill="currentColor" opacity="0.7" />`
    ).join('');
    
    // Regression Line
    const lineY1 = slope * xMin + intercept;
    const lineY2 = slope * xMax + intercept;
    const lineSVG = `<line x1="${mapX(xMin)}" y1="${mapY(lineY1)}" x2="${mapX(xMax)}" y2="${mapY(lineY2)}" stroke="currentColor" stroke-width="2" />`;
    
    const svgContent = `
<div style="width: 100%; max-width: 450px; margin: 0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit; font-family: sans-serif;">
    ${gridSVG}
    <!-- Axes -->
    <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="currentColor" stroke-width="1.5"/>
    <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="currentColor" stroke-width="1.5"/>
    
    <!-- Data & Line -->
    ${pointsSVG}
    ${lineSVG}
  </svg>
</div>
`;
    
    // STEP 4: Options
    // We want options reasonably close to the predicted value
    const correctVal = predictedY;
    const optionsData = [
      { text: (correctVal - 1.6).toFixed(1), isCorrect: false },
      { text: (correctVal - 0.7).toFixed(1), isCorrect: false },
      { text: correctVal.toFixed(1), isCorrect: true },
      { text: (correctVal + 1.3).toFixed(1), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The scatterplot shows the relationship between two variables, $x$ and $y$. A line of best fit for the data is also shown. At $x = ${targetX}$, which of the following is closest to the $y$-value predicted by the line of best fit?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the predicted value, locate $x = ${targetX}$ on the x-axis, move up to the line of best fit, and read the corresponding y-value. The line predicts a value closest to ${correctOption.text}.`
    };
  }
};