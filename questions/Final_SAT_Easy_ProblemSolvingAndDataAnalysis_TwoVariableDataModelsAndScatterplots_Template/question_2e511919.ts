import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2e511919
 * FIXED:
 * - Replaced broken/tall Mafs graph with compact SVG line graph.
 * - Logic now randomizes which year has the maximum value (instead of always 1994).
 * - Added proper axis scaling and grid lines.
 */

export const generator_2e511919 = {
  metadata: {
    id: "2e511919",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    const years = [1992, 1994, 1996, 1998];
    
    // Randomly select which year index will have the max population
    const maxIndex = getRandomInt(0, 3);
    const maxPop = getRandomInt(460, 500);

    const dataPoints = years.map((year, i) => {
      if (i === maxIndex) {
        return { year, pop: maxPop };
      }
      // Ensure other years are distinctly lower
      return { year, pop: getRandomInt(300, 420) };
    });

    // 2. SVG Configuration
    const width = 450;
    const height = 250;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Scale Y-Axis (0 to 600 to accommodate max ~500 comfortably)
    const yMax = 600;
    
    const getX = (i: number) => margin.left + (i * (chartWidth / (years.length - 1)));
    const getY = (val: number) => margin.top + chartHeight - ((val / yMax) * chartHeight);

    // 3. Generate SVG Elements

    // Grid Lines & Y-Axis Labels
    const gridLines = [];
    for (let v = 0; v <= yMax; v += 100) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    // Polyline Points
    const pointsString = dataPoints.map((d, i) => `${getX(i)},${getY(d.pop)}`).join(' ');

    // Data Circles
    const points = dataPoints.map((d, i) => {
      return `<circle cx="${getX(i)}" cy="${getY(d.pop)}" r="5" fill="#3b82f6" stroke="white" stroke-width="2" />`;
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
        
        <!-- Graph Line -->
        <polyline points="${pointsString}" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
        
        <!-- Points -->
        ${points}
        
        <!-- Labels -->
        ${xLabels}
        
        <!-- Y-Axis Title -->
        <text transform="rotate(-90, ${20}, ${height/2})" x="${20}" y="${height/2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Population</text>
        
        <!-- X-Axis Title -->
        <text x="${margin.left + chartWidth/2}" y="${height - 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Year</text>
      </svg>
    `;

    // 4. Options
    const optionsData = dataPoints.map(d => ({
      text: d.year.toString(),
      isCorrect: d.pop === maxPop
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "The line graph above shows the estimated number of chipmunks in a state park over several years. In which year was the estimated number of chipmunks the greatest?",
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To determine the year with the greatest number of chipmunks, look for the highest point on the graph. The highest point corresponds to the year ${correctOption.text}, where the population is approximately ${maxPop}.`
    };
  }
};