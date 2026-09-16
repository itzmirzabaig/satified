import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1341
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 106°, 23° (specific values), answer: 97°]
 * - Difficulty factors: [Exterior angle theorem, supplementary angles]
 * - Distractor patterns: [N/A — fill in the blank]
 * - Constraints: [Three intersecting lines forming a triangle]
 * - Question type: [Figure → Fill in the blank]
 *
 * FIXED (x arc drawn > 180°):
 * - The x° arc at the top vertex spanned 360 − x instead of x. Cause: the arc
 *   helper interpolated raw atan2 directions, and the Q→P direction lives in
 *   the third quadrant, which atan2 wraps to −(180 − smallAngle) instead of
 *   +(180 + smallAngle). Interpolating from deg(Q,S2)=ext down to that negative
 *   value swept the long way around (e.g. 113° → −158° = 271° clockwise
 *   instead of 89° CCW). The x° label sat at the same bogus midpoint, floating
 *   off to the right near line t.
 * - Fix: ccwSpan() normalizes the sweep to [0, 360) so every arc takes the
 *   short CCW path; arcs and label bisectors both use it. The x arc now spans
 *   exactly x°, opening up-left of Q, with x° inside the wedge.
 * - Verified across the full random ranges: x-arc span = 180 + small − ext
 *   ∈ [85°, 115°]; the 113° arc span = ext ∈ [95°, 115°]; the small arc span
 *   ∈ [20°, 30°]. None can wrap.
 */

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
const deg = (V: Pt, T: Pt) => (Math.atan2(T.y - V.y, T.x - V.x) * 180) / Math.PI;
// CCW span from direction a1 to a2, normalized into [0, 360).
const ccwSpan = (a1: number, a2: number) => (((a2 - a1) % 360) + 360) % 360;

export const generator_1341 = {
  metadata: {
    id: "1341",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1 — randomized givens (generation logic unchanged).
    const exteriorAngle = getRandomInt(95, 115); // marked at the right vertex, exterior to the triangle
    const smallAngle = getRandomInt(20, 30);     // marked at the left vertex, interior to the triangle

    // STEP 2 — solution (exterior angle theorem).
    const interiorAngle = 180 - exteriorAngle;
    const x = smallAngle + interiorAngle;

    // STEP 3 — geometry built FROM the generated angles. Math coords, y up.
    // Triangle vertices: O = s ∩ t (right), P = r ∩ t (left), Q = r ∩ s (top).
    const O: Pt = { x: 0, y: 0 };
    const P: Pt = { x: -1, y: 0 };
    const sDir: Pt = { x: Math.cos(rad(exteriorAngle)), y: Math.sin(rad(exteriorAngle)) };
    const rDir: Pt = { x: Math.cos(rad(smallAngle)), y: Math.sin(rad(smallAngle)) };
    const mu = Math.sin(rad(exteriorAngle)) / Math.sin(rad(exteriorAngle - smallAngle));
    const Q: Pt = { x: P.x + mu * rDir.x, y: P.y + mu * rDir.y };

    // Full lines, extended past the triangle on both ends.
    const T1: Pt = { x: P.x - 0.9, y: 0 };
    const T2: Pt = { x: 1.35, y: 0 };
    const S1: Pt = { x: -0.85 * sDir.x, y: -0.85 * sDir.y };
    const S2: Pt = { x: 1.18 * sDir.x, y: 1.18 * sDir.y };
    const R1: Pt = { x: P.x - 0.62 * rDir.x, y: P.y - 0.62 * rDir.y };
    const R2: Pt = { x: Q.x + 0.75 * rDir.x, y: Q.y + 0.75 * rDir.y };

    // Line labels r, s, t just off the outer end of each line.
    const tLbl: Pt = { x: T2.x + 0.22, y: -0.17 };
    const sLbl: Pt = {
      x: S1.x + 0.2 * Math.sin(rad(exteriorAngle)),
      y: S1.y - 0.2 * Math.cos(rad(exteriorAngle))
    };
    const rLbl: Pt = {
      x: R2.x + 0.17 * Math.sin(rad(smallAngle)),
      y: R2.y - 0.17 * Math.cos(rad(smallAngle))
    };

    // Angle-label anchors on each marked wedge's bisector (CCW midpoint).
    const rho = Math.sin(rad(smallAngle)) / Math.sin(rad(exteriorAngle / 2 - smallAngle));
    const rExt = Math.min(0.58, 0.7 * rho);
    const extLbl: Pt = { x: rExt * Math.cos(rad(exteriorAngle / 2)), y: rExt * Math.sin(rad(exteriorAngle / 2)) };
    const smallLbl: Pt = { x: P.x + 0.66 * Math.cos(rad(smallAngle / 2)), y: P.y + 0.66 * Math.sin(rad(smallAngle / 2)) };
    const qBis = deg(Q, S2) + ccwSpan(deg(Q, S2), deg(Q, P)) / 2;   // ← was the raw average (branch-cut bug)
    const xLbl: Pt = { x: Q.x + 0.62 * Math.cos(rad(qBis)), y: Q.y + 0.62 * Math.sin(rad(qBis)) };

    // STEP 4 — uniform-scale mapper (angles must render true).
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 460, H = 310, PAD = 12;
    const xs = [T1.x, T2.x, S1.x, S2.x, R1.x, R2.x, tLbl.x, sLbl.x, rLbl.x];
    const ys = [T1.y, T2.y, S1.y, S2.y, R1.y, R2.y, tLbl.y, sLbl.y, rLbl.y];
    const xmin = Math.min(...xs) - 0.3, xmax = Math.max(...xs) + 0.3;
    const ymin = Math.min(...ys) - 0.3, ymax = Math.max(...ys) + 0.3;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(H - (oy + (v - ymin) * sc));

    // STEP 5 — SVG pieces.
    const line = (A: Pt, B: Pt) =>
      `<line x1="${mx(A.x)}" y1="${my(A.y)}" x2="${mx(B.x)}" y2="${my(B.y)}" stroke="currentColor" stroke-width="2"/>`;

    // CCW arc from direction a1 to a2, taking the SHORT way (span in [0, 360)).
    const arc = (V: Pt, a1: number, a2: number, r: number, color = "currentColor") => {
      const span = ccwSpan(a1, a2);                                    // ← was raw (a2 - a1)
      let d = "";
      for (let i = 0; i <= 16; i++) {
        const t = rad(a1 + (span * i) / 16);
        d += `${i === 0 ? "M" : "L"}${mx(V.x + r * Math.cos(t))} ${my(V.y + r * Math.sin(t))} `;
      }
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.4"/>`;
    };

    const text = (p: Pt, s: string, italic: boolean, color = "currentColor") =>
      `<text x="${mx(p.x)}" y="${my(p.y) + 4}" text-anchor="middle" font-size="13"${italic ? ' font-style="italic"' : ""} fill="${color}">${s}</text>`;

    const figureCode =
      `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      line(T1, T2) + line(S1, S2) + line(R1, R2) +
      arc(O, deg(O, T2), deg(O, S2), 0.26) +           // given exterior angle, right vertex
      arc(P, deg(P, O), deg(P, R2), 0.36) +             // given interior angle, left vertex
      arc(Q, deg(Q, S2), deg(Q, P), 0.34, "#3b82f6") +  // asked: exterior angle at the top vertex
      text(extLbl, `${exteriorAngle}\u00B0`, false) +
      text(smallLbl, `${smallAngle}\u00B0`, false) +
      text(xLbl, "x\u00B0", true, "#3b82f6") +
      text(tLbl, "t", true) + text(sLbl, "s", true) + text(rLbl, "r", true) +
      `</svg></div>`;

    return {
      questionText: `Intersecting lines $r$, $s$, and $t$ are shown. The measure of one angle is $${exteriorAngle}^\\circ$ and the measure of another angle is $${smallAngle}^\\circ$. What is the value of $x$?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: x.toString(),
      explanation: `The $${exteriorAngle}^\\circ$ angle and the interior angle of the triangle at that vertex are supplementary, so that interior angle measures $180 - ${exteriorAngle} = ${interiorAngle}^\\circ$. The angle marked $x^\\circ$ is an exterior angle of the triangle, so by the exterior angle theorem it equals the sum of the two nonadjacent interior angles: $x = ${smallAngle} + ${interiorAngle} = ${x}$.`
    };
  }
};