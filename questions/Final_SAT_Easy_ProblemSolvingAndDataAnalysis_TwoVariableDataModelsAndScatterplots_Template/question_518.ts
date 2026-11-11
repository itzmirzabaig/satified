import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 518
 * FIXED:
 * - Replaced broken/tall Mafs graph with compact SVG line graph.
 * - Logic now randomizes which year has the maximum value (instead of always 1994).
 * - Added proper axis scaling and grid lines.
 */

export const generator_518 = {
  metadata: {
    id: "518",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    // Values are multiples of 10 and all distinct, so the lowest point is
    // unique and every wrong choice can be described by its own value.
    const years = [1992, 1994, 1996, 1998];
    const maxIndex = getRandomInt(0, 3);
    const maxPop = getRandomInt(46, 50) * 10;
    const used = new Set<number>();
    const dataPoints = years.map((year, i) => {
      if (i === maxIndex) return { year, pop: maxPop };
      let v = 0;
      do { v = getRandomInt(30, 42) * 10; } while (used.has(v));
      used.add(v);
      return { year, pop: v };
    });
    const minPop = Math.min(...dataPoints.map(d => d.pop));

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
        <text transform="rotate(-90, ${20}, ${height/2})" x="${20}" y="${height/2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Chipmunks</text>
        
        <!-- X-Axis Title -->
        <text x="${margin.left + chartWidth/2}" y="${height - 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Year</text>
      </svg>
    `;

    // 4. Options
    // Before: no wrong choice had a reason, the stem said "line graph above",
    // and the choices were shuffled out of time order. Choices now stay in
    // year order and each wrong year gets a reason naming its value and slip.
    const maxYear = years[maxIndex];
    const optionsData = dataPoints.map((d, i) => {
      let reason = '';
      if (i !== maxIndex) {
        if (d.pop === minPop) {
          reason = `${d.year} is the year with the fewest chipmunks, about ${d.pop}, which is the lowest point on the graph rather than the highest`;
        } else if (i === years.length - 1) {
          reason = `${d.year} is the most recent year shown, but its estimate of about ${d.pop} chipmunks is less than the estimate of about ${maxPop} in ${maxYear}`;
        } else {
          reason = `the estimate for ${d.year} is only about ${d.pop} chipmunks, which is less than the estimate of about ${maxPop} in ${maxYear}`;
        }
      }
      return { text: d.year.toString(), isCorrect: i === maxIndex, reason };
    });

    const lettered = optionsData.map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = lettered.find(o => o.isCorrect)!;
    const incorrectOptions = lettered.filter(o => !o.isCorrect);

    return {
      questionText: "The line graph shows the estimated number of chipmunks in a state park for several years. In which year was the estimated number of chipmunks the greatest?",
      figureCode: `<div style="width:100%;max-width:460px;margin:0 auto;">${svgContent}</div>`,
      options: lettered.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The greatest estimated number of chipmunks is shown by the highest point on the graph. The highest point is above ${maxYear}, where the estimate is about ${maxPop} chipmunks. Each of the other years has a lower point. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};