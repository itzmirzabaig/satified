import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1481
 * 
 * ANALYSIS:
 * - Context: Linear Function Table.
 * - Given: Table with (x, f(x)) points.
 * - Task: Find f(target).
 * - Logic: Find slope m, intercept b, then evaluate.
 */
export const generator_1481 = {
  metadata: {
    id: "1481",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // f(x) = mx + b
    const m = getRandomInt(2, 5); // Slope
    const b = getRandomInt(-5, 5); // Intercept
    
    // Generate Table Data
    // x values: 0, 2, 6 (skip some to make it interesting)
    const xVals = [0, 2, 6];
    const yVals = xVals.map(x => m * x + b);
    
    // Target x (e.g. 3, which is between 2 and 6)
    const targetX = 3;
    const targetY = m * targetX + b;
    
    // 2. Table HTML
    const tableHTML = `
      <table style="border-collapse: collapse; margin: 20px auto; min-width: 200px; font-family: sans-serif; border: 1px solid currentColor;">
        <thead>
          <tr style="background-color: rgba(0,0,0,0.05);">
            <th style="border: 1px solid currentColor; padding: 8px;">$x$</th>
            <th style="border: 1px solid currentColor; padding: 8px;">$f(x)$</th>
          </tr>
        </thead>
        <tbody>
          ${xVals.map((x, i) => `
            <tr>
              <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${x}</td>
              <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${yVals[i]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    
    // 3. Options
    const correctVal = targetY.toString();
    const d1 = (targetY - 1).toString(); // Calculation error
    const d2 = (m * targetX).toString(); // Forgot intercept
    const d3 = (targetY + m).toString(); // f(4) instead of f(3)

    const optionsData = [
      { text: correctVal, isCorrect: true },
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
      questionText: `The table shows some values of $x$ and their corresponding values of $f(x)$ for the linear function $f$.
      
${tableHTML}

What is the value of $f(${targetX})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Find Slope ($m$):**
    Using points $(0, ${yVals[0]})$ and $(2, ${yVals[1]})$:
    $m = \\frac{${yVals[1]} - (${yVals[0]})}{2 - 0} = \\frac{${yVals[1] - yVals[0]}}{2} = ${m}$.

2.  **Find Equation:**
    The table gives $(0, ${yVals[0]})$, so the y-intercept $b = ${yVals[0]}$.
    $f(x) = ${m}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}$.

3.  **Evaluate at $x = ${targetX}$:**
    $f(${targetX}) = ${m}(${targetX}) ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${m * targetX} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${targetY}$.`
    };
  }
};
