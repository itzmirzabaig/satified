import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 999
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0-10, y: 1-10, slope: ~-0.9, intercept: ~9.4]
 * - Difficulty factors: [Identifying linear model from negative trend scatterplot]
 * - Distractor patterns: [A (swapped), B (swapped with negative), C (wrong sign on slope), D (correct)]
 * - Constraints: [Negative slope, positive intercept around 9]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with negative trend]
 */

export const generator_999 = {
  metadata: {
    id: "999",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const slope = -1 * getRandomInt(7, 11) / 10; // -0.7 to -1.1
    const intercept = getRandomInt(8, 11);
    
    // STEP 2: Generate points
    const points = [
      { x: 0, y: Math.round(intercept + getRandomInt(-1, 2)) },
      { x: 1, y: Math.round(intercept + slope * 1 + getRandomInt(-2, 2)) },
      { x: 2, y: Math.round(intercept + slope * 2 + getRandomInt(-2, 2)) },
      { x: 3, y: Math.round(intercept + slope * 3 + getRandomInt(-2, 3)) },
      { x: 5, y: Math.round(intercept + slope * 5 + getRandomInt(-2, 3)) },
      { x: 5.5, y: Math.round(intercept + slope * 5.5 + getRandomInt(-2, 2)) },
      { x: 6.5, y: Math.round(intercept + slope * 6.5 + getRandomInt(-2, 2)) },
      { x: 7.5, y: Math.round(intercept + slope * 7.5 + getRandomInt(-2, 2)) },
      { x: 9, y: Math.round(intercept + slope * 9 + getRandomInt(-1, 2)) },
      { x: 10, y: Math.round(intercept + slope * 10 + getRandomInt(-1, 2)) }
    ];
    
    // Calculate viewBox bounds
    const xMin = -1;
    const xMax = 11;
    const yMin = 0;
    const yMax = 12;

    // STEP 3: Build SVG scatterplot with a correctly-sloped (negative) best-fit line.
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

    // Line of best fit: y = intercept + slope*x. Draw between the data x-range
    // (0..10) so both endpoints stay on-screen for the negative slope.
    const lineX0 = 0, lineX1 = 10;
    const lineSvg = `<line x1="${mx(lineX0)}" y1="${my(intercept + slope * lineX0)}" x2="${mx(lineX1)}" y2="${my(intercept + slope * lineX1)}" stroke="currentColor" stroke-width="2"/>`;

    // Scatter points (blue dots) — the actual data.
    const dotsSvg = points.map(p => `<circle cx="${mx(p.x)}" cy="${my(p.y)}" r="4" fill="#3b82f6"/>`).join('');

    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="transparent"/>${gridSvg}${lineSvg}${dotsSvg}</svg></div>`;

    // STEP 4: Create options
    const absSlope = Math.abs(slope).toFixed(1);
    const correctEquation = `y = ${intercept} - ${absSlope}x`;
    const swappedEquation = `y = ${absSlope} + ${intercept}x`;
    const swappedNegEquation = `y = ${absSlope} - ${intercept}x`;
    const wrongSignEquation = `y = ${intercept} + ${absSlope}x`;
    
    const optionsData = [
      { text: swappedEquation, isCorrect: false },
      { text: swappedNegEquation, isCorrect: false },
      { text: wrongSignEquation, isCorrect: false },
      { text: correctEquation, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // Key each distractor's reason to its exact equation string (not its
    // shuffled position) so every description matches the option it names.
    const reasonFor = (text: string): string => {
      if (text === wrongSignEquation) return "uses the correct numbers but a positive slope, so it shows an increasing trend";
      if (text === swappedEquation) return "swaps the slope and intercept, giving a large positive slope";
      if (text === swappedNegEquation) return "swaps the slope and intercept and keeps the numbers in the wrong positions";
      return "does not match the data";
    };
    const distractorNotes = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect; it ${reasonFor(opt.text)}.`)
      .join(' ');

    return {
      questionText: "The scatterplot shows the relationship between two variables, $x$ and $y$. Which of the following equations is the most appropriate linear model for the data shown?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctLetter} is correct. The data show a decreasing (negative) trend, so the slope must be negative, and the line meets the $y$-axis near $y = ${intercept}$. The model $y = ${intercept} - ${absSlope}x$ has a $y$-intercept of ${intercept} and a slope of $-${absSlope}$, matching both features. ${distractorNotes}`
    };
  }
};
