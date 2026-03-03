import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 50f4cb9c
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Format: Table and Graph.
 * - Logic: Find a and b from points, then calculate a - b.
 * - Fixes: Table borders made visible (no fill). Replaced Mafs with SVG.
 */

export const generator_50f4cb9c = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Function Parameters
    // f(x) = ax + b
    const a = getRandomInt(30, 80); // Slope
    // We want a point where f(x) = 0 for clean graphing, let's say at x = xIntercept
    const xIntercept = getRandomInt(2, 5);
    const b = -a * xIntercept; // Ensures f(xIntercept) = 0
    
    // 2. Generate Points for Table
    // Point 1
    const x1 = xIntercept - 1;
    const y1 = a * x1 + b;
    
    // Point 2 (The intercept)
    const x2 = xIntercept;
    const y2 = 0;
    
    // Point 3
    const x3 = xIntercept + 1;
    const y3 = a * x3 + b;

    // 3. Calculate Target
    const answer = a - b;

    // 4. Options
    const optionsData = [
      { text: `${answer}`, isCorrect: true },
      { text: `${a + b}`, isCorrect: false }, // Wrong sign
      { text: `${a}`, isCorrect: false },     // Just the slope
      { text: `${-b}`, isCorrect: false }     // Just -intercept
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // 5. Build Table HTML
    // Borders only, transparent background, centered
    const tableHTML = `
      <table style="border-collapse: collapse; margin: 0 auto 20px auto; text-align: center; font-size: 0.9em;">
        <thead>
          <tr>
            <th style="border: 1px solid currentColor; padding: 6px 20px;">$x$</th>
            <th style="border: 1px solid currentColor; padding: 6px 20px;">$f(x)$</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${x1}</td>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${y1}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${x2}</td>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${y2}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${x3}</td>
            <td style="border: 1px solid currentColor; padding: 6px 20px;">${y3}</td>
          </tr>
        </tbody>
      </table>
    `;

    // 6. Build SVG Graph
    // Define window to show the points comfortably
    const xMin = 0;
    const xMax = xIntercept + 2;
    const yMin = y1 - 20;
    const yMax = y3 + 20;

    const width = 300;
    const height = 300;
    const margin = 40;
    
    const scaleX = (x: number) => margin + ((x - xMin) / (xMax - xMin)) * (width - 2*margin);
    const scaleY = (y: number) => (height - margin) - ((y - yMin) / (yMax - yMin)) * (height - 2*margin);

    // Axes
    const axesHTML = `
        <line x1="${scaleX(xMin)}" y1="${scaleY(0)}" x2="${scaleX(xMax)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="2" />
        <line x1="${scaleX(0)}" y1="${scaleY(yMin)}" x2="${scaleX(0)}" y2="${scaleY(yMax)}" stroke="currentColor" stroke-width="2" />
        <text x="${scaleX(xMax) - 5}" y="${scaleY(0) - 5}" text-anchor="end" font-size="12" font-weight="bold" fill="currentColor">x</text>
        <text x="${scaleX(0) + 5}" y="${scaleY(yMax) + 15}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor">y</text>
    `;

    // The Line
    // Plot from xMin to xMax
    const lineX1 = xMin;
    const lineY1 = a * xMin + b;
    const lineX2 = xMax;
    const lineY2 = a * xMax + b;
    
    const lineHTML = `<line x1="${scaleX(lineX1)}" y1="${scaleY(lineY1)}" x2="${scaleX(lineX2)}" y2="${scaleY(lineY2)}" stroke="currentColor" stroke-width="2.5" />`;

    // Points
    const pointsHTML = `
        <circle cx="${scaleX(x1)}" cy="${scaleY(y1)}" r="4" fill="currentColor" />
        <circle cx="${scaleX(x2)}" cy="${scaleY(y2)}" r="4" fill="currentColor" />
        <circle cx="${scaleX(x3)}" cy="${scaleY(y3)}" r="4" fill="currentColor" />
    `;

    const svgContent = `
    <div style="width: 100%; max-width: 350px; margin: 0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit;">
        ${axesHTML}
        ${lineHTML}
        ${pointsHTML}
      </svg>
    </div>
    `;

    // 7. Explanation
    const explanation = `
      Choice ${correctOption.letter} is correct.
      <br/><br/>
      We need to find the values of $a$ and $b$ for the function $f(x) = ax + b$.
      <br/>
      <strong>1. Find the slope ($a$):</strong>
      Using the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$ from the table:
      $$ a = \\frac{\\text{change in } f(x)}{\\text{change in } x} = \\frac{${y2} - (${y1})}{${x2} - ${x1}} = \\frac{${y2 - y1}}{1} = ${a} $$
      <br/>
      <strong>2. Find the y-intercept ($b$):</strong>
      Using the point $(${x2}, ${y2})$ and $a = ${a}$:
      $$ f(x) = ax + b $$
      $$ ${y2} = ${a}(${x2}) + b $$
      $$ 0 = ${a * x2} + b $$
      $$ b = -${a * x2} = ${b} $$
      <br/>
      <strong>3. Calculate $a - b$:</strong>
      $$ a - b = ${a} - (${b}) = ${a} + ${Math.abs(b)} = ${answer} $$
    `;

    return {
      questionText: `For the linear function $f$, the table shows three values of $x$ and their corresponding values of $f(x)$. The function $f$ is defined by $f(x) = ax + b$, where $a$ and $b$ are constants. What is the value of $a - b$?`,
      figureCode: tableHTML + svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};