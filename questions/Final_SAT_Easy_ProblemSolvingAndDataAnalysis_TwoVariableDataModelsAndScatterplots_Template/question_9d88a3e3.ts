import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9d88a3e3
 * 
 * FIXED ANALYSIS:
 * - Replaced Mafs with raw SVG.
 * - Context: Piecewise graph of Speed vs Time.
 * - Logic: Ensure specific intervals (Inc/Dec/Const) satisfy the Truth/False condition of options.
 * - Structure:
 *   0-5: Increase (5 min)
 *   5-10: Constant (5 min)
 *   10-20: Decrease (10 min)
 *   20-25: Increase (5 min) - Reaches Max
 *   25-30: Decrease (5 min)
 */

export const generator_9d88a3e3 = {
  metadata: {
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Randomize Speeds within logical constraints
    const speedStart = getRandomInt(3, 4);
    const speedMid = getRandomInt(5, 6);
    const speedLow = getRandomInt(2, 3);
    const speedMax = getRandomInt(8, 10);
    const speedEnd = getRandomInt(4, 5);

    // 2. Define Points (Time, Speed)
    // We construct the path ensuring the logic for options holds
    const dataPoints = [
      { x: 0, y: speedStart },
      { x: 5, y: speedMid },   // 0-5: Increase
      { x: 10, y: speedMid },  // 5-10: Constant (5 min)
      { x: 20, y: speedLow },  // 10-20: Decrease (10 min)
      { x: 25, y: speedMax },  // 20-25: Increase (5 min) -> Max here
      { x: 30, y: speedEnd }   // 25-30: Decrease (5 min)
    ];

    // Stats for verification:
    // Increasing: 0-5 (5 min) + 20-25 (5 min) = 10 mins
    // Decreasing: 10-20 (10 min) + 25-30 (5 min) = 15 mins
    // Constant: 5-10 (5 min) = 5 mins
    
    // 3. SVG Configuration
    const width = 500;
    const height = 300;
    const padding = { left: 50, right: 30, top: 20, bottom: 50 };

    const xMin = 0, xMax = 30;
    const yMin = 0, yMax = 12;

    const mapX = (x: number) => padding.left + (x / xMax) * (width - padding.left - padding.right);
    const mapY = (y: number) => height - padding.bottom - (y / yMax) * (height - padding.top - padding.bottom);

    // 4. Build SVG Elements
    
    // Grid & Ticks X (Time)
    const xTicks = [];
    for (let x = 0; x <= xMax; x += 5) {
      const xPos = mapX(x);
      xTicks.push(`
        <line x1="${xPos}" y1="${mapY(yMin)}" x2="${xPos}" y2="${mapY(yMax)}" stroke="currentColor" stroke-opacity="0.1" />
        <text x="${xPos}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="12" fill="currentColor">${x}</text>
      `);
    }

    // Grid & Ticks Y (Speed)
    const yTicks = [];
    for (let y = 0; y <= yMax; y += 2) {
      const yPos = mapY(y);
      yTicks.push(`
        <line x1="${mapX(xMin)}" y1="${yPos}" x2="${mapX(xMax)}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" />
        <text x="${padding.left - 10}" y="${yPos + 4}" text-anchor="end" font-size="12" fill="currentColor">${y}</text>
      `);
    }

    // Polyline creation
    const pointsString = dataPoints.map(p => `${mapX(p.x)},${mapY(p.y)}`).join(' ');

    const svgCode = `
      <div style="width: 100%; max-width: 500px; margin: 0 auto; font-family: sans-serif;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; overflow: visible;">
          <!-- Axes -->
          <line x1="${mapX(xMin)}" y1="${mapY(yMin)}" x2="${mapX(xMax)}" y2="${mapY(yMin)}" stroke="currentColor" stroke-width="2" />
          <line x1="${mapX(xMin)}" y1="${mapY(yMin)}" x2="${mapX(xMin)}" y2="${mapY(yMax)}" stroke="currentColor" stroke-width="2" />

          <!-- Grid -->
          <g>${xTicks.join('')}</g>
          <g>${yTicks.join('')}</g>

          <!-- Labels -->
          <text x="${width / 2}" y="${height - 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="currentColor">Time (minutes)</text>
          <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" font-size="14" font-weight="bold" fill="currentColor">Speed (mph)</text>

          <!-- Graph Line -->
          <polyline points="${pointsString}" fill="none" stroke="#3b82f6" stroke-width="3" stroke-linejoin="round" stroke-linecap="round" />
        </svg>
      </div>
    `;

    // 5. Generate Options
    // We are looking for the NOT TRUE statement.
    const optionsData = [
      { 
        text: "Theresa ran at a constant speed for five minutes.", 
        isCorrect: false // TRUE statement (5-10 min), so incorrect choice
      },
      { 
        text: "Theresa's speed was increasing for a longer period of time than it was decreasing.", 
        isCorrect: true // FALSE statement: Increasing (10) < Decreasing (15). Correct choice.
      },
      { 
        text: "Theresa's speed decreased at a constant rate during the last five minutes.", 
        isCorrect: false // TRUE statement (25-30 min is decreasing), so incorrect choice
      },
      { 
        text: "Theresa's speed reached its maximum during the last ten minutes.", 
        isCorrect: false // TRUE statement (Max is at 25 min, which is within the last 10 mins), so incorrect choice
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: "Theresa ran on a treadmill for thirty minutes. The graph shows her speed, in miles per hour (mph), during the run. Which statement is NOT true concerning her run?",
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To determine which statement is not true, we analyze the intervals on the graph:
      
- **Increasing Speed:** From 0 to 5 minutes and 20 to 25 minutes. Total time = 5 + 5 = 10 minutes.
- **Decreasing Speed:** From 10 to 20 minutes and 25 to 30 minutes. Total time = 10 + 5 = 15 minutes.

The statement "Theresa's speed was increasing for a longer period of time than it was decreasing" claims that 10 > 15, which is false. Therefore, this is the correct answer.`
    };
  }
};