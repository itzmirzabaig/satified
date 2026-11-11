import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 534
 * 
 * FIXED ANALYSIS:
 * - Replaced Mafs with raw SVG.
 * - Context: Elevation (x) vs Temperature (y).
 * - Trend: Negative correlation (High elevation = Low temp).
 * - Task: Read predicted y-value from the line of best fit at a specific x.
 */

export const generator_534 = {
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
    // Previously the answer was Math.round of a line with a random slope, so the
    // "predicted" temperature was only approximate and the line did not pass
    // through it. Now the line passes exactly through (targetElev, correctTemp),
    // a gridline intersection, and drops a whole number (4 or 5) of degrees per
    // 1,000 feet, a realistic lapse rate.
    const targetElev = getRandomInt(13, 16) * 500; // 6500, 7000, 7500, or 8000
    const correctTemp = 5 * getRandomInt(7, 10);   // 35, 40, 45, or 50
    const lapse = getRandomInt(4, 5);              // degrees F per 1,000 feet
    const slope = -lapse / 1000;

    // Linear Function
    const getPredTemp = (elev: number) => correctTemp + slope * (elev - targetElev);

    // 2. Generate Scatter Data
    // One data point sits at the target elevation, 3 degrees off the line (a
    // student may read this point instead of the line). The others stay at
    // least 200 feet away from the target so that point is unambiguous.
    const pointOffset = Math.random() < 0.5 ? 3 : -3;
    const pointsData = [{ x: targetElev, y: correctTemp + pointOffset }];
    const numPoints = 12;
    while (pointsData.length < numPoints) {
      const e = getRandomInt(6000, 9000);
      if (Math.abs(e - targetElev) < 200) continue;
      const noise = (Math.random() - 0.5) * 6; // +/- 3 degrees noise
      const t = getPredTemp(e) + noise;
      if (t < 21 || t > 69) continue;
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
      const label = x % 1000 === 0 ? x.toLocaleString("en-US") : "";
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
    const startLineX = 5500; // was 5800: the line now spans the whole axis so the 1,000 foot neighbors of the target are on it
    const endLineX = 9500;
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
    // Previously two distractors were the answer plus or minus 2 (no real slip)
    // and none had reasons. Now each wrong choice is a reading slip.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const leftElev = targetElev - 1000;
    const rightElev = targetElev + 1000;
    const leftTemp = correctTemp + lapse;
    const rightTemp = correctTemp - lapse;
    const pointTemp = correctTemp + pointOffset;

    const optionsData = [
      { text: `${correctTemp}°F`, isCorrect: true, reason: '' },
      { text: `${leftTemp}°F`, isCorrect: false, reason: `${leftTemp}°F is the temperature predicted by the line of best fit at an elevation of ${fmt(leftElev)} feet, not ${fmt(targetElev)} feet` },
      { text: `${rightTemp}°F`, isCorrect: false, reason: `${rightTemp}°F is the temperature predicted by the line of best fit at an elevation of ${fmt(rightElev)} feet, not ${fmt(targetElev)} feet` },
      { text: `${pointTemp}°F`, isCorrect: false, reason: `${pointTemp}°F is the temperature of the data point at ${fmt(targetElev)} feet, which lies ${pointOffset > 0 ? 'above' : 'below'} the line, but the question asks for the temperature predicted by the line of best fit` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The scatterplot shows the high temperature on a certain day and the elevation of ${numPoints} different locations in the Lake Tahoe Basin. A line of best fit for the data is also shown. What temperature is predicted by the line of best fit for a location in the Lake Tahoe Basin with an elevation of ${fmt(targetElev)} feet?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Find ${fmt(targetElev)} feet on the horizontal axis and move straight up to the line of best fit, not to the data point. Then move horizontally to the vertical axis: the line crosses the gridline for ${fmt(targetElev)} feet exactly at the gridline for ${correctTemp}°F. So the line of best fit predicts a temperature of ${correctTemp}°F at an elevation of ${fmt(targetElev)} feet. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
