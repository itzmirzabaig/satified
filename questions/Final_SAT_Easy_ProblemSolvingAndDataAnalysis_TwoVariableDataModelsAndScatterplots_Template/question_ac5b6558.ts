import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ac5b6558
 * 
 * FIXED ANALYSIS:
 * - Replaced Mafs with raw SVG.
 * - Context: Elevation (x) vs Temperature (y).
 * - Trend: Negative correlation (High elevation = Low temp).
 * - Task: Read predicted y-value from the line of best fit at a specific x.
 */

export const generator_ac5b6558 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // We want the target to be easily readable, so we pick a multiple of 500.
    // Range: 6000 to 9000 ft.
    const targetElev = getRandomInt(13, 17) * 500; // 6500, 7000, 7500, 8000, or 8500
    
    // Define a realistic lapse rate (slope): approx -3.5 to -5 degrees F per 1000ft
    const slope = -1 * (getRandomInt(35, 50) / 10000); 
    
    // Define a base point (e.g., at 6000ft temp is around 50-60F)
    const baseElev = 6000;
    const baseTemp = getRandomInt(50, 60);

    // Linear Function
    const getPredTemp = (elev: number) => baseTemp + slope * (elev - baseElev);

    // Calculate correct answer (rounded to nearest integer for multiple choice)
    const correctTemp = Math.round(getPredTemp(targetElev));

    // 2. Generate Scatter Data
    // Generate 10-12 random points scattered around the line
    const pointsData = [];
    const numPoints = 12;
    for (let i = 0; i < numPoints; i++) {
      const e = getRandomInt(6000, 9000);
      const noise = (Math.random() - 0.5) * 6; // +/- 3 degrees noise
      const t = getPredTemp(e) + noise;
      pointsData.push({ x: e, y: t });
    }

    // 3. SVG Configuration
    const width = 500;
    const height = 400;
    const padding = { left: 60, right: 30, top: 20, bottom: 60 };

    // Graph Domains
    const xMin = 5500, xMax = 9500; // Pad the elevation axis
    const yMin = 20, yMax = 70;     // Pad the temp axis

    // Coordinate Mappers
    const mapX = (val: number) => padding.left + ((val - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
    const mapY = (val: number) => height - padding.bottom - ((val - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);

    // 4. Build SVG Elements

    // Grid & Ticks (X-axis: Elevation)
    const xTicks = [];
    for (let x = xMin; x <= xMax; x += 500) {
      const xPos = mapX(x);
      // Only label multiples of 1000 to avoid crowding, but draw lines for 500
      const label = x % 1000 === 0 ? x : ""; 
      xTicks.push(`
        <line x1="${xPos}" y1="${mapY(yMin)}" x2="${xPos}" y2="${mapY(yMax)}" stroke="currentColor" stroke-opacity="0.1" />
        <text x="${xPos}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${label}</text>
      `);
    }

    // Grid & Ticks (Y-axis: Temperature)
    const yTicks = [];
    for (let y = yMin; y <= yMax; y += 5) {
      const yPos = mapY(y);
      yTicks.push(`
        <line x1="${mapX(xMin)}" y1="${yPos}" x2="${mapX(xMax)}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" />
        <text x="${padding.left - 10}" y="${yPos + 4}" text-anchor="end" font-size="12" fill="currentColor">${y}</text>
      `);
    }

    // Scatter Points
    const pointsSvg = pointsData.map(p => 
      `<circle cx="${mapX(p.x).toFixed(1)}" cy="${mapY(p.y).toFixed(1)}" r="3.5" fill="#3b82f6" fill-opacity="0.6" />`
    ).join('');

    // Line of Best Fit
    const startLineX = 5800;
    const endLineX = 9200;
    const startLineY = getPredTemp(startLineX);
    const endLineY = getPredTemp(endLineX);

    const lineSvg = `
      <line 
        x1="${mapX(startLineX)}" y1="${mapY(startLineY)}" 
        x2="${mapX(endLineX)}" y2="${mapY(endLineY)}" 
        stroke="#3b82f6" 
        stroke-width="3" 
      />
    `;

    // Final SVG Assembly
    const svgCode = `
      <div style="width: 100%; max-width: 500px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${mapX(xMin)}" y1="${mapY(yMin)}" x2="${mapX(xMax)}" y2="${mapY(yMin)}" stroke="currentColor" stroke-width="2" />
          <line x1="${mapX(xMin)}" y1="${mapY(yMin)}" x2="${mapX(xMin)}" y2="${mapY(yMax)}" stroke="currentColor" stroke-width="2" />

          <!-- Grid & Ticks -->
          <g>${xTicks.join('')}</g>
          <g>${yTicks.join('')}</g>

          <!-- Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Elevation (feet)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Temperature (°F)</text>

          <!-- Graph Content -->
          ${lineSvg}
          ${pointsSvg}
        </svg>
      </div>
    `;

    // 5. Generate Options
    const distractor1 = correctTemp - 2;
    const distractor2 = correctTemp + 2;
    // Calculate a distractor based on a different elevation (e.g., target - 1000ft)
    const distractor3 = Math.round(getPredTemp(targetElev - 1000)); 

    const optionsData = [
      { text: `${correctTemp}°F`, isCorrect: true },
      { text: `${distractor1}°F`, isCorrect: false },
      { text: `${distractor2}°F`, isCorrect: false },
      { text: `${distractor3}°F`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The scatterplot above shows the high temperature on a certain day and the elevation of ${numPoints} different locations in the Lake Tahoe Basin. A line of best fit for the data is also shown. What temperature is predicted by the line of best fit for a location in the Lake Tahoe Basin with an elevation of ${targetElev} feet?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the predicted temperature:
      
1. Locate ${targetElev} on the horizontal axis (Elevation).
2. Move vertically up to intersect the line of best fit.
3. Move horizontally to the left to read the value on the vertical axis (Temperature).

The line of best fit passes through the point corresponding to an elevation of ${targetElev} feet at a temperature of approximately ${correctTemp}°F.`
    };
  }
};