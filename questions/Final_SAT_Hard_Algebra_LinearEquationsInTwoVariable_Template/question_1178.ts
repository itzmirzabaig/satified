import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1178
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Table -> Find y-intercept.
 * - Logic: Calculate slope m from table, then find b using y = mx + b.
 * - Fixes: Table in figureCode only, no fill, borders only, centered.
 */

export const generator_1178 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Linear Function Properties: y = mx + b with a negative
    // integer slope and a positive intercept. Redraw when a table y-value is 0
    // (the explanation then read "(-12) - 0" and "b = 0 + 36").
    let slope = 0, b = 0, x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    do {
      slope = getRandomInt(-6, -2);
      b = getRandomInt(10, 40);
      // 2. Generate Table Points
      x1 = getRandomInt(2, 6);
      x2 = x1 + getRandomInt(4, 8);
      y1 = slope * x1 + b;
      y2 = slope * x2 + b;
    } while (y1 === 0 || y2 === 0);

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
    // FIXED (review): the explanation printed "-16 - -5" whenever y1 was
    // negative, used bold numbered headings, and did not open with "The
    // correct answer is". It is now plain sentences with signed values in
    // parentheses.
    const p = (v: number) => (v < 0 ? `(${v})` : `${v}`);
    const explanation = `The correct answer is ${b}. An equation of the line can be written as $y = mx + b$, where $m$ is the slope and $(0, b)$ is the $y$-intercept. Using the two points in the table, the slope is $m = \\frac{${p(y2)} - ${p(y1)}}{${x2} - ${x1}} = \\frac{${y2 - y1}}{${x2 - x1}} = ${slope}$. Substituting $m = ${slope}$ and the point $(${x1}, ${y1})$ into $y = mx + b$ gives $${y1} = (${slope})(${x1}) + b$, or $${y1} = ${slope * x1} + b$. Adding $${-slope * x1}$ to both sides gives $b = ${y1} + ${-slope * x1} = ${b}$.`;
    
    return {
      questionText: `The table gives the coordinates of two points on a line in the $xy$-plane. The $y$-intercept of the line is $(0, b)$, where $b$ is a constant. What is the value of $b$?`,
      figureCode: tableHTML, // Table ONLY here, not in questionText
      options: [], // Fill-in-the-blank
      correctAnswer: b.toString(),
      explanation: explanation
    };
  }
};