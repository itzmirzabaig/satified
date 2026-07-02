import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 687
 * 
 * FIXES:
 * - Removed the graph (figureCode) as requested.
 * - Created a properly styled HTML table with borders for the question text.
 * - Logic: Given points (-6, n+2A), (-3, n+A), (0, n). Calculate slope.
 *   Slope = (n - (n+A)) / (0 - (-3)) = -A / 3.
 */
export const generator_687 = {
  metadata: {
    id: "687",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Setup
    // Points: x = -6, -3, 0
    // y = n + 2k, n + k, n
    // Slope = -k/3
    
    // Choose k such that slope isn't a simple integer to force fraction format often seen in SAT
    // or make it an integer for simplicity. Let's vary it.
    // Let numerator of slope be num.
    const num = getRandomInt(20, 100); // e.g. 92
    const den = 3;
    
    // y-values relative to n
    // x=-3 -> y = n + num
    // x=-6 -> y = n + 2*num
    
    // Slope calculation:
    // (n - (n+num)) / (0 - (-3)) = -num / 3.
    
    // 2. Table Generation (HTML with styles)
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
    
    const tableHTML = `
      <table ${tableStyle}>
        <thead>
          <tr style="background-color: rgba(0,0,0,0.05);">
            <th ${cellStyle}>$x$</th>
            <th ${cellStyle}>$y$</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td ${cellStyle}>$-6$</td>
            <td ${cellStyle}>$n + ${2 * num}$</td>
          </tr>
          <tr>
            <td ${cellStyle}>$-3$</td>
            <td ${cellStyle}>$n + ${num}$</td>
          </tr>
          <tr>
            <td ${cellStyle}>$0$</td>
            <td ${cellStyle}>$n$</td>
          </tr>
        </tbody>
      </table>
    `;

    // 3. Options
    const correctSlope = `-\\frac{${num}}{${den}}`;
    
    // Distractors
    const d1 = `-\\frac{${den}}{${num}}`; // Reciprocal
    const d2 = `\\frac{${num}}{${den}}`;  // Wrong sign
    const d3 = `\\frac{2n - ${num}}{3}`; // Nonsense using n

    const optionsData = [
      { text: correctSlope, isCorrect: true },
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
      questionText: `The table below shows three values of $x$ and their corresponding values of $y$, where $n$ is a constant, for a linear relationship between $x$ and $y$.
      
${tableHTML}

What is the slope of the line that represents this relationship in the $xy$-plane?`,
      figureCode: null, // No graph needed per request
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
The slope $m$ of a line can be calculated using any two points $(x_1, y_1)$ and $(x_2, y_2)$ on the line:
$m = \\frac{y_2 - y_1}{x_2 - x_1}$

Using the points $(0, n)$ and $(-3, n + ${num})$:
$m = \\frac{n - (n + ${num})}{0 - (-3)}$
$m = \\frac{n - n - ${num}}{3}$
$m = \\frac{-${num}}{3} = -\\frac{${num}}{3}$`
    };
  }
};
