import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1337
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area range: 48-60, height values create fractions]
 * - Difficulty factors: [Similar triangles, area bounds, integer constraint on y]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [Similar triangles give ratio x/y, area = base*y/2]
 * - Question type: [Figure→Fill in the blank]
 *
 * MATH: Right triangle ABC with the right angle at C. A(0,0), C(b,0), B(b,y),
 * so AC = b (base) and BC = y (height). A vertical segment drawn at horizontal
 * distance s from A meets the hypotenuse AB; its height is x. Because that
 * segment is parallel to BC, the small triangle cut off at A is similar to
 * triangle ABC, giving x/y = s/b, i.e. x = y*(s/b). The area of ABC is
 * (1/2)*b*y. The area window is built to admit EXACTLY ONE integer y, so x is a
 * single well-defined value (a clean integer). Fill-in answer: one number.
 */

export const generator_1337 = {
  metadata: {
    id: "1337",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => {
      a = Math.abs(a); b = Math.abs(b);
      return b === 0 ? a : gcd(b, a % b);
    };

    // Build the set of valid constructions once, then pick one at random. Each
    // is guaranteed to yield a UNIQUE integer y inside the area window and an
    // integer x, so the fill-in answer is a single number for every draw.
    type C = { p: number; q: number; b: number; s: number; y: number; x: number; minArea: number; maxArea: number };
    const constructions: C[] = [];
    for (let q = 2; q <= 6; q++) {
      for (let p = 1; p < q; p++) {
        if (gcd(p, q) !== 1) continue;
        for (let m = 1; m <= 8; m++) {
          const b = q * m, s = p * m;
          if (b < 8 || b > 16) continue;
          for (let n = 1; n <= 8; n++) {
            const y = q * n, x = p * n;
            if (y < 6 || y > 14) continue;
            const area = (b * y) / 2;
            if (!Number.isInteger(area)) continue;
            const step = b / 2; // area difference between consecutive integer y
            const minArea = Math.ceil(area - step + 1);
            const maxArea = Math.floor(area + step - 1);
            if (minArea < 10 || maxArea > 120 || minArea >= maxArea) continue;
            // verify uniqueness: exactly one integer y has area in [min,max]
            const yLo = Math.ceil((2 * minArea) / b), yHi = Math.floor((2 * maxArea) / b);
            let count = 0, theY = -1;
            for (let yy = Math.max(1, yLo); yy <= yHi; yy++) {
              const a = (b * yy) / 2;
              if (a >= minArea && a <= maxArea) { count++; theY = yy; }
            }
            if (count === 1 && theY === y) constructions.push({ p, q, b, s, y, x, minArea, maxArea });
          }
        }
      }
    }

    const c = getRandomElement(constructions);
    const { p, q, b, s, y, x, minArea, maxArea } = c;

    // ── Figure: right triangle ABC drawn to scale, with the vertical segment x
    // at horizontal distance s, side BC labeled y, and the base along the axis.
    const W = 400, H = 350, P = 45;
    const xmin = -2, xmax = b + 2, ymin = -2, ymax = y + 2;
    const mx = (vx: number) => P + (vx - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (vy: number) => H - P - (vy - ymin) / (ymax - ymin) * (H - 2 * P);
    const line = (x1: number, y1: number, x2: number, y2: number, w = 2) =>
      `<line x1="${mx(x1).toFixed(1)}" y1="${my(y1).toFixed(1)}" x2="${mx(x2).toFixed(1)}" y2="${my(y2).toFixed(1)}" stroke="currentColor" stroke-width="${w}"/>`;
    const text = (vx: number, vy: number, t: string, dx = 0, dy = 0, extra = '') =>
      `<text x="${(mx(vx) + dx).toFixed(1)}" y="${(my(vy) + dy).toFixed(1)}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor"${extra}>${t}</text>`;
    const figureCode =
      `<div style="width:100%;max-width:400px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // axes (light)
      `<line x1="${P}" y1="${my(0).toFixed(1)}" x2="${(W - P)}" y2="${my(0).toFixed(1)}" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>` +
      `<line x1="${mx(0).toFixed(1)}" y1="${P}" x2="${mx(0).toFixed(1)}" y2="${(H - P)}" stroke="currentColor" stroke-width="1.2" opacity="0.4"/>` +
      // triangle ABC: A(0,0) -> C(b,0) -> B(b,y) -> A
      line(0, 0, b, 0, 2.4) +          // AC (base / hypotenuse foot)
      line(b, 0, b, y, 2.4) +          // CB (vertical side = y)
      line(0, 0, b, y, 2.4) +          // AB (hypotenuse)
      // vertical segment x at horizontal distance s
      line(s, 0, s, (y * s) / b, 2) +
      // right-angle mark at C
      `<path d="M ${mx(b - 0.6).toFixed(1)} ${my(0).toFixed(1)} L ${mx(b - 0.6).toFixed(1)} ${my(0.6).toFixed(1)} L ${mx(b).toFixed(1)} ${my(0.6).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="1"/>` +
      // vertices + labels
      `<circle cx="${mx(0).toFixed(1)}" cy="${my(0).toFixed(1)}" r="3" fill="#3b82f6"/>` +
      `<circle cx="${mx(b).toFixed(1)}" cy="${my(0).toFixed(1)}" r="3" fill="#3b82f6"/>` +
      `<circle cx="${mx(b).toFixed(1)}" cy="${my(y).toFixed(1)}" r="3" fill="#3b82f6"/>` +
      text(0, 0, 'A', -10, 12) +
      text(b, 0, 'C', 10, 12) +
      text(b, y, 'B', 10, -6) +
      text(s, (y * s) / b / 2, 'x', -10, 4) +
      text(b, y / 2, 'y', 12, 4) +
      `</svg></div>`;

    return {
      questionText: `In the figure above, triangle $ABC$ has a right angle at $C$, and the segment of length $x$ is drawn perpendicular to $\\\\overline{AC}$. The area of triangle $ABC$ is at least ${minArea} and no more than ${maxArea}. If $y$ is an integer, what is the value of $x$?`,
      figureCode,
      options: [],
      correctAnswer: `${x}`,
      explanation: `The area of triangle $ABC$ is $\\\\frac{1}{2}\\\\cdot AC\\\\cdot BC = \\\\frac{1}{2}\\\\cdot ${b}\\\\cdot y$. Requiring this area to be between ${minArea} and ${maxArea} gives $\\\\frac{2\\\\cdot ${minArea}}{${b}} \\\\le y \\\\le \\\\frac{2\\\\cdot ${maxArea}}{${b}}$, so the only integer value is $y = ${y}$. The segment $x$ is parallel to $\\\\overline{BC}$, so by similar triangles $\\\\frac{x}{y} = \\\\frac{${s}}{${b}}$, which gives $x = ${y}\\\\cdot\\\\frac{${s}}{${b}} = ${x}$.`
    };
  }
};
