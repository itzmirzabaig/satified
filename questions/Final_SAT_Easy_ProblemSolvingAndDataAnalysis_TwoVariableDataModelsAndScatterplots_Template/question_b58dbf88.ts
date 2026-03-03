import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b58dbf88
 *
 * ANALYSIS:
 * - Skill: Two Variable Data Models And Scatterplots
 * - Visual: Scatterplot (Season vs Weight)
 * - Logic: Read specific Y value at X=4
 * - Fixes: Ensures data points snap to grid lines (multiples of 5) for readability.
 */

export const generator_b58dbf88 = {

  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Helper to snap values to nearest multiple of 5 for clear reading
    const getMult5 = (min: number, max: number) => Math.round(getRandomInt(min, max) / 5) * 5;

    // 1. Generate Mathematical Data (Multiples of 5)
    const weights = [
      getMult5(10, 15),
      getMult5(20, 30),
      getMult5(30, 35),
      getMult5(40, 45),
      getMult5(50, 65)
    ];
    const targetSeason = 4;
    const correctWeight = weights[targetSeason - 1];

    // 2. SVG Layout Configuration
    const width = 400;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 60, left: 60 };
    
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    // Calculate Y-axis bounds (Up to nearest 10 plus padding)
    const maxVal = Math.max(...weights);
    const yMax = Math.ceil(maxVal / 10) * 10 + 10; 
    
    // Helper to map values to pixel coordinates
    const scaleX = (val: number) => margin.left + ((val - 0) / 6) * plotWidth; // X axis 0 to 6
    const scaleY = (val: number) => margin.top + plotHeight - ((val / yMax) * plotHeight);

    // 3. Generate SVG Elements
    
    // Grid Lines & Y-Labels
    // We draw lines every 5 units, but label only every 10 units
    let gridLines = '';
    let yLabels = '';
    const yStep = 5;
    
    for (let y = 0; y <= yMax; y += yStep) {
      const yPos = scaleY(y);
      const isMajor = y % 10 === 0;
      
      // Grid Line (Darker for major, lighter for minor)
      const opacity = isMajor ? "0.3" : "0.15";
      gridLines += `<line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="1" />`;
      
      // Y-Axis Label (Only for multiples of 10)
      if (isMajor) {
        yLabels += `<text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" font-family="sans-serif" font-size="12" fill="currentColor">${y}</text>`;
      }
    }

    // X-Axis Labels (Seasons 1-5)
    let xLabels = '';
    for (let x = 1; x <= 5; x++) {
        xLabels += `<text x="${scaleX(x)}" y="${margin.top + plotHeight + 20}" text-anchor="middle" font-family="sans-serif" font-size="12" fill="currentColor">${x}</text>`;
    }

    // Data Points
    const points = weights.map((w, i) => {
        const xPos = scaleX(i + 1);
        const yPos = scaleY(w);
        return `<circle cx="${xPos}" cy="${yPos}" r="6" fill="currentColor" />`;
    }).join('');

    // Axis Lines (Thicker borders)
    const axisLines = `
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" stroke="currentColor" stroke-width="2"/>
    `;

    // 4. Assemble the final SVG string
    const svgContent = `
      <div style="width: 100%; max-width: 500px; margin: 0 auto; color: inherit;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block;">
            <!-- Grid -->
            ${gridLines}
            
            <!-- Axes -->
            ${axisLines}
            
            <!-- Labels -->
            <g>
                ${yLabels}
                ${xLabels}
                <!-- Axis Titles -->
                <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="currentColor">Season</text>
                <text transform="rotate(-90)" x="${-height / 2}" y="${20}" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="currentColor">Weight (pounds)</text>
            </g>

            <!-- Data -->
            ${points}
        </svg>
      </div>
    `;

    return {
      questionText: `What was the weight, to the nearest pound, of all nectarines that grew on the tree in the ${targetSeason}th season?`,
      figureCode: svgContent,
      options: null,
      correctAnswer: correctWeight.toString(),
      explanation: `The scatterplot shows the weight of nectarines over 5 seasons. 
      <br />
      1. Locate "Season ${targetSeason}" on the horizontal x-axis.
      <br />
      2. Move vertically up to the data point.
      <br />
      3. Look across to the vertical y-axis. The grid lines appear every 5 pounds.
      <br />
      The point is located exactly at height ${correctWeight}. Thus, the weight was ${correctWeight} pounds.`
    };

  }

};