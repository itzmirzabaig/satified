import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5b7599a6
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Standard Form Ax + By = C.
 * - Logic: Match a graph (given by intercepts) to its standard form equation.
 * - Fixes: Enforced integer arithmetic for A, B, C. Converted graph to SVG. 
 *          Removed floating point math that caused "long decimals".
 */

export const generator_5b7599a6 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Coefficients for Ax + By = C
    // To ensure nice integer intercepts, C must be a multiple of A and B.
    const A = getRandomInt(2, 6);
    const B = getRandomInt(2, 6);
    const factor = getRandomInt(2, 4); 
    const C = A * B * factor; // e.g. if A=3, B=4, factor=2 -> C=24. 

    // Intercepts
    const xInt = C / A; // 24/3 = 8
    const yInt = C / B; // 24/4 = 6

    // 2. Options
    // Correct Equation
    const correctEq = `${A}x + ${B}y = ${C}`;
    
    // Distractor 1: Sign Error (Ax - By = C)
    const dist1 = `${A}x - ${B}y = ${C}`;
    
    // Distractor 2: Swapped Coefficients (Bx + Ay = C) - common mistake
    const dist2 = `${B}x + ${A}y = ${C}`;
    
    // Distractor 3: Wrong Constant or Slope Sign
    const dist3 = `${A}x + ${B}y = ${C * 2}`; 

    const optionsData = [
      { text: `$${correctEq}$`, isCorrect: true },
      { text: `$${dist1}$`, isCorrect: false },
      { text: `$${dist2}$`, isCorrect: false },
      { text: `$${dist3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    // 3. Build SVG Graph
    // Define bounds
    const xMax = xInt + 2;
    const yMax = yInt + 2;
    
    // SVG Dimensions
    const width = 300;
    const height = 300;
    const margin = 40;
    
    const scaleX = (x: number) => margin + (x / xMax) * (width - 2*margin);
    const scaleY = (y: number) => (height - margin) - (y / yMax) * (height - 2*margin);

    // Grid Lines
    let gridHTML = '';
    // Vertical lines
    for(let i = 0; i <= xMax; i++) {
        const xPos = scaleX(i);
        const yTop = scaleY(yMax);
        const yBot = scaleY(0);
        gridHTML += `<line x1="${xPos}" y1="${yTop}" x2="${xPos}" y2="${yBot}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i % 2 === 0) { // Label every 2 units
            gridHTML += `<text x="${xPos}" y="${yBot + 15}" text-anchor="middle" font-size="12" fill="currentColor">${i}</text>`;
        }
    }
    // Horizontal lines
    for(let i = 0; i <= yMax; i++) {
        const yPos = scaleY(i);
        const xLeft = scaleX(0);
        const xRight = scaleX(xMax);
        gridHTML += `<line x1="${xLeft}" y1="${yPos}" x2="${xRight}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i % 2 === 0) { // Label every 2 units
            gridHTML += `<text x="${xLeft - 10}" y="${yPos + 4}" text-anchor="end" font-size="12" fill="currentColor">${i}</text>`;
        }
    }

    // Axes (Thicker)
    const axesHTML = `
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(xMax)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="2" />
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(0)}" y2="${scaleY(yMax)}" stroke="currentColor" stroke-width="2" />
    `;

    // The Line
    // We extend it slightly past the intercepts for visual style
    // Line eq: y = -(A/B)x + yInt
    // Start x = 0, End x = xInt
    const lineX1 = 0;
    const lineY1 = yInt;
    const lineX2 = xInt;
    const lineY2 = 0;
    
    const graphLine = `<line x1="${scaleX(lineX1)}" y1="${scaleY(lineY1)}" x2="${scaleX(lineX2)}" y2="${scaleY(lineY2)}" stroke="currentColor" stroke-width="3" />`;

    // Points at intercepts
    const pointsHTML = `
        <circle cx="${scaleX(0)}" cy="${scaleY(yInt)}" r="5" fill="currentColor" />
        <circle cx="${scaleX(xInt)}" cy="${scaleY(0)}" r="5" fill="currentColor" />
    `;

    const svgContent = `
    <div style="width: 100%; max-width: 400px; margin: 0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit;">
        ${gridHTML}
        ${axesHTML}
        ${graphLine}
        ${pointsHTML}
      </svg>
    </div>
    `;

    // 4. Explanation
    const explanation = `
      The graph shows a line passing through the y-intercept $(0, ${yInt})$ and the x-intercept $(${xInt}, 0)$.
      <br/><br/>
      We can test which equation is satisfied by these points.
      <br/>
      Test the point $(0, ${yInt})$ in the equation $${correctEq}$:
      $$ ${A}(0) + ${B}(${yInt}) = 0 + ${B * yInt} = ${C} $$
      This is correct.
      <br/><br/>
      Test the point $(${xInt}, 0)$ in the equation $${correctEq}$:
      $$ ${A}(${xInt}) + ${B}(0) = ${A * xInt} + 0 = ${C} $$
      This is also correct.
      <br/><br/>
      Therefore, the equation of the line is $${correctEq}$.
    `;
    
    return {
      questionText: `The graph shows a linear relationship between $x$ and $y$. Which equation represents this line?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};