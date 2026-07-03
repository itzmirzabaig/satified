import { getRandomInt, getRandomNonZeroInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1247
 *
 * ORIGINAL ANALYSIS:
 * - Question type: Figure (two intersecting lines) -> Multiple Choice Text
 * - Skill: Systems of two linear equations in two variables (Hard)
 * - Intent: Solve for 3x + 3y by CLEVER ELIMINATION without finding x and y
 *   individually. The two equations are built so subtracting the second from the
 *   first collapses directly to 3x + 3y.
 *
 * MATH (re-derived symbolically over the full random ranges):
 *   Eq1:  a1*x - b1*y = c1        a1 in [5,9],  b1 in [3,8],  c1 in [1,10]
 *   Eq2:  a2*x - b2*y = c2        a2 = a1 - 3,  b2 = b1 + 3,  c2 = c1 - target
 *   Eq1 - Eq2:  (a1-a2)x - (b1-b2)y = c1 - c2
 *             =        3x     -  (-3)y = c1 - c2
 *             =        3x     +   3y   = c1 - c2  = target
 *   The system's determinant is a1*(-b2) - (-b1)*a2 = -3(a1+b1) != 0 for all
 *   draws (a1+b1 >= 8), so the lines always intersect in a unique point and the
 *   question is well posed. target is drawn nonzero so the correct answer is
 *   never 0 (which would collide with the -target distractor). Verified: for all
 *   6000 parameter combinations 3x + 3y = c1 - c2 = target exactly.
 *
 * DISTRACTORS (pairwise-distinct, guarded by a bounded retry + fallback):
 *   - -target            : subtracts in the wrong order (Eq2 - Eq1 = c2 - c1).
 *   - target +/- slip    : correct method, arithmetic slip on the constants.
 */

export const generator_1247 = {
  metadata: {
    id: "1247",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Answer-first: target IS the value of 3x + 3y (= c1 - c2). Nonzero so the
    // correct answer never collides with the -target distractor.
    const target = getRandomNonZeroInt(-10, 10);

    const a1 = getRandomInt(5, 9);
    const a2 = a1 - 3;
    const b1 = getRandomInt(3, 8);
    const b2 = b1 + 3;

    const c1 = getRandomInt(1, 10);
    const c2 = c1 - target; // makes c1 - c2 = target = 3x + 3y

    const correctAnswer = target;

    // --- Distractors: distinct from the answer and from each other -----------
    // Start with the meaningful sign/order error, then fill with small
    // arithmetic slips. Set + bounded retry guarantees no collisions.
    const values = new Set<number>([correctAnswer]);
    const distractors: number[] = [];

    const pushIfNew = (v: number): boolean => {
      if (values.has(v)) return false;
      values.add(v);
      distractors.push(v);
      return true;
    };

    // 1) Wrong-order subtraction: c2 - c1 = -target.
    pushIfNew(-correctAnswer);

    // 2) Fill remaining slots with arithmetic slips on the constants.
    let tries = 0;
    while (distractors.length < 3 && tries++ < 50) {
      const slip = getRandomNonZeroInt(-4, 4);
      // Alternate the base between the correct value and the wrong-order value
      // so the slips read as plausible near-misses of either method.
      const base = distractors.length % 2 === 0 ? correctAnswer : -correctAnswer;
      pushIfNew(base + slip);
    }
    // Deterministic fallback (retry can only fail on an extreme unlucky streak).
    let fill = 2;
    while (distractors.length < 3) {
      pushIfNew(correctAnswer + fill);
      fill++;
    }

    const optionsData = [
      { text: correctAnswer.toString(), isCorrect: true },
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: distractors[2].toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    // --- Figure: the two lines intersecting, from live coefficients ----------
    // Solve for the intersection so the drawing window is centered on it and
    // the crossing is always visible. Lines are drawn straight from the
    // question's coefficients, so the figure matches the numbers every draw.
    const det = a1 * -b2 - -b1 * a2;                 // = -3(a1 + b1), always != 0
    const ix = (c1 * -b2 - -b1 * c2) / det;
    const iy = (a1 * c2 - a2 * c1) / det;

    const W = 450, H = 300, P = 40;
    // Integer window centered on the intersection with padding on all sides.
    const pad = 4;
    const xmin = Math.floor(ix) - pad;
    const xmax = Math.ceil(ix) + pad;
    const ymin = Math.floor(iy) - pad;
    const ymax = Math.ceil(iy) + pad;
    const mx = (x: number) => P + ((x - xmin) / (xmax - xmin)) * (W - 2 * P);
    const my = (y: number) => H - P - ((y - ymin) / (ymax - ymin)) * (H - 2 * P);

    // Grid + numbered ticks (skip 0; drawn as the heavy axes instead).
    let grid = '';
    for (let x = xmin + 1; x <= xmax - 1; x++) {
      grid += `<line x1="${mx(x).toFixed(1)}" y1="${P}" x2="${mx(x).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.35"/>`;
      if (x !== 0) grid += `<text x="${mx(x).toFixed(1)}" y="${(my(0) + 13).toFixed(1)}" text-anchor="middle" font-size="9" fill="currentColor" opacity="0.8">${x}</text>`;
    }
    for (let y = ymin + 1; y <= ymax - 1; y++) {
      grid += `<line x1="${P}" y1="${my(y).toFixed(1)}" x2="${W - P}" y2="${my(y).toFixed(1)}" stroke="currentColor" stroke-width="0.4" stroke-dasharray="2,3" opacity="0.35"/>`;
      if (y !== 0) grid += `<text x="${(mx(0) - 6).toFixed(1)}" y="${(my(y) + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="currentColor" opacity="0.8">${y}</text>`;
    }

    // Axes (only when 0 is inside the window; it always is here, but guard anyway).
    let axes = '';
    if (ymin <= 0 && ymax >= 0) axes += `<line x1="${P}" y1="${my(0).toFixed(1)}" x2="${W - P}" y2="${my(0).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>`;
    if (xmin <= 0 && xmax >= 0) axes += `<line x1="${mx(0).toFixed(1)}" y1="${P}" x2="${mx(0).toFixed(1)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`;

    // A line "A*x - B*y = C" as the segment across the window: y = (A*x - C)/B.
    const lineSeg = (A: number, B: number, C: number, color: string) => {
      const y0 = (A * xmin - C) / B;
      const y1 = (A * xmax - C) / B;
      return `<line x1="${mx(xmin).toFixed(1)}" y1="${my(y0).toFixed(1)}" x2="${mx(xmax).toFixed(1)}" y2="${my(y1).toFixed(1)}" stroke="${color}" stroke-width="2.5"/>`;
    };
    const line1 = lineSeg(a1, b1, c1, '#3b82f6');
    const line2 = lineSeg(a2, b2, c2, '#ef4444');

    // Intersection marker.
    const dot = `<circle cx="${mx(ix).toFixed(1)}" cy="${my(iy).toFixed(1)}" r="4" fill="currentColor"/>`;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="transparent"/>${grid}${axes}${line1}${line2}${dot}</svg></div>`;

    // --- Explanation: reasons keyed to each shuffled option ------------------
    const reasonFor = (opt: { text: string; isCorrect: boolean }): string => {
      if (opt.isCorrect) return '';
      const v = Number(opt.text);
      if (v === -correctAnswer) {
        return `it comes from subtracting the equations in the wrong order, giving $${c2} - ${c1} = ${-correctAnswer}$`;
      }
      return `it results from an arithmetic error when combining the constants`;
    };

    const distractorNotes = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} ($${o.text}$) is incorrect because ${reasonFor(o)}.`)
      .join(' ');

    return {
      questionText: `The graph shows the two lines in the system of equations $${a1}x - ${b1}y = ${c1}$ and $${a2}x - ${b2}y = ${c2}$. If $(x, y)$ is the solution to this system, what is the value of $3x + 3y$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer.toString(),
      explanation: `Choice ${correctLetter} is correct. Instead of solving for x and y separately, subtract the second equation from the first: $(${a1}x - ${b1}y) - (${a2}x - ${b2}y) = ${c1} - (${c2})$. The left side simplifies to $3x + 3y$ and the right side to $${correctAnswer}$, so $3x + 3y = ${correctAnswer}$. ${distractorNotes}`
    };
  }
};
