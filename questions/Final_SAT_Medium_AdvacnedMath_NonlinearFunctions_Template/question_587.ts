import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 587
 *
 * ORIGINAL ANALYSIS:
 * - Type: Rational function vertical shift (figure-based)
 * - Number ranges: Function n/x (n in 6..12) shifted up by 3..8
 * - Difficulty: Medium - recognizing a vertical translation
 * - Figure: SVG graph of y = f(x) = n/x for x > 0, with the point (1, n)
 *   marked; options are candidate equations for the shifted function g.
 *   (Rebuilt: options must be text per the QuestionData contract — graph
 *   images cannot be used as options.)
 */

export const generator_587 = {
  metadata: {
    id: "587",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const n = getRandomInt(6, 12);    // numerator of f(x) = n/x
    const shift = getRandomInt(3, 8); // vertical shift, in units

    const questionText = `The graph of $y = f(x)$ is shown for $x > 0$, where $f(x) = \\frac{${n}}{x}$. The graph of $y = g(x)$ (not shown) is the result of shifting the graph of $y = f(x)$ up ${shift} units. Which of the following equations defines $g$?`;

    // ── Figure: y = n/x for x > 0, house-style SVG ────────────────────────────
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;
    const xMax = 10;
    const yMax = 14; // n <= 12, so the marked point (1, n) always fits

    const r1 = (v: number) => Math.round(v * 10) / 10;
    const getX = (x: number) => r1(margin.left + (x / xMax) * graphWidth);
    const getY = (y: number) => r1(margin.top + graphHeight - (y / yMax) * graphHeight);

    // Grid lines and tick labels every 2 units on both axes
    const gridLines: string[] = [];
    for (let gx = 0; gx <= xMax; gx += 2) {
      gridLines.push(`<line x1="${getX(gx)}" y1="${margin.top}" x2="${getX(gx)}" y2="${height - margin.bottom}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`);
      gridLines.push(`<text x="${getX(gx)}" y="${height - margin.bottom + 16}" text-anchor="middle" font-size="11" fill="currentColor">${gx}</text>`);
    }
    for (let gy = 0; gy <= yMax; gy += 2) {
      gridLines.push(`<line x1="${margin.left}" y1="${getY(gy)}" x2="${width - margin.right}" y2="${getY(gy)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`);
      gridLines.push(`<text x="${margin.left - 8}" y="${getY(gy) + 4}" text-anchor="end" font-size="11" fill="currentColor">${gy}</text>`);
    }

    // Curve y = n/x, plotted from where it enters the window (y = yMax) to x = xMax
    const curvePts: string[] = [];
    const xStart = n / yMax;
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const x = xStart + (i / steps) * (xMax - xStart);
      curvePts.push(`${getX(x)},${getY(n / x)}`);
    }

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        ${gridLines.join('')}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <polyline points="${curvePts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2.5" />
        <circle cx="${getX(1)}" cy="${getY(n)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5" />
        <text x="${getX(1) + 8}" y="${getY(n) - 6}" font-size="12" fill="currentColor">(1, ${n})</text>
        <text x="${width - margin.right + 12}" y="${height - margin.bottom + 4}" font-size="13" font-style="italic" fill="currentColor">x</text>
        <text x="${margin.left - 4}" y="${margin.top - 6}" font-size="13" font-style="italic" fill="currentColor">y</text>
      </svg>
    `;

    // ── Options ───────────────────────────────────────────────────────────────
    // Structurally distinct strings for every draw (shift >= 3 > 0, so the
    // "+" and "-" forms differ, and the two rational forms differ from both).
    const optionsData = [
      { text: `$g(x) = \\frac{${n}}{x} + ${shift}$`, isCorrect: true, reason: "" },
      { text: `$g(x) = \\frac{${n}}{x} - ${shift}$`, isCorrect: false, reason: `it defines $f(x) - ${shift}$, which shifts the graph down ${shift} units instead of up` },
      { text: `$g(x) = \\frac{${n}}{x + ${shift}}$`, isCorrect: false, reason: `replacing $x$ with $x + ${shift}$ shifts the graph ${shift} units to the left, a horizontal shift, not a vertical one` },
      { text: `$g(x) = \\frac{${n + shift}}{x}$`, isCorrect: false, reason: `changing the numerator from ${n} to ${n + shift} stretches the graph vertically; it does not move every point up ${shift} units` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctLetter} is correct. Shifting a graph up ${shift} units adds ${shift} to every output value of the function, so $g(x) = f(x) + ${shift} = \\frac{${n}}{x} + ${shift}$. For example, $f(1) = ${n}$, so the marked point $(1, ${n})$ on the graph of $f$ moves to $(1, ${n + shift})$ on the graph of $g$, and the horizontal asymptote moves from $y = 0$ to $y = ${shift}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation
    };
  }
};
