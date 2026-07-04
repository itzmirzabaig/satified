import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1448
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 100, intercept: 100]
 * - Difficulty factors: [Estimating slope from graph, estimating y-intercept]
 * - Distractor patterns: [Slope 200 (too steep), slope 50 (too flat), intercept 0 (misses offset)]
 * - Constraints: [Line passes through approximately (1, 200) and (2.5, 350)]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Line of best fit for house size vs price]
 */

export const generator_1448 = {
  metadata: {
    id: "1448",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: slope = 100, intercept = 100
    const slope = getRandomInt(50, 150); // double-digit to low triple-digit
    const intercept = getRandomInt(50, 150); // reasonable y-intercept

    // STEP 2: Build the 25 house data points, scattered around the true line of
    // best fit y = slope*x + intercept. A deterministic seeded jitter keeps the
    // cloud reproducible per draw while still looking like real scatter.
    const nPoints = 25;
    const pxLo = 0.5, pxHi = 4.5;             // house-size range shown
    const noiseAmp = slope * 0.45;             // vertical spread of the cloud
    let seed = (slope * 1000 + intercept) >>> 0;
    const rand = () => {
      // xorshift-ish LCG in [0,1)
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const dataPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < nPoints; i++) {
      const x = pxLo + (pxHi - pxLo) * (i / (nPoints - 1));
      const y = slope * x + intercept + (rand() * 2 - 1) * noiseAmp;
      dataPoints.push({ x, y });
    }

    // STEP 3: viewBox bounds — include the whole line over [xLo,xHi] and every point.
    const xLo = 0, xHi = 5;
    const lineYs = [slope * xLo + intercept, slope * xHi + intercept];
    const allYs = dataPoints.map(p => p.y).concat(lineYs);
    const yLo = Math.min(...allYs) - noiseAmp * 0.3;
    const yHi = Math.max(...allYs) + noiseAmp * 0.3;

    // STEP 4: Build the figure as one self-contained SVG (house-style plain SVG).
    const W = 450, H = 300, P = 45;
    const mx = (x: number) => P + (x - xLo) / (xHi - xLo) * (W - 2 * P);
    const my = (y: number) => H - P - (y - yLo) / (yHi - yLo) * (H - 2 * P);

    // Vertical grid + x labels at each integer house size.
    let grid = '';
    for (let x = Math.ceil(xLo); x <= Math.floor(xHi); x++) {
      grid += `<line x1="${mx(x).toFixed(1)}" y1="${P}" x2="${mx(x).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.35"/>`;
      grid += `<text x="${mx(x).toFixed(1)}" y="${H - P + 16}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
    }
    // Horizontal grid + y labels at ~5 rounded price levels.
    const yStep = Math.max(1, Math.round((yHi - yLo) / 5 / 25) * 25);
    for (let y = Math.ceil(yLo / yStep) * yStep; y <= yHi; y += yStep) {
      grid += `<line x1="${P}" y1="${my(y).toFixed(1)}" x2="${W - P}" y2="${my(y).toFixed(1)}" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.35"/>`;
      grid += `<text x="${P - 8}" y="${(my(y) + 3).toFixed(1)}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
    }

    // Line of best fit (the true sloped line).
    const lineX1 = mx(xLo).toFixed(1), lineY1 = my(slope * xLo + intercept).toFixed(1);
    const lineX2 = mx(xHi).toFixed(1), lineY2 = my(slope * xHi + intercept).toFixed(1);
    const bestFit = `<line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY2}" stroke="#ef4444" stroke-width="2"/>`;

    // The 25 scatter points.
    const circles = dataPoints
      .map(p => `<circle cx="${mx(p.x).toFixed(1)}" cy="${my(p.y).toFixed(1)}" r="3.5" fill="#3b82f6" opacity="0.85"/>`)
      .join('');

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="transparent"/>${grid}<line x1="${P}" y1="${P}" x2="${P}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/><line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>${bestFit}${circles}<text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="11" fill="currentColor">Size (x)</text><text transform="rotate(-90, 12, ${H / 2})" x="12" y="${H / 2}" text-anchor="middle" font-size="11" fill="currentColor">Price (y)</text></svg></div>`;

    // STEP 5: Create options
    // Distractors: slope*2 (too steep), floor(slope/2) (too flat), no intercept.
    const wrongSlope1 = slope * 2;
    const wrongSlope2 = Math.floor(slope / 2);

    const optionsData = [
      { text: `y=${wrongSlope1}x+${intercept}`, isCorrect: false, reason: "uses a slope that is too steep" },
      { text: `y=${slope}x+${intercept}`, isCorrect: true },
      { text: `y=${wrongSlope2}x+${intercept}`, isCorrect: false, reason: "uses a slope that is too flat" },
      { text: `y=${slope}x`, isCorrect: false, reason: "ignores the y-intercept" }
    ];

    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Reference points that lie exactly on the drawn line.
    const y1 = slope * 1 + intercept;   // at x = 1
    const y3 = slope * 3 + intercept;   // at x = 3

    // STEP 7: Return question data
    return {
      questionText: `The scatterplot above shows the size $x$ and the sale price $y$ of $25$ houses for sale in Town H. Which of the following could be an equation for a line of best fit for the data?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `y=${slope}x+${intercept}`,
      explanation: `Choice ${correctLetter} is correct. The line of best fit passes through approximately $(1, ${y1})$ and $(3, ${y3})$, giving a slope of $\\frac{${y3}-${y1}}{3-1} = ${slope}$. Extending the line back to $x = 0$ gives a y-intercept of about $${intercept}$, so $y = ${slope}x + ${intercept}$ fits the data. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
