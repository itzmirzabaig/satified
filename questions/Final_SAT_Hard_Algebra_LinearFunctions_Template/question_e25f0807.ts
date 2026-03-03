import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e25f0807
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Format: Table and Graph.
 * - Logic: Find linear equation y = mx + b from table, then evaluate at a fraction.
 * - Fixes: Replaced Mafs with SVG. Styled table (borders only). Fixed LaTeX escaping.
 */

export const generator_e25f0807 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Function Parameters
    // y = mx + b
    const m = getRandomInt(2, 6);       // Slope
    const b = getRandomInt(5, 15);      // Y-intercept
    
    // 2. Generate Table Points
    // Pick integer x-values
    const x1 = getRandomInt(-10, -5);
    const x2 = getRandomInt(5, 10);
    
    const y1 = m * x1 + b;
    const y2 = m * x2 + b;

    // 3. Evaluation Point (Fraction)
    // We want evaluate at x = num/den
    const fractions = [
      { n: 1, d: 2 },
      { n: 1, d: 4 },
      { n: 3, d: 4 },
      { n: 1, d: 5 },
      { n: 2, d: 5 }
    ];
    const frac = getRandomElement(fractions);
    
    // Calculate a = m(n/d) + b
    // a = (m*n + b*d) / d
    const numerator = m * frac.n + b * frac.d;
    const denominator = frac.d;
    
    // Simplify
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const common = Math.abs(gcd(numerator, denominator));
    const simpleNum = numerator / common;
    const simpleDen = denominator / common;
    
    // Format Result
    const formatFrac = (n: number, d: number) => {
        if (d === 1) return `${n}`;
        return `\\frac{${n}}{${d}}`;
    };
    
    const correctAnswer = formatFrac(simpleNum, simpleDen);
    const inputFracDisplay = formatFrac(frac.n, frac.d);

    // 4. Build Table HTML
    // Borders only, transparent background, centered
    const tableHTML = `
      <table style="border-collapse: collapse; margin: 0 auto 20px auto; text-align: center; font-size: 0.9em;">
        <thead>
          <tr>
            <th style="border: 1px solid currentColor; padding: 6px 20px;">$x$</th>
            <th style="border: 1px solid currentColor; padding: 6px 20px;">$y$</th>
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
        </tbody>
      </table>
    `;

    // 5. Build SVG Graph
    // Define bounds
    const allX = [x1, x2, 0];
    const minX = Math.min(...allX) - 2;
    const maxX = Math.max(...allX) + 2;
    
    const allY = [y1, y2, 0, b];
    const minY = Math.min(...allY) - 5;
    const maxY = Math.max(...allY) + 5;

    const width = 350;
    const height = 300;
    const margin = 40;
    
    const scaleX = (x: number) => margin + ((x - minX) / (maxX - minX)) * (width - 2*margin);
    const scaleY = (y: number) => (height - margin) - ((y - minY) / (maxY - minY)) * (height - 2*margin);

    // Axes
    const axesHTML = `
        <line x1="${scaleX(minX)}" y1="${scaleY(0)}" x2="${scaleX(maxX)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="2" />
        <line x1="${scaleX(0)}" y1="${scaleY(minY)}" x2="${scaleX(0)}" y2="${scaleY(maxY)}" stroke="currentColor" stroke-width="2" />
        <text x="${scaleX(maxX) - 5}" y="${scaleY(0) - 5}" text-anchor="end" font-size="12" font-weight="bold" fill="currentColor">x</text>
        <text x="${scaleX(0) + 5}" y="${scaleY(maxY) + 15}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor">y</text>
    `;

    // The Line
    const lineX1 = minX;
    const lineY1_val = m * lineX1 + b;
    const lineX2 = maxX;
    const lineY2_val = m * lineX2 + b;
    
    const lineHTML = `<line x1="${scaleX(lineX1)}" y1="${scaleY(lineY1_val)}" x2="${scaleX(lineX2)}" y2="${scaleY(lineY2_val)}" stroke="currentColor" stroke-width="2.5" />`;

    // Points
    const pointsHTML = `
        <circle cx="${scaleX(x1)}" cy="${scaleY(y1)}" r="4" fill="currentColor" />
        <circle cx="${scaleX(x2)}" cy="${scaleY(y2)}" r="4" fill="currentColor" />
    `;

    const svgContent = `
    <div style="width: 100%; max-width: 400px; margin: 0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit;">
        ${axesHTML}
        ${lineHTML}
        ${pointsHTML}
      </svg>
    </div>
    `;

    // 6. Explanation
    const explanation = `
      To find the value of $a$, we first determine the equation of the line passing through the points given in the table: $(${x1}, ${y1})$ and $(${x2}, ${y2})$.
      <br/><br/>
      <strong>1. Find the slope ($m$):</strong>
      $$ m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${y2 - y1}}{${x2 - x1}} = ${m} $$
      <br/>
      <strong>2. Find the y-intercept ($b$):</strong>
      Using point-slope form with $(${x2}, ${y2})$:
      $$ y = mx + b $$
      $$ ${y2} = ${m}(${x2}) + b $$
      $$ ${y2} = ${m * x2} + b $$
      $$ b = ${y2} - ${m * x2} = ${b} $$
      So the equation is $y = ${m}x + ${b}$.
      <br/><br/>
      <strong>3. Evaluate at $x = ${inputFracDisplay}$:</strong>
      Substitute $x = ${inputFracDisplay}$ into the equation to find $y$ (which is $a$):
      $$ a = ${m}\\left(${inputFracDisplay}\\right) + ${b} $$
      $$ a = \\frac{${m * frac.n}}{${frac.d}} + \\frac{${b * frac.d}}{${frac.d}} $$
      $$ a = \\frac{${m * frac.n} + ${b * frac.d}}{${frac.d}} = \\frac{${numerator}}{${denominator}} $$
      Simplify the fraction:
      $$ a = ${correctAnswer} $$
    `;

    return {
      questionText: `The table shows two values of $x$ and their corresponding values of $y$. The graph of the linear equation representing this relationship passes through the point $(${inputFracDisplay}, a)$. What is the value of $a$?`,
      figureCode: tableHTML + svgContent,
      options: null, // Fill-in-the-blank
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};