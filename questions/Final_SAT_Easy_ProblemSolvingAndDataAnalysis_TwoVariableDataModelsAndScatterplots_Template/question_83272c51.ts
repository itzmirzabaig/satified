import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 83272c51
 * 
 * FIXED ANALYSIS:
 * - Removed Mafs library usage completely.
 * - Implemented raw SVG for high-performance, dependency-free rendering.
 * - Added "currentColor" support for automatic light/dark mode text/axis adjustment.
 * - Graph bounds: Time [0, 110], Temp [0, 200].
 */

export const generator_83272c51 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Randomize parameters
    const roomTemp = getRandomInt(65, 75);
    const initialTemp = getRandomInt(170, 190);
    // Decay rate randomized between 0.03 and 0.05
    const decayRate = (0.03 + Math.random() * 0.02).toFixed(3);
    const timeInterval = 10;

    // 2. SVG Configuration
    const width = 500;
    const height = 350;
    const padding = { left: 60, right: 30, top: 20, bottom: 50 };
    
    // Graph limits
    const xMin = 0, xMax = 110;
    const yMin = 0, yMax = 200;

    // Coordinate mapping functions
    const mapX = (x: number) => padding.left + (x / xMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yMax) * (height - padding.top - padding.bottom);

    // 3. Generate Math Data
    const getTemp = (t: number) => roomTemp + (initialTemp - roomTemp) * Math.exp(-parseFloat(decayRate) * t);

    // Generate smooth curve path (calculate every 1 unit)
    let pathD = `M ${mapX(0)} ${mapY(getTemp(0))}`;
    for (let t = 1; t <= 100; t++) {
      pathD += ` L ${mapX(t)} ${mapY(getTemp(t))}`;
    }

    // Generate data points (every 10 units)
    const pointsSVG = [];
    for (let t = 0; t <= 100; t += 10) {
      const x = mapX(t);
      const y = mapY(getTemp(t));
      pointsSVG.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1" />`);
    }

    // Generate Grid and Ticks
    const xTicks = [];
    for (let x = 0; x <= 100; x += 20) {
      const xPos = mapX(x);
      xTicks.push(`
        <line x1="${xPos}" y1="${mapY(yMin)}" x2="${xPos}" y2="${mapY(yMax)}" stroke="currentColor" stroke-opacity="0.1" />
        <text x="${xPos}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
      `);
    }

    const yTicks = [];
    for (let y = 0; y <= 200; y += 50) {
      const yPos = mapY(y);
      yTicks.push(`
        <line x1="${mapX(xMin)}" y1="${yPos}" x2="${mapX(xMax)}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" />
        <text x="${padding.left - 10}" y="${yPos + 4}" text-anchor="end" font-size="12" fill="currentColor">${y}</text>
      `);
    }

    // 4. Construct Final SVG String
    // Using 'currentColor' allows the SVG to adapt to the text color of the web app (Light/Dark mode)
    const svgCode = `
      <div style="width: 100%; max-width: 500px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${mapX(xMin)}" y1="${mapY(yMin)}" x2="${mapX(xMax)}" y2="${mapY(yMin)}" stroke="currentColor" stroke-width="2" />
          <line x1="${mapX(xMin)}" y1="${mapY(yMin)}" x2="${mapX(xMin)}" y2="${mapY(yMax)}" stroke="currentColor" stroke-width="2" />
          
          <!-- Grid & Ticks -->
          <g>${xTicks.join('')}</g>
          <g>${yTicks.join('')}</g>

          <!-- Axis Labels -->
          <text x="${width / 2}" y="${height - 5}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Time (minutes)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Temperature (°F)</text>

          <!-- Data Curve -->
          <path d="${pathD}" fill="none" stroke="#3b82f6" stroke-width="3" />
          
          <!-- Data Points -->
          <g>${pointsSVG.join('')}</g>
        </svg>
      </div>
    `;

    // 5. Options and Logic
    const getDrop = (tStart: number, tEnd: number) => Math.round(getTemp(tStart) - getTemp(tEnd));
    const drop0_10 = getDrop(0, 10);
    const drop30_40 = getDrop(30, 40);
    const drop50_60 = getDrop(50, 60);
    const drop90_100 = getDrop(90, 100);

    const optionsData = [
      { text: `Between 0 and ${timeInterval} minutes`, isCorrect: true },
      { text: `Between ${3 * timeInterval} and ${4 * timeInterval} minutes`, isCorrect: false },
      { text: `Between ${5 * timeInterval} and ${6 * timeInterval} minutes`, isCorrect: false },
      { text: `Between ${9 * timeInterval} and ${10 * timeInterval} minutes`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `In an experiment, a heated cup of coffee is removed from a heat source and left in a room at a constant temperature of ${roomTemp}°F. The graph shows the temperature, in degrees Fahrenheit (°F), of the coffee at ${timeInterval}-minute intervals. During which interval does the temperature decrease at the greatest average rate?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The average rate of change corresponds to the slope of the graph. For a cooling object following an exponential decay model, the temperature decreases most rapidly at the beginning (steepest negative slope) and levels off over time.

We can also verify this by comparing the temperature drops over the 10-minute intervals shown in the graph:
- Between 0 and 10 minutes: Drop of ~${drop0_10}°F
- Between 30 and 40 minutes: Drop of ~${drop30_40}°F
- Between 50 and 60 minutes: Drop of ~${drop50_60}°F
- Between 90 and 100 minutes: Drop of ~${drop90_100}°F

Since the largest temperature drop (${drop0_10}°F) occurs in the first interval, the average rate of decrease is greatest between 0 and 10 minutes.`
    };
  }
};