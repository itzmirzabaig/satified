import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1368
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [AE = 18, CB = 8, BD = 6]
 * - Difficulty factors: [Similar triangles, 3-4-5 triangle, scale factor]
 * - Constraints: [Scale factor = AE/BD = 18/6 = 3, CD = 10, CE = 30]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Nested similar right triangles]
 *
 * FIXED:
 * - Rebuilt the figure so it actually draws the right triangle CAE with the
 *   right angle at A, plus the nested segment BD (vertical, parallel to AE)
 *   with all five labeled points C, A, E, B, D placed at their true positions.
 *   The old figure drew only two axes and one diagonal segment with A off-screen.
 * - Corrected LaTeX escaping in the stem/explanation (\\parallel, \\triangle,
 *   \\sim, \\sqrt, \\times were double-escaped and rendered as line breaks).
 */

export const generator_1368 = {
  metadata: {
    id: "1368",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Small triangle CBD is a 3-4-5 scaled by baseScale.
    // Large triangle CAE is CBD scaled by scaleFactor.
    // Legs: BD = smallA (vertical), CB = smallB (horizontal); AE = largeA (vertical).
    const baseScale = getRandomInt(3, 6);
    const smallA = 3 * baseScale;          // BD, vertical leg of small triangle
    const smallB = 4 * baseScale;          // CB, horizontal leg of small triangle
    const smallHypotenuse = 5 * baseScale; // CD, hypotenuse of small triangle

    const scaleFactor = getRandomInt(2, 4);
    const largeA = smallA * scaleFactor;   // AE, vertical leg of large triangle
    const largeHypotenuse = smallHypotenuse * scaleFactor; // CE, hypotenuse of large triangle

    // --- Geometry (place C at the origin) ---
    // C = (0, 0); A = (CA, 0) with CA = CB * scaleFactor = smallB * scaleFactor (horizontal).
    // E = (CA, largeA) directly above A (AE vertical -> right angle at A).
    // B on CA at (smallB, 0); D on CE at (smallB, smallA) so BD is vertical (parallel to AE).
    const CA = smallB * scaleFactor;       // horizontal leg of large triangle
    const Cx = 0, Cy = 0;
    const Ax = CA, Ay = 0;
    const Ex = CA, Ey = largeA;
    const Bx = smallB, By = 0;
    const Dx = smallB, Dy = smallA;

    // --- SVG mapping: keep equal scale on x and y so the right angle reads true ---
    const W = 440, H = 320, PAD = 42;
    const dataMinX = -1, dataMaxX = CA + 4;
    const dataMinY = -3, dataMaxY = largeA + 4;
    const scale = Math.min(
      (W - 2 * PAD) / (dataMaxX - dataMinX),
      (H - 2 * PAD) / (dataMaxY - dataMinY)
    );
    // Center the drawing inside the viewport.
    const usedW = (dataMaxX - dataMinX) * scale;
    const usedH = (dataMaxY - dataMinY) * scale;
    const offX = (W - usedW) / 2;
    const offY = (H - usedH) / 2;
    const mx = (x: number) => offX + (x - dataMinX) * scale;
    const my = (y: number) => H - offY - (y - dataMinY) * scale;

    const rightMark = (() => {
      // Small right-angle square at A, opening toward C (−x) and toward E (+y).
      const s = Math.min(CA, largeA) * 0.10;
      const p1 = `${mx(Ax - s)},${my(Ay)}`;
      const p2 = `${mx(Ax - s)},${my(Ay + s)}`;
      const p3 = `${mx(Ax)},${my(Ay + s)}`;
      return `<polyline points="${p1} ${p2} ${p3}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    })();

    const figureCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">`
      // Large triangle CAE
      + `<polygon points="${mx(Cx)},${my(Cy)} ${mx(Ax)},${my(Ay)} ${mx(Ex)},${my(Ey)}" fill="#3b82f6" fill-opacity="0.08" stroke="currentColor" stroke-width="2"/>`
      // Segment BD (vertical, parallel to AE)
      + `<line x1="${mx(Bx)}" y1="${my(By)}" x2="${mx(Dx)}" y2="${my(Dy)}" stroke="#3b82f6" stroke-width="2.5"/>`
      // Right-angle marker at A
      + rightMark
      // Vertex dots
      + `<circle cx="${mx(Cx)}" cy="${my(Cy)}" r="3.2" fill="currentColor"/>`
      + `<circle cx="${mx(Ax)}" cy="${my(Ay)}" r="3.2" fill="currentColor"/>`
      + `<circle cx="${mx(Ex)}" cy="${my(Ey)}" r="3.2" fill="currentColor"/>`
      + `<circle cx="${mx(Bx)}" cy="${my(By)}" r="3.2" fill="#3b82f6"/>`
      + `<circle cx="${mx(Dx)}" cy="${my(Dy)}" r="3.2" fill="#3b82f6"/>`
      // Labels
      + `<text x="${mx(Cx) - 6}" y="${my(Cy) + 16}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">C</text>`
      + `<text x="${mx(Ax) + 12}" y="${my(Ay) + 16}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">A</text>`
      + `<text x="${mx(Ex) + 12}" y="${my(Ey) + 4}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">E</text>`
      + `<text x="${mx(Bx)}" y="${my(By) + 16}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">B</text>`
      + `<text x="${mx(Dx) - 12}" y="${my(Dy) - 3}" text-anchor="middle" font-size="14" font-style="italic" fill="currentColor">D</text>`
      + `</svg></div>`;

    return {
      questionText: `In the figure, right triangle $CAE$ has a right angle at $A$. $AE$ is vertical, $AC$ is horizontal, and $CE$ is the hypotenuse. Point $B$ lies on $AC$ and point $D$ lies on $CE$, with $BD \\parallel AE$. Given $AE = ${largeA}$, $CB = ${smallB}$, and $BD = ${smallA}$, what is the length of $CE$?`,
      figureCode,
      options: [], // Fill in the blank
      correctAnswer: largeHypotenuse.toString(),
      explanation: `Since $BD \\parallel AE$, triangle $CBD$ is similar to triangle $CAE$. In right triangle $CBD$, the hypotenuse is $CD = \\sqrt{${smallA}^2 + ${smallB}^2} = ${smallHypotenuse}$. The scale factor from $CBD$ to $CAE$ is $AE/BD = ${largeA}/${smallA} = ${scaleFactor}$. Therefore $CE = ${scaleFactor} \\times CD = ${scaleFactor} \\times ${smallHypotenuse} = ${largeHypotenuse}$.`
    };
  }
};
