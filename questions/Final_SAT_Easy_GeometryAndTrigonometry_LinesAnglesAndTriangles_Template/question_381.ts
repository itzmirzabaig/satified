import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 381
 *
 * FIX ANALYSIS:
 * - Geometric Consistency:
 *   - Chosen specific coordinates to ensure the triangles are clearly Scalene (no right angles).
 *   - Triangle ABC: Base 3, Height 2, Top vertex offset 1. Angle A ≈ 63°.
 *   - Triangle XYZ: Created by adding a fixed offset to X, then scaling ABC's relative coordinates by 1.3.
 *   - This ensures strict geometric similarity and prevents visual ambiguity.
 * - Labeling: 
 *   - Changed side label to just "d".
 * - ViewBox:
 *   - Expanded to fit the new coordinates comfortably.
 *
 * FIXED (figure — every label floated; drawn geometry contradicted the givens):
 * - The old figure had no arcs or marks at all: the given-angle label, the "?"
 *   at X, and the side label d were bare floating text, so nothing tied any
 *   of them to a specific angle or side (same defect class as Questions
 *   353/370).
 * - Hidden defects: (1) triangle ABC was hard-coded, so the DRAWN angle A was
 *   always atan(2/1) ≈ 63.4° while its label ranged over [50, 70] — the wedge
 *   matched its label only at 63°. (2) XYZ was drawn at a fixed 1.3×
 *   regardless of the stem's stated scaleFactor (2–4), so measuring the
 *   figure contradicted the stem.
 * - Rebuilt as a self-contained SVG derived from the generated values: ABC is
 *   constructed from angleA itself (A at the origin, B on the +x-axis, ray AC
 *   at exactly angleA; angle B fixed at 45°, which keeps the triangle scalene
 *   with no right angle for every integer draw), and XYZ is the TRUE dilation
 *   of ABC by scaleFactor. Arcs mark the given angle at A and the asked angle
 *   at X (blue "?"), labels sit on their wedges' bisectors, and d labels side
 *   AB. ABC is sized so the largest dilation (4×) still fits the viewBox.
 * - Generation logic untouched: same random ranges, options, explanation.
 */

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
// CCW span from direction a1 to a2, normalized into [0, 360).
const ccwSpan = (a1: number, a2: number) => (((a2 - a1) % 360) + 360) % 360;

export const generator_381 = {
  metadata: {
    id: "381",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const d = getRandomInt(12, 20);
    const scaleFactor = getRandomInt(2, 4);
    const angleA = getRandomInt(50, 70);

    // ---- Figure, derived from the generated values so the drawing cannot
    // contradict the labels. Math coords, y up.
    // Triangle ABC is built FROM angleA: A at the origin, B on the +x-axis,
    // ray AC at exactly angleA. Angle B is fixed at 45°, so angle C =
    // 180 - angleA - 45 lies in [65, 85]: the triangle is scalene with no
    // right angle for every integer draw (an isosceles case would need
    // angleA = 67.5°, which the integer range can never produce).
    const angleB = 45;
    const angleC = 180 - angleA - angleB;
    const cAB = 1.6;              // side AB — the side labeled d
    const bCA = cAB * Math.sin(rad(angleB)) / Math.sin(rad(angleC)); // side CA
    const A: Pt = { x: 0, y: 0 };
    const B: Pt = { x: cAB, y: 0 };
    const C: Pt = { x: bCA * Math.cos(rad(angleA)), y: bCA * Math.sin(rad(angleA)) };

    // Triangle XYZ — the TRUE dilation of ABC by scaleFactor.
    // Correspondence: X <-> A, Y <-> B, Z <-> C.
    const X: Pt = { x: cAB + 0.9, y: 0 };
    const Y: Pt = { x: X.x + scaleFactor * cAB, y: 0 };
    const Z: Pt = { x: X.x + scaleFactor * C.x, y: scaleFactor * C.y };

    // Label anchors: the given angle and the asked angle sit on their wedges'
    // bisectors; vertices and the side label sit just outside their features.
    const at = (V: Pt, a: number, r: number): Pt =>
      ({ x: V.x + r * Math.cos(rad(a)), y: V.y + r * Math.sin(rad(a)) });
    const givenLbl = at(A, angleA / 2, 0.58);   // inside the given-angle wedge
    const qLbl = at(X, angleA / 2, 0.95);       // inside the asked-angle wedge
    const aLbl: Pt = { x: -0.22, y: -0.3 };
    const bLbl: Pt = { x: B.x + 0.26, y: -0.3 };
    const cLbl: Pt = { x: C.x + 0.3, y: C.y + 0.1 };
    const xLbl: Pt = { x: X.x - 0.26, y: -0.3 };
    const yLbl: Pt = { x: Y.x + 0.24, y: -0.3 };
    const zLbl: Pt = { x: Z.x, y: Z.y + 0.32 };
    const dLbl: Pt = { x: cAB / 2, y: -0.36 };

    // ---- uniform-scale mapper (angles must render true) ----
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 460, H = 310, PAD = 12;
    const xs = [A.x, B.x, C.x, X.x, Y.x, Z.x, aLbl.x, bLbl.x, cLbl.x, xLbl.x, yLbl.x, zLbl.x, dLbl.x, givenLbl.x, qLbl.x];
    const ys = [A.y, C.y, Z.y, aLbl.y, bLbl.y, cLbl.y, xLbl.y, yLbl.y, zLbl.y, dLbl.y, givenLbl.y, qLbl.y];
    const xmin = Math.min(...xs) - 0.35, xmax = Math.max(...xs) + 0.35;
    const ymin = Math.min(...ys) - 0.35, ymax = Math.max(...ys) + 0.35;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(H - (oy + (v - ymin) * sc));

    // ---- SVG pieces ----
    const poly = (P: Pt, Q: Pt, R: Pt) =>
      `<polygon points="${mx(P.x)},${my(P.y)} ${mx(Q.x)},${my(Q.y)} ${mx(R.x)},${my(R.y)}" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`;

    // CCW arc from direction a1 to a2 (span normalized; all directions here
    // are symbolic multiples of angleA, no atan2, so the Q1341 branch-cut bug
    // class cannot occur).
    const arc = (V: Pt, a1: number, a2: number, r: number, color = "currentColor") => {
      const span = ccwSpan(a1, a2);
      let path = "";
      for (let i = 0; i <= 16; i++) {
        const t = rad(a1 + (span * i) / 16);
        path += `${i === 0 ? "M" : "L"}${mx(V.x + r * Math.cos(t))} ${my(V.y + r * Math.sin(t))} `;
      }
      return `<path d="${path}" fill="none" stroke="${color}" stroke-width="1.4"/>`;
    };

    const text = (p: Pt, s: string, italic: boolean, color = "currentColor", size = 13) =>
      `<text x="${mx(p.x)}" y="${my(p.y) + 4}" text-anchor="middle" font-size="${size}"${italic ? ' font-style="italic"' : ""} fill="${color}">${s}</text>`;

    const figureCode =
      `<div style="width:100%;max-width:460px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      poly(A, B, C) +
      poly(X, Y, Z) +
      arc(A, 0, angleA, 0.30) +                     // GIVEN: angle A, labeled with its value
      arc(X, 0, angleA, 0.55, "#3b82f6") +           // ASKED: angle X, labeled "?"
      text(givenLbl, `${angleA}\u00B0`, false) +
      text(qLbl, "?", false, "#3b82f6") +
      text(dLbl, "d", true) +
      text(aLbl, "A", true, "currentColor", 14) + text(bLbl, "B", true, "currentColor", 14) + text(cLbl, "C", true, "currentColor", 14) +
      text(xLbl, "X", true, "currentColor", 14) + text(yLbl, "Y", true, "currentColor", 14) + text(zLbl, "Z", true, "currentColor", 14) +
      `</svg></div>`;

    const correctAnswer = angleA.toString();
    const distractorA = angleA - 40;
    const distractorB = angleA - 3;
    const distractorD = angleA + 3;

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: distractorB.toString(), isCorrect: false, reason: "results from a calculation error" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false, reason: "results from a calculation error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For the triangles shown, triangle $ABC$ is dilated by a scale factor of $${scaleFactor}$ to obtain triangle $XYZ$, where $d = ${d}$. What is the measure, in degrees, of angle $X$?`,
      figureCode: figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Dilation is a transformation that changes the size of a figure but not its shape, producing similar figures. In similar triangles, corresponding angles are congruent (equal in measure). Angle $A$ corresponds to angle $X$. Therefore, the measure of angle $X$ is equal to the measure of angle $A$, which is $${correctAnswer}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};