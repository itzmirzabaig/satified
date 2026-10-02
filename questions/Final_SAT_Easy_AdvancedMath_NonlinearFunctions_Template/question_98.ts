import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 98
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h: 1-3, k: -3 to -1, shift: 4-10]
 * - Difficulty factors: [Vertical translation of a parabola]
 * - Distractor patterns: [Down shift, Left shift, Right shift]
 * - Constraints: [New vertex must be clearly distinguishable]
 * - Question type: [Figure→Multiple Choice Figure]
 * - Figure generation: [Parabola with vertex (h, k)]
 *
 * FIXED (options showed raw "Math.pow..." text — the Q85 failure class):
 * - The four option graphs were Mafs JSX strings, but the option renderer
 *   injects text as HTML: <Mafs> never mounts from a string, and the "=>"
 *   inside y={(x) => Math.pow(...)} truncates the tag, leaking the function
 *   body as visible text. All four options are now self-contained SVG
 *   graphs (the Q85 fix pattern): all sharing ONE window sized to keep
 *   every candidate vertex visible, so the only difference between options
 *   is the vertex position. The question figure is rebuilt in the same
 *   house style so stem and options look structurally identical.
 * - Generation logic untouched: same h/k/shift ranges, same four shifts.
 */

export const generator_98 = {
  metadata: {
    id: "98",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const h = getRandomInt(1, 3);
    const k = -getRandomInt(1, 3);
    const shift = getRandomInt(4, 10); // Random shift between 4 and 10
    const newK = k + shift;

    // One shared window covering every candidate vertex (original + all
    // four option vertices), so the graphs differ ONLY in vertex position.
    const hLo = Math.min(h, h - shift, h + shift) - 2;
    const hHi = Math.max(h, h - shift, h + shift) + 2;
    const kLo = Math.min(k, k + shift, k - shift) - 4;
    const kHi = Math.max(k, k + shift, k - shift) + 4;
    const xHalf = Math.max(5, Math.ceil((hHi - hLo) / 2) + 1);
    const xMid = (hLo + hHi) / 2;
    const XMIN = xMid - xHalf, XMAX = xMid + xHalf;
    const YMIN = kLo - 2, YMAX = kHi + 6;

    // ── Graph builder: one self-contained SVG per parabola.
    const buildGraph = (vh: number, vk: number): string => {
      const W = 280, H = 260, PL = 34, PR = 12, PT = 12, PB = 26;
      const r2 = (v: number) => Math.round(v * 100) / 100;
      const mx = (x: number) => PL + ((x - XMIN) / (XMAX - XMIN)) * (W - PL - PR);
      const my = (y: number) => H - PB - ((y - YMIN) / (YMAX - YMIN)) * (H - PT - PB);

      // Liang-Barsky clip of segment (x1,y1)-(x2,y2) to the window.
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

      // Parabola y = (x - vh)^2 + vk, sampled and clipped.
      const f = (x: number) => (x - vh) * (x - vh) + vk;
      let d = "";
      let last: [number, number] | null = null;
      let pxPrev = XMIN;
      for (let i = 0; i <= 90; i++) {
        const x = XMIN + ((XMAX - XMIN) * i) / 90;
        if (i > 0) {
          const seg = clip(pxPrev, f(pxPrev), x, f(x));
          if (seg) {
            const [ax, ay, bx, by] = seg;
            if (!last || last[0] !== ax || last[1] !== ay) d += `M ${r2(mx(ax))} ${r2(my(ay))} `;
            d += `L ${r2(mx(bx))} ${r2(my(by))} `;
            last = [bx, by];
          } else {
            last = null;
          }
        }
        pxPrev = x;
      }

      // Grid + ticks: x every 1, y every 2.
      let grid = "";
      for (let gx = Math.ceil(XMIN); gx <= XMAX; gx++) {
        grid += `<line x1="${r2(mx(gx))}" y1="${r2(my(YMIN))}" x2="${r2(mx(gx))}" y2="${r2(my(YMAX))}" stroke="currentColor" stroke-opacity="0.12"/>`;
      }
      for (let gy = Math.ceil(YMIN / 2) * 2; gy <= YMAX; gy += 2) {
        grid += `<line x1="${r2(mx(XMIN))}" y1="${r2(my(gy))}" x2="${r2(mx(XMAX))}" y2="${r2(my(gy))}" stroke="currentColor" stroke-opacity="0.12"/>`;
      }

      let ticks = "";
      for (let t = Math.ceil(XMIN); t <= XMAX; t++) {
        if (t === 0) continue;
        ticks += `<line x1="${r2(mx(t))}" y1="${r2(my(0))}" x2="${r2(mx(t))}" y2="${r2(my(0) + 4)}" stroke="currentColor" stroke-width="1.2"/>` +
                 `<text x="${r2(mx(t))}" y="${r2(my(0) + 15)}" text-anchor="middle" font-size="11" fill="currentColor">${t}</text>`;
      }
      for (let v = Math.ceil(YMIN / 2) * 2; v <= YMAX; v += 2) {
        if (v === 0) continue;
        ticks += `<line x1="${r2(mx(0) - 4)}" y1="${r2(my(v))}" x2="${r2(mx(0))}" y2="${r2(my(v))}" stroke="currentColor" stroke-width="1.2"/>` +
                 `<text x="${r2(mx(0) - 8)}" y="${r2(my(v) + 3.5)}" text-anchor="end" font-size="11" fill="currentColor">${v}</text>`;
      }
      if (YMIN < 0 && YMAX > 0) {
        ticks += `<text x="${r2(mx(0) - 7)}" y="${r2(my(0) + 13)}" text-anchor="end" font-size="11" fill="currentColor">0</text>`;
      }

      const axes =
        `<line x1="${r2(mx(XMIN))}" y1="${r2(my(0))}" x2="${r2(mx(XMAX) - 6)}" y2="${r2(my(0))}" stroke="currentColor" stroke-width="1.5"/>` +
        `<line x1="${r2(mx(0))}" y1="${r2(my(YMIN))}" x2="${r2(mx(0))}" y2="${r2(my(YMAX) + 6)}" stroke="currentColor" stroke-width="1.5"/>` +
        `<path d="M ${r2(mx(XMAX))} ${r2(my(0))} L ${r2(mx(XMAX) - 7)} ${r2(my(0) - 4)} L ${r2(mx(XMAX) - 7)} ${r2(my(0) + 4)} Z" fill="currentColor"/>` +
        `<path d="M ${r2(mx(0))} ${r2(my(YMAX))} L ${r2(mx(0) - 4)} ${r2(my(YMAX) + 7)} L ${r2(mx(0) + 4)} ${r2(my(YMAX) + 7)} Z" fill="currentColor"/>` +
        `<text x="${r2(mx(XMAX) + 2)}" y="${r2(my(0) + 4)}" font-size="12" font-style="italic" fill="currentColor">x</text>` +
        `<text x="${r2(mx(0) + 8)}" y="${r2(my(YMAX) + 11)}" font-size="12" font-style="italic" fill="currentColor">y</text>`;

      const curve = `<path d="${d}" fill="none" style="stroke:var(--mafs-blue,#3b82f6)" stroke-width="2.2" stroke-linecap="round"/>`;
      const vertexDot = `<circle cx="${r2(mx(vh))}" cy="${r2(my(vk))}" r="3.5" style="fill:var(--mafs-blue,#3b82f6)"/>`;

      return `<div style="width:100%;max-width:280px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
        grid + axes + ticks + curve + vertexDot + `</svg></div>`;
    };

    const originalGraph = buildGraph(h, k);

    const optionsData = [
      { text: buildGraph(h, newK), isCorrect: true },
      { text: buildGraph(h, k - shift), isCorrect: false },
      { text: buildGraph(h - shift, k), isCorrect: false },
      { text: buildGraph(h + shift, k), isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The graph of $y=f(x)$ will be translated ${shift} units up. Which of the following will be the resulting graph?`,
      figureCode: originalGraph,
      options: shuffled.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Translating a graph up by ${shift} units increases the y-coordinate of every point by ${shift}. The original vertex is $(${h}, ${k})$. Adding ${shift} to the y-coordinate results in a new vertex at $(${h}, ${k + shift})$. Only the graph in Choice ${correctOption.letter} reflects this vertical shift.`
    };
  }
};