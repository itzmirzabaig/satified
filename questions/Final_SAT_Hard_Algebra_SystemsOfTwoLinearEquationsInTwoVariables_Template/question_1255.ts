import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1255
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: num/den, intercepts: b1 and b2 with b2 > b1]
 * - Difficulty factors: [Visual identification of parallel lines from graph]
 * - Distractor patterns: [One solution (intersecting), two solutions (impossible), infinite (same line)]
 * - Constraints: [Lines must be parallel and distinct]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Two parallel lines with same slope, different intercepts]
 *
 * FIXED (IMPORT_FAIL rebuild):
 * - Removed corrupted nested figure IIFEs (`const y = ((num);` was a syntax
 *   error and both IIFEs drew the same constant, so no parallel lines showed).
 * - Rebuilt the figure as a plain SVG template literal (house style): two
 *   distinct line segments y = (num/den)x + b1 and y = (num/den)x + b2 drawn
 *   edge-to-edge with the y-window derived from the actual line values so both
 *   parallel lines are always fully visible.
 * - Corrected import path to ../../study/types.
 * - Fixed explanation: both intercepts are positive (b1 and b2); the old text
 *   showed one as negative ($-b2$), contradicting the figure.
 */

export const generator_1255 = {
  metadata: {
    id: "1255",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Shared slope -> lines are parallel. Distinct positive intercepts (b2 > b1)
    // -> lines are distinct. Parallel + distinct => zero solutions, for EVERY draw.
    const num = getRandomInt(2, 8);   // slope numerator
    const den = getRandomInt(3, 9);   // slope denominator
    const b1 = getRandomInt(1, 5);            // first y-intercept
    const b2 = b1 + getRandomInt(1, 4);       // second y-intercept, always > b1

    const m = num / den;

    // ── Figure: two parallel lines in a compact SVG (house style) ─────────────
    const W = 450, H = 300, P = 40;
    const xMin = -6, xMax = 6;

    // Derive the y-window from the actual line values at the x-window edges so
    // both full segments are always visible with a little padding.
    const yValues = [
      m * xMin + b1, m * xMax + b1,
      m * xMin + b2, m * xMax + b2,
    ];
    const yLo = Math.floor(Math.min(0, ...yValues)) - 1;
    const yHi = Math.ceil(Math.max(0, ...yValues)) + 1;

    const mapX = (x: number) => P + (x - xMin) / (xMax - xMin) * (W - 2 * P);
    const mapY = (y: number) => H - P - (y - yLo) / (yHi - yLo) * (H - 2 * P);

    // Endpoints of each line across the full x-window.
    const line1 = `<line x1="${mapX(xMin).toFixed(1)}" y1="${mapY(m * xMin + b1).toFixed(1)}" x2="${mapX(xMax).toFixed(1)}" y2="${mapY(m * xMax + b1).toFixed(1)}" stroke="#3b82f6" stroke-width="2.5"/>`;
    const line2 = `<line x1="${mapX(xMin).toFixed(1)}" y1="${mapY(m * xMin + b2).toFixed(1)}" x2="${mapX(xMax).toFixed(1)}" y2="${mapY(m * xMax + b2).toFixed(1)}" stroke="#3b82f6" stroke-width="2.5"/>`;

    // Integer gridlines + tick labels within the window.
    let grid = '';
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0) continue;
      grid += `<line x1="${mapX(x).toFixed(1)}" y1="${P}" x2="${mapX(x).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.35"/>`;
      grid += `<text x="${mapX(x).toFixed(1)}" y="${(mapY(0) + 12).toFixed(1)}" text-anchor="middle" font-size="9" fill="currentColor">${x}</text>`;
    }
    for (let y = Math.ceil(yLo); y <= Math.floor(yHi); y++) {
      if (y === 0) continue;
      grid += `<line x1="${P}" y1="${mapY(y).toFixed(1)}" x2="${W - P}" y2="${mapY(y).toFixed(1)}" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.35"/>`;
      grid += `<text x="${(mapX(0) - 8).toFixed(1)}" y="${(mapY(y) + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="currentColor">${y}</text>`;
    }

    // Axes (x=0 and y=0 are always inside the window).
    const axes =
      `<line x1="${P}" y1="${mapY(0).toFixed(1)}" x2="${W - P}" y2="${mapY(0).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mapX(0).toFixed(1)}" y1="${P}" x2="${mapX(0).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`;

    const figureCode =
      `<div style="width:100%;max-width:450px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<rect width="${W}" height="${H}" fill="transparent"/>` +
      grid + axes + line1 + line2 +
      `</svg></div>`;

    // ── Options: the four cardinal answers; only "Zero" is correct ────────────
    const optionsData = [
      { text: "Exactly one", isCorrect: false, reason: "would require the lines to intersect at a single point" },
      { text: "Exactly two", isCorrect: false, reason: "is impossible for a system of two linear equations" },
      { text: "Infinitely many", isCorrect: false, reason: "would require the two lines to be identical" },
      { text: "Zero", isCorrect: true, reason: "" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: "The graph shows two lines in the $xy$-plane. How many solutions does the given system of equations have?",
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Both lines have the same slope, $\\frac{${num}}{${den}}$, but different $y$-intercepts (${b1} and ${b2}), so they are parallel and distinct. Parallel distinct lines never intersect, so the system has zero solutions. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
