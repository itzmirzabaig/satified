import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 888
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Hypotenuse: 8, 30° angle, opposite side: 4 (half hypotenuse)]
 * - Difficulty factors: [30-60-90 triangle properties, side opposite 30° is half hypotenuse]
 * - Distractor patterns: [Fill-in-the-blank, no multiple choice]
 * - Constraints: [Must be 30-60-90 triangle, answer is half the hypotenuse]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [30-60-90 triangle with labeled angles]
 */

export const generator_888 = {
  metadata: {
    id: "888",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate 30-60-90 triangle.
    // Original: hypotenuse = 8, answer = 4.
    // Use an even hypotenuse so the short leg (answer) is an integer.
    const hypotenuse = getRandomInt(6, 20) * 2; // Even numbers 12..40

    // 30-60-90 side relationships (right angle at R):
    //   short leg = opposite 30°  = hypotenuse / 2   (this is the answer)
    //   long  leg = opposite 60°  = short leg * sqrt(3)
    const shortLeg = hypotenuse / 2; // integer 6..20
    const longLeg = (hypotenuse * Math.sqrt(3)) / 2; // used only for figure geometry

    // STEP 2: Build a clean SVG figure that actually draws the triangle.
    // Vertices: P (30° angle) at origin, R (right angle) on the x-axis,
    // Q (60° angle) above R. Segment PQ is the hypotenuse; QR is the short
    // leg (opposite the 30° angle at P) and is labelled x.
    const W = 420, H = 300, M = 46;
    const spanX = longLeg;   // horizontal extent (P to R)
    const spanY = shortLeg;  // vertical extent (R to Q)
    const sx = (W - 2 * M) / spanX;
    const sy = (H - 2 * M) / spanY;
    const s = Math.min(sx, sy);
    // Screen coordinates (y grows downward), baseline near the bottom.
    const baseY = H - M;
    const Px = M, Py = baseY;
    const Rx = M + longLeg * s, Ry = baseY;
    const Qx = M + longLeg * s, Qy = baseY - shortLeg * s;
    const r2 = (v: number) => Math.round(v * 100) / 100;
    const P = `${r2(Px)},${r2(Py)}`;
    const R = `${r2(Rx)},${r2(Ry)}`;
    const Q = `${r2(Qx)},${r2(Qy)}`;
    // Small square marking the right angle at R.
    const box = 12;
    const rightAngle = `M ${r2(Rx)} ${r2(Ry - box)} L ${r2(Rx - box)} ${r2(Ry - box)} L ${r2(Rx - box)} ${r2(Ry)}`;

    const figureCode = `<div style="width:100%;max-width:420px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      `<polygon points="${P} ${R} ${Q}" fill="#3b82f6" fill-opacity="0.08" stroke="#3b82f6" stroke-width="2"/>` +
      `<path d="${rightAngle}" fill="none" stroke="currentColor" stroke-width="1.4"/>` +
      `<text x="${r2(Px - 6)}" y="${r2(Py + 18)}" text-anchor="middle" font-size="14" fill="currentColor">P</text>` +
      `<text x="${r2(Px + 30)}" y="${r2(Py - 8)}" text-anchor="middle" font-size="13" fill="currentColor">30°</text>` +
      `<text x="${r2(Rx + 14)}" y="${r2(Ry + 18)}" text-anchor="middle" font-size="14" fill="currentColor">R</text>` +
      `<text x="${r2(Qx + 14)}" y="${r2(Qy - 6)}" text-anchor="middle" font-size="14" fill="currentColor">Q</text>` +
      `<text x="${r2((Px + Qx) / 2 - 10)}" y="${r2((Py + Qy) / 2 - 6)}" text-anchor="end" font-size="14" font-style="italic" fill="currentColor">${hypotenuse}</text>` +
      `<text x="${r2(Rx + 12)}" y="${r2((Ry + Qy) / 2 + 4)}" text-anchor="start" font-size="14" font-style="italic" fill="currentColor">x</text>` +
      `</svg></div>`;

    // STEP 3: Answer is the side opposite the 30° angle = half the hypotenuse.
    const answer = shortLeg;

    // STEP 4: Return question data.
    return {
      questionText: "In right triangle $PQR$ shown above, the measure of angle $P$ is 30 degrees and the measure of angle $R$ is 90 degrees. If the hypotenuse has length " + hypotenuse + ", what is the length of side $x$, the side opposite the 30-degree angle?",
      figureCode,
      options: [], // Fill-in-the-blank
      correctAnswer: answer.toString(),
      explanation: `In a 30-60-90 right triangle, the side opposite the 30-degree angle is half the length of the hypotenuse. The hypotenuse here has length ${hypotenuse}, so $x = \\frac{${hypotenuse}}{2} = ${answer}$.`
    };
  }
};
