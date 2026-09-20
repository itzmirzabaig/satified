import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1215
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Functions
 * - Format: Table.
 * - Logic: Find linear equation y = mx + b from table, then evaluate at a fraction.
 * - Fixes: Replaced Mafs with SVG. Styled table (borders only). Fixed LaTeX escaping.
 * - Removed the SVG graph from the figure per review — the figure is now the
 *   table only (the two table points still determine the line, so the question
 *   remains fully answerable); the graph-building code went with it. Everything
 *   else is unchanged.
 */

export const generator_1215 = {
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
    // LaTeX display form for the explanation/question text
    const formatFrac = (n: number, d: number) => {
        if (d === 1) return `${n}`;
        return `\\frac{${n}}{${d}}`;
    };

    // Plain typed form for the fill-in answer (student types into a text box):
    // a bare integer when the fraction reduces to a whole number, else "a/b".
    const correctAnswer = simpleDen === 1 ? `${simpleNum}` : `${simpleNum}/${simpleDen}`;

    const answerDisplay = formatFrac(simpleNum, simpleDen);
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

    // 5. Explanation
    const explanation = `
      To find the value of $a$, we first determine the equation of the line passing through the points given in the table: $(${x1}, ${y1})$ and $(${x2}, ${y2})$.
      <br/><br/>
      <strong>1. Find the slope ($m$):</strong>
      $$ m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${y2 - y1}}{${x2 - x1}} = ${m} $$       <br/>
      <strong>2. Find the y-intercept ($b$):</strong>
      Using point-slope form with $(${x2}, ${y2})$:
      $$ y = mx + b $$       $$ ${y2} = ${m}(${x2}) + b $$       $$ ${y2} = ${m * x2} + b $$       $$ b = ${y2} - ${m * x2} = ${b} $$       So the equation is $y = ${m}x + ${b}$.
      <br/><br/>
      <strong>3. Evaluate at $x = ${inputFracDisplay}$:</strong>
      Substitute $x = ${inputFracDisplay}$ into the equation to find $y$ (which is $a$):
      $$ a = ${m}\\left(${inputFracDisplay}\\right) + ${b} $$       $$ a = \\frac{${m * frac.n}}{${frac.d}} + \\frac{${b * frac.d}}{${frac.d}} $$       $$ a = \\frac{${m * frac.n} + ${b * frac.d}}{${frac.d}} = \\frac{${numerator}}{${denominator}} $$       Simplify the fraction:
      $$ a = ${answerDisplay} $$     `;

    return {
      questionText: `The table shows two values of $x$ and their corresponding values of $y$. The graph of the linear equation representing this relationship passes through the point $(${inputFracDisplay}, a)$. What is the value of $a$? (Enter your answer as a fraction or decimal.)`,
      figureCode: tableHTML,
      options: [], // Fill-in-the-blank
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};