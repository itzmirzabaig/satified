import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1243
 * Skill: Systems Of Two Linear Equations In Two Variables
 * Difficulty: Hard
 *
 * Description: Identify the system of equations (standard form) from a graph of
 * two intersecting lines.
 * Fixes (rebuild):
 * - correctAnswer now equals the correct option's exact text (was a bare letter).
 * - Distractors guaranteed pairwise-distinct via bounded whole-draw retry.
 * - Intersection-first construction: integer slopes/intercepts, clean integer
 *   standard form (A > 0), intersection at a visible integer lattice point.
 * - Figure rebuilt to house style (axes, grid, two lines, marked intersection)
 *   with values that always match the equations.
 * - Explanation computes from live variables, uses the shuffled letter, and
 *   explains every distractor.
 */
export const generator_1243 = {
  metadata: {
    id: "1243",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Convert y = m*x + b (integer m != 0, integer b) to standard form
    // A*x + B*y = C with A > 0 and integer coefficients.
    const toStandard = (m: number, b: number) => {
      // m*x - y = -b, then normalize so the x-coefficient is positive.
      let A = m, B = -1, C = -b;
      if (A < 0) { A = -A; B = -B; C = -C; }
      return { A, B, C };
    };

    // Render "A x + B y = C" (B is always +/-1 here, print as +/- y).
    const fmtEq = (A: number, B: number, C: number) => {
      const yTerm = B >= 0 ? `+ y` : `- y`;
      return `${A}x ${yTerm} = ${C}`;
    };

    const cases = (e1: string, e2: string) =>
      `$$\\begin{cases} ${e1} \\\\ ${e2} \\end{cases}$$`;

    const slopeChoices = [-3, -2, -1, 1, 2, 3];

    // Draw a fully valid, non-colliding configuration.
    let m1 = 0, m2 = 0, b1 = 0, b2 = 0, px = 0, py = 0;
    let correctText = '', dSlopeText = '', dConstText = '', dSwapText = '';
    let tries = 0;
    do {
      // Intersection at a visible integer lattice point (px != 0 => b1 != b2).
      px = getRandomElement([-3, -2, -1, 1, 2, 3]);
      py = getRandomInt(-3, 3);

      m1 = getRandomElement(slopeChoices);
      m2 = getRandomElement(slopeChoices);
      // Distinct slopes so the lines actually intersect at one point.
      while (m2 === m1) m2 = getRandomElement(slopeChoices);

      // Intercepts forcing both lines through (px, py). Integers.
      b1 = py - m1 * px;
      b2 = py - m2 * px;

      const L1 = toStandard(m1, b1);
      const L2 = toStandard(m2, b2);

      // Correct system.
      correctText = cases(fmtEq(L1.A, L1.B, L1.C), fmtEq(L2.A, L2.B, L2.C));

      // Distractor 1: sign of each slope reversed (misreads line direction).
      const S1 = toStandard(-m1, b1), S2 = toStandard(-m2, b2);
      dSlopeText = cases(fmtEq(S1.A, S1.B, S1.C), fmtEq(S2.A, S2.B, S2.C));

      // Distractor 2: correct slopes, shifted intercepts (misreads y-intercepts).
      const d1 = getRandomElement([2, 3, -2, -3]);
      const d2 = getRandomElement([2, 3, -2, -3]);
      const C1 = toStandard(m1, b1 + d1), C2 = toStandard(m2, b2 + d2);
      dConstText = cases(fmtEq(C1.A, C1.B, C1.C), fmtEq(C2.A, C2.B, C2.C));

      // Distractor 3: correct slopes but the two y-intercepts swapped.
      const W1 = toStandard(m1, b2), W2 = toStandard(m2, b1);
      dSwapText = cases(fmtEq(W1.A, W1.B, W1.C), fmtEq(W2.A, W2.B, W2.C));

      tries++;
    } while (
      new Set([correctText, dSlopeText, dConstText, dSwapText]).size !== 4 &&
      tries < 50
    );

    // ----------------------------------------------------------------------
    // Figure: axes + grid + the two lines, marking the intersection.
    // ----------------------------------------------------------------------
    const width = 300, height = 300, pad = 24;
    const R = 8; // window is [-R, R] on both axes, so origin & intersection show
    const mapX = (x: number) => pad + ((x + R) / (2 * R)) * (width - 2 * pad);
    const mapY = (y: number) => height - pad - ((y + R) / (2 * R)) * (height - 2 * pad);

    // Endpoints of y = m*x + b across the visible x-range.
    const seg = (m: number, b: number) => {
      const x1 = -R, x2 = R;
      return { x1: mapX(x1), y1: mapY(m * x1 + b), x2: mapX(x2), y2: mapY(m * x2 + b) };
    };
    const s1 = seg(m1, b1);
    const s2 = seg(m2, b2);

    const gridLines: string[] = [];
    for (let v = -R + 2; v <= R - 2; v += 2) {
      if (v === 0) continue;
      gridLines.push(`<line x1="${mapX(v)}" y1="${pad}" x2="${mapX(v)}" y2="${height - pad}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`);
      gridLines.push(`<line x1="${pad}" y1="${mapY(v)}" x2="${width - pad}" y2="${mapY(v)}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`);
    }

    const svgContent = `
    <div style="width: 100%; max-width: 320px; margin: 0 auto;">
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; font-family: sans-serif; user-select: none;">
        ${gridLines.join('')}
        <!-- Axes -->
        <line x1="${mapX(0)}" y1="${pad}" x2="${mapX(0)}" y2="${height - pad}" stroke="currentColor" stroke-width="1.5" />
        <line x1="${pad}" y1="${mapY(0)}" x2="${width - pad}" y2="${mapY(0)}" stroke="currentColor" stroke-width="1.5" />
        <text x="${width - pad + 2}" y="${mapY(0) + 4}" font-size="11" fill="currentColor">x</text>
        <text x="${mapX(0) + 5}" y="${pad - 6}" font-size="11" fill="currentColor">y</text>
        <!-- Lines -->
        <line x1="${s1.x1}" y1="${s1.y1}" x2="${s1.x2}" y2="${s1.y2}" stroke="#3b82f6" stroke-width="2.5" />
        <line x1="${s2.x1}" y1="${s2.y1}" x2="${s2.x2}" y2="${s2.y2}" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="6,4" />
        <!-- Intersection point -->
        <circle cx="${mapX(px)}" cy="${mapY(py)}" r="4" fill="currentColor" />
      </svg>
    </div>
    `;

    // ----------------------------------------------------------------------
    // Options + shuffle.
    // ----------------------------------------------------------------------
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: dSlopeText, isCorrect: false, reason: "reverses the direction (sign of the slope) of each line" },
      { text: dConstText, isCorrect: false, reason: "uses the correct slopes but misreads the y-intercepts of the lines" },
      { text: dSwapText, isCorrect: false, reason: "swaps the y-intercepts of the two lines" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Standard-form strings for the explanation (each starts with a digit, so no
    // bare-$-before-letter: avoids the DOLLAR_RISK heuristic).
    const L1 = toStandard(m1, b1);
    const L2 = toStandard(m2, b2);
    const eq1 = fmtEq(L1.A, L1.B, L1.C);
    const eq2 = fmtEq(L2.A, L2.B, L2.C);

    const describe = (m: number, b: number) =>
      `a slope of ${m} and a y-intercept of ${b}`;

    return {
      questionText: `Which system of linear equations is represented by the two lines shown in the graph?`,
      figureCode: svgContent,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation:
        `Choice ${correctLetter} is correct. ` +
        `The solid line has ${describe(m1, b1)}, which in standard form is $${eq1}$. ` +
        `The dashed line has ${describe(m2, b2)}, which in standard form is $${eq2}$. ` +
        `The system made of these two equations is Choice ${correctLetter}. ` +
        `Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. ` +
        `Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. ` +
        `Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
