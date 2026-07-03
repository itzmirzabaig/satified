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
    const a = getRandomInt(2, 5);
    const c = -getRandomInt(5, 12);

    // f(x) = -a^x + c. It approaches y=c from below as x decreases and falls
    // to -infinity as x increases, so it stays strictly below the x-axis.
    const f = (x: number) => -Math.pow(a, x) + c;

    // ---- Plain SVG graph ----
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 30, left: 45 };
    const gw = width - margin.left - margin.right;
    const gh = height - margin.top - margin.bottom;

    const xMin = -5;
    const xMax = 2;
    const yTop = 2;                    // a little above the x-axis
    const yBottom = Math.floor(f(xMax) - 2); // below the lowest sampled point

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
      <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;" role="img" aria-label="Graph of a decreasing exponential curve lying entirely below the x-axis with a dashed horizontal asymptote at y = ${c}.">
        <line x1="${margin.left}" y1="${xAxisY.toFixed(1)}" x2="${(width - margin.right).toFixed(1)}" y2="${xAxisY.toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${yAxisX.toFixed(1)}" y1="${margin.top}" x2="${yAxisX.toFixed(1)}" y2="${(height - margin.bottom).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>
        <text x="${(width - margin.right).toFixed(1)}" y="${(xAxisY - 6).toFixed(1)}" text-anchor="end" font-size="12" fill="currentColor">x</text>
        <text x="${(yAxisX + 6).toFixed(1)}" y="${(margin.top + 10).toFixed(1)}" text-anchor="start" font-size="12" fill="currentColor">y</text>
        <line x1="${margin.left}" y1="${asymY.toFixed(1)}" x2="${(width - margin.right).toFixed(1)}" y2="${asymY.toFixed(1)}" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.7"/>
        <text x="${(margin.left + 4).toFixed(1)}" y="${(asymY - 5).toFixed(1)}" text-anchor="start" font-size="12" fill="#3b82f6">y=${c}</text>
        <polyline points="${curve}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
      </svg>
    </div>`;

    const optionsData = [
      { text: `Three`, isCorrect: false },
      { text: `Two`, isCorrect: false },
      { text: `One`, isCorrect: false },
      { text: `Zero`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The graph of $y=f(x)$ is shown, where $f(x)=-${a}^x${c}$ and $a$ and $c$ are constants. For how many values of $x$ does $f(x)=0$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Zero`,
      explanation: `Choice ${correctLetter} is correct. The graph has a horizontal asymptote at $y=${c}$ and lies entirely below the x-axis. Since $-${a}^x<0$ for every $x$ and $c=${c}<0$, the value $f(x)=-${a}^x${c}$ is always negative, so the graph never reaches the x-axis. Therefore $f(x)=0$ has no solutions.`
    };
  }
};
