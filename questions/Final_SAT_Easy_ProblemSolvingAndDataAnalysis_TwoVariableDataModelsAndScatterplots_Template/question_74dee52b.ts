import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 74dee52b
 * FIXED:
 * - Replaced broken Mafs graph with a responsive SVG line graph.
 * - Graph scales correctly to show Years (X) and Enrollment (Y).
 * - Logic updated to randomize which year has the minimum enrollment (instead of always the first one).
 * - Added grid lines and clear labels for readability.
 */

export const generator_74dee52b = {
  metadata: {
    id: "74dee52b",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    const baseYear = getRandomInt(2002, 2005);
    const years = [baseYear, baseYear + 1, baseYear + 2, baseYear + 3, baseYear + 4];
    
    // Determine which index will be the minimum
    const minIndex = getRandomInt(0, 4);
    const minEnrollment = getRandomInt(120, 160);

    const dataPoints = years.map((year, i) => {
      if (i === minIndex) return { year, val: minEnrollment };
      // Generate higher values for other years
      return { year, val: getRandomInt(200, 280) };
    });

    const correctYear = dataPoints[minIndex].year;

    // 2. SVG Configuration
    const width = 450;
    const height = 250;
    const margin = { top: 30, right: 30, bottom: 50, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Scale Y-Axis (0 to ~300)
    const yMax = 300;
    
    const getX = (i: number) => margin.left + (i * (chartWidth / (years.length - 1)));
    const getY = (val: number) => margin.top + chartHeight - ((val / yMax) * chartHeight);

    // 3. Generate SVG Elements

    // Grid Lines & Y-Axis Labels (0, 50, 100, ... 300)
    const gridLines = [];
    for (let v = 0; v <= yMax; v += 50) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    // Polyline Path
    const pointsString = dataPoints.map((d, i) => `${getX(i)},${getY(d.val)}`).join(' ');

    // Data Points (Circles)
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
        
        <!-- Line Graph -->
        <polyline points="${pointsString}" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />
        
        <!-- Points -->
        ${points}
        
        <!-- Labels -->
        ${xLabels}
        
        <!-- Y-Axis Title -->
        <text transform="rotate(-90, ${20}, ${height/2})" x="${20}" y="${height/2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Graduates Enrolled</text>
        
        <!-- X-Axis Title -->
        <text x="${margin.left + chartWidth/2}" y="${height - 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Class Year</text>
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
      questionText: "The line graph above shows the number of graduates from a certain high school who enrolled in college within 24 months of graduation. Which class year had the fewest graduates who enrolled?",
      figureCode: svgContent,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the class with the fewest graduates enrolled, identify the lowest point on the line graph. The lowest point corresponds to the year ${correctOption.text}, where approximately ${minEnrollment} graduates enrolled.`
    };
  }
};