import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 689
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-intercept: 60, y-intercept: 40, slope: -2/3]
 * - Difficulty factors: [Finding equation from intercepts]
 * - Distractor patterns: [A/C: slope-intercept wrong values, B: correct, D: swapped coefficients]
 * - Constraints: [Clean integer intercepts]
 * - Question type: [Figure->Multiple Choice Text]
 * - Figure generation: [Line plot with intercept points]
 */

export const generator_689 = {
  metadata: {
    id: "689",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters.
    // Standard form Ax + By = C with C = A*B*k guarantees clean INTEGER
    // intercepts: xInt = C/A = B*k, yInt = C/B = A*k. Keep A != B so the
    // "swapped coefficient" and "swapped slope-intercept" distractors can
    // never collide with the correct equation or with each other.
    const A = getRandomInt(2, 15);
    let B = getRandomInt(2, 15);
    let guard = 0;
    while (B === A && guard++ < 50) B = getRandomInt(2, 15);
    if (B === A) B = A === 15 ? A - 1 : A + 1; // deterministic fallback
    const k = getRandomInt(2, 4);
    const C = A * B * k; // ensures clean intercepts

    const xInt = C / A; // = B * k, integer
    const yInt = C / B; // = A * k, integer

    // STEP 2: Build a compact SVG line graph. The drawn line passes through
    // BOTH intercepts (0, yInt) and (xInt, 0), matching the question's numbers
    // for every draw. Axes auto-scale to contain the data.
    const W = 460, H = 300, P = 46;
    const xMin = -xInt * 0.18, xMax = xInt * 1.18;
    const yMin = -yInt * 0.18, yMax = yInt * 1.18;
    const mx = (x: number) => P + ((x - xMin) / (xMax - xMin)) * (W - 2 * P);
    const my = (y: number) => H - P - ((y - yMin) / (yMax - yMin)) * (H - 2 * P);
    const x0 = mx(0), y0 = my(0);

    const figureCode = `<div style="width:100%;max-width:460px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg">`
      // axes
      + `<line x1="${P}" y1="${y0}" x2="${W - P}" y2="${y0}" stroke="currentColor" stroke-width="1.5"/>`
      + `<line x1="${x0}" y1="${P}" x2="${x0}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`
      // axis arrows / labels
      + `<text x="${W - P + 10}" y="${y0 + 4}" text-anchor="middle" font-size="12" fill="currentColor">x</text>`
      + `<text x="${x0}" y="${P - 12}" text-anchor="middle" font-size="12" fill="currentColor">y</text>`
      // x-intercept tick + label
      + `<line x1="${mx(xInt)}" y1="${y0 - 4}" x2="${mx(xInt)}" y2="${y0 + 4}" stroke="currentColor" stroke-width="1"/>`
      + `<text x="${mx(xInt)}" y="${y0 + 18}" text-anchor="middle" font-size="11" fill="currentColor">${xInt}</text>`
      // y-intercept tick + label
      + `<line x1="${x0 - 4}" y1="${my(yInt)}" x2="${x0 + 4}" y2="${my(yInt)}" stroke="currentColor" stroke-width="1"/>`
      + `<text x="${x0 - 10}" y="${my(yInt) + 4}" text-anchor="end" font-size="11" fill="currentColor">${yInt}</text>`
      // the line through both intercepts
      + `<line x1="${mx(0)}" y1="${my(yInt)}" x2="${mx(xInt)}" y2="${my(0)}" stroke="#3b82f6" stroke-width="2.5"/>`
      // intercept points
      + `<circle cx="${mx(0)}" cy="${my(yInt)}" r="4.5" fill="#3b82f6" stroke="white" stroke-width="1.5"/>`
      + `<circle cx="${mx(xInt)}" cy="${my(0)}" r="4.5" fill="#3b82f6" stroke="white" stroke-width="1.5"/>`
      + `</svg></div>`;

    // STEP 3: Create options. Correct = standard form Ax + By = C.
    const optionsData = [
      { text: `$y = ${A}x + ${B}$`, isCorrect: false },
      { text: `$${A}x + ${B}y = ${C}$`, isCorrect: true },
      { text: `$y = ${B}x + ${A}$`, isCorrect: false },
      { text: `$${B}x + ${A}y = ${C}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `The graph shows the relationship between the number of shares of stock from Company A, x, and the number of shares of stock from Company B, y, that an investor can purchase. Which equation could represent this relationship?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The line crosses the y-axis at $(0, ${yInt})$ and the x-axis at $(${xInt}, 0)$. Testing the equation $${A}x + ${B}y = ${C}$: when x = 0, $${B}y = ${C}$, so y = ${yInt}; when y = 0, $${A}x = ${C}$, so x = ${xInt}. Both intercepts match, so this equation represents the graph. The two slope-intercept forms treat the coefficients ${A} and ${B} as a slope and a y-intercept, which do not match the graph. The standard form $${B}x + ${A}y = ${C}$ swaps the coefficients, giving the intercepts $(0, ${xInt})$ and $(${yInt}, 0)$ instead.`
    };
  }
};
