import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3008cfc3
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Table -> Find y-intercept.
 * - Logic: Calculate slope m from table, then find b using y = mx + b.
 * - Fixes: Table in figureCode only, no fill, borders only, centered.
 */

export const generator_3008cfc3 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Linear Function Properties
    // y = mx + b
    // Slope: Negative integer (e.g., -4)
    const slope = getRandomInt(-6, -2); 
    // Y-intercept: Positive integer (e.g., 23)
    const b = getRandomInt(10, 40);     
    
    // 2. Generate Table Points
    // Pick first x (e.g., 5)
    const x1 = getRandomInt(2, 6);
    // Pick second x (e.g., 12)
    const xDiff = getRandomInt(4, 8);
    const x2 = x1 + xDiff;
    
    // Calculate corresponding y-values
    const y1 = slope * x1 + b;
    const y2 = slope * x2 + b;

    // 3. Build Table HTML for figureCode only
    // Borders only, no fill, centered
    const tableHTML = `
      <table style="border-collapse: collapse; margin: 0 auto; text-align: center; font-size: 0.9em;">
        <thead>
          <tr>
            <th style="border: 1px solid currentColor; padding: 6px 15px;">$x$</th>
            <th style="border: 1px solid currentColor; padding: 6px 15px;">$y$</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${x1}</td>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${y1}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${x2}</td>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${y2}</td>
          </tr>
        </tbody>
      </table>
    `;
    
    // 4. Explanation Logic
    const explanation = `
      To find the value of $b$, which is the $y$-coordinate of the $y$-intercept $(0, b)$, we first determine the equation of the line $y = mx + b$.
      <br/><br/>
      <strong>1. Find the slope ($m$):</strong>
      $$ m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${slope} $$
      <br/>
      <strong>2. Find the y-intercept ($b$):</strong>
      Using the slope $m = ${slope}$ and the point $(${x1}, ${y1})$:
      $$ y = mx + b $$
      $$ ${y1} = (${slope})(${x1}) + b $$
      $$ ${y1} = ${slope * x1} + b $$
      $$ b = ${y1} - (${slope * x1}) $$
      $$ b = ${b} $$
    `;
    
    return {
      questionText: `The table gives the coordinates of two points on a line in the $xy$-plane. The $y$-intercept of the line is $(0, b)$, where $b$ is a constant. What is the value of $b$?`,
      figureCode: tableHTML, // Table ONLY here, not in questionText
      options: null, // Fill-in-the-blank
      correctAnswer: b.toString(),
      explanation: explanation
    };
  }
};