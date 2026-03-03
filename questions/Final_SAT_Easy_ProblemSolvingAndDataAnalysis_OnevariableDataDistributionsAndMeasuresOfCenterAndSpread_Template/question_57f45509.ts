import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 57f45509
 * FIXED:
 * - Replaced Mafs components with custom SVG Box Plot.
 * - Uses "currentColor" for dark/light mode compatibility.
 * - Dynamically scales axis for small integer values (approx 0-25 range).
 * - Ensures median line is clearly visible.
 */

export const generator_57f45509 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    // Min (1-5) -> Max (approx 10-24)
    const min = getRandomInt(1, 5);
    const q1 = min + getRandomInt(2, 4);
    const median = q1 + getRandomInt(2, 5);
    const q3 = median + getRandomInt(2, 4);
    const max = q3 + getRandomInt(3, 6);

    // 2. Setup SVG Dimensions
    const width = 500;
    const height = 250;
    const margin = { top: 50, bottom: 60, left: 40, right: 40 };

    // 3. Define Axis Range
    const axisMin = 0;
    // Round max up to nearest 5, then add a bit of buffer
    const axisMax = Math.ceil(max / 5) * 5 + 2; 
    const axisRange = axisMax - axisMin;

    // Helper to map value to x-coordinate
    const getX = (val: number) => {
      const percentage = (val - axisMin) / axisRange;
      const drawWidth = width - margin.left - margin.right;
      return margin.left + percentage * drawWidth;
    };

    // 4. Generate Axis Elements
    const axisElements = [];
    // Determine step size based on range to avoid clutter
    const step = axisMax <= 15 ? 1 : 2; 
    
    // Main Axis Line
    const axisY = height - margin.bottom;
    axisElements.push(`
      <line x1="${margin.left}" y1="${axisY}" x2="${width - margin.right}" y2="${axisY}" stroke="currentColor" stroke-width="2" />
    `);

    // Ticks and Labels
    for (let v = axisMin; v <= axisMax; v += step) {
      const x = getX(v);
      axisElements.push(`
        <line x1="${x}" y1="${axisY}" x2="${x}" y2="${axisY + 8}" stroke="currentColor" stroke-width="1" />
        <text x="${x}" y="${axisY + 25}" text-anchor="middle" font-size="12" fill="currentColor" style="font-family: sans-serif; opacity: 0.8;">${v}</text>
      `);
    }

    // 5. Generate Box Plot Elements
    const boxY = (height - margin.bottom + margin.top) / 2;
    const boxHeight = 60;
    const halfH = boxHeight / 2;
    
    // Coordinates
    const xMin = getX(min);
    const xQ1 = getX(q1);
    const xMed = getX(median);
    const xQ3 = getX(q3);
    const xMax = getX(max);

    const figureCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; user-select: none; overflow: visible;">
        <!-- Axis -->
        ${axisElements.join('')}
        
        <!-- Whiskers (Left) -->
        <line x1="${xMin}" y1="${boxY}" x2="${xQ1}" y2="${boxY}" stroke="currentColor" stroke-width="2" />
        <line x1="${xMin}" y1="${boxY - 15}" x2="${xMin}" y2="${boxY + 15}" stroke="currentColor" stroke-width="2" /> <!-- Cap -->

        <!-- Whiskers (Right) -->
        <line x1="${xQ3}" y1="${boxY}" x2="${xMax}" y2="${boxY}" stroke="currentColor" stroke-width="2" />
        <line x1="${xMax}" y1="${boxY - 15}" x2="${xMax}" y2="${boxY + 15}" stroke="currentColor" stroke-width="2" /> <!-- Cap -->

        <!-- Box (Q1 to Q3) -->
        <rect x="${xQ1}" y="${boxY - halfH}" width="${xQ3 - xQ1}" height="${boxHeight}" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-width="2" />

        <!-- Median Line -->
        <line x1="${xMed}" y1="${boxY - halfH}" x2="${xMed}" y2="${boxY + halfH}" stroke="currentColor" stroke-width="3" />
        
        <!-- Optional Title for context -->
        <text x="${width / 2}" y="${margin.top - 20}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.8;">Data Distribution</text>
      </svg>
    `;

    // 6. Options
    const optionsData = [
      { text: min.toString(), isCorrect: false },
      { text: q1.toString(), isCorrect: false },
      { text: median.toString(), isCorrect: true },
      { text: max.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The box plot above summarizes a data set. What is the median of the data set?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: median.toString(),
      explanation: `Choice ${correctOption.letter} is correct. In a box plot, the median is indicated by the vertical line inside the rectangular box. Reading the graph, the vertical line inside the shaded box aligns with ${median} on the horizontal axis.`
    };
  }
};