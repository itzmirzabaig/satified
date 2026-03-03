import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 48fb34c8
 * Skill: Linear Inequalities In One Or Two Variables
 * Difficulty: Hard
 * 
 * Description: Identifies which table of values satisfies a linear inequality y > mx + b.
 * visualization: SVG showing the inequality region.
 */
export const generator_48fb34c8 = {
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
    // 3. SVG VISUALIZATION (Dynamic Graph)
    // ----------------------------------------------------------------------
    // Define Graph Bounds
    const xMin = 0;
    const xMax = Math.max(...xValues) + 2;
    const yMin = -30;
    const yMax = getBoundary(xMax) + 20;

    // SVG Dimensions
    const width = 300;
    const height = 300;
    const padding = 40;

    // Coordinate Mapping Functions
    const mapX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
    const mapY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

    // Calculate Line Coordinates
    const x1 = xMin;
    const y1 = m * x1 + b;
    const x2 = xMax;
    const y2 = m * x2 + b;

    const svgX1 = mapX(x1);
    const svgY1 = mapY(y1);
    const svgX2 = mapX(x2);
    const svgY2 = mapY(y2);

    // Polygon for Shading (Above the line)
    // Corners: Top-Left, Top-Right, Line-Right, Line-Left
    const polyPoints = `
      ${padding},${padding} 
      ${width - padding},${padding} 
      ${svgX2},${svgY2} 
      ${svgX1},${svgY1}
    `;

    const svgFigure = `
    <div style="width: 100%; max-width: 400px; margin: 0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit; font-family: sans-serif;">
        <!-- Defs for arrowheads -->
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>

        <!-- Axes -->
        <line x1="${padding}" y1="${mapY(0)}" x2="${width - padding}" y2="${mapY(0)}" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow)" />
        <line x1="${mapX(0)}" y1="${height - padding}" x2="${mapX(0)}" y2="${padding}" stroke="currentColor" stroke-width="1.5" marker-end="url(#arrow)" />

        <!-- Labels -->
        <text x="${width - 20}" y="${mapY(0) + 15}" fill="currentColor" text-anchor="middle" font-size="12">$x$</text>
        <text x="${mapX(0) - 15}" y="${padding + 10}" fill="currentColor" text-anchor="middle" font-size="12">$y$</text>

        <!-- Shaded Region (Inequality) -->
        <polygon points="${polyPoints}" fill="currentColor" fill-opacity="0.1" />

        <!-- Inequality Line (Dashed) -->
        <line x1="${svgX1}" y1="${svgY1}" x2="${svgX2}" y2="${svgY2}" stroke="currentColor" stroke-width="2" stroke-dasharray="5,5" />

        <!-- Origin Label -->
        <text x="${mapX(0) - 10}" y="${mapY(0) + 15}" fill="currentColor" font-size="10">0</text>
        
        <!-- Y-intercept approx label if visible -->
        <text x="${mapX(0) + 5}" y="${mapY(b)}" fill="currentColor" font-size="10" alignment-baseline="middle">${b}</text>

      </svg>
    </div>
    `;

    // ----------------------------------------------------------------------
    // 4. QUESTION TEXT & RETURN
    // ----------------------------------------------------------------------
    return {
      questionText: `Which of the following tables shows values of $x$ and their corresponding values of $y$ that are solutions to the inequality $y > ${m}x ${b}$?`,
      figureCode: svgFigure,
      options: shuffledOptions.map(opt => ({ text: opt.html })),
      correctAnswer: correctLetter,
      explanation: `
        The correct table must satisfy the inequality $y > ${m}x ${b}$.
        <br/><br/>
        We test the values from the correct option:
        ${dataCorrect.map(d => `<br/>For $x=${d.x}$: Is $${d.y} > ${m}(${d.x}) ${b}$? $\\rightarrow ${d.y} > ${m * d.x + b}$ (True)`).join('')}
        <br/><br/>
        Since all pairs in this table satisfy the condition, choice ${correctLetter} is correct.
      `
    };
  }
};