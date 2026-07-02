import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 707
 * 
 * FIXES:
 * - Removed graph (figureCode) as requested.
 * - Added styled HTML table with borders.
 * - Logic: Given table of (x,y), find linear equation y = mx + b.
 */
export const generator_707 = {
  metadata: {
    id: "707",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // y = mx + b
    const slope = getRandomInt(3, 8); // Positive integer slope
    const intercept = getRandomInt(2, 10); // Positive intercept
    
    // Generate Table Data
    const xVals = [1, 2, 3];
    const yVals = xVals.map(x => slope * x + intercept);
    
    // 2. Table Generation (Styled HTML with Borders)
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
    
    // 3. Options
    const correctEq = `y = ${slope}x + ${intercept}`;
    const d1 = `y = ${slope}x + ${yVals[0]}`; // Using first y as intercept
    const d2 = `y = ${intercept}x + ${slope}`; // Swapping slope/intercept
    const d3 = `y = ${intercept}x + ${yVals[0]}`; // Nonsense

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
      questionText: `The table shows three values of $x$ and their corresponding values of $y$. Which equation represents the linear relationship between $x$ and $y$?
      
${tableHTML}`,
      figureCode: null, // Graph removed per request
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Calculate Slope ($m$):**
    $m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${yVals[1]} - ${yVals[0]}}{${xVals[1]} - ${xVals[0]}} = \\frac{${slope}}{1} = ${slope}$.

2.  **Find Intercept ($b$):**
    Using the point $(1, ${yVals[0]})$ and the equation $y = mx + b$:
    $${yVals[0]} = ${slope}(1) + b$
    $b = ${yVals[0]} - ${slope} = ${intercept}$.

3.  **Form Equation:**
    $y = ${slope}x + ${intercept}$.`
    };
  }
};
