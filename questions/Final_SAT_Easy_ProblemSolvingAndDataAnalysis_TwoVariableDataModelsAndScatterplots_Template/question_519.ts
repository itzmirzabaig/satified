import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 519
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: ~0.4375, points (0, b) and (run, y2)]
 * - Difficulty factors: [Calculating slope from two points on a line]
 * - Distractor patterns: [Negated slope, reciprocal, negated reciprocal]
 * - Constraints: [Positive slope less than 1]
 * - Question type: [Figure -> Multiple Choice numeric]
 * - Figure generation: [Line of best fit with two marked points]
 *
 * FIXED:
 * - Duplicate options: original listed the negated slope twice, so two choices
 *   were always identical. The four choices are now slope, -slope, 1/slope and
 *   -1/slope, which are pairwise distinct for every allowed draw.
 * - Ranges (rise 1..3, run 4..6) keep slope in (0,0.75] so the reciprocal is
 *   always > 1 and 2-decimal rounding never collides.
 * - Integer y-intercept keeps both reference points clean (no float artifacts).
 * - Rebuilt the bare Mafs plot as a house-style SVG line with the two points
 *   the explanation cites actually marked on the line.
 */

export const generator_519 = {

  metadata: {
    id: "519",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    // Positive slope < 1: rise in 1..3, run in 4..6 (so rise < run always).
    const rise = getRandomInt(1, 3);
    const run = getRandomInt(4, 6);
    const slopeExact = rise / run;
    const slope = slopeExact.toFixed(2);          // e.g. "0.33"

    // Integer y-intercept keeps both marked points clean.
    const yInt = getRandomInt(0, 3);
    const x2 = run;
    const y2 = rise + yInt;                        // = slopeExact * run + yInt, exact integer

    // Distinct numeric distractors: negated slope, reciprocal, negated reciprocal.
    const negSlope = (-slopeExact).toFixed(2);
    const recip = (1 / slopeExact).toFixed(2);
    const negRecip = (-1 / slopeExact).toFixed(2);

    // ---- Figure: SVG line of best fit through (0, yInt) and (x2, y2) ----------
    const width = 450;
    const height = 250;
    const margin = { top: 20, right: 30, bottom: 40, left: 45 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const xMax = 8;
    const yMax = 8;
    const getX = (x: number) => margin.left + (x / xMax) * chartWidth;
    const getY = (y: number) => margin.top + chartHeight - (y / yMax) * chartHeight;

    // Grid + labels
    const gridLines: string[] = [];
    for (let v = 0; v <= yMax; v += 2) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="currentColor">${v}</text>`);
    }
    const xLabels: string[] = [];
    for (let v = 0; v <= xMax; v += 2) {
      const x = getX(v);
      xLabels.push(`<text x="${x}" y="${height - margin.bottom + 18}" text-anchor="middle" font-size="11" fill="currentColor">${v}</text>`);
    }

    // Best-fit line across the visible x-range.
    const lineY0 = slopeExact * 0 + yInt;
    const lineYEnd = slopeExact * xMax + yInt;
    const lineX1 = getX(0), lineY1 = getY(lineY0);
    const lineX2 = getX(xMax), lineY2px = getY(lineYEnd);

    // The two reference points the explanation cites.
    const marked = [
      { x: 0, y: yInt },
      { x: x2, y: y2 }
    ];
    const circles = marked
      .map(p => `<circle cx="${getX(p.x).toFixed(1)}" cy="${getY(p.y).toFixed(1)}" r="4.5" fill="#3b82f6" stroke="white" stroke-width="1.5" />`)
      .join('');
    const pointLabels = marked
      // Labels sit below and to the right of each point so the rising line
      // does not run through them (they used to overlap the line).
      .map(p => `<text x="${(getX(p.x) + 8).toFixed(1)}" y="${(getY(p.y) + 17).toFixed(1)}" font-size="11" fill="currentColor">(${p.x}, ${p.y})</text>`)
      .join('');

    const figureCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        ${gridLines.join('')}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${lineX1.toFixed(1)}" y1="${lineY1.toFixed(1)}" x2="${lineX2.toFixed(1)}" y2="${lineY2px.toFixed(1)}" stroke="#ef4444" stroke-width="2.5"/>
        ${circles}
        ${pointLabels}
        ${xLabels.join('')}
        <text x="${margin.left + chartWidth / 2}" y="${height - 4}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">x</text>
        <text transform="rotate(-90, 12, ${height / 2})" x="12" y="${height / 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">y</text>
      </svg>
    `;

    // ---- Options -------------------------------------------------------------
    // Before: the explanation lumped the wrong choices into one sentence with
    // no per choice reasons, and always wrote \approx even when the slope was
    // exact (3/4 = 0.75). Each wrong
    // choice names its slip, and = is used whenever the decimal is exact.
    const isExact = Math.abs(slopeExact * 100 - Math.round(slopeExact * 100)) < 1e-9;
    const rel = isExact ? '=' : '\\approx';
    const optionsData = [
      { text: slope, isCorrect: true, reason: '' },
      { text: negSlope, isCorrect: false, reason: `${negSlope} has the correct size but the wrong sign; the line rises from left to right, so its slope is positive` },
      { text: recip, isCorrect: false, reason: `${recip} is the change in $x$ divided by the change in $y$, $${run} \\div ${rise}$, which is the reciprocal of the slope` },
      { text: negRecip, isCorrect: false, reason: `${negRecip} is the negative reciprocal of the slope, which is the slope of a line perpendicular to this one` }
    ];

    // Shuffled, not sorted: in increasing order the answer would always be C.
    const sortedOptions = shuffle(optionsData)
      .map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));

    const correctOption = sortedOptions.find(o => o.isCorrect)!;
    const incorrectOptions = sortedOptions.filter(o => !o.isCorrect);

    return {
      questionText: "The graph shows a line of best fit with two points marked. Which of the following is closest to the slope of the line?",
      figureCode,
      options: sortedOptions.map(o => o.text),
      correctAnswer: slope,
      explanation: `Choice ${correctOption.letter} is correct. The slope of a line is the change in $y$ divided by the change in $x$. The marked points are $(0, ${yInt})$ and $(${x2}, ${y2})$. From the first point to the second, $x$ increases by $${run}$ and $y$ increases from $${yInt}$ to $${y2}$, an increase of $${rise}$. So the slope is $\\frac{${rise}}{${run}} ${rel} ${slope}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };

  }

};
