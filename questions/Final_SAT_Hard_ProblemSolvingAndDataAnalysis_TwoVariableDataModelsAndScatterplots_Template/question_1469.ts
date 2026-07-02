import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1469
 * 
 * ANALYSIS:
 * - Context: Interpreting slope of line of best fit.
 * - Data: x = Years since 1940 (or similar), y = Minimum Wage.
 * - Slope: Rate of increase per year.
 * - Options: Predicted increase per year, per 10 years, predicted wage at start, etc.
 */
export const generator_1469 = {
  metadata: {
    id: "1469",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // Slope ~ 0.096 (cents per year increase approx)
    // Intercept ~ -0.488 (wage at year 0)
    // Let's create a realistic-ish model: Wage = 0.10 * (Year - 1940) + 0.30
    
    const slope = parseFloat((getRandomInt(80, 120) / 1000).toFixed(3)); // e.g. 0.096
    const intercept = parseFloat((getRandomInt(-600, -400) / 1000).toFixed(3)); // e.g. -0.488
    
    // Equation: y = slope * x + intercept
    // Context: x is number of years since 1940. y is minimum wage in dollars.
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    const xMin = 0, xMax = 70; // 0 to 70 years (1940-2010)
    const yMin = 0, yMax = slope * xMax + intercept + 2;
    
    const mapX = (x: number) => padding.left + (x / xMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yMax) * (height - padding.top - padding.bottom);
    
    // Generate Scatter Points
    const points = [];
    for (let x = 0; x <= 70; x += 5) {
      const y = Math.max(0, slope * x + intercept + (Math.random() - 0.5));
      points.push({ x, y });
    }
    
    const pointsSvg = points.map(p => 
      `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="3" fill="#3b82f6" stroke="white" stroke-width="1" />`
    ).join('');
    
    const lineX1 = 0;
    const lineY1 = Math.max(0, intercept); // Start at 0 if intercept negative visually
    const lineX2 = xMax;
    const lineY2 = slope * lineX2 + intercept;
    
    const lineSvg = `<line x1="${mapX(lineX1)}" y1="${mapY(lineY1)}" x2="${mapX(lineX2)}" y2="${mapY(lineY2)}" stroke="#3b82f6" stroke-width="2" />`;

    const svgCode = `
      <div style="width: 100%; max-width: 450px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          
          <!-- Graph -->
          ${lineSvg}
          ${pointsSvg}
          
          <!-- Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Years since 1940</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Minimum Wage ($)</text>
        </svg>
      </div>
    `;

    // 3. Options
    // Correct: "predicted increase in minimum wage, in dollars, for each increase of 1 year"
    const optCorrect = "the predicted increase in the minimum wage, in dollars, for each increase of 1 year";
    const optWrong1 = "the predicted minimum wage, in dollars, in 1940"; // Intercept concept
    const optWrong2 = "the predicted minimum wage, in dollars, in 2010"; // Value at x=70
    const optWrong3 = "the predicted increase in the minimum wage, in dollars, for each increase of 10 years"; // Wrong unit

    const optionsData = [
      { text: optCorrect, isCorrect: true },
      { text: optWrong1, isCorrect: false },
      { text: optWrong2, isCorrect: false },
      { text: optWrong3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The scatterplot above shows the federal minimum wage, in dollars, for selected years from 1940 to 2010. A line of best fit is shown. The equation of the line of best fit is $y = ${slope}x ${intercept < 0 ? '-' : '+'} ${Math.abs(intercept)}$, where $x$ is the number of years since 1940 and $y$ is the federal minimum wage in dollars. Which of the following is the best interpretation of the slope of the line of best fit in this context?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify Slope in Equation:**
    The equation is in the form $y = mx + b$, where $m$ is the slope.
    Here, $m = ${slope}$.

2.  **Interpret Slope:**
    The slope represents the change in $y$ (minimum wage) for every 1-unit increase in $x$ (years since 1940).
    Therefore, the slope represents the predicted increase in the minimum wage, in dollars, for each increase of 1 year.`
    };
  }
};
