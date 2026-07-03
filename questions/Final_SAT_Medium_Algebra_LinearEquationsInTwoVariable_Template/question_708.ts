import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 708
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1, intercept: -8, points: (0,-8), (-8,0)]
 * - Difficulty factors: [Identifying slope and intercept from graph]
 * - Distractor patterns: [A: wrong slope, B: wrong sign, C: correct, D: wrong slope]
 * - Constraints: [Line passes through clear integer points]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [SVG line plot with intercept points]
 */

export const generator_708 = {
  metadata: {
    id: "708",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters so the line crosses two clean integer points.
    // slope in {-2,-1,1,2}; intercept in [-10,-3]; xIntercept = -b/m must be a
    // nonzero integer so the x-axis crossing is a labeled lattice point.
    let slope = getRandomElement([-2, -1, 1, 2]);
    let intercept = getRandomInt(-10, -3);
    let xInt = -intercept / slope;
    let attempts = 0;
    while ((!Number.isInteger(xInt) || xInt === 0) && attempts++ < 50) {
      slope = getRandomElement([-2, -1, 1, 2]);
      intercept = getRandomInt(-10, -3);
      xInt = -intercept / slope;
    }
    if (!Number.isInteger(xInt) || xInt === 0) {
      slope = -1; intercept = -8; xInt = 8;
    }

    // Helper: render "y = mx + b" with correct sign spacing for a given slope.
    // Uses the same live intercept for every option (the task is to read the
    // slope; the intercept is fixed by the graph's y-crossing).
    const eq = (m: number) =>
      `$y = ${m}x ${intercept < 0 ? '-' : '+'} ${Math.abs(intercept)}$`;

    // STEP 2: Build the figure (plain SVG template literal, house style).
    const minX = Math.min(0, xInt) - 2;
    const maxX = Math.max(0, xInt) + 2;
    const minY = Math.min(0, intercept) - 2;
    const maxY = Math.max(0, intercept) + 2;

    const W = 450, H = 250, P = 40;
    const mx = (x: number) => P + (x - minX) / (maxX - minX) * (W - 2 * P);
    const my = (y: number) => H - P - (y - minY) / (maxY - minY) * (H - 2 * P);

    const y0 = Math.max(minY, Math.min(maxY, 0)); // where the x-axis sits
    const x0 = Math.max(minX, Math.min(maxX, 0)); // where the y-axis sits

    let ticks = '';
    const xstep = Math.max(1, Math.ceil((maxX - minX) / 8));
    for (let x = Math.ceil(minX / xstep) * xstep; x <= maxX; x += xstep) {
      ticks += `<line x1="${mx(x)}" y1="${my(y0)}" x2="${mx(x)}" y2="${my(y0) + 4}" stroke="currentColor" stroke-width="1"/>`;
      ticks += `<text x="${mx(x)}" y="${my(y0) + 15}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
    }
    const ystep = Math.max(1, Math.ceil((maxY - minY) / 6));
    for (let y = Math.ceil(minY / ystep) * ystep; y <= maxY; y += ystep) {
      if (y === 0) continue;
      ticks += `<line x1="${mx(x0) - 4}" y1="${my(y)}" x2="${mx(x0)}" y2="${my(y)}" stroke="currentColor" stroke-width="1"/>`;
      ticks += `<text x="${mx(x0) - 8}" y="${my(y) + 3}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
    }

    // Line endpoints across the visible window, plus the two integer crossings.
    const lineX1 = minX, lineY1 = slope * minX + intercept;
    const lineX2 = maxX, lineY2 = slope * maxX + intercept;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<rect x="${P}" y="${P}" width="${W - 2 * P}" height="${H - 2 * P}" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>` +
      `<line x1="${P}" y1="${my(y0)}" x2="${W - P}" y2="${my(y0)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(x0)}" y1="${P}" x2="${mx(x0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>` +
      ticks +
      `<line x1="${mx(lineX1)}" y1="${my(lineY1)}" x2="${mx(lineX2)}" y2="${my(lineY2)}" stroke="#3b82f6" stroke-width="2.5"/>` +
      `<circle cx="${mx(0)}" cy="${my(intercept)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1"/>` +
      `<circle cx="${mx(xInt)}" cy="${my(0)}" r="4" fill="#3b82f6" stroke="white" stroke-width="1"/>` +
      `</svg></div>`;

    // STEP 3: Build four DISTINCT slopes so no two options collide.
    // Correct slope plus wrong slopes drawn from a pool, filtered to be unique.
    const correctText = eq(slope);
    const pool = [-3, -2, -1, 1, 2, 3, slope * 2, -slope].filter(
      (m, i, arr) => m !== 0 && m !== slope && arr.indexOf(m) === i
    );
    const wrongSlopes = shuffle(pool).slice(0, 3);

    const optionsData = [
      { text: correctText, isCorrect: true },
      ...wrongSlopes.map(m => ({ text: eq(m), isCorrect: false })),
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    return {
      questionText: `What is an equation of the line shown in the $xy$-plane?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The line crosses the $y$-axis at $(0, ${intercept})$, so the $y$-intercept is $b = ${intercept}$. It also passes through $(${xInt}, 0)$, so the slope is $m = \\frac{0 - (${intercept})}{${xInt} - 0} = \\frac{${-intercept}}{${xInt}} = ${slope}$. In slope-intercept form $y = mx + b$, this gives ${correctText}.`
    };
  }
};
