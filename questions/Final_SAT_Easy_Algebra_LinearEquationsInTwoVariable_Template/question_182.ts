import { getRandomInt, shuffle, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 182
 *
 * ORIGINAL ANALYSIS: [Reading a value from a linear graph]
 * - A budget line y = m*x + b (negative slope) relating pounds of tangerines (x)
 *   to pounds of lemons (y). The student reads y for a given x.
 * - Ranges: m in {-1,-2}, x in [2,4], answer y in [3,8]; b derived as y + |m|*x.
 *
 * FIXED:
 * - Rebuilt the figure as a plain SVG line graph (was Mafs with a nonstandard
 *   data-y-lines attribute and no plotted point). The drawn line satisfies
 *   y = m*x + b and the queried point (x, y) is marked, so the figure always
 *   matches the question's numbers.
 * - Distractors rebuilt to be provably distinct for EVERY draw (was DUP_OPTIONS:
 *   the old y+2 could equal b, and x could equal y). New distractors are
 *   {y, b, y+|m|, y-|m|}, which are pairwise distinct because |m|>=1 and x>=2.
 * - Removed the personal name "Melvin": now a generic "shopper" with "they".
 * - Removed the currency written as math ($<b>$) that also mixed with $x$/$y$
 *   (DOLLAR_RISK). Answer-first construction (pick y, derive b) keeps everything
 *   integer, so no float artifacts.
 */

export const generator_182 = {
  metadata: {
    id: "182",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first: choose the point (x, y) on a negative-slope line, then the
    // y-intercept b follows exactly, guaranteeing integers and a consistent figure.
    const m = -getRandomInt(1, 2);          // slope in {-1, -2}
    const absM = Math.abs(m);
    const x = getRandomInt(2, 4);           // queried x
    const y = getRandomInt(3, 8);           // answer (lbs of lemons), always >= |m|+1
    const b = y - m * x;                    // y-intercept = y + |m|*x  (>= 5)

    // ---- Distractors: proven pairwise-distinct for all draws ----
    //  y            correct
    //  b            reads the y-intercept instead of the point at x  (b - y = |m|*x >= 2)
    //  y + absM     miscounts one grid step of the slope             (differs from y by |m| >= 1)
    //  y - absM     miscounts one grid step the other way            (differs, and y - absM >= 1)
    // b vs y+absM: |m|*x vs |m| -> equal only if x==1, but x>=2, so distinct.
    const optionsData = [
      { key: 'correct', text: y.toString(), isCorrect: true },
      { key: 'intercept', text: b.toString(), isCorrect: false },
      { key: 'stepHigh', text: (y + absM).toString(), isCorrect: false },
      { key: 'stepLow', text: (y - absM).toString(), isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correct = shuffled.find(o => o.isCorrect)!;
    const letterOf = (key: string) => shuffled.find(o => o.key === key)!.letter;

    // ---- Figure: plain SVG line graph, house style ----
    const width = 460;
    const height = 260;
    const margin = { top: 20, right: 30, bottom: 44, left: 46 };
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const xMax = x + 2;                 // show a little past the queried x
    const yMax = b + 1;                 // intercept b sits comfortably inside
    const getX = (vx: number) => round(margin.left + (vx / xMax) * graphWidth, 1);
    const getY = (vy: number) => round(margin.top + graphHeight - (vy / yMax) * graphHeight, 1);

    // Line endpoints: from the y-intercept (0, b) to where it leaves the window,
    // clamped at the x-axis (y = 0) so it stays in the first quadrant.
    const xIntercept = b / absM;                 // x where y = 0
    const xEndData = Math.min(xMax, xIntercept);
    const yEndData = b + m * xEndData;           // 0 when clamped at the axis

    // Gridlines + axis tick labels
    let vGrid = '';
    for (let gx = 0; gx <= xMax; gx++) {
      vGrid += `<line x1="${getX(gx)}" y1="${getY(0)}" x2="${getX(gx)}" y2="${getY(yMax)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />`;
      vGrid += `<text x="${getX(gx)}" y="${getY(0) + 16}" text-anchor="middle" font-size="11" fill="currentColor">${gx}</text>`;
    }
    let hGrid = '';
    for (let gy = 0; gy <= yMax; gy++) {
      hGrid += `<line x1="${getX(0)}" y1="${getY(gy)}" x2="${getX(xMax)}" y2="${getY(gy)}" stroke="currentColor" stroke-opacity="0.12" stroke-width="1" />`;
      hGrid += `<text x="${getX(0) - 8}" y="${getY(gy) + 4}" text-anchor="end" font-size="11" fill="currentColor">${gy}</text>`;
    }

    const figureCode = `<div style="width:100%;max-width:${width}px;margin:0 auto;">
  <svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;font-family:sans-serif;user-select:none;" role="img" aria-label="Line graph of lemons versus tangerines">
    ${hGrid}
    ${vGrid}
    <line x1="${getX(0)}" y1="${getY(0)}" x2="${getX(0)}" y2="${getY(yMax)}" stroke="currentColor" stroke-width="2" />
    <line x1="${getX(0)}" y1="${getY(0)}" x2="${getX(xMax)}" y2="${getY(0)}" stroke="currentColor" stroke-width="2" />
    <line x1="${getX(0)}" y1="${getY(b)}" x2="${getX(xEndData)}" y2="${getY(yEndData)}" stroke="#3b82f6" stroke-width="3" />
    <line x1="${getX(x)}" y1="${getY(0)}" x2="${getX(x)}" y2="${getY(y)}" stroke="#3b82f6" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="4 3" />
    <line x1="${getX(0)}" y1="${getY(y)}" x2="${getX(x)}" y2="${getY(y)}" stroke="#3b82f6" stroke-opacity="0.5" stroke-width="1.5" stroke-dasharray="4 3" />
    <circle cx="${getX(x)}" cy="${getY(y)}" r="5" fill="#3b82f6" stroke="white" stroke-width="2" />
    <text x="${getX(xMax) / 1}" y="${height - 6}" text-anchor="end" font-size="12" font-weight="bold" fill="currentColor">Tangerines (x)</text>
    <text transform="rotate(-90, 12, ${height / 2})" x="12" y="${height / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Lemons (y)</text>
  </svg>
</div>`;

    return {
      questionText: `The graph shows how many pounds of lemons ($y$) a shopper can buy for each number of pounds of tangerines ($x$) on a fixed budget. According to the graph, if the shopper buys ${x} pounds of tangerines, how many pounds of lemons can they buy?`,
      figureCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correct.text,
      explanation: `Choice ${correct.letter} is correct. Find $x = ${x}$ on the horizontal axis, go up to the line, then read straight across to the vertical axis, which gives $y = ${y}$. (Using the equation of the line, $y = ${m}(${x}) + ${b} = ${y}$.) Choice ${letterOf('intercept')} is incorrect; ${b} is the value where the line meets the vertical axis (at $x = 0$), not at $x = ${x}$. Choice ${letterOf('stepHigh')} is incorrect and Choice ${letterOf('stepLow')} is incorrect; each is off by one step of the line's slope from the correct reading.`
    };
  }
};
