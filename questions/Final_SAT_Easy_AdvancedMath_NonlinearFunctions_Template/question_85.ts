import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 85
 *
 * ORIGINAL ANALYSIS: [Matching a power function table to its graph]
 * - Number ranges: [x values: 0-3, power: 3 (cubic)]
 * - Question type: [Table → Multiple Choice Figure]
 *
 * FIXED (option graphs not rendering):
 * - Options used to carry Mafs JSX as strings. Mafs is React-only; this
 *   pipeline injects option content as HTML, and HTML has no <Mafs> element
 *   (the "=>" in y={(x) => ...} even closes the tag and leaks the rest as
 *   visible text — the "Math.pow…" seen on the page). Replaced with inline
 *   SVG plots, the only thing that renders through this pipeline.
 * - Plots replicate the Mafs look: shared axes for all options, light grid,
 *   numbered ticks (needed for solvability), currentColor axes, curve in
 *   var(--mafs-blue, #3b82f6).
 * - Platform contract preserved: options = [{ text }], correctAnswer = the
 *   correct option's text (same shape as generator_1330).
 */

export const generator_85 = {
  metadata: {
    id: "85",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Vary the x-value range: start from 0 or 1, always 4 consecutive values.
    const startX = getRandomInt(0, 1);
    const endX = startX + 3;
    const correctPower = 3; // cubic is the key pattern to identify

    const xVals = [startX, startX + 1, startX + 2, endX];
    const points = xVals.map(x => ({ x, y: Math.pow(x, correctPower) }));

    // ---- stem figure: the value table (plain HTML) ----
    const td = 'style="border:1px solid currentColor;padding:4px 12px;text-align:center;"';
    const th = 'style="border:1px solid currentColor;padding:4px 12px;text-align:center;font-style:italic;"';
    const tableHTML =
      `<div style="width:100%;max-width:240px;margin:0 auto 14px;"><table style="width:100%;border-collapse:collapse;font-size:15px;">` +
      `<tr><th ${th}>x</th><th ${th}>y</th></tr>` +
      points.map(p => `<tr><td ${td}>${p.x}</td><td ${td}>${p.y}</td></tr>`).join("") +
      `</table></div>`;

    // ---- option figures: inline SVG plots on shared axes ----
    const XMIN = -1, XMAX = 5, YMIN = -5, YMAX = 70;
    const W = 280, H = 230, PL = 40, PR = 16, PT = 14, PB = 30;
    const r2 = (v: number) => Math.round(v * 100) / 100;
    const mx = (x: number) => r2(PL + ((x - XMIN) / (XMAX - XMIN)) * (W - PL - PR));
    const my = (y: number) => r2(H - PB - ((y - YMIN) / (YMAX - YMIN)) * (H - PT - PB));

    // Liang–Barsky clip: keeps the curve inside the axes window.
    const clip = (x1: number, y1: number, x2: number, y2: number): [number, number, number, number] | null => {
      let t0 = 0, t1 = 1;
      const dx = x2 - x1, dy = y2 - y1;
      const p = [-dx, dx, -dy, dy];
      const q = [x1 - XMIN, XMAX - x1, y1 - YMIN, YMAX - y1];
      for (let i = 0; i < 4; i++) {
        if (p[i] === 0) {
          if (q[i] < 0) return null;
        } else {
          const r = q[i] / p[i];
          if (p[i] < 0) {
            if (r > t1) return null;
            if (r > t0) t0 = r;
          } else {
            if (r < t0) return null;
            if (r < t1) t1 = r;
          }
        }
      }
      return [x1 + t0 * dx, y1 + t0 * dy, x1 + t1 * dx, y1 + t1 * dy];
    };

    const buildPlot = (fn: (x: number) => number): string => {
      // Sample the function and emit a clipped path.
      const N = 90;
      let d = "";
      let last: [number, number] | null = null;
      let px = 0, py = 0;
      for (let i = 0; i <= N; i++) {
        const x = XMIN + ((XMAX - XMIN) * i) / N;
        const y = fn(x);
        if (i > 0) {
          const seg = clip(px, py, x, y);
          if (seg) {
            const [ax, ay, bx, by] = seg;
            if (!last || last[0] !== ax || last[1] !== ay) d += `M ${mx(ax)} ${my(ay)} `;
            d += `L ${mx(bx)} ${my(by)} `;
            last = [bx, by];
          } else {
            last = null;
          }
        }
        px = x; py = y;
      }

      let grid = "";
      for (let gx = 0; gx <= 5; gx++) {
        grid += `<line x1="${mx(gx)}" y1="${my(YMIN)}" x2="${mx(gx)}" y2="${my(YMAX)}" stroke="currentColor" stroke-opacity="0.12"/>`;
      }
      for (let gy = 0; gy <= 60; gy += 10) {
        grid += `<line x1="${mx(XMIN)}" y1="${my(gy)}" x2="${mx(XMAX)}" y2="${my(gy)}" stroke="currentColor" stroke-opacity="0.12"/>`;
      }

      let ticks = "";
      for (let k = 1; k <= 5; k++) {
        ticks += `<line x1="${mx(k)}" y1="${my(0)}" x2="${mx(k)}" y2="${my(0) + 5}" stroke="currentColor" stroke-width="1.2"/>` +
                 `<text x="${mx(k)}" y="${my(0) + 17}" text-anchor="middle" font-size="11" fill="currentColor">${k}</text>`;
      }
      for (let v = 10; v <= 60; v += 10) {
        ticks += `<line x1="${mx(0) - 5}" y1="${my(v)}" x2="${mx(0)}" y2="${my(v)}" stroke="currentColor" stroke-width="1.2"/>` +
                 `<text x="${mx(0) - 9}" y="${my(v) + 3.5}" text-anchor="end" font-size="11" fill="currentColor">${v}</text>`;
      }

      const axes =
        `<line x1="${mx(XMIN)}" y1="${my(0)}" x2="${mx(XMAX) - 8}" y2="${my(0)}" stroke="currentColor" stroke-width="1.5"/>` +
        `<line x1="${mx(0)}" y1="${my(YMIN)}" x2="${mx(0)}" y2="${my(YMAX) + 8}" stroke="currentColor" stroke-width="1.5"/>` +
        `<path d="M ${mx(XMAX)} ${my(0)} L ${mx(XMAX) - 8} ${my(0) - 4.5} L ${mx(XMAX) - 8} ${my(0) + 4.5} Z" fill="currentColor"/>` +
        `<path d="M ${mx(0)} ${my(YMAX)} L ${mx(0) - 4.5} ${my(YMAX) + 8} L ${mx(0) + 4.5} ${my(YMAX) + 8} Z" fill="currentColor"/>` +
        `<text x="${mx(XMAX) + 3}" y="${my(0) + 4}" font-size="13" font-style="italic" fill="currentColor">x</text>` +
        `<text x="${mx(0) + 9}" y="${my(YMAX) + 12}" font-size="13" font-style="italic" fill="currentColor">y</text>`;

      const curve = `<path d="${d}" fill="none" style="stroke:var(--mafs-blue,#3b82f6)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;

      return `<div style="width:100%;max-width:280px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
        grid + axes + ticks + curve + `</svg></div>`;
    };

    const linearSlope = getRandomInt(2, 8);
    const linearShift = getRandomInt(1, 15);

    const optionsData = [
      { text: buildPlot(x => Math.pow(x, correctPower)), isCorrect: true },
      { text: buildPlot(x => x * linearSlope), isCorrect: false },
      { text: buildPlot(x => Math.pow(x, 2)), isCorrect: false },
      { text: buildPlot(x => x + linearShift), isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The table shown includes some values of $x$ and their corresponding values of $y$. Which of the following graphs could represent this relationship?`,
      figureCode: tableHTML,
      options: shuffled.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Each pair $(x, y)$ in the table satisfies $y = x^3$: when $x = ${xVals[1]}$, $y = ${points[1].y}$, and when $x = ${endX}$, $y = ${points[3].y}$. On the same axes, only the cubic curve passes through all of these points — the parabola $y = x^2$ and the straight lines do not.`
    };
  }
};