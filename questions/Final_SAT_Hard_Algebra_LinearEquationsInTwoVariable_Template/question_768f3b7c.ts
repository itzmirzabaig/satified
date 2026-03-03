import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 768f3b7c
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Format: Table of values involving a constant 's'.
 * - Logic: Find linear equation from table.
 *   Points: (-s, y+3), (0, y), (s, y-3).
 *   Slope m = -3/s. Intercept = y.
 *   Equation: y = (-3/s)x + y  =>  sy = -3x + sy  =>  3x + sy = sy.
 * - Fixes: Removed graph. Table only. Styled table correctly.
 */

export const generator_768f3b7c = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Random Values
    const s = getRandomInt(2, 6);        // Constant s
    const yInt = getRandomInt(12, 24);   // Y-intercept value
    
    // 2. Define Table Points
    // We construct points so the slope is -3/s
    // x increases by s, y decreases by 3
    const x1 = -s;
    const y1 = yInt + 3;
    
    const x2 = 0;
    const y2 = yInt;
    
    const x3 = s;
    const y3 = yInt - 3;
    
    // 3. Determine Correct Equation
    // Slope m = (y2 - y1) / (x2 - x1) = -3 / s
    // y = (-3/s)x + yInt
    // Multiply by s: sy = -3x + s*yInt
    // Standard form: 3x + sy = s*yInt
    
    const constantTerm = s * yInt;
    
    // 4. Options
    const correctEq = `3x + ${s}y = ${constantTerm}`;
    
    // Distractor A: Swapped coefficients (sx + 3y = ...)
    const distA = `${s}x + 3y = ${constantTerm}`;
    
    // Distractor B: Wrong constant (just yInt instead of s*yInt)
    const distB = `3x + ${s}y = ${yInt}`;
    
    // Distractor C: Wrong constant and swapped coefficients
    const distC = `${s}x + 3y = ${yInt}`;
    
    const optionsData = [
      { text: `$${correctEq}$`, isCorrect: true },
      { text: `$${distA}$`, isCorrect: false },
      { text: `$${distB}$`, isCorrect: false },
      { text: `$${distC}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    // 5. Build Table HTML (Figure Code Only)
    // Borders only, no fill, centered via margin: 0 auto
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
            <td style="border: 1px solid currentColor; padding: 6px 15px;">$-${s}$</td>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${y1}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">$0$</td>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${y2}</td>
          </tr>
          <tr>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">$${s}$</td>
            <td style="border: 1px solid currentColor; padding: 6px 15px;">${y3}</td>
          </tr>
        </tbody>
      </table>
    `;
    
    // 6. Explanation
    const explanation = `
      Choice ${correctOption.letter} is correct.
      <br/>
      We can determine the equation of the line using the points from the table.
      <br/><br/>
      <strong>1. Find the slope ($m$):</strong>
      Using the points $(-${s}, ${y1})$ and $(0, ${y2})$:
      $$ m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${y2} - ${y1}}{0 - (-${s})} = \\frac{-3}{${s}} $$
      <br/>
      <strong>2. Find the y-intercept:</strong>
      The table explicitly gives the point $(0, ${y2})$, so the y-intercept is ${y2}.
      <br/><br/>
      <strong>3. Write the equation:</strong>
      Slope-intercept form: $y = -\\frac{3}{${s}}x + ${yInt}$
      <br/>
      To match the options, multiply the entire equation by ${s} to eliminate the fraction:
      $$ ${s}(y) = ${s}\\left(-\\frac{3}{${s}}x + ${yInt}\\right) $$
      $$ ${s}y = -3x + ${s * yInt} $$
      Add $3x$ to both sides:
      $$ 3x + ${s}y = ${constantTerm} $$
    `;
    
    return {
      questionText: `The table shows three values of $x$ and $y$, where $s$ is a constant. Which equation represents this linear relationship?`,
      figureCode: tableHTML, // HTML Table only
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};