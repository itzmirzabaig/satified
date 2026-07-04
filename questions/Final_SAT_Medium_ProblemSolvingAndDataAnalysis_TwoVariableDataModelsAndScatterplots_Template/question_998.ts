import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 998
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-8, y: 2-14.5, slope: ~1.82]
 * - Difficulty factors: [Estimating slope from scatterplot]
 * - Distractor patterns: [0.2 (intercept), 0.7 (too flat), 1.8 (correct), 2.6 (too steep)]
 * - Constraints: [Slope around 1.8]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with positive trend]
 */

export const generator_998 = {
  metadata: {
    id: "998",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slope = getRandomInt(16, 20) / 10; // 1.6 to 2.0
    const intercept = getRandomInt(0, 3) / 10; // 0.0 to 0.3
    
    // STEP 2: Generate points
    const points = [
      { x: 1, y: Math.round(slope * 1 + intercept + getRandomInt(0, 2)) },
      { x: 3, y: Math.round(slope * 3 + intercept + getRandomInt(-1, 3)) },
      { x: 4.5, y: Math.round(slope * 4.5 + intercept + getRandomInt(-1, 3)) },
      { x: 5.5, y: Math.round(slope * 5.5 + intercept + getRandomInt(-3, 2)) },
      { x: 8, y: Math.round(slope * 8 + intercept + getRandomInt(-1, 3)) }
    ];
    
    // Calculate viewBox bounds
    const xMin = 0;
    const xMax = 10;
    const yMin = 0;
    const yMax = 16;

    // STEP 3: Build SVG scatterplot with a correctly-sloped line of best fit.
    const W = 400, H = 300, P = 40;
    const mx = (x: number) => P + (x - xMin) / (xMax - xMin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - yMin) / (yMax - yMin) * (H - 2 * P);

    // Axes + grid
    let gridSvg = '';
    if (yMin <= 0 && yMax >= 0) gridSvg += `<line x1="${P}" y1="${my(0)}" x2="${W - P}" y2="${my(0)}" stroke="currentColor" stroke-width="1.5"/>`;
    if (xMin <= 0 && xMax >= 0) gridSvg += `<line x1="${mx(0)}" y1="${P}" x2="${mx(0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`;
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0) continue;
      gridSvg += `<line x1="${mx(x)}" y1="${P}" x2="${mx(x)}" y2="${H - P}" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>`;
      gridSvg += `<text x="${mx(x)}" y="${my(0) + 14}" text-anchor="middle" font-size="9" fill="currentColor">${x}</text>`;
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 2) {
      if (y === 0) continue;
      gridSvg += `<line x1="${P}" y1="${my(y)}" x2="${W - P}" y2="${my(y)}" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>`;
      gridSvg += `<text x="${mx(0) - 8}" y="${my(y) + 3}" text-anchor="end" font-size="9" fill="currentColor">${y}</text>`;
    }

    // Line of best fit: y = slope*x + intercept, clipped to the visible x-range.
    const lineSvg = `<line x1="${mx(xMin)}" y1="${my(slope * xMin + intercept)}" x2="${mx(xMax)}" y2="${my(slope * xMax + intercept)}" stroke="currentColor" stroke-width="2"/>`;

    // Scatter points (blue dots) — the actual data.
    const dotsSvg = points.map(p => `<circle cx="${mx(p.x)}" cy="${my(p.y)}" r="4" fill="#3b82f6"/>`).join('');

    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="transparent"/>${gridSvg}${lineSvg}${dotsSvg}</svg></div>`;

    // STEP 4: Create options
    const slopeValue = parseFloat(slope.toFixed(1));
    const optionValues = [
      intercept.toFixed(1),
      (slopeValue * 0.4).toFixed(1),
      slopeValue.toFixed(1),
      (slopeValue * 1.4).toFixed(1)
    ];
    
    const optionsData = [
      { text: optionValues[0], isCorrect: false },
      { text: optionValues[1], isCorrect: false },
      { text: optionValues[2], isCorrect: true },
      { text: optionValues[3], isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // Key each distractor's reason to its VALUE (not its shuffled position) so
    // the description always matches the option it refers to.
    const reasonFor = (text: string): string => {
      if (text === optionValues[0]) return "is approximately the $y$-intercept, not the slope";
      if (text === optionValues[1]) return "corresponds to a line that is too flat (slope too small)";
      if (text === optionValues[3]) return "corresponds to a line that is too steep (slope too large)";
      return "does not match the slope shown";
    };
    const distractorNotes = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect; it ${reasonFor(opt.text)}.`)
      .join(' ');

    const y0 = intercept;
    const y5 = slope * 5 + intercept;

    return {
      questionText: "Which of the following is closest to the slope of the line of best fit shown?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: slopeValue.toFixed(1),
      explanation: `Choice ${correctLetter} is correct. The line of best fit passes through approximately $(0, ${y0.toFixed(1)})$ and $(5, ${y5.toFixed(1)})$. Slope $= (${y5.toFixed(1)} - ${y0.toFixed(1)}) / 5 = ${(y5 - y0).toFixed(1)} / 5 = ${slope.toFixed(2)}$, which is closest to ${slopeValue.toFixed(1)}. ${distractorNotes}`
    };
  }
};
