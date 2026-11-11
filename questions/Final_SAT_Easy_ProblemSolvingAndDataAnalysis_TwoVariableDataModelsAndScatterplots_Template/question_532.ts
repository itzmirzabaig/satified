import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 532
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

export const generator_532 = {
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
    // Previously the false statement was always the same one, the explanation
    // used markdown bullets and literal newlines, and the three true statements
    // had no reasons. Now one of the four statements is drawn to be the false
    // one each time (its false wording is used), and every choice is explained.
    const falseIdx = getRandomInt(0, 3);
    const statements = [
      {
        trueText: "The runner ran at a constant speed for five minutes.",
        falseText: "The runner ran at a constant speed for ten minutes.",
        whyTrue: `the graph is horizontal only from 5 to 10 minutes, at ${speedMid} mph, so the runner ran at a constant speed for five minutes`,
        whyFalse: `the graph is horizontal only from 5 to 10 minutes, so the runner ran at a constant speed for five minutes, not ten`
      },
      {
        trueText: "The runner's speed was decreasing for a longer period of time than it was increasing.",
        falseText: "The runner's speed was increasing for a longer period of time than it was decreasing.",
        whyTrue: `the speed decreased from 10 to 20 minutes and from 25 to 30 minutes, for a total of $10 + 5 = 15$ minutes, and increased from 0 to 5 minutes and from 20 to 25 minutes, for a total of $5 + 5 = 10$ minutes, and 15 minutes is longer than 10 minutes`,
        whyFalse: `the speed increased from 0 to 5 minutes and from 20 to 25 minutes, for a total of $5 + 5 = 10$ minutes, but decreased from 10 to 20 minutes and from 25 to 30 minutes, for a total of $10 + 5 = 15$ minutes, so the speed was increasing for a shorter period of time, not a longer one`
      },
      {
        trueText: "The runner's speed decreased at a constant rate during the last five minutes.",
        falseText: "The runner's speed increased during the last five minutes.",
        whyTrue: `from 25 to 30 minutes the graph is a straight segment going down from ${speedMax} mph to ${speedEnd} mph, so the speed decreased at a constant rate`,
        whyFalse: `from 25 to 30 minutes the graph goes down from ${speedMax} mph to ${speedEnd} mph, so the speed decreased during the last five minutes, not increased`
      },
      {
        trueText: "The runner's speed reached its maximum during the last ten minutes.",
        falseText: "The runner's speed reached its maximum during the first ten minutes.",
        whyTrue: `the highest point of the graph is ${speedMax} mph at 25 minutes, which is within the last ten minutes of the run`,
        whyFalse: `the highest speed in the first ten minutes is ${speedMid} mph, but the highest point of the graph is ${speedMax} mph at 25 minutes, which is in the last ten minutes of the run`
      }
    ];

    const optionsData = statements.map((s, i) => ({
      text: i === falseIdx ? s.falseText : s.trueText,
      isCorrect: i === falseIdx,
      reason: i === falseIdx ? '' : `this statement is true: ${s.whyTrue}`
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "A runner ran on a treadmill for thirty minutes. The graph shows her speed, in miles per hour (mph), during the run. Which statement is NOT true concerning her run?",
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. This statement is not true because ${statements[falseIdx].whyFalse}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
