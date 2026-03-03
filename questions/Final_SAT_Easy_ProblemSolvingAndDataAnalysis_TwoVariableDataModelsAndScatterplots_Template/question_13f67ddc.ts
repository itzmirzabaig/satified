import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 13f67ddc
 * FIXED:
 * - Replaced broken/tall Mafs code with compact SVG line graph.
 * - Graph now fits within viewport to prevent scrolling issues.
 * - Added proper axis labels (Tue, Wed, etc.) and grid lines.
 * - Randomized the target day and probability values.
 */

export const generator_13f67ddc = {
  metadata: {
    id: "13f67ddc",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Setup Data
    const daysFull = ["Tuesday", "Wednesday", "Thursday", "Friday"];
    const targetDayIndex = getRandomInt(0, 3); // Randomize which day is the answer
    const targetProb = getRandomInt(2, 5) * 10; // 20, 30, 40, or 50%

    // Generate probabilities for all days
    const dataPoints = daysFull.map((day, i) => {
      // Set the target day's probability
      if (i === targetDayIndex) return { day, prob: targetProb };
      
      // Generate random probabilities for other days (ensuring no duplicates of target)
      let p = getRandomInt(1, 8) * 10;
      while (p === targetProb) {
        p = getRandomInt(1, 8) * 10;
      }
      return { day, prob: p };
    });

    // 2. SVG Configuration
    const width = 450;
    const height = 250; // Compact height to avoid scrolling
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const yMax = 100; // Percentages go 0-100

    // Helper to map values to coordinates
    const getX = (index: number) => margin.left + (index * (graphWidth / (daysFull.length - 1)));
    const getY = (val: number) => margin.top + graphHeight - ((val / yMax) * graphHeight);

    // 3. Generate SVG Elements
    
    // Grid Lines (Y-axis) - every 20%
    const gridLines = [];
    for (let p = 0; p <= 100; p += 20) {
      const y = getY(p);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${p}%</text>
      `);
    }

    // Polyline Points (Connecting the dots)
    const pointsString = dataPoints.map((d, i) => `${getX(i)},${getY(d.prob)}`).join(' ');

    // Data Points (Circles)
    const circles = dataPoints.map((d, i) => {
      const x = getX(i);
      const y = getY(d.prob);
      return `<circle cx="${x}" cy="${y}" r="5" fill="#3b82f6" stroke="white" stroke-width="2" />`;
    }).join('');

    // X-Axis Labels (Day abbreviations)
    const xLabels = dataPoints.map((d, i) => {
      const x = getX(i);
      return `<text x="${x}" y="${height - 10}" text-anchor="middle" font-size="12" fill="currentColor">${d.day.substring(0, 3)}</text>`;
    }).join('');

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        <!-- Grid -->
        ${gridLines.join('')}
        
        <!-- Axes Lines -->
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        
        <!-- Line Graph -->
        <polyline points="${pointsString}" fill="none" stroke="#3b82f6" stroke-width="3" />
        
        <!-- Points -->
        ${circles}
        
        <!-- X Labels -->
        ${xLabels}
        
        <!-- Axis Titles -->
        <text transform="rotate(-90, ${15}, ${height/2})" x="${15}" y="${height/2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Probability</text>
      </svg>
    `;

    // 4. Options
    const optionsData = dataPoints.map(d => ({
      text: d.day,
      isCorrect: d.prob === targetProb
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The line graph shows the probability of snow for four days. According to the graph, for which day is the probability of snow ${targetProb}%?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the day with a ${targetProb}% probability of snow, locate ${targetProb}% on the vertical axis (Probability). Follow the grid line across to the data point, then look down to the horizontal axis to identify the day, which is ${correctOption.text}.`
    };
  }
};