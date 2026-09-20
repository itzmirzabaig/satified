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
 *
 * FIXED (figure contradicted the given angle — drawn apex ~75-85° for labels
 * of 100-148°):
 * - The previous figure used a FIXED layout (half-base ~115 px, height ~140
 *   px) regardless of angleRTU, so the drawn apex angle was always roughly
 *   75-85 degrees while its label claimed 100-148 — visibly false in every
 *   draw (a 143° label sat on a plump ~80° wedge). It also drew no angle
 *   arcs (the value floated below T, x° floated right of U) and jittered the
 *   U and T positions randomly.
 * - Rebuilt FROM angleRTU: with half-base 1, the height h = 1/tan(A/2) makes
 *   the drawn apex angle EXACTLY angleRTU, so a 148° draw is honestly a
 *   flat, wide wedge (its base angles genuinely measure 16 degrees). Both
 *   angles are now marked with arcs — the given value at T, the blue x° at U
 *   between rays U->T and U->V — and every direction is symbolic
 *   (ray U->T at 90 + A/2), so the drawn x equals the computed x by
 *   construction. Tick marks (RT = TU) and the R, U, V, T labels retained.
 *   Question logic untouched.
 */

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
// CCW span from direction a1 to a2, normalized into [0, 360).
const ccwSpan = (a1: number, a2: number) => (((a2 - a1) % 360) + 360) % 360;

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

    // STEP 4: Figure built FROM angleRTU (math coords, y up). Base R-U on the
    // x-axis with U at the origin, extended past U to V; apex T above the base
    // midpoint. With half-base 1, the height h = 1/tan(A/2) makes the apex
    // angle EXACTLY angleRTU, so the drawn angles can never contradict the
    // labels: ray U->T points at 90 + A/2, so the exterior arc at U spans
    // exactly x = 90 + A/2, and the apex arc at T spans exactly A.
    const h = 1 / Math.tan(rad(angleRTU / 2));
    const R: Pt = { x: -2, y: 0 };
    const U: Pt = { x: 0, y: 0 };
    const V: Pt = { x: 0.55, y: 0 };
    const T: Pt = { x: -1, y: h };
    const dirUT = 90 + angleRTU / 2; // direction of ray U -> T, in degrees

    // Uniform-scale mapper (angles must render true).
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 460, H = 300, PAD = 20;
    const xLbl: Pt = { x: 0.52 * Math.cos(rad(dirUT / 2)), y: 0.52 * Math.sin(rad(dirUT / 2)) };
    const apexValDist = Math.min(0.55, 0.7 * h); // keeps the value label above the base
    const xs = [R.x, V.x, T.x, xLbl.x];
    const ys = [0, h, xLbl.y];
    const xmin = Math.min(...xs) - 0.4, xmax = Math.max(...xs) + 0.4;
    const ymin = Math.min(...ys) - 0.4, ymax = Math.max(...ys) + 0.4;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(H - (oy + (v - ymin) * sc));

    const seg = (P: Pt, Q: Pt) =>
      `<line x1="${mx(P.x)}" y1="${my(P.y)}" x2="${mx(Q.x)}" y2="${my(Q.y)}" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>`;
    const dot = (P: Pt) => `<circle cx="${mx(P.x)}" cy="${my(P.y)}" r="3" fill="currentColor"/>`;
    const lbl = (P: Pt, t: string, italic: boolean, color = "currentColor", size = 14) =>
      `<text x="${mx(P.x)}" y="${my(P.y) + 4}" text-anchor="middle" font-size="${size}"${italic ? ' font-style="italic"' : ""} fill="${color}">${t}</text>`;
    // CCW arc from direction a1 to a2 (all directions symbolic multiples of
    // angleRTU/2 — no atan2, so the Q1341 branch-cut bug class cannot occur).
    const arc = (Vtx: Pt, a1: number, a2: number, r: number, color = "currentColor") => {
      const span = ccwSpan(a1, a2);
      let d = "";
      for (let i = 0; i <= 16; i++) {
        const t = rad(a1 + (span * i) / 16);
        d += `${i === 0 ? "M" : "L"}${mx(Vtx.x + r * Math.cos(t))} ${my(Vtx.y + r * Math.sin(t))} `;
      }
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.6"/>`;
    };
    // Equal-length tick at the midpoint of side PQ.
    const tickOn = (P: Pt, Q: Pt) => {
      const m: Pt = { x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 };
      const dx = Q.x - P.x, dy = Q.y - P.y, L = Math.hypot(dx, dy) || 1, t = 0.07;
      const a: Pt = { x: m.x - (dy / L) * t, y: m.y + (dx / L) * t };
      const b: Pt = { x: m.x + (dy / L) * t, y: m.y - (dx / L) * t };
      return `<line x1="${mx(a.x)}" y1="${my(a.y)}" x2="${mx(b.x)}" y2="${my(b.y)}" stroke="currentColor" stroke-width="2"/>`;
    };

    const figureCode =
      `<div style="width:100%;max-width:460px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      seg(R, V) +   // base R-U extended through U to V (one straight line)
      seg(R, T) +   // side RT
      seg(T, U) +   // side TU
      tickOn(R, T) + tickOn(T, U) +                                    // GIVEN: RT = TU
      arc(T, 270 - angleRTU / 2, 270 + angleRTU / 2, Math.min(0.32, 0.5 * h)) + // GIVEN: apex angle
      arc(U, 0, dirUT, 0.32, "#3b82f6") +                               // ASKED: exterior angle x at U
      dot(R) + dot(U) + dot(V) + dot(T) +
      lbl({ x: T.x, y: T.y + 0.17 }, "T", true, "currentColor", 15) +
      lbl({ x: T.x, y: T.y - apexValDist }, `${angleRTU}\u00B0`, false) +
      lbl(xLbl, "x\u00B0", true, "#3b82f6", 15) +
      lbl({ x: R.x, y: -0.17 }, "R", true, "currentColor", 15) +
      lbl({ x: U.x + 0.06, y: -0.17 }, "U", true, "currentColor", 15) +
      lbl({ x: V.x + 0.11, y: -0.15 }, "V", true, "currentColor", 15) +
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