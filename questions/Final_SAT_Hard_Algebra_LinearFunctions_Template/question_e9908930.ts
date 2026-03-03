import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

export const generator_e9908930 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const slope = getRandomInt(3, 8); // Slope m
    const x1 = -getRandomInt(3, 6); // x-intercept range [-6, -3]
    const y1 = 0; // f(x1) = 0
    
    // Calculate y-intercept: y = mx + b => 0 = m(x1) + b => b = -m*x1
    const yIntercept = -slope * x1; 
    
    // Second point x2: shifted slightly from x1 to create a decimal coordinate
    const x2Raw = (Math.abs(x1) - 0.2) * Math.sign(x1);
    const x2 = Math.round(x2Raw * 10) / 10;
    const y2 = Math.round((slope * x2 + yIntercept) * 10) / 10; 
    
    // Third point: use the y-intercept (0, b) to satisfy "three values" and make the math cleaner for students
    const x3 = 0;
    const y3 = yIntercept;

    // Transformation constant k for h(x) = f(x) - k
    const k = getRandomInt(10, 20);
    
    // New intercept for h(x)
    const newIntercept = yIntercept - k;
    
    // Format x2 as fraction for display
    // Logic: x2 always ends in .8 (e.g., -3.8), which is -19/5. Numerator is x2 * 5.
    const num = Math.round(x2 * 5);
    const x2Display = `\\frac{${num}}{5}`;

    // STEP 2: Build HTML Table
    // Conforms to strict styling: transparent background, currentColor borders, centered.
    const tableHTML = `
      <div style="width: 100%; display: flex; justify-content: center; margin-bottom: 20px;">
        <table style="border-collapse: collapse; text-align: center; background: transparent; color: inherit; font-variant-numeric: tabular-nums;">
          <thead>
            <tr>
              <th style="border: 1px solid currentColor; padding: 10px; width: 80px;">$x$</th>
              <th style="border: 1px solid currentColor; padding: 10px; width: 80px;">$f(x)$</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid currentColor; padding: 10px;">$${x1}$</td>
              <td style="border: 1px solid currentColor; padding: 10px;">$${y1}$</td>
            </tr>
            <tr>
              <td style="border: 1px solid currentColor; padding: 10px;">$${x2Display}$</td>
              <td style="border: 1px solid currentColor; padding: 10px;">$${y2}$</td>
            </tr>
            <tr>
              <td style="border: 1px solid currentColor; padding: 10px;">$${x3}$</td>
              <td style="border: 1px solid currentColor; padding: 10px;">$${y3}$</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    // STEP 3: Create options
    const signNew = newIntercept >= 0 ? '+' : '';
    const correctText = `h(x)=${slope}x${signNew}${newIntercept}`;
    
    // Distractors
    // A: Incorrect transformation (subtracts 2k)
    const distA_int = yIntercept - k * 2;
    const distA = `h(x)=${slope}x${distA_int >= 0 ? '+' : ''}${distA_int}`;
    
    // C: Arithmetic error (adds 2 instead of subtracting k)
    const distC_int = yIntercept - k + 2;
    const distC = `h(x)=${slope}x${distC_int >= 0 ? '+' : ''}${distC_int}`;
    
    // D: Original function f(x)
    const distD = `h(x)=${slope}x+${yIntercept}`;
    
    const optionsData = [
      { text: `$${distA}$`, isCorrect: false },
      { text: `$${correctText}$`, isCorrect: true },
      { text: `$${distC}$`, isCorrect: false },
      { text: `$${distD}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(opt => opt.isCorrect)?.letter;
    
    return {
      questionText: `For the linear function $f$, the table shows three values of $x$ and their corresponding values of $f(x)$. If $h(x)=f(x)-${k}$, which equation defines $h$?`,
      figureCode: tableHTML,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. 
      
First, determine the equation for $f(x)$. The table provides points such as $(${x1}, ${y1})$ and $(${x3}, ${y3})$.
The y-intercept is explicitly given in the table as $b = ${y3}$.

The slope $m$ can be calculated using the points $(${x1}, ${y1})$ and $(${x2Display}, ${y2})$:
$$m = \\frac{${y2} - ${y1}}{${x2Display} - (${x1})} = \\frac{${(y2-y1).toFixed(1)}}{${(x2-x1).toFixed(1)}} = ${slope}$$

Thus, the function $f$ is:
$$f(x) = ${slope}x + ${yIntercept}$$

The function $h$ is defined as $h(x) = f(x) - ${k}$. Substitute the expression for $f(x)$:
$$h(x) = (${slope}x + ${yIntercept}) - ${k}$$
$$h(x) = ${slope}x + (${yIntercept} - ${k})$$
$$h(x) = ${slope}x ${signNew} ${newIntercept}$$`
    };
  }
};