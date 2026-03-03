import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9b0a4eae
 * 
 * FIXES:
 * - Replaced broken SVG code with a proper line graph showing x + y = HalfPerimeter.
 * - Context: Rectangle dimensions (Length x, Width y). Perimeter P.
 * - Relationship: 2x + 2y = P  =>  x + y = P/2.
 * - Point (xVal, yVal) lies on this line.
 */
export const generator_9b0a4eae = {
  metadata: {
    id: "9b0a4eae",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    const perimeter = getRandomInt(30, 50) * 2; // Ensure even perimeter
    const halfPerimeter = perimeter / 2;
    
    // Choose a point (x, y) on the line x + y = halfPerimeter
    const xVal = getRandomInt(5, halfPerimeter - 5);
    const yVal = halfPerimeter - xVal;
    
    // 2. SVG Configuration
    const width = 400;
    const height = 300;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    const axisMax = halfPerimeter + 5;
    
    const mapX = (x: number) => padding.left + (x / axisMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / axisMax) * (height - padding.top - padding.bottom);
    
    // Generate Line: from (0, halfPerimeter) to (halfPerimeter, 0)
    const lineSvg = `
      <line x1="${mapX(0)}" y1="${mapY(halfPerimeter)}" 
            x2="${mapX(halfPerimeter)}" y2="${mapY(0)}" 
            stroke="#3b82f6" stroke-width="2" />
    `;
    
    // Point Marker
    const pointSvg = `
      <circle cx="${mapX(xVal)}" cy="${mapY(yVal)}" r="5" fill="#ef4444" stroke="white" stroke-width="1.5" />
      <text x="${mapX(xVal) + 8}" y="${mapY(yVal) - 8}" font-size="14" fill="currentColor">(${xVal}, ${yVal})</text>
    `;
    
    // Axes and Ticks
    const xTicks = [];
    for (let x = 0; x <= axisMax; x += 5) {
      xTicks.push(`
        <text x="${mapX(x)}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
        <line x1="${mapX(x)}" y1="${height - padding.bottom}" x2="${mapX(x)}" y2="${height - padding.bottom + 5}" stroke="currentColor" />
      `);
    }
    
    const yTicks = [];
    for (let y = 0; y <= axisMax; y += 5) {
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
          ${pointSvg}
          
          <!-- Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Length (x)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Width (y)</text>
        </svg>
      </div>
    `;
    
    // 3. Options
    const optionsData = [
      { text: `The length is ${xVal} m, and the width is ${yVal} m.`, isCorrect: true },
      { text: `The length is ${yVal} m, and the width is ${xVal} m.`, isCorrect: false }, // Swapped
      { text: `The length is ${xVal} m less than the perimeter, and the width is ${yVal} m less than the perimeter.`, isCorrect: false },
      { text: `The area of the rectangle is ${perimeter} square meters.`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The graph in the $xy$-plane models the possible combinations of length $x$, in meters (m), and width $y$, in meters, for a rectangle with a perimeter of ${perimeter} m. Which statement is the best interpretation of the point $(${xVal}, ${yVal})$ in this context?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
In the given context:
- The x-axis represents the length of the rectangle.
- The y-axis represents the width of the rectangle.

Therefore, the point $(x, y) = (${xVal}, ${yVal})$ means that when the length is ${xVal} m, the width is ${yVal} m.`
    };
  }
};

/**
 * Question ID: 0451d754
 * 
 * ANALYSIS:
 * - Context: Parallel Lines.
 * - Task: Identify slope of a line parallel to a given equation.
 * - Equation: y = mx + b or Ax + By = C.
 * - Logic: Parallel lines have equal slopes.
 */
export const generator_0451d754 = {
  metadata: {
    id: "0451d754",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const mNum = getRandomInt(2, 9);
    const mDen = getRandomInt(2, 9);
    // Ensure reduced fraction isn't always needed for this logic, but cleaner numbers help.
    // Let's just use raw ints for now.
    
    const intercept = getRandomInt(1, 10);
    
    // Equation: y = (num/den)x + b
    const equation = `y = \\frac{${mNum}}{${mDen}}x + ${intercept}`;
    const slopeStr = `\\frac{${mNum}}{${mDen}}`;
    
    // 2. Options
    const correctSlope = slopeStr;
    const d1 = `-\\frac{${mDen}}{${mNum}}`; // Perpendicular
    const d2 = `\\frac{${mDen}}{${mNum}}`; // Reciprocal
    const d3 = `-${slopeStr}`; // Negative slope

    const optionsData = [
      { text: correctSlope, isCorrect: true },
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
      questionText: `Which of the following is the slope of a line that is parallel to the line with equation $${equation}$ in the $xy$-plane?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
Parallel lines have equal slopes.
The given equation is in slope-intercept form $y = mx + b$, where $m$ is the slope.
For the equation $${equation}$, the slope is $${slopeStr}$.
      
Therefore, any line parallel to this line must also have a slope of $${slopeStr}$.`
    };
  }
};