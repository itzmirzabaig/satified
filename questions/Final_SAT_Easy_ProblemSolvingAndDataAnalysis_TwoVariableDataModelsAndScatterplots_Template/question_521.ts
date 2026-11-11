import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 521
 * FIXED:
 * - Replaced Mafs graph with compact SVG line graph.
 * - Added proper scaling for "Model Year" on X-axis and "Percent" on Y-axis.
 * - Ensures the minimum point is clearly visible and randomized.
 */

export const generator_521 = {
  metadata: {
    id: "521",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Generate Data
    const baseYear = getRandomInt(2012, 2015);
    const years = [baseYear, baseYear + 1, baseYear + 2, baseYear + 3];
    
    // One minimum value (2 to 4 percent) and three distinct higher values,
    // so the highest point is unique and each wrong choice has its own value.
    const minVal = getRandomInt(2, 4);
    const minIndex = getRandomInt(0, 3);
    const used = new Set<number>();
    const dataPoints = years.map((year, i) => {
      if (i === minIndex) return { year, val: minVal };
      let v = 0;
      do { v = getRandomInt(5, 9); } while (used.has(v));
      used.add(v);
      return { year, val: v };
    });
    const maxVal = Math.max(...dataPoints.map(d => d.val));

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

    // Grid lines every 1 percent (labels every 2) so odd values such as 5%
    // can be read exactly from the graph.
    const gridLines = [];
    for (let v = 0; v <= yMax; v += 1) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="${v % 2 === 0 ? 0.15 : 0.07}" stroke-width="1" />
        ${v % 2 === 0 ? `<text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${v}%</text>` : ''}
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
        <text transform="rotate(-90, ${15}, ${height/2})" x="${15}" y="${height/2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Percent of cars</text>
        
        <!-- X Title -->
        <text x="${margin.left + chartWidth/2}" y="${height - 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Model Year</text>
      </svg>
    `;

    // 4. Options
    // Before: no wrong choice had a reason, the stem said "line graph above",
    // and the choices were shuffled out of year order. Choices now stay in
    // year order and each wrong year gets a reason naming its value and slip.
    const optionsData = dataPoints.map((d, i) => {
      let reason = '';
      if (i !== minIndex) {
        if (d.val === maxVal) {
          reason = `${d.year} has the greatest percent, ${d.val}%, which is the highest point on the graph rather than the lowest`;
        } else {
          reason = `the percent for model year ${d.year} is ${d.val}%, which is greater than the ${minVal}% for ${correctYear}`;
        }
      }
      return { text: d.year.toString(), isCorrect: i === minIndex, reason };
    });

    const lettered = optionsData.map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = lettered.find(o => o.isCorrect)!;
    const incorrectOptions = lettered.filter(o => !o.isCorrect);

    return {
      questionText: "The line graph shows, for several model years, the percent of the cars for sale at a used car lot that are of that model year. For which model year is the percent of cars for sale the smallest?",
      figureCode: `<div style="width:100%;max-width:460px;margin:0 auto;">${svgContent}</div>`,
      options: lettered.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The smallest percent is shown by the lowest point on the graph. The lowest point is above model year ${correctYear}, where the percent is ${minVal}%. Each of the other model years has a higher point. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};