import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 0366d965
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Table of values (x, y) for a linear function.
 * - Logic: Given slope m, find unknowns k (an x-value) and n (a y-value), then compute k+n.
 * - Fix: Put table HTML in figureCode for proper centering, keep questionText clean.
 */

export const generator_0366d965 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Linear Function
    // y = mx + b
    const slope = getRandomInt(2, 5); 
    const xStart = getRandomInt(1, 5);
    const yStart = getRandomInt(3, 10);
    const b_intercept = yStart - slope * xStart;

    // 2. Define Points
    // Row 1: (x1, y1) - fully known
    const x1 = xStart;
    const y1 = yStart;

    // Row 2: (k, y2) - x is unknown 'k'
    // We pick a random integer delta for x to ensure k is integer
    const deltaX1 = getRandomInt(2, 4);
    const k = x1 + deltaX1; 
    const y2 = slope * k + b_intercept;

    // Row 3: (x3, n) - y is unknown 'n'
    const deltaX2 = getRandomInt(3, 6);
    const x3 = k + deltaX2; // Ensure x3 > k
    const n = slope * x3 + b_intercept;

    // 3. Compute Answer
    const sum = k + n;

    // 4. Table HTML for figureCode (centered properly in figure container)
    const tableHTML = `
      <table border="1" style="border-collapse: collapse; width: 200px; margin: 0 auto; text-align: center;">
        <thead>
          <tr style="background-color: #f0f0f0; color: black;">
            <th style="padding: 8px;">$x$</th>
            <th style="padding: 8px;">$y$</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;">${x1}</td>
            <td style="padding: 8px;">${y1}</td>
          </tr>
          <tr>
            <td style="padding: 8px;">$k$</td>
            <td style="padding: 8px;">${y2}</td>
          </tr>
          <tr>
            <td style="padding: 8px;">${x3}</td>
            <td style="padding: 8px;">$n$</td>
          </tr>
        </tbody>
      </table>
    `;

    // 5. Build Explanation
    const explanation = `
      The slope of a line is the change in $y$ divided by the change in $x$: $m = \\frac{y_2 - y_1}{x_2 - x_1}$.
      We are given that the slope is ${slope}.
      <br/><br/>
      <strong>1. Find $k$:</strong>
      Using the points $(${x1}, ${y1})$ and $(k, ${y2})$:
      $$ \\frac{${y2} - ${y1}}{k - ${x1}} = ${slope} $$
      $$ \\frac{${y2 - y1}}{k - ${x1}} = ${slope} $$
      Multiply both sides by $(k - ${x1})$:
      $$ ${y2 - y1} = ${slope}(k - ${x1}) $$
      Divide by ${slope}:
      $$ ${ (y2 - y1) / slope } = k - ${x1} $$
      $$ k = ${ (y2 - y1) / slope } + ${x1} = ${k} $$
      <br/>
      <strong>2. Find $n$:</strong>
      Using the points $(${x1}, ${y1})$ and $(${x3}, n)$:
      $$ \\frac{n - ${y1}}{${x3} - ${x1}} = ${slope} $$
      $$ \\frac{n - ${y1}}{${x3 - x1}} = ${slope} $$
      Multiply both sides by ${x3 - x1}:
      $$ n - ${y1} = ${slope} \\cdot ${x3 - x1} $$
      $$ n - ${y1} = ${slope * (x3 - x1)} $$
      $$ n = ${slope * (x3 - x1)} + ${y1} = ${n} $$
      <br/>
      <strong>3. Calculate sum:</strong>
      $$ k + n = ${k} + ${n} = ${sum} $$
    `;

    return {
      questionText: `The table below shows the coordinates of three points on a line, where $k$ and $n$ are constants. If the slope of the line is ${slope}, what is the value of $k + n$?`,
      figureCode: tableHTML, // Table goes here for proper centering
      options: null, // Fill-in-the-blank
      correctAnswer: sum.toString(),
      explanation: explanation
    };
  }
};