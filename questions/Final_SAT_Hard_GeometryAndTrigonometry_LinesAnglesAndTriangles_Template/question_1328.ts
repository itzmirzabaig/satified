import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1328
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AB=√34, AC=3, CE=21, answer: 480]
 * - Difficulty factors: [Similar triangles, Pythagorean theorem, area formula]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [Similar triangles ABC and ADE, BC is height]
 * - Question type: [Figure→Fill in the blank]
 *
 * FIXED (figure terribly hard to read):
 * - The old figure never closed the big triangle (hypotenuse overshoot D by
 *   2 units, base overshot E by 2 — lines that miss their corners), placed
 *   the B and D labels at MID-SEGMENT height instead of at the vertices,
 *   added random ±1..4 jitters to E and D so the drawn lengths contradicted
 *   the stem values (drawn CE ≠ 21, drawn DE ≠ 40, checkable against its own
 *   numbered axes), put B off the hypotenuse so the stated similarity was
 *   not visible, and used non-uniform x/y scaling that distorted the
 *   triangles. It also labeled none of the given values and drew no
 *   right-angle marks — without them the question is unsolvable from the
 *   figure.
 * - Rebuilt as a clean geometry diagram (one builder shared by the main
 *   draw and the fallback): nested right triangles ABC inside ADE with B
 *   exactly on AD, right-angle squares at C and E, the given values labeled
 *   (√AB² on the hypotenuse, AC and CE under the base), vertex labels
 *   outside the figure, uniform scale, and the asked triangle ADE lightly
 *   shaded. Question logic untouched.
 */

type Pt = { x: number; y: number };

/**
 * Shared figure builder (used by the generated draw AND the fallback):
 * clean geometry diagram of the nested similar right triangles. A is the
 * shared vertex at the origin; the base runs A–C–E along +x; BC and DE are
 * vertical; B lies EXACTLY on segment AD by construction (BC/AC = DE/AE),
 * so the stated similarity is visually true and every drawn length equals
 * its stem value (E at AE, D at DE — no random offsets).
 */
const buildFigure = (ACv: number, BCv: number, ABsq: number, CEv: number, AEv: number, DEv: number): string => {
  const A: Pt = { x: 0, y: 0 };
  const C: Pt = { x: ACv, y: 0 };
  const E: Pt = { x: AEv, y: 0 };
  const B: Pt = { x: ACv, y: BCv };
  const D: Pt = { x: AEv, y: DEv };

  // Uniform-scale mapper; pixel margins reserve room for the labels.
  const round2 = (v: number) => Math.round(v * 100) / 100;
  const W = 340, H = 360;
  const PL = 44, PR = 44, PT = 16, PB = 56;
  const sc = Math.min((W - PL - PR) / AEv, (H - PT - PB) / DEv);
  const ox = PL + ((W - PL - PR) - AEv * sc) / 2;
  const extraY = (H - PT - PB) - DEv * sc;
  const baseY = H - PB - extraY / 2; // screen y of the base (data y = 0)
  const mx = (v: number) => round2(ox + v * sc);
  const my = (v: number) => round2(baseY - v * sc);

  const line = (P: Pt, Q: Pt) =>
    `<line x1="${mx(P.x)}" y1="${my(P.y)}" x2="${mx(Q.x)}" y2="${my(Q.y)}" stroke="currentColor" stroke-width="2"/>`;
  const dot = (P: Pt) => `<circle cx="${mx(P.x)}" cy="${my(P.y)}" r="2.5" fill="currentColor"/>`;
  const label = (x: number, y: number, s: string, italic: boolean, size = 13) =>
    `<text x="${round2(x)}" y="${round2(y)}" text-anchor="middle" font-size="${size}"${italic ? ' font-style="italic"' : ""} fill="currentColor">${s}</text>`;

  // Right-angle squares at C and E (opening up-left), side in pixels.
  const sq = Math.min(10, 0.4 * ACv * sc, 0.4 * BCv * sc);
  const raMark = (X: number) =>
    `<path d="M ${round2(mx(X) - sq)} ${my(0)} L ${round2(mx(X) - sq)} ${round2(my(0) - sq)} L ${mx(X)} ${round2(my(0) - sq)}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;

  // AB value label: midpoint of A–B, offset perpendicular (up-left) by 22 px.
  const abLen = Math.sqrt(ABsq);
  const abLblX = mx(ACv / 2 - (22 / sc) * (BCv / abLen));
  const abLblY = my(BCv / 2 + (22 / sc) * (ACv / abLen)) + 4;

  return `<div style="width:100%;max-width:${W}px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
    `<polygon points="${mx(0)},${my(0)} ${mx(AEv)},${my(DEv)} ${mx(AEv)},${my(0)}" fill="#3b82f6" fill-opacity="0.12"/>` + // asked region: triangle ADE
    line(A, E) + line(E, D) + line(A, D) +   // big triangle ADE (B lies on AD)
    line(C, B) +                             // height BC of the small triangle
    raMark(ACv) + raMark(AEv) +              // right angles at C and E
    dot(A) + dot(B) + dot(C) + dot(D) + dot(E) +
    label(mx(0) - 14, my(0) + 4, "A", true) +
    label(mx(ACv), my(0) + 21, "C", true) +
    label(mx(AEv) + 13, my(0) + 4, "E", true) +
    label(mx(ACv) - 13, my(BCv) - 10, "B", true) +
    label(mx(AEv) + 14, my(DEv) - 4, "D", true) +
    label(mx(ACv / 2), my(0) + 39, `${ACv}`, false, 12) +                       // GIVEN: AC
    label(mx((ACv + AEv) / 2), my(0) + 39, `${CEv}`, false, 12) +              // GIVEN: CE
    label(abLblX, abLblY, `\u221A${ABsq}`, false, 12) +                         // GIVEN: AB
    `</svg></div>`;
};

export const generator_1328 = {
  metadata: {
    id: "1328",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values based on Pythagorean triple
    const scale = getRandomInt(1, 3);
    const AC = 3 * scale;
    const BC = 5 * scale;
    const AB_sq = AC * AC + BC * BC;
    
    // CE should make AE = AC + CE give nice ratio
    const CE = 21 * scale;
    
    // STEP 2: Calculate
    const AE = AC + CE;
    const ratio = AE / AC;
    const DE = BC * ratio;
    const area = 0.5 * AE * DE;
    
    if (Number.isInteger(area)) {
      // STEP 3: Build the figure from the live values (see buildFigure).
      const figureCode = buildFigure(AC, BC, AB_sq, CE, AE, DE);
      
      return {
        questionText: `In the figure shown, $AB=\\sqrt{${AB_sq}}$, $AC=${AC}$, and $CE=${CE}$. What is the area, in square units, of triangle $ADE$?`,
        figureCode: figureCode,
        options: [],
        correctAnswer: Math.round(area).toString(),
        explanation: `Triangles $ABC$ and $ADE$ are similar. $AE = AC + CE = ${AC} + ${CE} = ${AE}$. Similarity ratio $\\frac{AE}{AC} = \\frac{${AE}}{${AC}} = ${ratio}$. By Pythagorean theorem, $BC = \\sqrt{(${AB_sq}) - ${AC}^2} = ${BC}$. Height $DE = ${ratio} \\times ${BC} = ${DE}$. Area $= 0.5 \\times ${AE} \\times ${DE} = ${Math.round(area)}$.`
      };
    }
    
    // Fallback
    const fallbackScale = 1;
    const fallbackAC = 3;
    const fallbackBC = 5;
    const fallbackAB_sq = 34;
    const fallbackCE = 21;
    const fallbackAE = 24;
    const fallbackRatio = 8;
    const fallbackDE = 40;
    const fallbackArea = 480;
    
    const figureCode = buildFigure(fallbackAC, fallbackBC, fallbackAB_sq, fallbackCE, fallbackAE, fallbackDE);
    
    return {
      questionText: `In the figure shown, $AB=\\sqrt{${fallbackAB_sq}}$, $AC=${fallbackAC}$, and $CE=${fallbackCE}$. What is the area, in square units, of triangle $ADE$?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: fallbackArea.toString(),
      explanation: `Triangles $ABC$ and $ADE$ are similar. $AE = AC + CE = ${fallbackAC} + ${fallbackCE} = ${fallbackAE}$. Similarity ratio $\\frac{AE}{AC} = \\frac{${fallbackAE}}{${fallbackAC}} = ${fallbackRatio}$. By Pythagorean theorem, $BC = \\sqrt{(${fallbackAB_sq}) - ${fallbackAC}^2} = ${fallbackBC}$. Height $DE = ${fallbackRatio} \\times ${fallbackBC} = ${fallbackDE}$. Area $= 0.5 \\times ${fallbackAE} \\times ${fallbackDE} = ${fallbackArea}$.`
    };
  }
};