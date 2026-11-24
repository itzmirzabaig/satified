import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1146
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = -a^x + c; a in [2,5], c in [-12,-5]]
 * - Difficulty factors: [Exponential function graph, x-intercepts]
 * - Distractor patterns: [A: Three, B: Two, C: One, D: Zero (correct)]
 * - Constraints: [-a^x < 0 and c < 0 => f(x) < 0 for all x => no x-intercepts]
 * - Question type: [Figure->Multiple Choice Text]
 * - Figure generation: [Exponential curve below the x-axis with asymptote y = c]
 *
 * FIXED:
 * - Removed stray unescaped "$" in the explanation (TEX_UNBALANCED).
 * - Replaced Mafs block with a self-contained plain-SVG graph whose curve and
 *   asymptote match the drawn a and c on every draw (house style).
 */

export const generator_1146 = {
  metadata: {
    id: "1146",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Fixed: the stem called a and c constants although neither appears in the printed
    // equation, wrong choices had no reasons, and the answer was always Zero. A positive
    // c now gives a graph that crosses the x-axis exactly once on some draws.
    const a = getRandomInt(2, 5);
    const hasZero = getRandomInt(0, 1) === 1;
    const c = hasZero ? getRandomInt(3, 9) : -getRandomInt(5, 12);
    const fText = `-${a}^x${c < 0 ? '' : '+'}${c}`;

    // f(x) = -a^x + c. It approaches y=c from below as x decreases and falls
    // to -infinity as x increases. With c<0 it stays strictly below the x-axis;
    // with c>0 it crosses the x-axis once, where a^x = c.
    const f = (x: number) => -Math.pow(a, x) + c;

    // ---- Plain SVG graph ----
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 30, left: 45 };
    const gw = width - margin.left - margin.right;
    const gh = height - margin.top - margin.bottom;

    const xMin = -5;
    // When the graph has a zero, extend the window just past it so the crossing shows.
    const xMax = hasZero ? Math.log(c) / Math.log(a) + 0.7 : 2;
    const yBottom = Math.floor(f(xMax) - 2); // below the lowest sampled point
    // Leave room above the asymptote so its dashed line clears the "y" axis label.
    const yTop = hasZero ? c + Math.max(2, (c - yBottom) * 0.2) : 2;

    const sx = (x: number) => margin.left + ((x - xMin) / (xMax - xMin)) * gw;
    const sy = (y: number) => margin.top + ((yTop - y) / (yTop - yBottom)) * gh;

    // Sample the curve.
    const pts: string[] = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const x = xMin + (i / steps) * (xMax - xMin);
      pts.push(`${sx(x).toFixed(1)},${sy(f(x)).toFixed(1)}`);
    }
    const curve = pts.join(' ');

    // x-axis (y=0) and y-axis (x=0) positions.
    const xAxisY = sy(0);
    const yAxisX = sx(0);
    const asymY = sy(c);

    const figureCode = `<div style="max-width:${width}px;margin:0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;" role="img" aria-label="Graph of a decreasing exponential curve ${hasZero ? 'crossing the x-axis once' : 'lying entirely below the x-axis'} with a dashed horizontal asymptote at y = ${c}.">
        <line x1="${margin.left}" y1="${xAxisY.toFixed(1)}" x2="${(width - margin.right).toFixed(1)}" y2="${xAxisY.toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${yAxisX.toFixed(1)}" y1="${margin.top}" x2="${yAxisX.toFixed(1)}" y2="${(height - margin.bottom).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>
        <text x="${(width - margin.right).toFixed(1)}" y="${(xAxisY - 6).toFixed(1)}" text-anchor="end" font-size="12" fill="currentColor">x</text>
        <text x="${(yAxisX + 6).toFixed(1)}" y="${(margin.top + 10).toFixed(1)}" text-anchor="start" font-size="12" fill="currentColor">y</text>
        <line x1="${margin.left}" y1="${asymY.toFixed(1)}" x2="${(width - margin.right).toFixed(1)}" y2="${asymY.toFixed(1)}" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.7"/>
        <text x="${(margin.left + 4).toFixed(1)}" y="${(asymY - 5).toFixed(1)}" text-anchor="start" font-size="12" fill="#3b82f6">y=${c}</text>
        <polyline points="${curve}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
      </svg>
    </div>`;

    const optionsData = hasZero
      ? [
          { text: `Three`, isCorrect: false, reason: `three would require the graph to change direction and cross the $x$-axis again, but this graph is always decreasing` },
          { text: `Two`, isCorrect: false, reason: `two would require the graph to turn back and cross the $x$-axis a second time, as a parabola can, but this graph is always decreasing` },
          { text: `One`, isCorrect: true, reason: '' },
          { text: `Zero`, isCorrect: false, reason: `zero treats the asymptote $y=${c}$ as if the graph stayed near it, but the graph falls below the $x$-axis as $x$ increases, so it crosses the axis` }
        ]
      : [
          { text: `Three`, isCorrect: false, reason: `three would require three crossings of the $x$-axis, but this graph stays below the $x$-axis` },
          { text: `Two`, isCorrect: false, reason: `two would require two crossings of the $x$-axis, as a parabola can have, but this graph stays below the $x$-axis` },
          { text: `One`, isCorrect: false, reason: `one counts the single crossing of the $y$-axis, not a crossing of the $x$-axis` },
          { text: `Zero`, isCorrect: true, reason: '' }
        ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const solution = hasZero
      ? `The values of $x$ for which $f(x)=0$ are the $x$-coordinates of the points where the graph crosses the $x$-axis. Setting $${fText}=0$ gives $${a}^x=${c}$. Since $${a}^x$ increases for all $x$ and takes each positive value exactly once, this equation has exactly one solution, which matches the single crossing on the graph.`
      : `The values of $x$ for which $f(x)=0$ are the $x$-coordinates of the points where the graph crosses the $x$-axis. The graph has a horizontal asymptote at $y=${c}$ and lies entirely below the $x$-axis. Since $${a}^x$ is positive for every $x$, $-${a}^x\\lt 0$, so $f(x)=${fText}$ is always less than $${c}$. The graph never reaches the $x$-axis, so $f(x)=0$ has no solutions.`;

    return {
      questionText: `The graph of $y=f(x)$ is shown, where $f(x)=${fText}$. For how many values of $x$ does $f(x)=0$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. ${solution} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
