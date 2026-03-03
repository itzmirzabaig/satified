import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 271f7e3f
 * 
 * FIXES:
 * - Handled decimal outputs by converting to fractions if necessary.
 * - Logic: f(x) = (x+c)/d. Calculate f(x2) - f(x1).
 * - Result is ((x2+c) - (x1+c))/d = (x2 - x1)/d.
 */
export const generator_271f7e3f = {
  metadata: {
    id: "271f7e3f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // f(x) = (x + c) / d
    const c = getRandomInt(5, 12);
    const d = getRandomInt(3, 6);
    
    // Evaluation points
    const x1 = getRandomInt(1, 3);
    const x2 = getRandomInt(8, 12);
    
    // Calculate Difference
    // diff = f(x2) - f(x1) = (x2 - x1) / d
    const numDiff = x2 - x1;
    const denDiff = d;
    
    const diffVal = numDiff / denDiff;
    
    // Helper to format
    const formatVal = (val: number, n: number, de: number) => {
      if (Number.isInteger(val)) return val.toString();
      // Reduce fraction
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const common = gcd(n, de);
      return `\\frac{${n / common}}{${de / common}}`;
    };
    
    const correctText = formatVal(diffVal, numDiff, denDiff);
    
    // Distractors
    // D1: Computational error (e.g. slope * (x2+x1)?) or just off by 1
    const d1Num = numDiff + denDiff; // (x2-x1)/d + 1 = (x2-x1+d)/d
    const d1 = formatVal((numDiff + denDiff)/denDiff, d1Num, denDiff);
    
    // D2: Just the slope (1/d)
    const d2 = `\\frac{1}{${d}}`;
    
    // D3: Using x2 in numerator
    const d3 = `\\frac{${x2}}{${d}}`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // Pre-calculate partials for explanation
    const f_x2_num = x2 + c;
    const f_x1_num = x1 + c;
    const f_x2_str = formatVal(f_x2_num / d, f_x2_num, d);
    const f_x1_str = formatVal(f_x1_num / d, f_x1_num, d);

    return {
      questionText: `For the function $f$ defined by $f(x) = \\frac{x+${c}}{${d}}$, what is the value of $f(${x2}) - f(${x1})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1.  **Evaluate $f(${x2})$:**
    $f(${x2}) = \\frac{${x2} + ${c}}{${d}} = \\frac{${f_x2_num}}{${d}}$.

2.  **Evaluate $f(${x1})$:**
    $f(${x1}) = \\frac{${x1} + ${c}}{${d}} = \\frac{${f_x1_num}}{${d}}$.

3.  **Calculate Difference:**
    $f(${x2}) - f(${x1}) = \\frac{${f_x2_num}}{${d}} - \\frac{${f_x1_num}}{${d}} = \\frac{${f_x2_num} - ${f_x1_num}}{${d}} = \\frac{${numDiff}}{${d}} = ${correctText}$.`
    };
  }
};

/**
 * Question ID: c651cc56
 * 
 * ANALYSIS:
 * - Context: Linear Function Table.
 * - Given: Table with (x, f(x)) points.
 * - Task: Find f(target).
 * - Logic: Find slope m, intercept b, then evaluate.
 */
export const generator_c651cc56 = {
  metadata: {
    id: "c651cc56",
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