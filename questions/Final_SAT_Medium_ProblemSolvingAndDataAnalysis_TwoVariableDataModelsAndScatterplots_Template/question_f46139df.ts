import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f46139df
 * 
 * ANALYSIS:
 * - Skill: Scatterplot and Line of Best Fit (Reading value from line)
 * - Issue Fixed: "No visible scatterplot". The previous code calculated points but failed to insert the SVG circle elements into the string.
 * - Fix: Added rendering logic for points and the line of best fit.
 */

export const generator_f46139df = {
  metadata: {
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Model
    // Target: at x=25.5, y should be around 8-9.
    // Line: y = -x + b
    // If x=25.5 and y=8.5 -> b = 34.
    const slope = -1;
    const intercept = getRandomInt(33, 35); // e.g., 34
    const targetX = 25.5;
    const predictedY = slope * targetX + intercept; // Exact value on line
    
    // STEP 2: Generate Scatter Points (with noise)
    // Range x: 20 to 35 to frame the data well
    const points: {x: number, y: number}[] = [];
    for (let x = 22; x <= 32; x += 1) {
        // Skip occasional x to look more random
        if (Math.random() < 0.2) continue;
        
        const noise = (Math.random() - 0.5) * 3; // +/- 1.5
        const y = slope * x + intercept + noise;
        points.push({ x, y });
    }
    
    // STEP 3: SVG Configuration
    const xMin = 20, xMax = 35;
    const yMin = 0, yMax = 15;
    const width = 400;
    const height = 300;
    const padding = 40;
    
    // Map functions
    const mapX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const mapY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);
    
    // Grid Lines
    let gridSVG = '';
    // Vertical Grid (every 1 unit)
    for (let x = xMin; x <= xMax; x++) {
        const mx = mapX(x);
        const strokeW = x % 5 === 0 ? 1 : 0.5;
        const opacity = x % 5 === 0 ? 0.3 : 0.1;
        gridSVG += `<line x1="${mx}" y1="${padding}" x2="${mx}" y2="${height - padding}" stroke="currentColor" stroke-width="${strokeW}" opacity="${opacity}"/>`;
        if (x % 2 === 0) { // Label every 2
             gridSVG += `<text x="${mx}" y="${height - padding + 15}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
        }
    }
    // Horizontal Grid (every 1 unit)
    for (let y = yMin; y <= yMax; y++) {
        const my = mapY(y);
        const strokeW = y % 5 === 0 ? 1 : 0.5;
        const opacity = y % 5 === 0 ? 0.3 : 0.1;
        gridSVG += `<line x1="${padding}" y1="${my}" x2="${width - padding}" y2="${my}" stroke="currentColor" stroke-width="${strokeW}" opacity="${opacity}"/>`;
        if (y % 2 === 0) {
            gridSVG += `<text x="${padding - 8}" y="${my + 4}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
        }
    }
    
    // Data Points
    const pointsSVG = points.map(p => 
        `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="3" fill="currentColor" opacity="0.7" />`
    ).join('');
    
    // Line of Best Fit
    // Draw from xMin to xMax (clamped to y range if needed)
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
    <!-- Data -->
    ${pointsSVG}
    <!-- Regression Line -->
    ${lineSVG}
  </svg>
</div>
`;

    // STEP 4: Options
    // Correct answer is the value on the line: predictedY
    // We create distractors around it
    const correctVal = predictedY;
    const optionsData = [
      { text: (correctVal - 1.5).toFixed(1), isCorrect: false },
      { text: (correctVal - 0.7).toFixed(1), isCorrect: false },
      { text: correctVal.toFixed(1), isCorrect: true },
      { text: (correctVal + 1.2).toFixed(1), isCorrect: false }
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
      explanation: `Choice ${correctOption.letter} is correct. To find the predicted value, we look at the line of best fit at $x = ${targetX}$. The line passes through the point $(${targetX}, ${correctOption.text})$. Therefore, the predicted $y$-value is closest to ${correctOption.text}.`
    };
  }
};