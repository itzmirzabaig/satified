import { shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 280
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 0.015-0.025, temp: 500-700]
 * - Difficulty factors: [Reading value from graph]
 * - Distractor patterns: [half pressure, half temp, temp as pressure]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Inline SVG plot with adaptive tick spacing]
 *
 * FIX: rate and temp co-selected so rate * temp is always an exact integer.
 * Previously Math.round() caused the point dot to float off the line.
 * FIX 2: Mafs drew a gridline/label for every single x and y value, which is
 * unreadable for large ranges. Replaced with an inline SVG that skips tick
 * labels based on the range (clean 1/2/5 × 10^n steps).
 * FIX 3: Use `currentColor` for axes, labels, and gridlines so they adapt to
 * the surrounding text colour (works in both light and dark modes). Gridlines
 * are kept with low opacity for readability without clutter.
 * FIX 4: Reduced SVG height to prevent bottom clipping and ensure x‑axis is
 * fully visible.
 */

// Pre-computed table: rate × any xOption = exact integer (verified via GCD)
const RATE_TEMP_TABLE: Array<{ rate: number; xOptions: number[] }> = [
  { rate: 0.015, xOptions: [600] },
  { rate: 0.016, xOptions: [500, 625] },
  { rate: 0.018, xOptions: [500] },
  { rate: 0.020, xOptions: [500, 550, 600, 650, 700] },
  { rate: 0.022, xOptions: [500] },
  { rate: 0.024, xOptions: [500, 625] },
  { rate: 0.025, xOptions: [520, 560, 600, 640, 680] },
];

export const generator_280 = {
  metadata: {
    id: "280",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const row = RATE_TEMP_TABLE[Math.floor(Math.random() * RATE_TEMP_TABLE.length)];
    const rate = row.rate;
    const temp = row.xOptions[Math.floor(Math.random() * row.xOptions.length)];
    const pressure = rate * temp; // exact integer, no rounding needed

    const xMax = Math.ceil(temp / 100) * 100 + 100;
    const yMax = pressure + 3;

    const buildSvg = () => {
      const W = 520, H = 320;               // reduced height from 360 to 320
      const mL = 40, mR = 16, mT = 14, mB = 30;
      const pw = W - mL - mR;
      const ph = H - mT - mB;               // 320 - 14 - 30 = 276
      const X = (x: number) => mL + (x / xMax) * pw;
      const Y = (y: number) => mT + ph - (y / yMax) * ph;
      const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : n.toFixed(1));

      // Clean tick step: 1, 2, or 5 × 10^n, chosen from the range so labels never crowd.
      const niceStep = (raw: number) => {
        const pow = Math.pow(10, Math.floor(Math.log10(raw)));
        const f = raw / pow;
        return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * pow;
      };
      const xStep = niceStep(xMax / 8);            // → 100 for the 600–800 range here
      const yStep = yMax <= 21 ? 1 : niceStep(yMax / 10); // every integer for these ranges

      // Gridlines: low‑opacity currentColor so they are visible but not overpowering
      let grid = '';
      for (let i = 1; i * xStep <= xMax + 1e-9; i++) {
        const gx = i * xStep;
        grid += `<line x1="${X(gx)}" y1="${mT}" x2="${X(gx)}" y2="${mT + ph}" stroke="currentColor" stroke-width="1" opacity="0.15"/>`;
      }
      for (let i = 1; i * yStep <= yMax + 1e-9; i++) {
        const gy = i * yStep;
        grid += `<line x1="${mL}" y1="${Y(gy)}" x2="${mL + pw}" y2="${Y(gy)}" stroke="currentColor" stroke-width="1" opacity="0.15"/>`;
      }

      // Axes: solid currentColor for clear visibility
      const axes =
        `<line x1="${mL}" y1="${Y(0)}" x2="${mL + pw}" y2="${Y(0)}" stroke="currentColor" stroke-width="2"/>` +
        `<line x1="${X(0)}" y1="${mT}" x2="${X(0)}" y2="${mT + ph}" stroke="currentColor" stroke-width="2"/>`;

      // Labels: currentColor fill, placed with enough margin to avoid clipping
      let labels = `<text x="${X(0) - 8}" y="${Y(0) + 16}" font-size="12" fill="currentColor" text-anchor="end">0</text>`;
      for (let i = 1; i * xStep <= xMax + 1e-9; i++) {
        const gx = i * xStep;
        labels += `<text x="${X(gx)}" y="${Y(0) + 16}" font-size="12" fill="currentColor" text-anchor="middle">${fmt(gx)}</text>`;
      }
      for (let i = 1; i * yStep <= yMax + 1e-9; i++) {
        const gy = i * yStep;
        labels += `<text x="${X(0) - 8}" y="${Y(gy) + 4}" font-size="12" fill="currentColor" text-anchor="end">${fmt(gy)}</text>`;
      }

      // Line y = rate·x, endpoint clipped so it never pokes above the top edge.
      const xEnd = Math.min(xMax, yMax / rate);
      const line = `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(xEnd)}" y2="${Y(rate * xEnd)}" stroke="#0090ff" stroke-width="2.5" stroke-linecap="round"/>`;

      const point = `<circle cx="${X(temp)}" cy="${Y(pressure)}" r="4.5" fill="#ffffff" stroke="#0090ff" stroke-width="2.5"/>`;

      return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="system-ui, sans-serif" style="max-width:100%">${grid}${axes}${labels}${line}${point}</svg>`;
    };

    const svgCode = buildSvg();

    const optionsData = [
      { text: Math.floor(pressure / 2).toString(), isCorrect: false, reason: "is approximately half the correct pressure" },
      { text: pressure.toString(), isCorrect: true },
      { text: (temp / 2).toString(), isCorrect: false, reason: "is approximately half the temperature" },
      { text: temp.toString(), isCorrect: false, reason: "confuses temperature with pressure" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Argon is placed inside a container with a constant volume. The graph shows the estimated pressure $y$, in pounds per square inch (psi), of the argon when its temperature is $x$ kelvins. What is the estimated pressure of the argon, in psi, when the temperature is ${temp} kelvins?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: pressure.toString(),
      explanation: `Choice ${correctOption.letter} is correct. From the graph, when the temperature is ${temp} kelvins, the point on the line has a y-coordinate of ${pressure}. Therefore, the estimated pressure is ${pressure} psi. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};