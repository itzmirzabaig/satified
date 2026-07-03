import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 545
 *
 * A quartic graph is shown with x-intercepts at x = r1 (touches, double
 * root), x = 0 (crosses), and x = r3 (crosses). The student must pick the
 * factored equation whose roots and root multiplicities match the graph:
 * y = L*x*(x - r3)*(x + a)^2 with a = -r1 and L < 0.
 * Distractors: all-linear factors (no double root), reflected roots, and
 * swapped exponents. a != r3 by construction so the reflected-roots
 * distractor never shares the graph's intercept set.
 */

export const generator_545 = {
  metadata: {
    id: "545",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Roots: r1 = -a (double root, graph touches), 0 and r3 (graph crosses).
    // a = r3 + 1..3 guarantees a !== r3 (distinct options, distinct
    // intercept sets) and keeps the dip between x = r1 and x = 0 visible.
    const r3 = getRandomInt(3, 6);
    const a = r3 + getRandomInt(1, 3);
    const r1 = -a;
    // Leading coefficient: -0.05 .. -0.20 (always a clean 2-decimal value).
    const leadingCoeff = -1 * (getRandomInt(5, 20) / 100);

    // ── Figure: plot y = leadingCoeff * x * (x - r3) * (x + a)^2 ────────────
    const fn = (x: number) => leadingCoeff * x * (x - r3) * (x + a) * (x + a);

    const xLo = r1 - 1;
    const xHi = r3 + 1;
    const SAMPLES = 160;
    let yLo = 0;
    let yHi = 0;
    const samples: Array<{ x: number; y: number }> = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const x = xLo + (i * (xHi - xLo)) / SAMPLES;
      const y = fn(x);
      samples.push({ x, y });
      if (y < yLo) yLo = y;
      if (y > yHi) yHi = y;
    }
    const yPad = 0.12 * (yHi - yLo);
    yLo -= yPad;
    yHi += yPad;

    const width = 450;
    const height = 260;
    const margin = { top: 15, right: 20, bottom: 35, left: 55 };
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;
    const px = (x: number) => margin.left + ((x - xLo) / (xHi - xLo)) * plotW;
    const py = (y: number) => margin.top + plotH - ((y - yLo) / (yHi - yLo)) * plotH;
    const r1d = (v: number) => Math.round(v * 10) / 10;

    // Axis tick marks: integers on x (step 1 or 2), "nice" steps on y.
    const xStep = xHi - xLo > 12 ? 2 : 1;
    const xTicks: string[] = [];
    for (let x = Math.ceil(xLo); x <= Math.floor(xHi); x += xStep) {
      if (x === 0) continue;
      xTicks.push(`<line x1="${r1d(px(x))}" y1="${r1d(py(0) - 3)}" x2="${r1d(px(x))}" y2="${r1d(py(0) + 3)}" stroke="currentColor" stroke-width="1"/><text x="${r1d(px(x))}" y="${r1d(py(0) + 14)}" text-anchor="middle" font-size="11" fill="currentColor">${x}</text>`);
    }
    const niceSteps = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500];
    const rawStep = (yHi - yLo) / 5;
    const yStep = niceSteps.find(s => s >= rawStep) ?? 500;
    const yTicks: string[] = [];
    for (let y = Math.ceil(yLo / yStep) * yStep; y <= yHi; y += yStep) {
      if (y === 0) continue;
      yTicks.push(`<line x1="${r1d(px(0) - 3)}" y1="${r1d(py(y))}" x2="${r1d(px(0) + 3)}" y2="${r1d(py(y))}" stroke="currentColor" stroke-width="1"/><text x="${r1d(px(0) - 6)}" y="${r1d(py(y) + 4)}" text-anchor="end" font-size="11" fill="currentColor">${y}</text>`);
    }

    const curvePoints = samples.map(p => `${r1d(px(p.x))},${r1d(py(p.y))}`).join(' ');
    const interceptDots = [r1, 0, r3]
      .map(x => `<circle cx="${r1d(px(x))}" cy="${r1d(py(0))}" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5"/>`)
      .join('');

    const figureCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        <!-- Axes -->
        <line x1="${r1d(px(xLo))}" y1="${r1d(py(0))}" x2="${r1d(px(xHi))}" y2="${r1d(py(0))}" stroke="currentColor" stroke-width="1.5"/>
        <line x1="${r1d(px(0))}" y1="${margin.top}" x2="${r1d(px(0))}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="1.5"/>
        <text x="${r1d(px(xHi))}" y="${r1d(py(0) - 8)}" text-anchor="end" font-size="12" font-style="italic" fill="currentColor">x</text>
        <text x="${r1d(px(0) + 8)}" y="${margin.top + 10}" text-anchor="start" font-size="12" font-style="italic" fill="currentColor">y</text>
        <!-- Tick marks -->
        ${xTicks.join('')}
        ${yTicks.join('')}
        <!-- Curve -->
        <polyline points="${curvePoints}" fill="none" stroke="#3b82f6" stroke-width="2.5"/>
        <!-- x-intercepts -->
        ${interceptDots}
      </svg>
    `;

    // ── Options ──────────────────────────────────────────────────────────────
    const questionText = `The graph shown in the $xy$-plane has $x$-intercepts at $x=${r1}$, $x=0$, and $x=${r3}$. Which of the following could be the equation of the graph?`;

    const correctText = `$y=${leadingCoeff}x(x-${r3})(x+${a})^{2}$`;
    const optionsData = [
      { text: `$y=${leadingCoeff}x(x-${r3})(x+${a})$`, isCorrect: false, reason: `every factor is raised to the first power, so its graph would cross the $x$-axis at all three $x$-intercepts; the graph shown touches without crossing at $x=${r1}$, which requires the factor $(x+${a})$ to have an even exponent` },
      { text: correctText, isCorrect: true, reason: "" },
      { text: `$y=${leadingCoeff}x(x+${r3})(x-${a})^{2}$`, isCorrect: false, reason: `its $x$-intercepts are $x=0$, $x=-${r3}$, and $x=${a}$, which do not match the $x$-intercepts shown in the graph` },
      { text: `$y=${leadingCoeff}x(x-${r3})^{2}(x+${a})$`, isCorrect: false, reason: `it squares the wrong factor: its graph would touch the $x$-axis at $x=${r3}$ and cross at $x=${r1}$, the opposite of the behavior shown` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = correctText;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The graph has $x$-intercepts at $x=${r1}$, $x=0$, and $x=${r3}$, so the equation must contain the factors $(x+${a})$, $x$, and $(x-${r3})$. At $x=${r1}$ the graph touches the $x$-axis without crossing it, so the factor $(x+${a})$ must appear with an even exponent, while at $x=0$ and $x=${r3}$ the graph crosses the $x$-axis, so the factors $x$ and $(x-${r3})$ must appear with odd exponents. Only $y=${leadingCoeff}x(x-${r3})(x+${a})^{2}$ satisfies all of these conditions. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;

    return {
      questionText: questionText,
      figureCode: figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
