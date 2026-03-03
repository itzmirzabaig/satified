import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 374b18f9
 * FIXED:
 * - Replaced Mafs components with a custom SVG Box Plot.
 * - Uses "currentColor" for axis and lines to adapt to themes.
 * - Dynamically calculates axis range based on the random data.
 * - Ensures labels and title have sufficient margin.
 */

export const generator_374b18f9 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    // Ensure logical ordering: min < q1 < median < q3 < max
    const min = getRandomInt(20, 40) * 100; // e.g., 2000 - 4000
    const q1 = min + getRandomInt(10, 20) * 100;
    const median = q1 + getRandomInt(10, 20) * 100;
    const q3 = median + getRandomInt(10, 20) * 100;
    const max = q3 + getRandomInt(10, 20) * 100;

    // 2. Setup SVG Dimensions
    const width = 500;
    const height = 250; // Shorter height is sufficient for box plots
    const margin = { top: 40, bottom: 70, left: 40, right: 40 };

    // 3. Define Axis Range
    // Create a range that fits the data with some padding (steps of 2000)
    const axisMin = Math.floor((min - 1000) / 2000) * 2000;
    const axisMax = Math.ceil((max + 1000) / 2000) * 2000;
    const axisRange = axisMax - axisMin;

    // Helper to map value to x-coordinate
    const getX = (val: number) => {
      const percentage = (val - axisMin) / axisRange;
      const drawWidth = width - margin.left - margin.right;
      return margin.left + percentage * drawWidth;
    };

    // 4. Generate Axis Elements
    const axisElements = [];
    const step = 2000;
    
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
    const boxY = (height - margin.bottom + margin.top) / 2; // Center vertically in plot area
    const boxHeight = 50;
    const halfH = boxHeight / 2;
    
    // Coordinates
    const xMin = getX(min);
    const xQ1 = getX(q1);
    const xMed = getX(median);
    const xQ3 = getX(q3);
    const xMax = getX(max);

    // Construct SVG
    const figureCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; user-select: none; overflow: visible;">
        <!-- Axis -->
        ${axisElements.join('')}
        
        <!-- Whiskers (Left) -->
        <line x1="${xMin}" y1="${boxY}" x2="${xQ1}" y2="${boxY}" stroke="currentColor" stroke-width="2" />
        <line x1="${xMin}" y1="${boxY - 10}" x2="${xMin}" y2="${boxY + 10}" stroke="currentColor" stroke-width="2" /> <!-- Cap -->

        <!-- Whiskers (Right) -->
        <line x1="${xQ3}" y1="${boxY}" x2="${xMax}" y2="${boxY}" stroke="currentColor" stroke-width="2" />
        <line x1="${xMax}" y1="${boxY - 10}" x2="${xMax}" y2="${boxY + 10}" stroke="currentColor" stroke-width="2" /> <!-- Cap -->

        <!-- Box (Q1 to Q3) -->
        <rect x="${xQ1}" y="${boxY - halfH}" width="${xQ3 - xQ1}" height="${boxHeight}" fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-width="2" />

        <!-- Median Line -->
        <line x1="${xMed}" y1="${boxY - halfH}" x2="${xMed}" y2="${boxY + halfH}" stroke="currentColor" stroke-width="3" />
        
        <!-- Axis Title -->
        <text x="${width / 2}" y="${height - 15}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor" style="font-family: sans-serif; opacity: 0.7;">Acres of Useful Timberland</text>
      </svg>
    `;

    // 6. Options
    const optionsData = [
      { text: min.toLocaleString(), isCorrect: false },
      { text: median.toLocaleString(), isCorrect: true },
      { text: Math.round((max + min) / 2).toLocaleString(), isCorrect: false }, // Common mistake: Midpoint of range
      { text: max.toLocaleString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The number of acres of useful timberland in several counties is summarized in the box plot above. Which of the following is closest to the median number of acres?",
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: median.toLocaleString(),
      explanation: `Choice ${correctOption.letter} is correct. In a box plot, the median is indicated by the vertical line inside the box. Reading the graph, the vertical line inside the shaded box aligns with ${median.toLocaleString()} on the horizontal axis.`
    };
  }
};