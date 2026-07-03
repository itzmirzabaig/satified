import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1468
 * 
 * ANALYSIS:
 * - Context: Calculating rate of change.
 * - Data: Two points (x1, y1) and (x2, y2).
 * - Task: Calculate (y2 - y1) / (x2 - x1).
 * - Result is likely a decimal.
 */
export const generator_1468 = {
  metadata: {
    id: "1468",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // Ensure clean arithmetic.
    // x values: e.g., 2 and 6.
    // y values: e.g., 10 and 28.
    // Rate = (28-10)/(6-2) = 18/4 = 4.5
    
    const x1 = getRandomInt(1, 3);
    const deltaX = getRandomInt(2, 5);
    const x2 = x1 + deltaX;
    
    // Rate (can be decimal, e.g. 2.5, 4.5)
    // Let numerator be divisible by deltaX? Or just allow terminating decimals.
    // To ensure simple decimal, pick rate = integer or integer.5
    const rateBase = getRandomInt(2, 6);
    const isHalf = Math.random() < 0.5;
    const rate = isHalf ? rateBase + 0.5 : rateBase;
    
    const y1 = getRandomInt(5, 15);
    const y2 = y1 + rate * deltaX;
    
    // 2. SVG Generation
    const width = 300;
    const height = 250;
    const padding = { left: 50, right: 30, top: 20, bottom: 50 };
    
    const xMax = x2 + 2;
    const yMax = y2 + 10;
    
    const mapX = (x: number) => padding.left + (x / xMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yMax) * (height - padding.top - padding.bottom);
    
    const p1 = { x: x1, y: y1 };
    const p2 = { x: x2, y: y2 };
    
    const pointsSvg = `
      <circle cx="${mapX(p1.x)}" cy="${mapY(p1.y)}" r="4" fill="#3b82f6" />
      <circle cx="${mapX(p2.x)}" cy="${mapY(p2.y)}" r="4" fill="#3b82f6" />
      <text x="${mapX(p1.x) + 5}" y="${mapY(p1.y) - 5}" font-size="12" fill="currentColor">(${p1.x}, ${p1.y})</text>
      <text x="${mapX(p2.x) + 5}" y="${mapY(p2.y) - 5}" font-size="12" fill="currentColor">(${p2.x}, ${p2.y})</text>
    `;
    
    const svgCode = `
      <div style="width: 100%; max-width: 350px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${padding.left}" y1="${height - padding.bottom}" x2="${width - padding.right}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${height - padding.bottom}" stroke="currentColor" stroke-width="2" />
          
          <!-- Points -->
          ${pointsSvg}
          
          <!-- Axis Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Time (s)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Distance (m)</text>
        </svg>
      </div>
    `;

    return {
      questionText: `The graph above shows the distance an object travels over time. What is the average rate of change, in meters per second, between $t=${x1}$ and $t=${x2}$?`,
      figureCode: svgCode,
      options: [], // Fill in the blank
      correctAnswer: rate.toString(),
      explanation: `
1.  **Identify Points:**
    The graph shows two points: $(${x1}, ${y1})$ and $(${x2}, ${y2})$.

2.  **Calculate Average Rate of Change:**
    Rate = $\\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}$
    Rate = $\\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${deltaX}} = ${rate}$.`
    };
  }
};
