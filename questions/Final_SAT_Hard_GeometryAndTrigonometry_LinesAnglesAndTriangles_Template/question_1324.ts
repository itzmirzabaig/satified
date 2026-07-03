import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1324
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [lengths chosen so YZ = WX * YQ / WQ is a positive integer]
 * - Difficulty factors: [Similar triangles, proportional reasoning, AA similarity]
 * - Distractor patterns: [N/A - fill in the blank]
 * - Constraints: [Lines WZ and XY intersect at Q; triangles WQX and YQZ similar by AA
 *   via vertical angles at Q and congruent angles at W and Y]
 * - Question type: [Figure -> Fill in the blank]
 *
 * REBUILT: original figure IIFE was corrupted (broken _svg_* fragments, unbalanced
 * parens at line 54) causing IMPORT_FAIL. Rebuilt generate() with answer-first
 * integer construction (no rounded-display / exact-compute mismatch, no float
 * artifacts) and a clean fixed-layout schematic SVG (two lines crossing at Q, six
 * labeled vertices, no numeric length labels so the figure never contradicts a draw).
 */

export const generator_1324 = {
  metadata: {
    id: "1324",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Choose integer side lengths so YZ = WX * YQ / WQ is a positive integer.
    // Similar triangles WQX ~ YQZ (vertical angles at Q; angle W = angle Y).
    // Corresponding sides: WQ<->YQ, QX<->QZ, WX<->YZ  =>  YZ/WX = YQ/WQ.
    // Construction: pick WQ and YQ, reduce YQ/WQ to lowest terms p/q, then choose
    // WX as a multiple of q so YZ = WX * p / q = (WX / q) * p is always an integer.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    let WQ = 0, YQ = 0, WX = 0, YZ = 0;
    let tries = 0;
    do {
      tries++;
      WQ = getRandomInt(40, 90);
      YQ = getRandomInt(30, 90);
      const g = gcd(YQ, WQ);
      const p = YQ / g;         // numerator of reduced ratio
      const q = WQ / g;         // denominator of reduced ratio
      // WX in [40,90] and a multiple of q. Range of valid multiples:
      const loMult = Math.ceil(40 / q);
      const hiMult = Math.floor(90 / q);
      if (hiMult < loMult) { YZ = NaN; continue; } // q too large; retry
      WX = getRandomInt(loMult, hiMult) * q;
      YZ = (WX / q) * p;        // exact integer by construction
    } while (
      tries < 50 &&
      (
        !Number.isInteger(YZ) ||   // guaranteed integer, but assert defensively
        YZ < 10 ||                 // avoid degenerate tiny answers
        YZ > 200 ||
        YQ === WQ ||               // avoid a trivial 1:1 ratio
        WX === WQ                  // avoid the figure reading as congruent, not similar
      )
    );

    // Deterministic integer fallback if the bounded loop never hit a clean draw.
    if (!Number.isInteger(YZ) || YZ < 10 || YZ > 200 || YQ === WQ || WX === WQ) {
      WQ = 70; YQ = 63; WX = 60; YZ = (WX * YQ) / WQ; // = 54
    }

    // XQ is extra given information (corresponds to QZ but is not needed to find YZ).
    // Keep it a plausible integer larger than WX; never used in the calculation.
    const XQ = getRandomInt(WX + 20, WX + 80);

    // ---- Figure: two straight lines crossing at Q, drawn to a fixed schematic
    // layout (not to scale). No length numbers are drawn, so the picture is valid
    // for every draw. Coordinates in a 0..10 x 0..8 space.
    // Line WZ:  W(1,6.5) - Q(5,4) - Z(9,1.5)   (collinear through Q)
    // Line XY:  X(1,1.5) - Q(5,4) - Y(9,6.5)   (collinear through Q)
    const pts = {
      W: [1, 6.5], X: [1, 1.5], Q: [5, 4], Z: [9, 1.5], Y: [9, 6.5]
    } as const;
    const xmin = -1, xmax = 11, ymin = -1, ymax = 9;
    const W = 400, H = 320, P = 40;
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);
    const line = (a: readonly [number, number] | readonly number[], b: readonly number[]) =>
      `<line x1="${mx(a[0])}" y1="${my(a[1])}" x2="${mx(b[0])}" y2="${my(b[1])}" stroke="currentColor" stroke-width="2.5"/>`;
    const label = (p: readonly number[], dx: number, dy: number, t: string) =>
      `<text x="${mx(p[0]) + dx}" y="${my(p[1]) + dy}" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">${t}</text>`;
    const dot = (p: readonly number[]) =>
      `<circle cx="${mx(p[0])}" cy="${my(p[1])}" r="3" fill="#3b82f6"/>`;

    const figureCode =
      `<div style="width:100%;max-width:450px;margin:0 auto;">` +
      `<svg viewBox="0 0 400 320" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // full crossing lines
      line(pts.W, pts.Z) +
      line(pts.X, pts.Y) +
      // triangle bases WX (left) and YZ (right)
      line(pts.W, pts.X) +
      line(pts.Y, pts.Z) +
      // vertices
      dot(pts.W) + dot(pts.X) + dot(pts.Q) + dot(pts.Z) + dot(pts.Y) +
      // labels nudged outward
      label(pts.W, -12, -4, 'W') +
      label(pts.X, -12, 6, 'X') +
      label(pts.Q, 0, -8, 'Q') +
      label(pts.Z, 12, 6, 'Z') +
      label(pts.Y, 12, -4, 'Y') +
      `</svg></div>`;

    return {
      questionText:
        `In the figure shown, $\\overline{WZ}$ and $\\overline{XY}$ intersect at point $Q$, ` +
        `and $\\angle W$ is congruent to $\\angle Y$. ` +
        `$YQ = ${YQ}$, $WQ = ${WQ}$, $WX = ${WX}$, and $XQ = ${XQ}$. ` +
        `What is the length of $\\overline{YZ}$?`,
      figureCode,
      options: [],
      correctAnswer: YZ.toString(),
      explanation:
        `Since $\\overline{WZ}$ and $\\overline{XY}$ intersect at $Q$, the vertical angles ` +
        `$\\angle WQX$ and $\\angle YQZ$ are congruent. Together with the given congruent ` +
        `angles at $W$ and $Y$, triangles $WQX$ and $YQZ$ are similar by AA similarity, ` +
        `so corresponding sides are proportional: $\\frac{YZ}{WX} = \\frac{YQ}{WQ}$. ` +
        `Substituting the given values gives $\\frac{YZ}{${WX}} = \\frac{${YQ}}{${WQ}}$, ` +
        `so $YZ = ${WX} \\times \\frac{${YQ}}{${WQ}} = ${YZ}$. ` +
        `(The length $XQ = ${XQ}$ is extra information not needed to find $\\overline{YZ}$.)`
    };
  }
};
