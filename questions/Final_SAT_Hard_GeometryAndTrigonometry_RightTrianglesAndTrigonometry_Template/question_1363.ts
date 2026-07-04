import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1363
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 40-60, b: √80-√120, c: 50-70]
 * - Difficulty factors: [Complementary angles, cofunction identity]
 * - Constraints: [cos(RSW) = sin(WST) because angles sum to 90°]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with right angle at S]
 *
 * FIXED:
 * - Rebuilt the figure so it actually draws right triangle RST with the right
 *   angle at S (leg SR vertical, leg ST horizontal, RT the hypotenuse), labels
 *   R, S, T, and a right-angle marker at S. The old figure drew only two axes
 *   and two dots, with no triangle, no vertex labels, and no right-angle mark.
 * - Fixed the LaTeX degree symbol (was 90^{circ}, missing the backslash).
 */

export const generator_1363 = {
  metadata: {
    id: "1363",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // The answer relies only on the right angle at S (cofunction identity), so
    // the side lengths are purely for the figure's shape. Vary them for variety
    // while keeping the right angle at S.
    const legVert = getRandomInt(5, 8);   // SR (vertical leg)
    const legHorz = getRandomElement([6, 7, 8, 9]); // ST (horizontal leg)

    // --- Geometry (S at the origin) ---
    // S = (0, 0); R = (0, legVert) up the vertical leg; T = (legHorz, 0) along
    // the horizontal leg. Right angle at S is between SR (up) and ST (right).
    const Sx = 0, Sy = 0;
    const Rx = 0, Ry = legVert;
    const Tx = legHorz, Ty = 0;

    // --- SVG mapping with equal scale so the right angle reads true ---
    const W = 440, H = 300, PAD = 40;
    const dataMinX = -2, dataMaxX = legHorz + 2;
    const dataMinY = -2, dataMaxY = legVert + 2;
    const scale = Math.min(
      (W - 2 * PAD) / (dataMaxX - dataMinX),
      (H - 2 * PAD) / (dataMaxY - dataMinY)
    );
    const usedW = (dataMaxX - dataMinX) * scale;
    const usedH = (dataMaxY - dataMinY) * scale;
    const offX = (W - usedW) / 2;
    const offY = (H - usedH) / 2;
    const mx = (x: number) => offX + (x - dataMinX) * scale;
    const my = (y: number) => H - offY - (y - dataMinY) * scale;

    // Right-angle square at S, opening toward R (+y) and toward T (+x).
    const rs = Math.min(legVert, legHorz) * 0.16;
    const rightMark = `<polyline points="${mx(Sx + rs)},${my(Sy)} ${mx(Sx + rs)},${my(Sy + rs)} ${mx(Sx)},${my(Sy + rs)}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">`
      // Triangle RST
      + `<polygon points="${mx(Rx)},${my(Ry)} ${mx(Sx)},${my(Sy)} ${mx(Tx)},${my(Ty)}" fill="#3b82f6" fill-opacity="0.08" stroke="currentColor" stroke-width="2"/>`
      // Right-angle marker at S
      + rightMark
      // Vertex dots
      + `<circle cx="${mx(Rx)}" cy="${my(Ry)}" r="3.2" fill="currentColor"/>`
      + `<circle cx="${mx(Sx)}" cy="${my(Sy)}" r="3.2" fill="currentColor"/>`
      + `<circle cx="${mx(Tx)}" cy="${my(Ty)}" r="3.2" fill="currentColor"/>`
      // Labels
      + `<text x="${mx(Rx) - 12}" y="${my(Ry) + 5}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">R</text>`
      + `<text x="${mx(Sx) - 12}" y="${my(Sy) + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">S</text>`
      + `<text x="${mx(Tx) + 12}" y="${my(Ty) + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">T</text>`
      + `</svg></div>`;

    return {
      questionText: `In right triangle $RST$ above, the right angle is at $S$, and point $W$ (not shown) lies on $\\overline{RT}$. What is the value of $\\cos(\\angle RSW) - \\sin(\\angle WST)$?`,
      figureCode,
      options: [],
      correctAnswer: "0",
      explanation: `No matter where point $W$ lies on $\\overline{RT}$, the measures of $\\angle RSW$ and $\\angle WST$ add to the measure of $\\angle RST$, which is $90^{\\circ}$. So $\\angle RSW$ and $\\angle WST$ are complementary angles. Because the cosine of an angle equals the sine of its complement, $\\cos(\\angle RSW) = \\sin(\\angle WST)$, and their difference is $0$.`
    };
  }
};
