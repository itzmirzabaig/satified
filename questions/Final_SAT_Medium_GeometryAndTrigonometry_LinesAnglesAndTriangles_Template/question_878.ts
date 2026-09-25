import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 878
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 55-65 and 60-70 degrees]
 * - Difficulty factors: [Parallel lines, triangle sum, corresponding angles]
 * - Distractor patterns: [A: took angle BDC directly, C: took angle ACE directly, D: sum of two angles]
 * - Constraints: [AE || BD, triangle ACE sum = 180]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Triangle with parallel line segment]
 *
 * FIXED:
 * - Rebuilt corrupted nested-IIFE figure as a plain SVG template literal that
 *   draws the actual triangle ACE, the parallel chord BD, and the two given
 *   angle labels (values match the live variables every draw).
 * - Collapsed \\\\ backslash runs to \\ so MathJax renders \circ/\parallel/etc.
 * - Bounded retry guarantees the four option values are pairwise distinct.
 * - correctAnswer now equals the correct option's text exactly (was "N°").
 *
 * FIXED (angle BDC label sat on the wrong side of line BD):
 * - The BDC value was placed 16px down-left of D — but its wedge (between
 *   rays D->B and D->C) opens UP-LEFT, ABOVE segment BD — so the label sat
 *   on the exterior side of BD and read as the bottom angle at D. Neither
 *   given angle had an arc, so both labels floated (the Q885/Q877 lesson).
 * - Figure rebuilt from the generated angles: A at the origin, E on the
 *   +x-axis, C at the intersection of the ray from A at angleCAE and the
 *   ray from E at 180-angleBDC — so the drawn angles equal their labels
 *   exactly, and BD (the chord at t=0.55 on CA and CE) is parallel to AE by
 *   similarity. Arcs on both given angles with labels on their wedges'
 *   bisectors (BDC above BD up-left of D; ACE below C), plus a small blue
 *   arc on the asked angle CAE at A. Uniform scale so angles render true.
 *   Question logic, stem, options, and explanation unchanged.
 */

export const generator_878 = {
  metadata: {
    id: "878",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate angles so the four option values are all distinct.
    // AE || BD => angle AEC = angle BDC (corresponding). Triangle ACE sum = 180
    // => angle CAE = 180 - angle ACE - angle BDC.
    let angleBDC = 0, angleACE = 0, angleCAE = 0;
    let tries = 0;
    do {
      angleBDC = getRandomInt(55, 65);
      angleACE = getRandomInt(60, 70);
      angleCAE = 180 - angleACE - angleBDC;
      tries++;
    } while (
      tries < 50 &&
      // reject when any two of {correct, distractorA, distractorC} coincide
      (angleCAE === angleBDC ||
        angleCAE === angleACE ||
        angleBDC === angleACE)
    );
    // distractorD = angleBDC + angleACE is always >= 115, so it never collides.

    // STEP 2: Figure — triangle built FROM the generated angles (math coords,
    // y up). A=(0,0), E=(6,0); C = intersection of the ray from A at angleCAE
    // and the ray from E at 180-angleBDC (so the drawn angle AEC equals
    // angleBDC and the drawn angle ACE equals its label exactly). BD, the
    // chord at t=0.55 on CA and CE, is parallel to AE by similarity, so the
    // drawn angle BDC equals its label too.
    const rad = (d: number) => (d * Math.PI) / 180;
    const ccwSpan = (a1: number, a2: number) => (((a2 - a1) % 360) + 360) % 360;
    const alpha = angleCAE;
    const beta = angleBDC;
    const L = 6;
    const s = (L * Math.sin(rad(beta))) / Math.sin(rad(angleACE));
    const A = { x: 0, y: 0 };
    const E = { x: L, y: 0 };
    const C = { x: s * Math.cos(rad(alpha)), y: s * Math.sin(rad(alpha)) };
    const t = 0.55;
    const B = { x: A.x + (C.x - A.x) * t, y: A.y + (C.y - A.y) * t };
    const D = { x: E.x + (C.x - E.x) * t, y: E.y + (C.y - E.y) * t };

    // Uniform-scale mapper (angles must render true).
    const round1 = (v: number) => Math.round(v * 10) / 10;
    const W = 440, H = 320, PAD = 30;
    const xmin = -0.7, xmax = 6.7;
    const ymin = -0.8, ymax = C.y + 0.6;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (x: number) => round1(ox + (x - xmin) * sc);
    const my = (y: number) => round1(H - (oy + (y - ymin) * sc));

    // CCW arc (data-space angles), pixel radius rPx around V.
    const arc = (V: { x: number; y: number }, a1: number, a2: number, rPx: number, color = "currentColor") => {
      const r = rPx / sc;
      const span = ccwSpan(a1, a2);
      let d = "";
      for (let i = 0; i <= 16; i++) {
        const a = rad(a1 + (span * i) / 16);
        d += `${i === 0 ? "M" : "L"}${mx(V.x + r * Math.cos(a))} ${my(V.y + r * Math.sin(a))} `;
      }
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.5"/>`;
    };
    // Point at pixel distance distPx from V, in direction dirDeg (data space).
    const at = (V: { x: number; y: number }, dirDeg: number, distPx: number) => ({
      x: V.x + (distPx / sc) * Math.cos(rad(dirDeg)),
      y: V.y + (distPx / sc) * Math.sin(rad(dirDeg))
    });
    const vlabel = (V: { x: number; y: number }, txt: string, dx: number, dy: number, color = "currentColor") =>
      `<text x="${mx(V.x) + dx}" y="${my(V.y) + dy}" text-anchor="middle" font-size="14" font-style="italic" fill="${color}">${txt}</text>`;
    const alabel = (p: { x: number; y: number }, txt: string) =>
      `<text x="${mx(p.x)}" y="${my(p.y) + 4}" text-anchor="middle" font-size="12" fill="currentColor">${txt}</text>`;

    // Wedge directions (data space): at D, rays D->B (180°) and D->C
    // (180°-beta) — the BDC wedge opens up-left, ABOVE BD. At C, rays C->A
    // (180°+alpha) and C->E (360°-beta) — the ACE wedge opens downward.
    const bdcLbl = at(D, 180 - beta / 2, 40);            // bisector of the BDC wedge
    const aceLbl = at(C, 270 + (alpha - beta) / 2, 44); // bisector of the ACE wedge

    const figureCode = `<div style="width:100%;max-width:440px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${mx(A.x)},${my(A.y)} ${mx(C.x)},${my(C.y)} ${mx(E.x)},${my(E.y)}" fill="none" stroke="currentColor" stroke-width="2"/>` +
      `<line x1="${mx(B.x)}" y1="${my(B.y)}" x2="${mx(D.x)}" y2="${my(D.y)}" stroke="#3b82f6" stroke-width="2"/>` +
      arc(D, 180 - beta, 180, 26) +               // GIVEN: angle BDC — above BD, up-left of D
      arc(C, 180 + alpha, 360 - beta, 26) +       // GIVEN: angle ACE — below C
      arc(A, 0, alpha, 30, "#3b82f6") +            // ASKED: angle CAE (blue arc at A)
      vlabel(A, "A", -14, 16) +
      vlabel(C, "C", 0, -10) +
      vlabel(E, "E", 14, 16) +
      vlabel(B, "B", -13, 4, "#3b82f6") +
      vlabel(D, "D", 13, 4, "#3b82f6") +
      alabel(bdcLbl, `${angleBDC}\u00B0`) +
      alabel(aceLbl, `${angleACE}\u00B0`) +
      `</svg></div>`;

    // STEP 3: Create options (values guaranteed distinct by the retry above).
    const distractorA = angleBDC;              // took angle BDC directly
    const distractorC = angleACE;              // took angle ACE directly
    const distractorD = angleBDC + angleACE;   // added the two given angles

    const optionsData = [
      { text: `$${distractorA}^\\circ$`, isCorrect: false, reason: "incorrectly assumes angle CAE equals angle BDC" },
      { text: `$${angleCAE}^\\circ$`, isCorrect: true },
      { text: `$${distractorC}^\\circ$`, isCorrect: false, reason: "incorrectly uses angle ACE as the answer" },
      { text: `$${distractorD}^\\circ$`, isCorrect: false, reason: "incorrectly adds the two given angles" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In the figure above, segments $AE$ and $BD$ are parallel. If angle $BDC$ measures $${angleBDC}^{\\circ}$ and angle $ACE$ measures $${angleACE}^{\\circ}$, what is the measure of angle $CAE$?`,
      figureCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Since $AE \\parallel BD$, corresponding angles are equal, so $m\\angle AEC = m\\angle BDC = ${angleBDC}^{\\circ}$. In $\\triangle ACE$, the sum of the angles is $180^{\\circ}$: $m\\angle CAE + m\\angle ACE + m\\angle AEC = 180^{\\circ}$. Substituting the known values gives $m\\angle CAE + ${angleACE} + ${angleBDC} = 180$, so $m\\angle CAE + ${angleACE + angleBDC} = 180$ and $m\\angle CAE = ${angleCAE}^{\\circ}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};