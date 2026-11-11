import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 536
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y-intercept ~ [1.0, 4.0], slope ~ [1.0, 3.0]]
 * - Difficulty factors: [Identifying positive slope and y-intercept from graph]
 * - Distractor patterns: [Wrong slope sign (B), wrong intercept sign (C,D)]
 * - Constraints: [Positive slope, positive y-intercept]
 * - Question type: [Figure -> Multiple Choice Text]
 * - Figure generation: [Scatterplot with a positive-slope line of best fit]
 *
 * FIXED:
 * - correctAnswer now equals the correct option's text EXACTLY (both use \(...\)
 *   delimiters); previously the plain-text answer matched no option.
 * - Replaced legacy Mafs fragment with a compact plain-SVG scatterplot + best-fit
 *   line whose drawn slope/intercept match the equation for every draw.
 * - Explanation letter is taken from the shuffled array; numbers come from the
 *   same live variables (b, m).
 */

export const generator_536 = {

  metadata: {
    id: "536",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    // Positive y-intercept in [1.0, 4.0], positive slope in [1.0, 3.0], one decimal.
    // Using integer tenths keeps both values clean (no float artifacts) and always
    // strictly positive, so the four sign-combination options can never collide.
    // Whole numbers are skipped so no choice shows "1.0x" or "2.0".
    let bTenths = getRandomInt(10, 40); // 1.0 .. 4.0
    while (bTenths % 10 === 0) bTenths = getRandomInt(10, 40);
    let mTenths = getRandomInt(10, 30); // 1.0 .. 3.0
    while (mTenths % 10 === 0) mTenths = getRandomInt(10, 30);
    const b = bTenths / 10;
    const m = mTenths / 10;
    const bStr = b.toFixed(1);
    const mStr = m.toFixed(1);

    // ── Figure: scatterplot with the line of best fit ────────────────────────
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 45 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const xMax = 10;
    // Dynamic yMax so the whole line fits with headroom; rounded up to a multiple of 5.
    const lineTop = b + m * xMax;
    const yMax = Math.max(5, Math.ceil((lineTop * 1.15) / 5) * 5);

    const getX = (val: number) => margin.left + (val / xMax) * graphWidth;
    const getY = (val: number) => margin.top + graphHeight - (val / yMax) * graphHeight;

    // Scatter points hugging the line, with small deterministic vertical jitter
    // (alternating offsets) so the trend clearly matches y = b + m*x.
    const jitter = [0.4, -0.6, 0.7, -0.3, 0.5, -0.5];
    const scatter: { x: number; y: number }[] = [];
    for (let i = 0; i < 6; i++) {
      const x = 1 + i * 1.6; // 1.0 .. 9.0
      let y = b + m * x + jitter[i];
      if (y < 0) y = 0.2;
      if (y > yMax) y = yMax - 0.2;
      scatter.push({ x, y });
    }

    const circles = scatter
      .map(p => `<circle cx="${getX(p.x).toFixed(1)}" cy="${getY(p.y).toFixed(1)}" r="4" fill="#3b82f6" />`)
      .join('');

    // Best-fit line drawn across the full x-range.
    const lineX1 = getX(0).toFixed(1);
    const lineY1 = getY(b).toFixed(1);
    const lineX2 = getX(xMax).toFixed(1);
    const lineY2 = getY(b + m * xMax).toFixed(1);

    // Y gridlines / ticks at 5-unit steps.
    const yTicks: string[] = [];
    for (let v = 0; v <= yMax; v += 5) {
      const y = getY(v).toFixed(1);
      yTicks.push(
        `<line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />` +
        `<text x="${margin.left - 8}" y="${(parseFloat(y) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="currentColor">${v}</text>`
      );
    }

    // X ticks at 2-unit steps.
    const xTicks: string[] = [];
    for (let v = 0; v <= xMax; v += 2) {
      const x = getX(v).toFixed(1);
      xTicks.push(
        `<text x="${x}" y="${height - margin.bottom + 16}" text-anchor="middle" font-size="11" fill="currentColor">${v}</text>`
      );
    }

    const figureCode = `
      <div style="width: 100%; max-width: 450px; margin: 0 auto;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
          ${yTicks.join('')}
          ${xTicks.join('')}
          <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
          <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2" />
          <line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY2}" stroke="#1a7cff" stroke-width="2.5" />
          ${circles}
          <text x="${margin.left + graphWidth / 2}" y="${height - 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">x</text>
          <text transform="rotate(-90, 12, ${margin.top + graphHeight / 2})" x="12" y="${margin.top + graphHeight / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">y</text>
        </svg>
      </div>
    `;

    // ── Options ──────────────────────────────────────────────────────────────
    // b > 0 and m > 0 always, so these four sign combinations are all distinct.
    // Previously the three wrong choices shared one vague sentence ("use the
    // wrong sign"), and x and y were written outside math. Each choice now has
    // its own reason.
    const eq = (bNeg: boolean, mNeg: boolean) => `$y=${bNeg ? '-' : ''}${bStr}${mNeg ? '-' : '+'}${mStr}x$`;
    const optionsData = [
      { text: eq(false, false), isCorrect: true, reason: '' },
      { text: eq(false, true), isCorrect: false, reason: `${eq(false, true)} has a slope of $-${mStr}$, so its graph falls from left to right, but the line of best fit rises` },
      { text: eq(true, false), isCorrect: false, reason: `${eq(true, false)} has a y-intercept of $-${bStr}$, so its graph crosses the y-axis below the origin, but the line of best fit crosses above it` },
      { text: eq(true, true), isCorrect: false, reason: `${eq(true, true)} has a negative slope and a negative y-intercept, but the line of best fit rises from left to right and crosses the y-axis above the origin` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "Which of the following equations best represents the line of best fit shown in the scatterplot?",
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The graph of an equation of the form $y=a+bx$, where $a$ and $b$ are constants, crosses the y-axis at $a$ and has slope $b$. The line of best fit rises from left to right, so its slope is positive, and it crosses the y-axis above the origin, so its y-intercept is positive. Only ${eq(false, false)} has a positive y-intercept, $${bStr}$, and a positive slope, $${mStr}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };

  }

};
