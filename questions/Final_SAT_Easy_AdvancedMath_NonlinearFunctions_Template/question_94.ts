import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 94
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [k: 1-9]
 * - Difficulty factors: [Identifying the graph of a quadratic from its equation]
 * - Distractor patterns: [Wrong vertex, downward opening, wrong intercept]
 * - Constraints: [Parabola vertex at (0, k)]
 * - Question type: [Multiple Choice Figure]
 * - Figure generation: [Parabola plots]
 */

export const generator_94 = {
  metadata: {
    id: "94",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const k = getRandomInt(1, 9);

    // Options are displayed as HTML, so each figure is a self-contained inline SVG:
    // grid + axes + tick labels + the parabola y = a(x - h)^2 + c.
    const buildSvg = (a: number, h: number, c: number) => {
      const xMin = -5, xMax = 5, yMin = -2, yMax = k + 5;
      const s = Math.min(26, Math.floor(340 / (yMax - yMin))); // pixels per unit
      const p = 14; // padding around the plot area
      const W = (xMax - xMin) * s + 2 * p;
      const H = (yMax - yMin) * s + 2 * p;
      const X = (x: number) => p + (x - xMin) * s;
      const Y = (y: number) => H - p - (y - yMin) * s;

      let grid = '';
      for (let gx = xMin; gx <= xMax; gx++) {
        grid += `<line x1="${X(gx)}" y1="${p}" x2="${X(gx)}" y2="${H - p}" stroke="#e2e8f0" stroke-width="1"/>`;
      }
      for (let gy = yMin; gy <= yMax; gy++) {
        grid += `<line x1="${p}" y1="${Y(gy)}" x2="${W - p}" y2="${Y(gy)}" stroke="#e2e8f0" stroke-width="1"/>`;
      }

      const axes = `<line x1="${p}" y1="${Y(0)}" x2="${W - p}" y2="${Y(0)}" stroke="#0f172a" stroke-width="1.5"/><line x1="${X(0)}" y1="${p}" x2="${X(0)}" y2="${H - p}" stroke="#0f172a" stroke-width="1.5"/>`;

      let labels = '';
      for (let gx = xMin; gx <= xMax; gx++) {
        if (gx !== 0) labels += `<text x="${X(gx)}" y="${Y(0) + 14}" font-size="11" fill="#64748b" text-anchor="middle">${gx}</text>`;
      }
      for (let gy = yMin; gy <= yMax; gy++) {
        if (gy !== 0) labels += `<text x="${X(0) + 6}" y="${Y(gy) + 4}" font-size="11" fill="#64748b">${gy}</text>`;
      }

      let d = '';
      for (let i = 0; i <= 200; i++) {
        const x = xMin + (i / 200) * (xMax - xMin);
        const y = a * Math.pow(x - h, 2) + c;
        d += `${i === 0 ? 'M' : 'L'}${X(x).toFixed(2)} ${Y(y).toFixed(2)}`;
      }
      const curve = `<path d="${d}" fill="none" stroke="#0090ff" stroke-width="3" stroke-linecap="round"/>`;

      return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="system-ui, sans-serif" style="max-width:100%">${grid}${axes}${labels}${curve}</svg>`;
    };

    const optionsData = [
      { figureCode: buildSvg(1, 0, k), isCorrect: true },                   // x^2 + k
      { figureCode: buildSvg(1, 1, k), isCorrect: false },                  // (x - 1)^2 + k
      { figureCode: buildSvg(-1, 0, k), isCorrect: false },                 // -x^2 + k
      { figureCode: buildSvg(1, 0, k === 1 ? 3 : k - 1), isCorrect: false } // x^2 + (k - 1)
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x)=x^2+${k}$. Which of the following graphs in the xy-plane could be the graph of $y=f(x)$?`,
      figureCode: null,
      options: shuffled.map(o => o.figureCode),
      correctAnswer: correctOption.figureCode,
      explanation: `Choice ${correctOption.letter} is correct. For the quadratic $f(x)=x^2+${k}$, the vertex is $(0, ${k})$. Only Choice ${correctOption.letter} shows an upward-opening parabola with a vertex at $(0, ${k})$.`
    };
  }
};