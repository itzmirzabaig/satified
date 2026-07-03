import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 808
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [integer slopes and intercepts; integer solution point]
 * - Difficulty factors: [Reading the solution of a linear system from its graph]
 * - Distractor patterns: [swapped coordinates, sign flips, off-by-one point]
 * - Constraints: [Both lines pass through an integer intersection; unique solution]
 * - Question type: [Multiple Choice with Figure]
 * - Figure generation: [Plain SVG: two lines meeting at the marked solution point]
 *
 * REBUILT (IMPORT_FAIL): the original imported a non-existent '../../types'
 * module and its figure IIFEs were corrupted (syntax error, out-of-scope refs,
 * lines that never computed y from x). It also posed an unsolvable "which of
 * these four graphs" prompt with a single rendered figure and hardcoded answer.
 * This rebuild keeps the intent (systems of two linear equations, graph,
 * intercept/point reasoning) as a well-posed "read the solution from the graph"
 * question. Answer-first construction guarantees clean integers and a provably
 * correct unique solution for every draw; the SVG is a house-style template
 * literal whose drawn lines match the displayed equations.
 */

export const generator_808 = {
  metadata: {
    id: "808",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Answer-first construction.
    // Pick the integer solution point (the unique intersection of the two lines).
    const px = getRandomInt(-4, 4);
    const py = getRandomInt(-4, 4);

    // Pick two DISTINCT integer slopes so the lines are non-parallel and meet
    // at exactly one point. Each line is forced through (px, py), so its
    // y-intercept is an integer: b = py - m*px.
    const slopes = [-2, -1, 1, 2];
    const m1 = getRandomElement(slopes);
    let m2 = getRandomElement(slopes);
    while (m2 === m1) m2 = getRandomElement(slopes);

    const b1 = py - m1 * px; // integer
    const b2 = py - m2 * px; // integer

    // Solving m1*x + b1 = m2*x + b2 gives x*(m1 - m2) = b2 - b1 = px*(m1 - m2),
    // hence x = px and y = m1*px + b1 = py. The solution is provably (px, py).

    // STEP 2: Sign-safe formatter for "y = m x + b" (no "+ -", no bare 1).
    const fmtLine = (m: number, b: number): string => {
      let mPart: string;
      if (m === 1) mPart = 'x';
      else if (m === -1) mPart = '-x';
      else mPart = `${m}x`;
      let bPart = '';
      if (b > 0) bPart = ` + ${b}`;
      else if (b < 0) bPart = ` - ${Math.abs(b)}`;
      return `y = ${mPart}${bPart}`;
    };
    const eq1 = fmtLine(m1, b1);
    const eq2 = fmtLine(m2, b2);

    // STEP 3: Build distractors — plausible but wrong ordered pairs, all
    // distinct from the correct point and from each other (bounded retries).
    const correctPair = `(${px}, ${py})`;
    const seen = new Set<string>([correctPair]);
    const distractors: string[] = [];
    const candidateFns: Array<() => [number, number]> = [
      () => [py, px],           // swapped coordinates
      () => [px, -py],          // reflect y
      () => [-px, py],          // reflect x
      () => [px + 1, py - 1],   // off-by-one along a diagonal
      () => [px - 1, py + 1],
      () => [py, -px],          // swapped + sign
      () => [px + getRandomInt(1, 3), py],
      () => [px, py + getRandomInt(1, 3)],
    ];
    let guard = 0;
    while (distractors.length < 3 && guard++ < 50) {
      const [dx, dy] = getRandomElement(candidateFns)();
      const key = `(${dx}, ${dy})`;
      if (!seen.has(key)) {
        seen.add(key);
        distractors.push(key);
      }
    }
    // Deterministic fallback (never triggered in practice, but keeps 4 options
    // guaranteed distinct even in a pathological draw).
    let pad = 4;
    while (distractors.length < 3) {
      const key = `(${px + pad}, ${py + pad})`;
      if (!seen.has(key)) { seen.add(key); distractors.push(key); }
      pad++;
    }

    // STEP 4: Figure — plain SVG, both lines drawn from the SAME m/b, with the
    // solution point marked. viewBox holds the origin and the solution point.
    const bound = 6; // graph spans -6..6 in both axes
    const W = 450, H = 300, PAD = 30;
    const gx = (x: number) => PAD + ((x + bound) / (2 * bound)) * (W - 2 * PAD);
    const gy = (y: number) => H - PAD - ((y + bound) / (2 * bound)) * (H - 2 * PAD);

    // Clip a line y = m*x + b to the [-bound, bound] x-window (both endpoints
    // are inside the y-window too because slopes are at most 2 and |b| <= 12,
    // but we clamp visually by using the x-extent, which is sufficient here).
    const lineSeg = (m: number, b: number, color: string) => {
      const x1 = -bound, x2 = bound;
      const y1 = m * x1 + b, y2 = m * x2 + b;
      return `<line x1="${gx(x1).toFixed(1)}" y1="${gy(y1).toFixed(1)}" x2="${gx(x2).toFixed(1)}" y2="${gy(y2).toFixed(1)}" stroke="${color}" stroke-width="2.5"/>`;
    };

    let grid = '';
    for (let t = -bound; t <= bound; t++) {
      if (t === 0) continue;
      grid += `<line x1="${gx(t).toFixed(1)}" y1="${PAD}" x2="${gx(t).toFixed(1)}" y2="${H - PAD}" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>`;
      grid += `<line x1="${PAD}" y1="${gy(t).toFixed(1)}" x2="${W - PAD}" y2="${gy(t).toFixed(1)}" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>`;
    }
    // Axis tick labels at every 2 units to avoid clutter.
    let ticks = '';
    for (let t = -bound; t <= bound; t += 2) {
      if (t === 0) continue;
      ticks += `<text x="${gx(t).toFixed(1)}" y="${(gy(0) + 12).toFixed(1)}" text-anchor="middle" font-size="9" fill="currentColor">${t}</text>`;
      ticks += `<text x="${(gx(0) - 6).toFixed(1)}" y="${(gy(t) + 3).toFixed(1)}" text-anchor="end" font-size="9" fill="currentColor">${t}</text>`;
    }

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="transparent"/>${grid}<line x1="${PAD}" y1="${gy(0).toFixed(1)}" x2="${W - PAD}" y2="${gy(0).toFixed(1)}" stroke="currentColor" stroke-width="1.5"/><line x1="${gx(0).toFixed(1)}" y1="${PAD}" x2="${gx(0).toFixed(1)}" y2="${H - PAD}" stroke="currentColor" stroke-width="1.5"/>${ticks}${lineSeg(m1, b1, '#3b82f6')}${lineSeg(m2, b2, '#ef4444')}<circle cx="${gx(px).toFixed(1)}" cy="${gy(py).toFixed(1)}" r="4.5" fill="#111827" stroke="white" stroke-width="1.5"/></svg></div>`;

    // STEP 5: Question text.
    const questionText = `The graph of a system of two linear equations is shown in the xy-plane. The equations of the two lines are $${eq1}$ and $${eq2}$. What is the solution $(x, y)$ to this system of equations?`;

    // STEP 6: Assemble options, shuffle, assign letters AFTER shuffling.
    const optionsData = [
      { text: correctPair, isCorrect: true },
      { text: distractors[0], isCorrect: false },
      { text: distractors[1], isCorrect: false },
      { text: distractors[2], isCorrect: false },
    ];
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 7: Explanation — computed from the same live variables; letter from
    // the shuffled array.
    const explanation = `Choice ${correctLetter} is correct. The solution to a system of two linear equations is the point where the two lines intersect. Reading the graph, the lines cross at $(${px}, ${py})$. This point satisfies both equations: for $${eq1}$, substituting $x = ${px}$ gives $y = ${py}$; for $${eq2}$, substituting $x = ${px}$ also gives $y = ${py}$. The other choices are points that lie on at most one of the lines (or neither), so they do not solve both equations simultaneously.`;

    return {
      questionText,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation
    };
  }
};
