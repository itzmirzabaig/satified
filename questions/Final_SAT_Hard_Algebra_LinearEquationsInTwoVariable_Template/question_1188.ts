import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1188
 *
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Logic: Given line y = mx + b (via graph/intercepts), find x (d) for a specific y.
 * - Math:
 *    Slope m = -A/B  (A = rise magnitude, B = run, both > 0)
 *    Equation: y = -(A/B)x + C
 *    Point (d, targetY) on the line. Solve for d:
 *    targetY = -(A/B)d + C
 *    (A/B)d = C - targetY
 *    d = (C - targetY) * (B / A)
 * - Fixes:
 *    1. Bounded retry guarantees all four option strings are distinct
 *       for every draw (previously correct/dist1/dist3 could collide).
 *    2. Precise fraction arithmetic with positive-denominator normalization.
 *    3. SVG figure plotted from the same intercepts used in the math.
 */

export const generator_1188 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

    // Format n/d in lowest terms with a positive denominator (bare integer when d|n).
    const formatFrac = (n: number, d: number): string => {
      const common = Math.abs(gcd(n, d)) || 1;
      let sn = n / common;
      let sd = d / common;
      if (sd < 0) { sn = -sn; sd = -sd; }
      if (sd === 1) return `${sn}`;
      const sign = sn < 0 ? "-" : "";
      return `${sign}\\frac{${Math.abs(sn)}}{${sd}}`;
    };

    // --- Draw parameters with a bounded retry so all four options are distinct ---
    let A = 0, B = 0, C = 0, targetY = 0, numRaw = 0, denRaw = 0;
    let correctAns = '', dist1 = '', dist2 = '', dist3 = '';
    let tries = 0;
    do {
      // Negative slope m = -A/B
      A = getRandomInt(3, 9);
      B = getRandomInt(4, 10);
      // Y-intercept
      C = getRandomInt(6, 12);
      // Target Y (< C keeps d positive; <= C-2 keeps K = C - targetY >= 2)
      targetY = getRandomInt(2, C - 2);

      // Solve for d = (C - targetY) * B / A
      numRaw = (C - targetY) * B;
      denRaw = A;
      correctAns = formatFrac(numRaw, denRaw);

      // Distractors
      dist1 = formatFrac((C - targetY) * A, B);   // inverted slope (A/B instead of B/A)
      dist2 = formatFrac((C + targetY) * B, A);   // sign error (C + targetY)
      dist3 = formatFrac(C, 2);                    // guess: half the y-intercept

      tries++;
    } while (
      tries < 50 &&
      new Set([correctAns, dist1, dist2, dist3]).size !== 4
    );

    const optionsData = [
      { text: `$${correctAns}$`, isCorrect: true },
      { text: `$${dist1}$`, isCorrect: false },
      { text: `$${dist2}$`, isCorrect: false },
      { text: `$${dist3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    // 4. Build SVG Graph from the same intercepts used in the math.
    // y-intercept: (0, C).  x-intercept: 0 = -(A/B)x + C => x = B*C/A.
    const xInt = (B * C) / A;

    const xMax = Math.ceil(xInt) + 2;
    const yMax = C + 2;

    const width = 350;
    const height = 300;
    const margin = 40;

    const scaleX = (x: number) => margin + (x / xMax) * (width - 2 * margin);
    const scaleY = (y: number) => (height - margin) - (y / yMax) * (height - 2 * margin);

    // Grid
    let gridHTML = '';
    for (let i = 0; i <= xMax; i += 2) {
      const xPos = scaleX(i);
      gridHTML += `<line x1="${xPos}" y1="${scaleY(0)}" x2="${xPos}" y2="${scaleY(yMax)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
      if (i !== 0) gridHTML += `<text x="${xPos}" y="${scaleY(0) + 15}" text-anchor="middle" font-size="12" fill="currentColor">${i}</text>`;
    }
    for (let i = 0; i <= yMax; i += 2) {
      const yPos = scaleY(i);
      gridHTML += `<line x1="${scaleX(0)}" y1="${yPos}" x2="${scaleX(xMax)}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
      if (i !== 0) gridHTML += `<text x="${scaleX(0) - 10}" y="${yPos + 4}" text-anchor="end" font-size="12" fill="currentColor">${i}</text>`;
    }

    const axesHTML = `
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(xMax)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="2" />
        <line x1="${scaleX(0)}" y1="${scaleY(0)}" x2="${scaleX(0)}" y2="${scaleY(yMax)}" stroke="currentColor" stroke-width="2" />
        <text x="${scaleX(xMax) - 5}" y="${scaleY(0) - 5}" text-anchor="end" font-size="12" font-weight="bold" fill="currentColor">x</text>
        <text x="${scaleX(0) + 5}" y="${scaleY(yMax) + 15}" text-anchor="start" font-size="12" font-weight="bold" fill="currentColor">y</text>
    `;

    const lineHTML = `<line x1="${scaleX(0)}" y1="${scaleY(C)}" x2="${scaleX(xInt)}" y2="${scaleY(0)}" stroke="#3b82f6" stroke-width="2.5" />`;

    const pointsHTML = `
        <circle cx="${scaleX(0)}" cy="${scaleY(C)}" r="4" fill="#3b82f6" />
        <circle cx="${scaleX(xInt)}" cy="${scaleY(0)}" r="4" fill="#3b82f6" />
    `;

    const svgContent = `
    <div style="width: 100%; max-width: 400px; margin: 0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit;">
        ${gridHTML}
        ${axesHTML}
        ${lineHTML}
        ${pointsHTML}
      </svg>
    </div>
    `;

    // 5. Explanation
    const K = C - targetY;
    const explanation = `
      Choice ${correctOption.letter} is correct.
      <br/><br/>
      <strong>1. Find the equation of the line:</strong>
      Read the intercepts from the graph:
      <ul>
        <li>$y$-intercept: $(0, ${C})$</li>
        <li>$x$-intercept: $\\left(\\frac{${B * C}}{${A}}, 0\\right)$</li>
      </ul>
      Compute the slope $m$:
      $$ m = \\frac{0 - ${C}}{\\frac{${B * C}}{${A}} - 0} = -${C} \\cdot \\frac{${A}}{${B * C}} = -\\frac{${A}}{${B}} $$
      Equation: $y = -\\frac{${A}}{${B}}x + ${C}$.
      <br/><br/>
      <strong>2. Find $d$ when $y = ${targetY}$:</strong>
      Substitute $y = ${targetY}$ and $x = d$:
      $$ ${targetY} = -\\frac{${A}}{${B}}d + ${C} $$
      $$ \\frac{${A}}{${B}}d = ${C} - ${targetY} = ${K} $$
      Multiply both sides by $\\frac{${B}}{${A}}$:
      $$ d = ${K} \\cdot \\frac{${B}}{${A}} = \\frac{${numRaw}}{${denRaw}} = ${correctAns} $$
    `;

    return {
      questionText: `The point with coordinates $(d, ${targetY})$ lies on the line shown. What is the value of $d$?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
