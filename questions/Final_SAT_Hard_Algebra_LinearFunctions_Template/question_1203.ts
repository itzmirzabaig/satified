import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1203
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Format: Table.
 * - Logic: Find a and b from points, then calculate a - b.
 * - Fixes: Table borders made visible (no fill). Replaced Mafs with SVG.
 * - Removed the SVG graph from the figure per review — the figure is now the
 *   table only (the three table points still determine the line, so the
 *   question remains fully answerable); the graph-building code went with it.
 *   Everything else is unchanged.
 */

export const generator_1203 = {
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

    // 6. Explanation
    const explanation = `
      Choice ${correctOption.letter} is correct.
      <br/><br/>
      We need to find the values of $a$ and $b$ for the function $f(x) = ax + b$.
      <br/>
      <strong>1. Find the slope ($a$):</strong>
      Using the points $(${x1}, ${y1})$ and $(${x2}, ${y2})$ from the table:
      $$ a = \\frac{\\text{change in } f(x)}{\\text{change in } x} = \\frac{${y2} - (${y1})}{${x2} - ${x1}} = \\frac{${y2 - y1}}{1} = ${a} $$       <br/>
      <strong>2. Find the y-intercept ($b$):</strong>
      Using the point $(${x2}, ${y2})$ and $a = ${a}$:
      $$ f(x) = ax + b $$       $$ ${y2} = ${a}(${x2}) + b $$       $$ 0 = ${a * x2} + b $$       $$ b = -${a * x2} = ${b} $$       <br/>
      <strong>3. Calculate $a - b$:</strong>
      $$ a - b = ${a} - (${b}) = ${a} + ${Math.abs(b)} = ${answer} $$     `;

    return {
      questionText: `For the linear function $f$, the table shows three values of $x$ and their corresponding values of $f(x)$. The function $f$ is defined by $f(x) = ax + b$, where $a$ and $b$ are constants. What is the value of $a - b$?`,
      figureCode: tableHTML,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};