import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 606cdce7
 * 
 * FIXES:
 * - Removed graph (figureCode) as requested.
 * - Added styled HTML table with borders.
 * - Logic: Given table of (x,y), find linear equation in standard form.
 * - Equation: y = mx + b  => -mx + y = b => Ax + By = C.
 */
export const generator_606cdce7 = {
  metadata: {
    id: "606cdce7",
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
    // y = mx + b
    // -mx + y = b
    // Let's multiply by a constant (e.g. 3) to make distractors look interesting, 
    // or just keep it simple. The original prompt multiplied by 3.
    // Standard Form: Ax + By = C
    // Original: -slope * x + y = intercept
    // Let's scale by 3 to match the provided analysis style.
    const A = -slope * 3;
    const B = 3;
    const C = intercept * 3;
    
    const correctEq = `${A}x + ${B}y = ${C}`;
    
    // Distractors
    // 1. Swap coefficients? Or random coefficients.
    const d1 = `${A + 6}x + ${B}y = ${C}`;
    const d2 = `${A}x + ${B}y = ${B}`; // Wrong constant
    const d3 = `${B}x + ${A}y = ${C}`; // Swapped x/y coeff

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
      questionText: `The table shows four values of $x$ and their corresponding values of $y$. There is a linear relationship between $x$ and $y$. Which of the following equations represents this relationship?
      
${tableHTML}`,
      figureCode: null, // No graph per request
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
First, calculate the slope ($m$) using two points from the table, such as $(${xVals[0]}, ${yVals[0]})$ and $(${xVals[1]}, ${yVals[1]})$:
$m = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{${yVals[1]} - ${yVals[0]}}{${xVals[1]} - (${xVals[0]})} = \\frac{${yVals[1] - yVals[0]}}{${xVals[1] - xVals[0]}} = ${slope}$

The y-intercept ($b$) can be found by substituting $m=${slope}$ and a point into $y = mx + b$.
$${yVals[2]} = ${slope}(${xVals[2]}) + b$
$${yVals[2]} = ${slope * xVals[2]} + b$
$b = ${intercept}$

So the equation is $y = ${slope}x + ${intercept}$.
Rearranging to standard form:
$-(${slope}x) + y = ${intercept}$
$${-slope}x + y = ${intercept}$

Multiplying the entire equation by 3:
$${A}x + ${B}y = ${C}$`
    };
  }
};

/**
 * Question ID: 483d208d
 * 
 * ANALYSIS:
 * - Context: Interpreting Linear Models (e.g., Score Calculation).
 * - Equation: Total = Ax + By.
 * - Variables: x, y are counts of items (e.g., successful attempts).
 * - Coefficients: A, B are values/points per item.
 * - Task: Interpret difference (A - B) or just coefficients.
 */
export const generator_483d208d = {
  metadata: {
    id: "483d208d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const valA = getRandomInt(70, 90); // e.g. 80
    const valB = getRandomInt(80, 100); // e.g. 90
    // Ensure they are distinct
    if (valA === valB) return generator_483d208d.generate();
    
    const diff = Math.abs(valB - valA);
    const total = getRandomInt(1000, 1200);
    
    // Context: A test or game with two types of tasks.
    
    // Question: How many more points is a Type B task worth than a Type A task?
    // Answer: |valB - valA|.
    
    // 2. Options
    const optionsData = [
      { text: diff.toString(), isCorrect: true },
      { text: valA.toString(), isCorrect: false },
      { text: valB.toString(), isCorrect: false },
      { text: (valA + valB).toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `In a certain competition, a participant earns ${valA} points for each successful Type A task and ${valB} points for each successful Type B task. The total score, $S$, is given by the equation $S = ${valA}x + ${valB}y$, where $x$ is the number of successful Type A tasks and $y$ is the number of successful Type B tasks. How many more points is a successful Type B task worth than a successful Type A task?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
The coefficient of $x$ (${valA}) represents the points awarded per Type A task.
The coefficient of $y$ (${valB}) represents the points awarded per Type B task.

To find how many more points a Type B task is worth, subtract the value of Type A from Type B:
$${valB} - ${valA} = ${diff}$.`
    };
  }
};