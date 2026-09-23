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
 *
 * FIXED (table displayed as raw HTML source in the question):
 * - The table HTML was embedded inside questionText, but the question-text
 *   pipeline renders text and LaTeX only — it does not interpret HTML — so
 *   the <table> markup showed literally as "style=..." source text. The
 *   table now lives in figureCode, the pipeline's HTML channel (the same
 *   place as every working table question: Q487, Q411, Q1206). Cells use
 *   plain HTML (italic headers) instead of $...$ so the table does not
 *   depend on LaTeX rendering inside figureCode.
 *
 * FIXED (options had no $...$ delimiters): the four fraction options would
 * have displayed raw \frac source. Wrapped in $...$ (same fix as
 * Q1470/Q1455/Q1472/Q586/Q1473).
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
    
    // 2. Table — figureCode is the HTML channel. Plain HTML styling (no
    //    LaTeX dependencies): italic headers via font-style, data cells text.
    const th = 'style="border:1px solid currentColor;padding:8px 15px;text-align:center;font-style:italic;"';
    const td = 'style="border:1px solid currentColor;padding:8px 15px;text-align:center;"';
    const tableHTML =
      `<div style="width:100%;max-width:240px;margin:0 auto;">` +
      `<table style="width:100%;border-collapse:collapse;font-family:sans-serif;">` +
      `<thead>` +
      `<tr style="background-color:rgba(0,0,0,0.05);">` +
      `<th ${th}>x</th>` +
      `<th ${th}>y</th>` +
      `</tr>` +
      `</thead>` +
      `<tbody>` +
      `<tr><td ${td}>-6</td><td ${td}><i>n</i> + ${2 * num}</td></tr>` +
      `<tr><td ${td}>-3</td><td ${td}><i>n</i> + ${num}</td></tr>` +
      `<tr><td ${td}>0</td><td ${td}><i>n</i></td></tr>` +
      `</tbody>` +
      `</table>` +
      `</div>`;

    // 3. Options — wrapped in $...$ so they render as math.
    const correctSlope = `$-\\frac{${num}}{${den}}$`;
    
    // Distractors
    const d1 = `$-\\frac{${den}}{${num}}$`; // Reciprocal
    const d2 = `$\\frac{${num}}{${den}}$`;  // Wrong sign
    const d3 = `$\\frac{2n - ${num}}{3}$`; // Nonsense using n

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
      questionText: `The table below shows three values of $x$ and their corresponding values of $y$, where $n$ is a constant, for a linear relationship between $x$ and $y$. What is the slope of the line that represents this relationship in the $xy$-plane?`,
      figureCode: tableHTML,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
The slope $m$ of a line can be calculated using any two points $(x_1, y_1)$ and $(x_2, y_2)$ on the line:
 $m = \\frac{y_2 - y_1}{x_2 - x_1}$ 
Using the points $(0, n)$ and $(-3, n + ${num})$:
 $m = \\frac{n - (n + ${num})}{0 - (-3)}$  $m = \\frac{n - n - ${num}}{3}$  $m = \\frac{-${num}}{3} = -\\frac{${num}}{3}$`
    };
  }
};