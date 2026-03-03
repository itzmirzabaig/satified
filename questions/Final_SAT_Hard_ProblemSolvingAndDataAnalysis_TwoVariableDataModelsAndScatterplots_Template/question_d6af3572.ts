import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d6af3572
 * 
 * FIXES:
 * - Implemented proper SVG scatterplot with line of best fit.
 * - Added correct axis labels (Years since [StartYear] vs Wage).
 * - Fixed options return type to `string[]`.
 * - Logic: Interpret slope as rate of change per year.
 */

export const generator_d6af3572 = {
  metadata: {
    id: "d6af3572",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Slope: ~0.096 (9.6 cents per year)
    const slopeBase = getRandomInt(80, 120);
    const slope = slopeBase / 1000; // e.g., 0.096
    
    // Intercept: ~ -0.488 (Model intercept)
    const intercept = parseFloat((getRandomInt(-600, -400) / 1000).toFixed(3)); 
    
    // Time Setup
    const startYear = 1940;
    const yearSpan = 70; // up to 2010
    const endYear = startYear + yearSpan;
    
    // Generate Points (every 5-10 years)
    const points = [];
    for (let x = 0; x <= yearSpan; x += 10) {
      // Model value
      const modelY = slope * x + intercept;
      // Add randomness, but ensure wage is positive and increasing trend is visible
      const noise = (Math.random() - 0.5) * 0.5;
      const y = Math.max(0.25, modelY + noise);
      points.push({ x, y });
    }
    
    // 2. SVG Configuration
    const width = 450;
    const height = 300;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    const xGraphMax = 80; // Years since 1940
    const yGraphMax = slope * xGraphMax + intercept + 1;
    
    const mapX = (x: number) => padding.left + (x / xGraphMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yGraphMax) * (height - padding.top - padding.bottom);
    
    // Generate Points SVG
    const pointsSvg = points.map(p => 
      `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1" />`
    ).join('');
    
    // Generate Line of Best Fit
    const lineX1 = 0;
    const lineY1 = Math.max(0, intercept); // Visual clip
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
    for (let y = 0; y <= Math.ceil(yGraphMax); y += 1) {
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
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Years since ${startYear}</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Minimum Wage ($)</text>
        </svg>
      </div>
    `;
    
    // 3. Options
    const optCorrect = `Each year between ${startYear} and ${endYear}, the average increase in minimum wage was ${slope.toFixed(3)} dollars.`;
    const optWrong1 = `Each year between ${startYear} and ${endYear}, the average increase in minimum wage was ${Math.abs(intercept).toFixed(2)} dollars.`;
    const optWrong2 = `Every 10 years between ${startYear} and ${endYear}, the average increase in minimum wage was ${slope.toFixed(3)} dollars.`;
    const optWrong3 = `Every 10 years between ${startYear} and ${endYear}, the average increase in minimum wage was ${Math.abs(intercept).toFixed(3)} dollars.`;
    
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
      questionText: `The scatterplot above shows the federal-mandated minimum wage for selected years between ${startYear} and ${endYear}. A line of best fit is shown, and its equation is $y=${slope}x${intercept}$. What does the slope of the line of best fit predict about the minimum wage over this period?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Identify Slope:**
    The equation is $y = ${slope}x ${intercept}$. The slope is the coefficient of $x$, which is ${slope}.

2.  **Interpret Slope:**
    The slope represents the change in $y$ (Minimum Wage) for every 1 unit increase in $x$ (Years).
    Therefore, the slope predicts that each year, the minimum wage increases by ${slope} dollars.`
    };
  }
};

/**
 * Question ID: 1e1027a7
 * 
 * FIXES:
 * - Implemented proper SVG scatterplot with line of best fit.
 * - Context: Ice Cream Sales vs Temperature.
 * - Task: Identify equation of line of best fit (estimating slope and intercept).
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
    const slope = getRandomInt(25, 40); // e.g., 33
    const intercept = getRandomInt(70, 100); // e.g., 84
    
    // Generate Points
    const tMin = 10, tMax = 26;
    const points = [];
    for (let t = tMin; t <= tMax; t += 2) {
      const d = slope * t + intercept + getRandomInt(-40, 40);
      points.push({ x: t, y: d });
    }
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    const xGraphMax = 30;
    const yGraphMax = slope * xGraphMax + intercept + 50;
    
    const mapX = (x: number) => padding.left + (x / xGraphMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yGraphMax) * (height - padding.top - padding.bottom);
    
    // Points
    const pointsSvg = points.map(p => 
      `<circle cx="${mapX(p.x)}" cy="${mapY(p.y)}" r="3" fill="#3b82f6" stroke="white" stroke-width="1" />`
    ).join('');
    
    // Line
    const lineX1 = 5; // Visual start
    const lineY1 = slope * lineX1 + intercept;
    const lineX2 = xGraphMax;
    const lineY2 = slope * lineX2 + intercept;
    
    const lineSvg = `<line x1="${mapX(lineX1)}" y1="${mapY(lineY1)}" x2="${mapX(lineX2)}" y2="${mapY(lineY2)}" stroke="#3b82f6" stroke-width="2" />`;
    
    // Axes
    const xTicks = [];
    for (let x = 5; x <= xGraphMax; x += 5) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
      `);
    }
    
    const yTicks = [];
    for (let y = 0; y <= yGraphMax; y += 200) {
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
    const wrongSlope = getRandomInt(5, 15);
    const wrongIntercept = intercept + 200;
    
    const optionsData = [
      { text: correctEq, isCorrect: true },
      { text: `d = ${wrongSlope}t + ${intercept}`, isCorrect: false },
      { text: `d = ${slope}t + ${wrongIntercept}`, isCorrect: false },
      { text: `d = ${parseFloat((1/slope).toFixed(2))}t + ${intercept}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The scatterplot above shows a company's ice cream sales $d$, in dollars, and the high temperature $t$, in degrees Celsius (°C), on several different days. A line of best fit for the data is also shown. Which of the following could be an equation of the line of best fit?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Estimate Slope:**
    Pick two points on the line, e.g., $t=10$ and $t=20$.
    $d(10) \\approx ${slope*10 + intercept}$.
    $d(20) \\approx ${slope*20 + intercept}$.
    Slope $\\approx \\frac{${slope*10}}{10} = ${slope}$.

2.  **Estimate Intercept:**
    The y-intercept (where $t=0$) appears to be around ${intercept}.
    
    The equation $d = ${slope}t + ${intercept}$ fits these estimates.`
    };
  }
};