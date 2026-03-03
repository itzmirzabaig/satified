import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4a2264b3
 * FIXED:
 * - Replaced Mafs graph with compact SVG line graph.
 * - Added proper scaling for "Model Year" on X-axis and "Percent" on Y-axis.
 * - Ensures the minimum point is clearly visible and randomized.
 */

export const generator_4a2264b3 = {
  metadata: {
    id: "4a2264b3",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    const baseYear = getRandomInt(2012, 2015);
    const years = [baseYear, baseYear + 1, baseYear + 2, baseYear + 3];
    
    // We need one minimum value (2-4%) and others higher (6-9%)
    const minVal = getRandomInt(2, 4);
    const minIndex = getRandomInt(0, 3); // Randomly decide which year is the minimum

    const dataPoints = years.map((year, i) => {
      if (i === minIndex) return { year, val: minVal };
      // Generate a higher value for other years
      return { year, val: getRandomInt(6, 9) };
    });

    const correctYear = dataPoints[minIndex].year;

    // 2. SVG Configuration
    const width = 450;
    const height = 250;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Y-Axis Scale (0% to 10%)
    const yMax = 10;
    
    const getX = (i: number) => margin.left + (i * (chartWidth / (years.length - 1)));
    const getY = (val: number) => margin.top + chartHeight - ((val / yMax) * chartHeight);

    // 3. Generate SVG Elements

    // Grid Lines & Y-Axis Labels (0, 2, 4, 6, 8, 10)
    const gridLines = [];
    for (let v = 0; v <= yMax; v += 2) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${v}%</text>
      `);
    }

    // Polyline
    const pointsString = dataPoints.map((d, i) => `${getX(i)},${getY(d.val)}`).join(' ');

    // Data Points
    const points = dataPoints.map((d, i) => {
      return `<circle cx="${getX(i)}" cy="${getY(d.val)}" r="5" fill="#3b82f6" stroke="white" stroke-width="2" />`;
    }).join('');

    // X-Axis Labels
    const xLabels = dataPoints.map((d, i) => {
      return `<text x="${getX(i)}" y="${height - 15}" text-anchor="middle" font-size="12" fill="currentColor">${d.year}</text>`;
    }).join('');

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        <!-- Grid -->
        ${gridLines.join('')}
        
        <!-- Axis Lines -->
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        
        <!-- Line -->
        <polyline points="${pointsString}" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />
        
        <!-- Points -->
        ${points}
        
        <!-- Labels -->
        ${xLabels}
        
        <!-- Y Title -->
        <text transform="rotate(-90, ${15}, ${height/2})" x="${15}" y="${height/2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Percent</text>
        
        <!-- X Title -->
        <text x="${margin.left + chartWidth/2}" y="${height - 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Model Year</text>
      </svg>
    `;

    // 4. Options
    const optionsData = dataPoints.map(d => ({
      text: d.year.toString(),
      isCorrect: d.year === correctYear
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The line graph above shows the percent of cars for sale at a used car lot for various model years. For what model year is the percent of cars for sale the smallest?",
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To determine the model year with the smallest percent of cars for sale, identify the lowest point on the line graph. The lowest point corresponds to the model year ${correctYear}, which has a value of ${minVal}%.`
    };
  }
};