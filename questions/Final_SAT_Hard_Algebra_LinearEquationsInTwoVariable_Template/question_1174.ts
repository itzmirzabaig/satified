import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1174
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope between -1 and 0, y-intercept at 1]
 * - Difficulty factors: [Analyzing ax + by = b with 0 < a < b]
 * - Distractor patterns: [Graph A, B, C, D as visual options]
 * - Constraints: [Slope = -a/b where 0 < a < b, so -1 < slope < 0]
 * - Question type: [Text → Multiple Choice Figure]
 * - Figure generation: [Four graph options, one correct]
 *
 * FIXED (options displayed only "A"/"B"/"C"/"D"):
 * - The graphs lived in each option's figureCode, but the option renderer
 *   injects only `text` as HTML and ignores figureCode (same pipeline fact
 *   as Questions 85 and 411) — so each option rendered as its bare letter.
 *   The graphs were also Mafs JSX strings, which cannot mount from injected
 *   HTML, and the "=>" in y={(x) => ...} would truncate the tag regardless.
 * - Each option's text is now a self-contained SVG graph (the Q85 pattern):
 *   labeled, ticked, gridded axes; the line clipped to the window; a dot on
 *   the shared y-intercept (0, 1). correctAnswer = the correct option's text.
 * - The stem's "$0 < a < b$" is safe as-is: "<" followed by a space is
 *   literal text to the HTML parser (unlike Q1100's "<x").
 * - Generation logic untouched: same a/b ranges, slopes, distractors.
 */

export const generator_1174 = {
  metadata: {
    id: "1174",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // 0 < a < b, so slope = -a/b is between -1 and 0
    const a = getRandomInt(1, 4);
    const b = getRandomInt(a + 1, a + 4);

    const slope = -a / b;
    const yIntercept = 1; // Always 1 from equation

    // Generate distractor slopes
    const distractorSlope1 = -b / a; // Steep negative, < -1
    const distractorSlope2 = a / b; // Positive shallow
    const distractorSlope3 = -1; // Exactly -1

    // STEP 2: one self-contained SVG graph per option (Q85 pattern). Every
    // option shares the same axes and window, so only the slope differs.
    const buildGraph = (m: number, bInt: number): string => {
      const XMIN = -2, XMAX = 3, YMIN = -2, YMAX = 4;
      const W = 260, H = 250, PL = 34, PR = 12, PT = 12, PB = 28;
      const r2 = (v: number) => Math.round(v * 100) / 100;
      const mx = (x: number) => PL + ((x - XMIN) / (XMAX - XMIN)) * (W - PL - PR);
      const my = (y: number) => H - PB - ((y - YMIN) / (YMAX - YMIN)) * (H - PT - PB);

      // Liang-Barsky clip of a segment to the window.
      const clip = (x1: number, y1: number, x2: number, y2: number): [number, number, number, number] | null => {
        let t0 = 0, t1 = 1;
        const dx = x2 - x1, dy = y2 - y1;
        const p = [-dx, dx, -dy, dy];
        const q = [x1 - XMIN, XMAX - x1, y1 - YMIN, YMAX - y1];
        for (let i = 0; i < 4; i++) {
          if (p[i] === 0) {
            if (q[i] < 0) return null;
          } else {
            const rr = q[i] / p[i];
            if (p[i] < 0) {
              if (rr > t1) return null;
              if (rr > t0) t0 = rr;
            } else {
              if (rr < t0) return null;
              if (rr < t1) t1 = rr;
            }
          }
        }
        return [x1 + t0 * dx, y1 + t0 * dy, x1 + t1 * dx, y1 + t1 * dy];
      };

      // A line's graph: clip the left-edge-to-right-edge segment (never null —
      // every line here passes through (0, 1), inside the window).
      const seg = clip(XMIN, m * XMIN + bInt, XMAX, m * XMAX + bInt)!;

      let grid = "";
      for (let gx = XMIN; gx <= XMAX; gx++) {
        grid += `<line x1="${r2(mx(gx))}" y1="${r2(my(YMIN))}" x2="${r2(mx(gx))}" y2="${r2(my(YMAX))}" stroke="currentColor" stroke-opacity="0.12"/>`;
      }
      for (let gy = YMIN; gy <= YMAX; gy++) {
        grid += `<line x1="${r2(mx(XMIN))}" y1="${r2(my(gy))}" x2="${r2(mx(XMAX))}" y2="${r2(my(gy))}" stroke="currentColor" stroke-opacity="0.12"/>`;
      }

      let ticks = "";
      for (let k = XMIN; k <= XMAX; k++) {
        if (k === 0) continue;
        ticks += `<line x1="${r2(mx(k))}" y1="${r2(my(0))}" x2="${r2(mx(k))}" y2="${r2(my(0) + 4)}" stroke="currentColor" stroke-width="1.2"/>` +
                 `<text x="${r2(mx(k))}" y="${r2(my(0) + 15)}" text-anchor="middle" font-size="11" fill="currentColor">${k}</text>`;
      }
      for (let v = YMIN; v <= YMAX; v++) {
        if (v === 0) continue;
        ticks += `<line x1="${r2(mx(0) - 4)}" y1="${r2(my(v))}" x2="${r2(mx(0))}" y2="${r2(my(v))}" stroke="currentColor" stroke-width="1.2"/>` +
                 `<text x="${r2(mx(0) - 8)}" y="${r2(my(v) + 3.5)}" text-anchor="end" font-size="11" fill="currentColor">${v}</text>`;
      }
      ticks += `<text x="${r2(mx(0) - 7)}" y="${r2(my(0) + 13)}" text-anchor="end" font-size="11" fill="currentColor">0</text>`;

      const axes =
        `<line x1="${r2(mx(XMIN))}" y1="${r2(my(0))}" x2="${r2(mx(XMAX) - 6)}" y2="${r2(my(0))}" stroke="currentColor" stroke-width="1.5"/>` +
        `<line x1="${r2(mx(0))}" y1="${r2(my(YMIN))}" x2="${r2(mx(0))}" y2="${r2(my(YMAX) + 6)}" stroke="currentColor" stroke-width="1.5"/>` +
        `<path d="M ${r2(mx(XMAX))} ${r2(my(0))} L ${r2(mx(XMAX) - 7)} ${r2(my(0) - 4)} L ${r2(mx(XMAX) - 7)} ${r2(my(0) + 4)} Z" fill="currentColor"/>` +
        `<path d="M ${r2(mx(0))} ${r2(my(YMAX))} L ${r2(mx(0) - 4)} ${r2(my(YMAX) + 7)} L ${r2(mx(0) + 4)} ${r2(my(YMAX) + 7)} Z" fill="currentColor"/>` +
        `<text x="${r2(mx(XMAX) + 2)}" y="${r2(my(0) + 4)}" font-size="12" font-style="italic" fill="currentColor">x</text>` +
        `<text x="${r2(mx(0) + 8)}" y="${r2(my(YMAX) + 11)}" font-size="12" font-style="italic" fill="currentColor">y</text>`;

      const line = `<line x1="${r2(mx(seg[0]))}" y1="${r2(my(seg[1]))}" x2="${r2(mx(seg[2]))}" y2="${r2(my(seg[3]))}" style="stroke:var(--mafs-blue,#3b82f6)" stroke-width="2.2" stroke-linecap="round"/>`;
      const dot = `<circle cx="${r2(mx(0))}" cy="${r2(my(bInt))}" r="3.5" style="fill:var(--mafs-blue,#3b82f6)"/>`;

      return `<div style="width:100%;max-width:260px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
        grid + axes + ticks + line + dot + `</svg></div>`;
    };

    // FIXED (review): the stem said "In the equation above" with the equation
    // inline, and the explanation had no "Choice X is correct" opening and no
    // reason for any wrong graph. Each graph now carries the slip it shows.
    const graphs = [
      { text: buildGraph(distractorSlope1, yIntercept), isCorrect: false, reason: 'its line falls more steeply than a line with slope $-1$, which comes from inverting the ratio and using $-\\frac{b}{a}$ as the slope' },
      { text: buildGraph(distractorSlope2, yIntercept), isCorrect: false, reason: 'its line rises from left to right, which comes from dropping the negative sign and using $\\frac{a}{b}$ as the slope' },
      { text: buildGraph(slope, yIntercept), isCorrect: true, reason: '' },
      { text: buildGraph(distractorSlope3, yIntercept), isCorrect: false, reason: 'its line has a slope of exactly $-1$, which would require $a = b$, but $a$ is less than $b$' }
    ];

    const shuffled = shuffle(graphs).map((g, i) => ({ ...g, letter: String.fromCharCode(65 + i) }));
    const correctOption = shuffled.find(g => g.isCorrect)!;
    const incorrectOptions = shuffled.filter(g => !g.isCorrect);

    return {
      questionText: `In the equation $ax + by = b$, $a$ and $b$ are constants and $0 < a < b$. Which of the following could represent the graph of the equation in the $xy$-plane?`,
      figureCode: null,
      options: shuffled.map(g => ({ text: g.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Subtracting $ax$ from both sides of $ax + by = b$ gives $by = -ax + b$, and dividing both sides by $b$ gives $y = -\\frac{a}{b}x + 1$. So the graph is a line with $y$-intercept $(0, 1)$ and slope $-\\frac{a}{b}$. Since $0 < a < b$, the fraction $\\frac{a}{b}$ is between $0$ and $1$, so the slope is between $-1$ and $0$. The graph in choice ${correctOption.letter} passes through $(0, 1)$ and falls from left to right, but less steeply than a line with slope $-1$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};