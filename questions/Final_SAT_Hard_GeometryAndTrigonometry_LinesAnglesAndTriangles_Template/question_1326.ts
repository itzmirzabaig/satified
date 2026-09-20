import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1326
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle XZY = 63°, answer: 153°]
 * - Difficulty factors: [Parallel lines, similar triangles, supplementary angles]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [PQ || XY creates similar triangles, angle chasing]
 * - Question type: [Figure→Fill in the blank]
 *
 * FIXED (figure rendered as a single stray line):
 * - The old figure never drew the triangle: legs XY and YZ appeared only as
 *   faint half-opacity axis lines, the hypotenuse XZ was not drawn at all,
 *   and the only solid stroke was segment PQ — hence "a single line". (The
 *   old mapper also fed toFixed() strings into the coordinate arithmetic,
 *   which only worked by implicit coercion.)
 * - P was misplaced by a wrong formula: pY = (pX/zX)*xY puts P on the
 *   diagonal from Y to the bounding-box corner, NOT on XZ. Correct placement
 *   on XZ is pY = xY*(1 - pX/zX).
 * - The drawn angle at Z never matched its label: xY and zX were drawn
 *   independently, so the drawn angle was atan(xY/zX) in [22°, 53°] while the
 *   stated angle ranges over [55°, 70°]. Now xY = zX*tan(angleXZY), so the
 *   drawn angle equals the stated one in every generation.
 * - Rebuilt as a clean SVG: solid triangle XYZ, segment PQ (vertical, so
 *   parallel to XY), right-angle mark at Y, the given angle arced and labeled
 *   at Z, and the asked angle XPQ arced in blue with x° at P. Mark sizes are
 *   pixel-normalized so they stay readable across the aspect ratios
 *   tan(55°..70°). Question logic, stem, answer, and explanation unchanged.
 */

type Pt = { x: number; y: number };
const rad = (d: number) => (d * Math.PI) / 180;
// CCW span from direction a1 to a2, normalized into [0, 360).
const ccwSpan = (a1: number, a2: number) => (((a2 - a1) % 360) + 360) % 360;

export const generator_1326 = {
  metadata: {
    id: "1326",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base angle
    const angleXZY = getRandomInt(55, 70);
    
    // STEP 2: Calculate
    const angleZPQ = 180 - 90 - angleXZY;
    const angleXPQ = 180 - angleZPQ;
    
    // STEP 3: Figure — built FROM angleXZY so every drawn angle equals its
    // label. Math coords, y up. Right angle at Y = (0, 0); Z = (zX, 0) on the
    // +x-axis; X = (0, xY) with xY = zX*tan(angleXZY). P is on XZ at x = pX
    // (pY = xY*(1 - pX/zX)), and Q = (pX, 0) directly below P, so PQ is
    // vertical and therefore parallel to XY.
    const zX = getRandomInt(6, 10);
    const xY = zX * Math.tan(rad(angleXZY)); // drawn angle XZY = angleXZY exactly

    // Uniform-scale mapper (angles must render true).
    const round2 = (v: number) => Math.round(v * 100) / 100;
    const W = 460, H = 310, PAD = 24;
    const xmin = -0.5, xmax = zX + 0.5;
    const ymin = -0.5, ymax = xY + 0.5;
    const sc = Math.min((W - 2 * PAD) / (xmax - xmin), (H - 2 * PAD) / (ymax - ymin));
    const ox = PAD + ((W - 2 * PAD) - (xmax - xmin) * sc) / 2;
    const oy = PAD + ((H - 2 * PAD) - (ymax - ymin) * sc) / 2;
    const mx = (v: number) => round2(ox + (v - xmin) * sc);
    const my = (v: number) => round2(H - (oy + (v - ymin) * sc));

    // P's x-coordinate: at least 2, and far enough from Y that the x° arc and
    // label fit in the corridor between XY and PQ (~34px), but never past 60%
    // of the base so P stays clear of Z.
    const pXlo = Math.max(2, Math.ceil(34 / sc));
    const pXhi = Math.max(pXlo, Math.floor(0.6 * zX));
    const pX = getRandomInt(pXlo, pXhi);
    const pY = xY * (1 - pX / zX); // P on segment XZ

    const vX: Pt = { x: 0, y: xY };
    const vY: Pt = { x: 0, y: 0 };
    const vZ: Pt = { x: zX, y: 0 };
    const vP: Pt = { x: pX, y: pY };
    const vQ: Pt = { x: pX, y: 0 };

    // SVG pieces.
    const line = (A: Pt, B: Pt) =>
      `<line x1="${mx(A.x)}" y1="${my(A.y)}" x2="${mx(B.x)}" y2="${my(B.y)}" stroke="currentColor" stroke-width="2"/>`;

    const dot = (V: Pt) => `<circle cx="${mx(V.x)}" cy="${my(V.y)}" r="2.5" fill="currentColor"/>`;

    // CCW arc from direction a1 to a2 (all directions here are symbolic
    // multiples of angleXZY — no atan2, so no branch-cut bugs).
    const arc = (V: Pt, a1: number, a2: number, r: number, color = "currentColor") => {
      const span = ccwSpan(a1, a2);
      let d = "";
      for (let i = 0; i <= 16; i++) {
        const t = rad(a1 + (span * i) / 16);
        d += `${i === 0 ? "M" : "L"}${mx(V.x + r * Math.cos(t))} ${my(V.y + r * Math.sin(t))} `;
      }
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.4"/>`;
    };

    // Label centered `dist` data-units away from V in direction `dir` (degrees).
    const labelAt = (V: Pt, dir: number, dist: number, s: string, italic: boolean, color = "currentColor") =>
      `<text x="${mx(V.x + dist * Math.cos(rad(dir)))}" y="${my(V.y + dist * Math.sin(rad(dir))) + 4}" text-anchor="middle" font-size="13"${italic ? ' font-style="italic"' : ""} fill="${color}">${s}</text>`;

    // Vertex label at a fixed PIXEL offset from the mapped point.
    const vlabel = (V: Pt, s: string, dx: number, dy: number) =>
      `<text x="${mx(V.x) + dx}" y="${my(V.y) + dy}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">${s}</text>`;

    // Mark sizes in pixels, converted to data units via sc, so the arcs and
    // the right-angle square stay readable at every triangle aspect ratio.
    const px = (n: number) => n / sc;
    const rZ = px(20);                                // given-angle arc at Z
    const rX = Math.min(px(20), 0.45 * pY, pX - 0.5); // asked-angle arc at P
    const sSq = px(14);                                // right-angle square at Y

    const rightAngle = `<path d="M ${mx(sSq)} ${my(0)} L ${mx(sSq)} ${my(sSq)} L ${mx(0)} ${my(sSq)}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;

    const figureCode =
      `<div style="width:100%;max-width:460px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      line(vX, vY) + line(vY, vZ) + line(vZ, vX) +   // triangle XYZ
      line(vP, vQ) +                                // PQ, parallel to XY
      rightAngle +                                  // right angle at Y
      arc(vZ, 180 - angleXZY, 180, rZ) +            // GIVEN: angle XZY at Z
      arc(vP, 180 - angleXZY, 270, rX, "#3b82f6") + // ASKED: angle XPQ at P
      dot(vX) + dot(vY) + dot(vZ) + dot(vP) + dot(vQ) +
      labelAt(vZ, 180 - angleXZY / 2, rZ + px(11), `${angleXZY}\u00B0`, false) +
      labelAt(vP, 248, rX + px(12), "x\u00B0", true, "#3b82f6") +
      labelAt(vP, 90 - angleXZY, px(17), "P", true) +
      vlabel(vX, "X", -11, -9) +
      vlabel(vY, "Y", -11, 17) +
      vlabel(vZ, "Z", 11, 17) +
      vlabel(vQ, "Q", 11, 17) +
      `</svg></div>`;
    
    return {
      questionText: `In triangle $XYZ$, angle $Y$ is a right angle, point $P$ lies on $\\overline{XZ}$, and point $Q$ lies on $\\overline{YZ}$ such that $\\overline{PQ}$ is parallel to $\\overline{XY}$. If the measure of angle $XZY$ is $${angleXZY}^\\circ$, what is the measure, in degrees, of angle $XPQ$?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: angleXPQ.toString(),
      explanation: `In $\\triangle ZQP$, $\\angle ZPQ = 180 - 90 - ${angleXZY} = ${angleZPQ}^\\circ$. Angle $XPQ$ is supplementary to $\\angle ZPQ$, so $180 - ${angleZPQ} = ${angleXPQ}$.`
    };
  }
};