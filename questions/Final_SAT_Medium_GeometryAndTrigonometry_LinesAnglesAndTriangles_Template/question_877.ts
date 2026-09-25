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
 * - Chose x in [25,55] so base = 180 - (2x+8) stays a sensible angle
 *   (62 to 122 degrees); no retry needed. Answer is the integer x.
 *
 * FIXED (round 2 — arcs leaked past the parallel lines; stray "A"/"^" marks):
 * - Both angle arcs were computed in the WRONG wedges (a screen-coordinate
 *   mirroring error): the top arc sat ABOVE line q and the bottom arc BELOW
 *   line r — the exterior angles — instead of inside the strip. Corrected:
 *   both arcs now span the same-side interior pair (right of s, between the
 *   lines), and both labels sit on those wedges' bisectors. As a bonus, the
 *   drawn pair is supplementary by construction for any transversal angle,
 *   so the figure's structure is exact even though individual measures are
 *   schematic (SAT "not to scale" convention).
 * - Removed the parallel-line chevrons: they rendered as stray "A"/"^"
 *   glyphs far from the intersections. The stem states q || r in words.
 * - The y-degree label is intentional and required: the stem defines
 *   y = 2x + 8, so the figure must mark WHICH angle is y (x is the unknown
 *   of the equation, not an angle, and correctly does not appear).
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

    // STEP 2: figure — pixel coordinates, y down (SVG convention).
    // Parallel lines q (top, y=qY) and r (bottom, y=rY); transversal s rises
    // to the right at tAng above horizontal, crossing q at iTop and r at iBot.
    const D2R = Math.PI / 180;
    const tAng = 62;
    const W = 460, H = 260;
    const qY = 88, rY = 176;
    const iTop = { x: 262, y: qY };
    const k = (rY - qY) / Math.sin(tAng * D2R);                 // distance along s between the lines
    const iBot = { x: iTop.x - k * Math.cos(tAng * D2R), y: rY };
    // Extend s 60px past each intersection.
    const sTop = { x: iTop.x + 60 * Math.cos(tAng * D2R), y: iTop.y - 60 * Math.sin(tAng * D2R) };
    const sBot = { x: iBot.x - 60 * Math.cos(tAng * D2R), y: iBot.y + 60 * Math.sin(tAng * D2R) };

    // Arc of radius r around (cx, cy), from param angle a1 to a2 (degrees,
    // screen convention: 0 = right, 90 = down).
    const arc = (cx: number, cy: number, a1: number, a2: number, r: number, color = "currentColor") => {
      const span = (((a2 - a1) % 360) + 360) % 360;
      let d = "";
      for (let i = 0; i <= 16; i++) {
        const t = ((a1 + (span * i) / 16) * Math.PI) / 180;
        d += `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)} `;
      }
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.6"/>`;
    };

    // SAME-SIDE INTERIOR wedges (right of s, between the lines) — the
    // supplementary pair the explanation uses:
    //   top:  from ray along q rightward (0°) to ray down-left along s (180° − tAng)
    //   bottom: from ray up-right along s (−tAng) to ray along r rightward (0°)
    const topA1 = 0, topA2 = 180 - tAng;        // sweeps through DOWN (below q) ✓
    const botA1 = -tAng, botA2 = 0;             // sweeps through UP-RIGHT (above r) ✓
    const rArc = 26;
    const bisTop = (topA1 + topA2) / 2;          // 59° — down-right of iTop, inside the strip
    const bisBot = (botA1 + botA2) / 2;          // −31° — up-right of iBot, inside the strip
    const yLbl = { x: iTop.x + 46 * Math.cos(bisTop * D2R), y: iTop.y + 46 * Math.sin(bisTop * D2R) };
    const bLbl = { x: iBot.x + 46 * Math.cos(bisBot * D2R), y: iBot.y + 46 * Math.sin(bisBot * D2R) };

    const svg =
      `<div style="width:100%;max-width:460px;margin:0 auto;">` +
      `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      // parallel lines q (top) and r (bottom)
      `<line x1="30" y1="${qY}" x2="${W - 30}" y2="${qY}" stroke="currentColor" stroke-width="2"/>` +
      `<line x1="30" y1="${rY}" x2="${W - 30}" y2="${rY}" stroke="currentColor" stroke-width="2"/>` +
      // transversal s
      `<line x1="${sTop.x.toFixed(1)}" y1="${sTop.y.toFixed(1)}" x2="${sBot.x.toFixed(1)}" y2="${sBot.y.toFixed(1)}" stroke="#3b82f6" stroke-width="2"/>` +
      // arcs on the same-side interior pair (between the lines, right of s)
      arc(iTop.x, iTop.y, topA1, topA2, rArc, "#3b82f6") +
      arc(iBot.x, iBot.y, botA1, botA2, rArc) +
      // angle labels on their wedges' bisectors: y° (the stem's variable) and its measure partner
      `<text x="${yLbl.x.toFixed(1)}" y="${(yLbl.y + 4).toFixed(1)}" text-anchor="middle" font-size="13" fill="#3b82f6" font-style="italic">y\u00B0</text>` +
      `<text x="${bLbl.x.toFixed(1)}" y="${(bLbl.y + 4).toFixed(1)}" text-anchor="middle" font-size="13" fill="currentColor">${baseAngle}\u00B0</text>` +
      // line labels
      `<text x="${W - 22}" y="${qY - 8}" font-size="14" font-style="italic" fill="currentColor">q</text>` +
      `<text x="${W - 22}" y="${rY - 8}" font-size="14" font-style="italic" fill="currentColor">r</text>` +
      `<text x="${(sBot.x - 14).toFixed(1)}" y="${(sBot.y + 14).toFixed(1)}" font-size="14" font-style="italic" fill="#3b82f6">s</text>` +
      // intersection dots
      `<circle cx="${iTop.x}" cy="${iTop.y}" r="2.5" fill="currentColor"/>` +
      `<circle cx="${iBot.x}" cy="${iBot.y}" r="2.5" fill="currentColor"/>` +
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