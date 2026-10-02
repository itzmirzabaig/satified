import { shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 257
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 0.005-0.020, xValue: 400-600]
 * - Difficulty factors: [Reading value from graph]
 * - Distractor patterns: [zero, rate as volume, reciprocal rate]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [SVG line graph with marked point]
 *
 * FIX: rate and xValue are co-selected so that rate * xValue is always an
 * exact integer. This guarantees the marked dot sits perfectly on the plotted
 * line. Previously, Math.round() was used which caused the dot to float
 * above/below the line whenever rate * xValue was not a whole number.
 *
 * FIXED (Mafs JSX replaced with self-contained SVG): the figureCode was a
 * <Mafs> JSX string. Rebuilt in the house SVG style (the Q85/Q98/Q1174
 * pattern): axes with numbered ticks (x every 100 kelvins, y every 1 liter),
 * the line y = rate*x drawn from the origin with Liang-Barsky clipping to the
 * window, and the blue dot at (xValue, yValue) sitting exactly on the line
 * (guaranteed by the integer co-selection above). Same window logic as the
 * old viewBox: x to the next-100 above xValue plus 100; y to yValue + 3.
 *
 * FIXED (fraction options had no $...$ delimiters): the two \\frac
 * distractors would have displayed as raw "\\frac{3}{450}" text. Wrapped in
 * $...$ per the house rule. All logic, the rate/x table, and the answer
 * unchanged.
 */

// Pre-computed table of (rate, validXValues) pairs where rate * x is always an integer.
// Generated from: for r in 5..20, step = 1000/gcd(r,1000), collect multiples of step in [400,600]
const RATE_X_TABLE: Array<{ rate: number; xOptions: number[] }> = [
  { rate: 0.005, xOptions: [400, 600] },
  { rate: 0.006, xOptions: [500] },
  { rate: 0.008, xOptions: [500] },
  { rate: 0.010, xOptions: [400, 500, 600] },
  { rate: 0.012, xOptions: [500] },
  { rate: 0.014, xOptions: [500] },
  { rate: 0.015, xOptions: [400, 600] },
  { rate: 0.016, xOptions: [500] },
  { rate: 0.018, xOptions: [500] },
  { rate: 0.020, xOptions: [400, 450, 500, 550, 600] },
];

export const generator_257 = {
  metadata: {
    id: "257",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Pick a random row, then a random valid xValue from that row.
    // This guarantees rate * xValue is an exact integer — no rounding needed.
    const row = RATE_X_TABLE[Math.floor(Math.random() * RATE_X_TABLE.length)];
    const rate = row.rate;
    const xValue = row.xOptions[Math.floor(Math.random() * row.xOptions.length)];
    const yValue = rate * xValue; // exact integer, no Math.round()

    // ── Figure: house-style SVG. Window logic identical to the old viewBox:
    // x from 0 to next-100-above-xValue plus 100; y from 0 to yValue + 3.
    const xMax = Math.ceil(xValue / 100) * 100 + 100;
    const yMax = yValue + 3;

    const W = 420, H = 300, PL = 46, PR = 14, PT = 14, PB = 34;
    const r2 = (v: number) => Math.round(v * 100) / 100;
    const mx = (x: number) => PL + ((x - 0) / (xMax - 0)) * (W - PL - PR);
    const my = (y: number) => H - PB - ((y - 0) / (yMax - 0)) * (H - PT - PB);

    // The line y = rate*x from the origin, clipped to the window. Since the
    // line enters the window at (0,0) and exits through the right or top
    // edge, compute the exit point directly (no general clipper needed).
    const yAtXMax = rate * xMax;
    let xExit = xMax, yExit = yAtXMax;
    if (yAtXMax > yMax) {
      yExit = yMax;
      xExit = yMax / rate;
    }
    const lineSvg = `<line x1="${r2(mx(0))}" y1="${r2(my(0))}" x2="${r2(mx(xExit))}" y2="${r2(my(yExit))}" style="stroke:var(--mafs-blue,#3b82f6)" stroke-width="2.2" stroke-linecap="round"/>`;

    // Grid at the tick steps (x every 100, y every 1), light.
    let grid = "";
    for (let gx = 100; gx <= xMax; gx += 100) {
      grid += `<line x1="${r2(mx(gx))}" y1="${r2(my(0))}" x2="${r2(mx(gx))}" y2="${r2(my(yMax))}" stroke="currentColor" stroke-opacity="0.12"/>`;
    }
    for (let gy = 1; gy <= yMax; gy++) {
      grid += `<line x1="${r2(mx(0))}" y1="${r2(my(gy))}" x2="${r2(mx(xMax))}" y2="${r2(my(gy))}" stroke="currentColor" stroke-opacity="0.12"/>`;
    }

    // Axes with numbered ticks: x every 100 kelvins, y every 1 liter, 0 at origin.
    let ticks = "";
    for (let t = 100; t <= xMax; t += 100) {
      ticks += `<line x1="${r2(mx(t))}" y1="${r2(my(0))}" x2="${r2(mx(t))}" y2="${r2(my(0) + 4)}" stroke="currentColor" stroke-width="1.2"/>` +
               `<text x="${r2(mx(t))}" y="${r2(my(0) + 16)}" text-anchor="middle" font-size="10" fill="currentColor">${t}</text>`;
    }
    for (let v = 1; v <= yMax; v++) {
      ticks += `<line x1="${r2(mx(0) - 4)}" y1="${r2(my(v))}" x2="${r2(mx(0))}" y2="${r2(my(v))}" stroke="currentColor" stroke-width="1.2"/>` +
               `<text x="${r2(mx(0) - 8)}" y="${r2(my(v) + 3.5)}" text-anchor="end" font-size="10" fill="currentColor">${v}</text>`;
    }
    ticks += `<text x="${r2(mx(0) - 7)}" y="${r2(my(0) + 13)}" text-anchor="end" font-size="10" fill="currentColor">0</text>`;

    const axes =
      `<line x1="${r2(mx(0))}" y1="${r2(my(0))}" x2="${r2(mx(xMax) - 6)}" y2="${r2(my(0))}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${r2(mx(0))}" y1="${r2(my(0))}" x2="${r2(mx(0))}" y2="${r2(my(yMax) + 6)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<path d="M ${r2(mx(xMax))} ${r2(my(0))} L ${r2(mx(xMax) - 7)} ${r2(my(0) - 4)} L ${r2(mx(xMax) - 7)} ${r2(my(0) + 4)} Z" fill="currentColor"/>` +
      `<path d="M ${r2(mx(0))} ${r2(my(yMax))} L ${r2(mx(0) - 4)} ${r2(my(yMax) + 7)} L ${r2(mx(0) + 4)} ${r2(my(yMax) + 7)} Z" fill="currentColor"/>` +
      `<text x="${r2(mx(xMax) + 2)}" y="${r2(my(0) + 4)}" font-size="12" font-style="italic" fill="currentColor">x</text>` +
      `<text x="${r2(mx(0) + 8)}" y="${r2(my(yMax) + 11)}" font-size="12" font-style="italic" fill="currentColor">y</text>`;

    // The marked point — the question's subject. It sits exactly on the line
    // because rate*xValue is an exact integer by the co-selection table.
    const dot = `<circle cx="${r2(mx(xValue))}" cy="${r2(my(yValue))}" r="4" style="fill:var(--mafs-blue,#3b82f6)" stroke="white" stroke-width="1"/>`;

    const figureCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      grid + axes + ticks + lineSvg + dot + `</svg></div>`;

    const optionsData = [
      { text: "0", isCorrect: false, reason: "is the value at the origin" },
      { text: `$\\frac{${yValue}}{${xValue}}$`, isCorrect: false, reason: "represents the rate, not the volume" },
      { text: yValue.toString(), isCorrect: true },
      { text: `$\\frac{${xValue}}{${yValue}}$`, isCorrect: false, reason: "is the reciprocal of the rate" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Hydrogen is placed inside a container and kept at a constant pressure. The graph shows the estimated volume, in liters, of the hydrogen when its temperature is $x$ kelvins. What is the estimated volume when its temperature is ${xValue} kelvins?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: yValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. From the graph, when the temperature is ${xValue} kelvins, the point on the line has a y-coordinate of ${yValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};