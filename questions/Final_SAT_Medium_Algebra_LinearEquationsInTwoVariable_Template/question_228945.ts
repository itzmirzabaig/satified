import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 228945
 * 
 * FIXES:
 * - Removed the graph (figureCode) as requested.
 * - Created a properly styled HTML table with borders for the question text.
 * - Logic: Given points (-6, n+2A), (-3, n+A), (0, n). Calculate slope.
 *   Slope = (n - (n+A)) / (0 - (-3)) = -A / 3.
 */
export const generator_228945 = {
  metadata: {
    id: "228945",
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

/**
 * Question ID: 038d87d7
 * 
 * ANALYSIS:
 * - Context: Interpreting Linear Models (Word Problem).
 * - Equation: T = A*x + B*y (or similar).
 * - Variables: 
 *   - x = area of old growth (hectares)
 *   - y = area of new growth (hectares)
 *   - T = total trees.
 * - Task: Identify what a coefficient represents.
 */
export const generator_038d87d7 = {
  metadata: {
    id: "038d87d7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const treesPerOld = getRandomInt(1000, 1500); // e.g. 1200
    const treesPerNew = getRandomInt(200, 600);   // e.g. 400
    const totalTrees = getRandomInt(3000, 5000);
    
    // Equation: total = treesPerOld * x + treesPerNew * y
    // x = hectares of old growth
    // y = hectares of new growth
    
    // Question: What does the coefficient 'treesPerNew' represent?
    // Answer: Average number of trees per hectare in new growth.
    
    // 2. Options
    const correct = `The average number of trees per hectare in the new growth section`;
    const distractor1 = `The average number of trees per hectare in the old growth section`;
    const distractor2 = `The total number of trees in the new growth section`;
    const distractor3 = `The total number of hectares of new growth`;

    const optionsData = [
      { text: correct, isCorrect: true },
      { text: distractor1, isCorrect: false },
      { text: distractor2, isCorrect: false },
      { text: distractor3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `An ecologist estimates that there are ${treesPerOld} trees per hectare in an old-growth section of a forest and ${treesPerNew} trees per hectare in a new-growth section. The total number of trees in these two sections combined is ${totalTrees}. The equation $${treesPerOld}x + ${treesPerNew}y = ${totalTrees}$ represents this situation, where $x$ is the number of hectares in the old-growth section and $y$ is the number of hectares in the new-growth section. What is the best interpretation of the number ${treesPerNew} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
In the equation $${treesPerOld}x + ${treesPerNew}y = ${totalTrees}$:
- $y$ represents the number of hectares of new growth.
- The term ${treesPerNew}y represents the total number of trees in the new-growth section.
- Since $y$ is in hectares, the coefficient ${treesPerNew} must be the rate of trees per hectare for the new growth to make the units work (trees/hectare * hectare = trees).
      
Therefore, ${treesPerNew} represents the average number of trees per hectare in the new-growth section.`
    };
  }
};