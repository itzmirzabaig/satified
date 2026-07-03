import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 680
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [intercepts: (0,35), (90,0), slope: -7/18]
 * - Difficulty factors: [Finding equation from intercepts]
 * - Distractor patterns: [A/C: slope-intercept wrong values, B: correct, D: swapped coefficients]
 * - Constraints: [Clean integer coefficients in standard form]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs line plot with intercepts]
 */

export const generator_680 = {
  metadata: {
    id: "680",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters for standard form Ax + By = C.
    // Require A !== B so the "swapped coefficients" distractor (Bx + Ay = C)
    // can never equal the correct equation, and its intercepts genuinely differ.
    const A = getRandomInt(5, 20);
    let B = getRandomInt(5, 20);
    let guard = 0;
    while (B === A && guard++ < 50) {
      B = getRandomInt(5, 20);
    }
    if (B === A) B = A === 5 ? 6 : 5; // deterministic fallback
    const k = getRandomInt(3, 6);
    const C = A * B * k;

    // Intercepts are clean integers: yInt = C/B = A*k, xInt = C/A = B*k.
    const yInt = A * k; // y-intercept (0, yInt)
    const xInt = B * k; // x-intercept (xInt, 0)

    // STEP 2: Build a plain-SVG line graph through the two intercepts.
    // The drawn line and marked points MUST match yInt and xInt for every draw.
    const W = 450, H = 260;
    const M = { top: 20, right: 24, bottom: 40, left: 52 };
    const gW = W - M.left - M.right;
    const gH = H - M.top - M.bottom;
    // Data domain: origin to just past each intercept so both points sit inside.
    const xMax = Math.ceil((xInt * 1.15) / 10) * 10;
    const yMax = Math.ceil((yInt * 1.15) / 10) * 10;
    const sx = (x: number) => M.left + (x / xMax) * gW;
    const sy = (y: number) => M.top + gH - (y / yMax) * gH;

    // Gridlines + numeric labels (5 divisions each axis, rounded to integers).
    let grid = '';
    for (let i = 0; i <= 5; i++) {
      const yv = Math.round((yMax / 5) * i);
      const yp = sy(yv);
      grid += `<line x1="${M.left}" y1="${yp}" x2="${W - M.right}" y2="${yp}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      grid += `<text x="${M.left - 8}" y="${yp + 4}" text-anchor="end" font-size="11" fill="currentColor">${yv}</text>`;
      const xv = Math.round((xMax / 5) * i);
      const xp = sx(xv);
      grid += `<line x1="${xp}" y1="${M.top}" x2="${xp}" y2="${H - M.bottom}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1"/>`;
      grid += `<text x="${xp}" y="${H - M.bottom + 16}" text-anchor="middle" font-size="11" fill="currentColor">${xv}</text>`;
    }

    const p1x = sx(0), p1y = sy(yInt);   // (0, yInt)
    const p2x = sx(xInt), p2y = sy(0);   // (xInt, 0)

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;user-select:none;" xmlns="http://www.w3.org/2000/svg">`
      + grid
      + `<line x1="${M.left}" y1="${M.top}" x2="${M.left}" y2="${H - M.bottom}" stroke="currentColor" stroke-width="1.5"/>`
      + `<line x1="${M.left}" y1="${H - M.bottom}" x2="${W - M.right}" y2="${H - M.bottom}" stroke="currentColor" stroke-width="1.5"/>`
      + `<line x1="${p1x}" y1="${p1y}" x2="${p2x}" y2="${p2y}" stroke="#3b82f6" stroke-width="3"/>`
      + `<circle cx="${p1x}" cy="${p1y}" r="5" fill="#3b82f6" stroke="white" stroke-width="2"/>`
      + `<circle cx="${p2x}" cy="${p2y}" r="5" fill="#3b82f6" stroke="white" stroke-width="2"/>`
      + `<text x="${p1x + 8}" y="${p1y - 6}" font-size="11" fill="currentColor">(0, ${yInt})</text>`
      + `<text x="${p2x}" y="${p2y - 10}" text-anchor="middle" font-size="11" fill="currentColor">(${xInt}, 0)</text>`
      + `<text x="${W - M.right}" y="${H - M.bottom + 30}" text-anchor="end" font-size="11" font-weight="bold" fill="currentColor">T-shirts (x)</text>`
      + `<text transform="rotate(-90, 14, ${M.top + gH / 2})" x="14" y="${M.top + gH / 2}" text-anchor="middle" font-size="11" font-weight="bold" fill="currentColor">Sweatshirts (y)</text>`
      + `</svg></div>`;

    // STEP 3: Options. All four are standard form so string-distinctness is
    // easy to guarantee: with A !== B, {Ax+By, Bx+Ay} differ and the sign
    // variants {Ax-By, Bx-Ay} differ from each other and from the plus forms.
    const correctText = `$${A}x + ${B}y = ${C}$`;
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${B}x + ${A}y = ${C}$`, isCorrect: false }, // swapped coefficients
      { text: `$${A}x - ${B}y = ${C}$`, isCorrect: false }, // sign error on y-term
      { text: `$${B}x - ${A}y = ${C}$`, isCorrect: false }  // swapped + sign error
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `The graph models the relationship between the number of T-shirts, $x$, and the number of sweatshirts, $y$, that a student council can purchase for a school fundraiser. Which equation could represent this relationship?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The line passes through the intercepts $(0, ${yInt})$ and $(${xInt}, 0)$. Substituting the point $(0, ${yInt})$ into $${correctText.slice(1, -1)}$ gives ${B} times ${yInt}, which equals ${C}, and substituting $(${xInt}, 0)$ gives ${A} times ${xInt}, which also equals ${C}. Both intercepts satisfy the equation, so it matches the graph. Swapping the two coefficients, or reversing the sign between the terms, produces a line that does not pass through both intercepts.`
    };
  }
};