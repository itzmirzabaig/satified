import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1356
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Triangle RST with right angle at S]
 * - Difficulty factors: [Complementary angles, cofunction identity: cos(A) = sin(90°-A)]
 * - Constraints: [cos(RSW) - sin(WST) = 0 because angles are complementary]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle; W deliberately NOT drawn]
 *
 * FIXED (italic "angle"/"cos"/"sin" words — same as Q1333/1337/1342/1345/
 * 1350/1355): stem and explanation used FOUR backslashes before LaTeX
 * commands — two at runtime — so the renderer treated \\ as a row break and
 * printed the command names as italic math text. Now the standard
 * two-in-source form (\\angle, \\cos, \\sin, ^\\circ).
 *
 * FIXED (figure contradicted the stem's "point W (not shown)"):
 * - The previous fix drew W, segment SW, and angle arcs — contradicting the
 * - stem and handing the student the key inference (that SW splits the right
 * - angle) instead of letting them make it. The answer is 0 for EVERY
 * - position of W on RT (including the endpoints: W=R gives 1-1, W=T gives
 * - 0-0), so "not shown" is the intended design, not an omission. The figure
 * - now contains only what the stem actually relies on: the triangle with
 * - the right-angle mark at S (the load-bearing given — the stem never
 * - states the right angle in words) and the vertex labels. No W, no SW, no
 * - angle arcs, no coordinate scaffolding.
 * - Question logic, stem, answer, and explanation unchanged.
 */

type Pt = { x: number; y: number };

export const generator_1356 = {
  metadata: {
    id: "1356",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // This is a conceptual question about complementary angles
    // cos(RSW) = sin(90° - RSW) = sin(WST) since RSW + WST = 90°
    // So cos(RSW) - sin(WST) = 0
    
    // Generate right triangle dimensions
    const base = getRandomInt(5, 15);
    const height = getRandomInt(5, 15);

    // ── Figure: right triangle RST with the right angle at S. W is
    // deliberately NOT drawn — the stem says "point W (not shown) lies on
    // RT", and the answer is 0 for every position of W on RT, so the figure
    // only needs to supply the one load-bearing given: the right angle at S.
    // S at the origin, T on the +x-axis, R on the +y-axis (math coords, y up).
    const S: Pt = { x: 0, y: 0 };
    const T: Pt = { x: base, y: 0 };
    const R: Pt = { x: 0, y: height };

    // Uniform-scale mapper.
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const Wpx = 460, Hpx = 320, PAD = 26;
    const xmin = -0.5, xmax = base + 0.5;
    const ymin = -0.5, ymax = height + 0.5;
    const sc = Math.min((Wpx - 2 * PAD) / (xmax - xmin), (Hpx - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((Wpx - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((Hpx - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(Hpx - (oy + (v - ymin) * sc));

    const seg = (P: Pt, Q: Pt) =>
      `<line x1="${mx(P.x)}" y1="${my(P.y)}" x2="${mx(Q.x)}" y2="${my(Q.y)}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
    const dot = (P: Pt) => `<circle cx="${mx(P.x)}" cy="${my(P.y)}" r="3" fill="currentColor"/>`;
    const text = (P: Pt, t: string, dx = 0, dy = 0, size = 15) =>
      `<text x="${mx(P.x) + dx}" y="${my(P.y) + dy}" text-anchor="middle" font-size="${size}" font-style="italic" fill="currentColor">${t}</text>`;

    // Right-angle square at S, legs along ST and SR.
    const s = Math.min(0.18 * Math.min(base, height), 0.12 * Math.max(base, height));
    const raSquare = `<path d="M ${mx(s)} ${my(0)} L ${mx(s)} ${my(s)} L ${mx(0)} ${my(s)}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;

    const figureCode =
      `<div style="width:100%;max-width:460px;margin:0 auto;"><svg viewBox="0 0 ${Wpx} ${Hpx}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      seg(S, T) + seg(S, R) +   // legs ST and SR (right angle at S)
      seg(R, T) +               // hypotenuse RT (where the unseen W lies)
      raSquare +                // GIVEN: the right angle at S
      dot(S) + dot(T) + dot(R) +
      text(S, 'S', -15, 20) +
      text(T, 'T', 15, 20) +
      text(R, 'R', -15, -9) +
      `</svg></div>`;

    return {
      questionText: `In triangle RST above, point W (not shown) lies on RT. What is the value of $\\cos (\\angle RSW) - \\sin (\\angle WST)$?`,
      figureCode,
      options: [], // Fill in the blank
      correctAnswer: "0",
      explanation: `Angle $RSW$ and $WST$ sum to $90^{\\circ}$ (angle $RST$). Complementary angles have $\\cos A = \\sin B$ when $A + B = 90^{\\circ}$. Thus, $\\cos(RSW) - \\sin(WST) = 0$ because $\\sin(WST) = \\sin(90^{\\circ} - RSW) = \\cos(RSW)$.`
    };
  }
};