import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1221
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Identifies which table of values satisfies a linear inequality y > mx + b.
 * visualization: None — SVG graph removed per review. The inequality is stated
 * in the stem with its actual coefficients and the options are the tables, so
 * the question remains fully answerable; the graph-building code went with it.
 */
export const generator_1221 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. MATHEMATICAL LOGIC
    // ----------------------------------------------------------------------
    // Inequality: y > mx + b
    const m = getRandomInt(10, 15); // Steep positive slope
    const b = -getRandomInt(15, 25); // Negative y-intercept

    // Clean LaTeX for "mx + b" (b is always negative here, so " - |b|").
    const rhsLatex = `${m}x ${b < 0 ? `- ${Math.abs(b)}` : `+ ${b}`}`;

    // Generate x-values for the tables
    const startX = getRandomInt(2, 4);
    const gap = getRandomInt(2, 3);
    const xValues = [startX, startX + gap, startX + 2 * gap];

    // Helper to calculate boundary y for a given x
    const getBoundary = (x: number) => m * x + b;

    // Generate datasets for options
    
    // Option A (Correct): All y > mx + b
    const dataCorrect = xValues.map(x => ({
      x,
      y: getBoundary(x) + getRandomInt(5, 15) // Strictly above
    }));

    // Option B (Below): All y < mx + b
    const dataBelow = xValues.map(x => ({
      x,
      y: getBoundary(x) - getRandomInt(5, 15) // Strictly below
    }));

    // Option C (On/Near Boundary): y ≈ mx + b (might be equal or very close, not solutions for strictly greater)
    // For strictly greater, equal is incorrect.
    const dataBoundary = xValues.map(x => ({
      x,
      y: getBoundary(x) // Exactly on line (not a solution for >)
    }));

    // Option D (Mixed): Some above, some below
    const dataMixed = xValues.map((x, i) => ({
      x,
      y: i % 2 === 0 ? getBoundary(x) + 10 : getBoundary(x) - 10
    }));

    // ----------------------------------------------------------------------
    // 2. HTML TABLE GENERATION
    // ----------------------------------------------------------------------
    const createTableHTML = (data: { x: number, y: number }[]) => {
      const rows = data.map(row => `
        <tr>
          <td style="border: 1px solid currentColor; padding: 6px; text-align: center;">${row.x}</td>
          <td style="border: 1px solid currentColor; padding: 6px; text-align: center;">${row.y}</td>
        </tr>
      `).join('');

      return `
        <table style="border-collapse: collapse; margin: 0 auto; text-align: center; background: transparent; font-size: 0.9em; width: 100%;">
          <thead>
            <tr>
              <th style="border: 1px solid currentColor; padding: 6px;">$x$</th>
              <th style="border: 1px solid currentColor; padding: 6px;">$y$</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      `;
    };

    // Prepare Options
    const optionsData = [
      { html: createTableHTML(dataCorrect), correct: true, label: "Correct (All y > mx + b)" },
      { html: createTableHTML(dataBelow), correct: false, label: "Below" },
      { html: createTableHTML(dataBoundary), correct: false, label: "Boundary" },
      { html: createTableHTML(dataMixed), correct: false, label: "Mixed" },
    ];

    const shuffledOptions = shuffle(optionsData);
    const correctOptionIndex = shuffledOptions.findIndex(o => o.correct);
    const correctLetter = String.fromCharCode(65 + correctOptionIndex);

    // ----------------------------------------------------------------------
    // 3. QUESTION TEXT & RETURN
    // ----------------------------------------------------------------------
    return {
      questionText: `Which of the following tables shows values of $x$ and their corresponding values of $y$ that are all solutions to the inequality $y > ${rhsLatex}$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => ({ text: opt.html })),
      correctAnswer: correctOptionIndex,
      explanation: `
        The correct table must satisfy the inequality $y > ${rhsLatex}$ for every pair.
        <br/><br/>
        Testing the values from the correct table:
        ${dataCorrect.map(d => `<br/>For $x = ${d.x}$: is $${d.y} > ${m}(${d.x}) ${b < 0 ? `- ${Math.abs(b)}` : `+ ${b}`}$? This gives $${d.y} > ${m * d.x + b}$, which is true.`).join('')}
        <br/><br/>
        Since all pairs in this table satisfy the condition, choice ${correctLetter} is correct. Every other table contains at least one pair with $y \\le ${rhsLatex}$, so it does not satisfy the strict inequality.
      `
    };
  }
};