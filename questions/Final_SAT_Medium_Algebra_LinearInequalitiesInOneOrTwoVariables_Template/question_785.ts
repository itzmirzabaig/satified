import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 785
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -4, intercept: 1]
 * - Difficulty factors: [Graph to inequality, dashed line, shading]
 * - Distractor patterns: [A/B=wrong inequality sign, C=wrong slope sign]
 * - Constraints: [y > -4x + 1]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [SVG inequality graph]
 */

export const generator_785 = {
  metadata: {
    id: "785",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y > -4x + 1 — negative slope, positive y-intercept.
    const slope = -getRandomInt(2, 6);      // slope in {-2..-6}
    const yIntercept = getRandomInt(1, 5);  // intercept in {1..5}
    const absSlope = Math.abs(slope);

    // Second point used to describe the line in the explanation.
    const x2 = 1;
    const y2 = slope * x2 + yIntercept; // = slope + yIntercept

    // STEP 2: Build the figure — dashed boundary line y = slope*x + yIntercept
    // with the region ABOVE it shaded (matches the strict ">" answer).
    const xMin = -6, xMax = 6, yMin = -8, yMax = 8;
    const line = (x: number) => slope * x + yIntercept;

    const W = 450, H = 300, P = 40;
    const mx = (x: number) => P + ((x - xMin) / (xMax - xMin)) * (W - 2 * P);
    const my = (y: number) => H - P - ((y - yMin) / (yMax - yMin)) * (H - 2 * P);
    const clampY = (y: number) => Math.max(yMin, Math.min(yMax, y));

    const steps = 60;
    const linePts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i * (xMax - xMin)) / steps;
      linePts.push(`${mx(x).toFixed(1)},${my(clampY(line(x))).toFixed(1)}`);
    }
    const shadePts = [
      ...linePts,
      `${mx(xMax).toFixed(1)},${my(yMax).toFixed(1)}`,
      `${mx(xMin).toFixed(1)},${my(yMax).toFixed(1)}`
    ];

    let ticks = '';
    for (let x = xMin + 2; x <= xMax - 2; x += 2) {
      if (x === 0) continue;
      ticks += `<text x="${mx(x).toFixed(1)}" y="${(my(0) + 14).toFixed(1)}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
    }
    for (let y = yMin + 2; y <= yMax - 2; y += 2) {
      if (y === 0) continue;
      ticks += `<text x="${(mx(0) - 6).toFixed(1)}" y="${(my(y) + 3).toFixed(1)}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
    }

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${shadePts.join(' ')}" fill="#3b82f6" fill-opacity="0.15"/>` +
      `<line x1="${P}" y1="${my(0).toFixed(1)}" x2="${W - P}" y2="${my(0).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(0).toFixed(1)}" y1="${P}" x2="${mx(0).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>` +
      ticks +
      `<polyline points="${linePts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-dasharray="6,4"/>` +
      `</svg></div>`;

    // STEP 3: Create options.
    // Correct answer is y > slope*x + intercept. With slope < 0 this is
    //   y > intercept - absSlope x.
    const optionsData = [
      // wrong: "<" and +slope
      { text: `$y < ${yIntercept} + ${absSlope}x$`, isCorrect: false },
      // wrong: "<" with the correct slope
      { text: `$y < ${yIntercept} - ${absSlope}x$`, isCorrect: false },
      // wrong: ">" but +slope (wrong slope sign)
      { text: `$y > ${yIntercept} + ${absSlope}x$`, isCorrect: false },
      // correct
      { text: `$y > ${yIntercept} - ${absSlope}x$`, isCorrect: true }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctText = correctOption.text;

    // STEP 5: Build explanation (numbers from the same live variables)
    const explanation = `Choice ${correctOption.letter} is correct. The boundary line passes through $(0, ${yIntercept})$ and $(${x2}, ${y2})$, so its slope is $\\frac{${y2} - ${yIntercept}}{${x2} - 0} = ${slope}$ and its $y$-intercept is ${yIntercept}. The line is $y = ${slope}x + ${yIntercept}$. The boundary is dashed and the region above it is shaded, so $y$ is greater than the line: $y > ${slope}x + ${yIntercept}$, written as $y > ${yIntercept} - ${absSlope}x$. Choosing "$<$" would shade below the line, and using $+${absSlope}x$ would reverse the slope's direction.`;

    // STEP 6: Return question data
    return {
      questionText: `The shaded region shown represents the solutions to which inequality?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};