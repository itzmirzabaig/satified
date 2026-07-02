import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1479
 * 
 * ANALYSIS:
 * - Context: Linear Equation from Table (Standard Form).
 * - Given: Table of values.
 * - Task: Find equation Ax + By = C.
 * - Logic: Find y = mx + b first, then rearrange.
 */
export const generator_1479 = {
  metadata: {
    id: "1479",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // y = mx + b
    const slope = getRandomInt(-5, -2); // Negative integer slope
    const intercept = getRandomInt(30, 70); // Positive intercept
    
    // Generate Table Data
    // x values: -6, -2, 2, 6
    const xVals = [-6, -2, 2, 6];
    const yVals = xVals.map(x => slope * x + intercept);
    
    // 2. Table Generation (Styled HTML)
    const tableStyle = `
      style="
        border-collapse: collapse; 
        margin: 20px auto; 
        font-family: sans-serif; 
        min-width: 200px;
        border: 1px solid currentColor;
      "
    `;
    const cellStyle = `
      style="
        border: 1px solid currentColor; 
        padding: 8px 15px; 
        text-align: center;
      "
    `;
    
    const rows = xVals.map((x, i) => `
      <tr>
        <td ${cellStyle}>${x}</td>
        <td ${cellStyle}>${yVals[i]}</td>
      </tr>
    `).join('');
    
    const tableHTML = `
      <table ${tableStyle}>
        <thead>
          <tr style="background-color: rgba(0,0,0,0.05);">
            <th ${cellStyle}>$x$</th>
            <th ${cellStyle}>$y$</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `;
    
    // 3. Equation Generation
    // y = mx + b  =>  -mx + y = b
    // Multiply by 3 (standard SAT pattern for this question type) or keep as is.
    // Original prompt implied multiplication by 3.
    // Let's output Standard Form: Ax + By = C.
    
    const factor = 3;
    const A = -slope * factor; // positive integer
    const B = 1 * factor;      // 3
    const C = intercept * factor;
    
    const correctEq = `${A}x + ${B}y = ${C}`;
    
    // Distractors
    const d1 = `${A}x + ${B}y = ${B}`; // Wrong constant (using coeff B)
    const d2 = `${B}x + ${A}y = ${C}`; // Swap coefficients
    const d3 = `${A + 6}x + ${B}y = ${C}`; // Wrong x-coefficient

    const optionsData = [
      { text: correctEq, isCorrect: true },
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
      questionText: `The table shows four values of $x$ and their corresponding values of $y$. There is a linear relationship between $x$ and $y$. Which of the following equations represents this relationship?`,
      figureCode: tableHTML,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Find Slope:**
    $m = \\frac{${yVals[3]} - ${yVals[0]}}{${xVals[3]} - (${xVals[0]})} = \\frac{${yVals[3] - yVals[0]}}{${xVals[3] - xVals[0]}} = ${slope}$

2.  **Find Equation:**
    $y = ${slope}x + b$.
    Substitute $(${xVals[2]}, ${yVals[2]})$:
    $${yVals[2]} = ${slope}(${xVals[2]}) + b$
    $${yVals[2]} = ${slope * xVals[2]} + b$
    $b = ${intercept}$
    So, $y = ${slope}x + ${intercept}$.

3.  **Convert to Standard Form:**
    $-(${slope}x) + y = ${intercept}$
    Multiplying by ${factor}:
    $${A}x + ${B}y = ${C}$`
    };
  }
};
