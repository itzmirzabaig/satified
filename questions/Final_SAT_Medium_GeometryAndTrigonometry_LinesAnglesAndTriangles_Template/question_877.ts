import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 877
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: base angles, linear relationship y = 2x + 8]
 * - Difficulty factors: [Parallel lines, same-side interior angles, supplementary, simple algebra]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [y and base angle supplementary (sum to 180), y = 2x + 8]
 * - Question type: [Figure->Fill in the blank]
 * - Figure generation: [Parallel lines with transversal, angle labels]
 *
 * FIXED:
 * - Every angle measure is now inside $...$ math (the old bare
 *   `${base}^{\circ}$` left unbalanced $ and odd-$ TeX errors).
 * - Collapsed doubled backslashes (\\\\circ -> \\circ).
 * - Built the promised figure as a plain-SVG template literal: parallel
 *   lines q and r cut by transversal s, with the live y and base-angle
 *   measures labeled so the drawing matches the numbers every draw.
 * - Chose x in [25,55] so base = 180 - (2x+8) stays a sensible angle
 *   (62 to 122 degrees); no retry needed. Answer is the integer x.
 */

export const generator_877 = {
  metadata: {
    id: "877",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: pick x so every derived angle is clean and sensible.
    const x = getRandomInt(25, 55);
    const y = 2 * x + 8;             // y in [58, 118]
    const baseAngle = 180 - y;      // same-side interior angle, in [62, 122]

    // STEP 2: figure — lines q (top) and r (bottom) parallel, transversal s.
    const W = 420, H = 260;
    const qY = 90, rY = 180;        // horizontal parallel lines
    // Transversal s: lower-left to upper-right, hitting q at Tx1, r at Tx2.
    const Tx1 = 250, Tx2 = 150;     // x where s meets q (top) and r (bottom)
    const slope = (rY - qY) / (Tx2 - Tx1);
    const sAtX = (yy: number) => Tx1 + (yy - qY) / slope; // x on s for a given y
    const sTopX = sAtX(qY - 60);   // extend s above q
    const sBotX = sAtX(rY + 50);   // extend s below r
    const svg =
      `<div style="width:100%;max-width:420px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // parallel lines
      `<line x1="30" y1="${qY}" x2="${W - 30}" y2="${qY}" stroke="currentColor" stroke-width="2"/>` +
      `<line x1="30" y1="${rY}" x2="${W - 30}" y2="${rY}" stroke="currentColor" stroke-width="2"/>` +
      // transversal
      `<line x1="${sTopX}" y1="${qY - 60}" x2="${sBotX}" y2="${rY + 50}" stroke="#3b82f6" stroke-width="2"/>` +
      // line labels
      `<text x="${W - 24}" y="${qY - 6}" font-size="14" font-style="italic" fill="currentColor">q</text>` +
      `<text x="${W - 24}" y="${rY - 6}" font-size="14" font-style="italic" fill="currentColor">r</text>` +
      `<text x="${sBotX + 6}" y="${rY + 46}" font-size="14" font-style="italic" fill="#3b82f6">s</text>` +
      // angle labels: y at top-interior-right, base at bottom-interior-right
      `<text x="${Tx1 + 12}" y="${qY + 26}" font-size="13" fill="currentColor">${y}°</text>` +
      `<text x="${Tx2 + 12}" y="${rY - 12}" font-size="13" fill="currentColor">${baseAngle}°</text>` +
      `</svg></div>`;

    // STEP 3: return question data (fill-in; answer is the integer x).
    return {
      questionText: `In the figure, line $q$ is parallel to line $r$, and both lines are intersected by line $s$. If $y = 2x + 8$, what is the value of $x$?`,
      figureCode: svg,
      options: [],
      correctAnswer: x.toString(),
      explanation: `The correct answer is ${x}. In the figure, the angle measuring $y^{\\circ}$ and the same-side interior angle measuring ${baseAngle}° are formed by the parallel lines $q$ and $r$ together with the transversal $s$. Same-side interior angles are supplementary, so $y + ${baseAngle} = 180$, which gives $y = ${y}$. Substituting $(2x + 8)$ for $y$ gives the equation $(2x + 8) = ${y}$, so $x = ${x}$.`
    };
  }
};
