import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1335
 *
 * REBUILT (was FIGURE_MISMATCH + BAD_EXPLANATION):
 * - Old figure drew no triangle and printed the literal string "$angleRTU^circ"
 *   (a non-template JS string, so the value never interpolated), and used a
 *   random "exteriorComponent" with no geometric meaning, producing a false
 *   half-integer base-angle equation in the explanation.
 * - Now a self-consistent isosceles / exterior-angle item: triangle RTU with
 *   RT = TU, base RU extended past U to V, and x is the exterior angle at U.
 *   Base angle = (180 - angleRTU)/2; x = 180 - baseAngle = 90 + angleRTU/2.
 *   angleRTU is even so every angle is an integer for every draw. The figure
 *   actually draws the triangle, the extension, and labels the vertex angle at
 *   T and x at the exterior angle at U.
 */

export const generator_1335 = {
  metadata: {
    id: "1335",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Vertex angle of the isosceles triangle (even -> integer base angles).
    const angleRTU = getRandomInt(50, 74) * 2; // 100..148, always even

    // STEP 2: Base angles and the exterior angle x at U.
    const baseAngle = (180 - angleRTU) / 2;      // integer
    const x = 180 - baseAngle;                    // exterior angle at U = 90 + angleRTU/2

    // STEP 3: Distractors — common wrong picks, all guaranteed distinct from x.
    const candidateDistractors = [
      baseAngle,          // forgetting the exterior step
      angleRTU,           // copying the vertex angle
      180 - angleRTU,     // supplement of the vertex angle
      baseAngle + 90,     // (equals x) — filtered out below
      x - baseAngle,      // = angleRTU/2 style slip
    ];
    const distractors: number[] = [];
    for (const d of candidateDistractors) {
      if (d !== x && d > 0 && d < 180 && !distractors.includes(d)) distractors.push(d);
      if (distractors.length === 3) break;
    }
    // Safety net: pad with nearby values if the pool came up short.
    let pad = 1;
    while (distractors.length < 3) {
      const d = x + pad;
      if (d !== x && d > 0 && d < 180 && !distractors.includes(d)) distractors.push(d);
      pad = pad > 0 ? -pad : -pad + 1;
    }

    const optionsData = [
      { text: distractors[0].toString(), isCorrect: false },
      { text: distractors[1].toString(), isCorrect: false },
      { text: x.toString(), isCorrect: true },
      { text: distractors[2].toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 4: Build the figure directly in SVG pixel space.
    // Isosceles triangle: base R--U horizontal, apex T above the base midpoint,
    // base extended past U to V. Small randomization keeps draws from looking
    // identical while staying a valid depiction (SAT figures are not to scale).
    const W = 420, H = 300;
    const baseY = 210;
    const Rx = 70;
    const Ux = 300 + getRandomInt(-10, 10);
    const Vx = 380;
    const Tx = (Rx + Ux) / 2;
    const Ty = 70 + getRandomInt(-8, 8);

    const seg = (x1: number, y1: number, x2: number, y2: number) =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
    const lbl = (x1: number, y1: number, t: string, anchor = 'middle') =>
      `<text x="${x1}" y="${y1}" text-anchor="${anchor}" font-size="15" fill="currentColor">${t}</text>`;

    const figureCode =
      `<div style="width:100%;max-width:420px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // base line R -> V (through U), then the two equal sides
      seg(Rx, baseY, Vx, baseY) +
      seg(Rx, baseY, Tx, Ty) +
      seg(Ux, baseY, Tx, Ty) +
      // tick marks indicating RT = TU
      (() => {
        const mid1x = (Rx + Tx) / 2, mid1y = (baseY + Ty) / 2;
        const mid2x = (Ux + Tx) / 2, mid2y = (baseY + Ty) / 2;
        const tick = (cx: number, cy: number, dx: number, dy: number) =>
          `<line x1="${cx - dx}" y1="${cy - dy}" x2="${cx + dx}" y2="${cy + dy}" stroke="currentColor" stroke-width="2"/>`;
        return tick(mid1x, mid1y, 4, -6) + tick(mid2x, mid2y, 4, 6);
      })() +
      // vertices
      `<circle cx="${Rx}" cy="${baseY}" r="3" fill="currentColor"/>` +
      `<circle cx="${Ux}" cy="${baseY}" r="3" fill="currentColor"/>` +
      `<circle cx="${Vx}" cy="${baseY}" r="3" fill="currentColor"/>` +
      `<circle cx="${Tx}" cy="${Ty}" r="3" fill="currentColor"/>` +
      // point labels
      lbl(Rx - 12, baseY + 6, 'R') +
      lbl(Ux - 6, baseY + 22, 'U') +
      lbl(Vx + 12, baseY + 6, 'V') +
      lbl(Tx, Ty - 12, 'T') +
      // vertex angle at T
      lbl(Tx, Ty + 26, `${angleRTU}°`) +
      // exterior angle x at U (between UT and UV, opening up-right)
      lbl(Ux + 26, baseY - 12, 'x°') +
      `</svg></div>`;

    return {
      questionText: `In the figure above, $RT = TU$ and points $R$, $U$, and $V$ lie on a line. What is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. Triangle $RTU$ is isosceles with $RT = TU$, so its base angles are equal: $\\angle TRU = \\angle TUR = \\frac{180 - ${angleRTU}}{2} = ${baseAngle}^\\circ$. Since $R$, $U$, and $V$ are collinear, angle $x$ is the exterior angle at $U$ and is supplementary to $\\angle TUR$: $x = 180 - ${baseAngle} = ${x}$.`
    };
  }
};
