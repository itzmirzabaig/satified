import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1461
 * 
 * FIXES:
 * - SVG Text: Replaced `${k}\\sqrt{3}` with `${k}√3` (Unicode) inside the SVG text tag so it renders correctly as text.
 * - Logic: Height to Perimeter relation maintained.
 *
 * FIXED (broken math text in the stem):
 * - The stem's height value was NOT wrapped in $...$ delimiters, so the
 *   renderer showed the raw `8\sqrt{3}` instead of math. Now wrapped in
 *   $...$ so it renders as a proper radical.
 *
 * FIXED (height label placement):
 * - At the old 250px scale, the label crossed the triangle's right side for
 *   double-digit k (at k = 15, ~10px overlap). Rebuilt at house scale
 *   (460px): label sits right of the dashed altitude, vertically centered
 *   on its midpoint, clearance from the right side verified for the widest
 *   label (k = 15).
 */

export const generator_1461 = {
  metadata: {
    id: "1461",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const k = getRandomInt(4, 15);
    // Height = k√3
    // Side s = 2k
    // Perimeter = 6k
    const perimeter = 6 * k;

    // 2. SVG Configuration (house scale; drawn height rounded to the pixel —
    //    242 vs 242.49, a 0.2% difference, visually indistinguishable).
    const W = 460, H = 320;
    const sDraw = 280;                            // drawn base length (px)
    const hDraw = Math.round((sDraw * Math.sqrt(3)) / 2);  // 242 — true proportions
    const apexX = W / 2;                          // 230
    const apexY = 35;
    const baseY = apexY + hDraw;                  // 277
    const leftX = apexX - sDraw / 2;               // 90
    const rightX = apexX + sDraw / 2;              // 370
    const footX = apexX;                          // altitude foot = base midpoint

    // Height label: right of the dashed altitude, baseline offset +6px so the
    // 16px text is vertically centered on the segment's midpoint.
    const midY = (apexY + baseY) / 2;              // 156
    const labelText = `${k}√3`;

    const svgCode = `
      <div style="width:100%;max-width:${W}px;margin:0 auto;">
        <svg viewBox="0 0 ${W} ${H}" style="width: 100%; height: auto; display: block; font-family: sans-serif;" xmlns="http://www.w3.org/2000/svg">
          <!-- Triangle -->
          <polygon points="${leftX},${baseY} ${rightX},${baseY} ${apexX},${apexY}" 
            fill="none" stroke="currentColor" stroke-width="2" />
          
          <!-- Height Line (dashed) -->
          <line x1="${apexX}" y1="${apexY}" x2="${footX}" y2="${baseY}" 
            stroke="currentColor" stroke-width="1.5" stroke-dasharray="4" />
          
          <!-- Right Angle Marker at the foot -->
          <polyline points="${footX},${baseY - 12} ${footX + 12},${baseY - 12} ${footX + 12},${baseY}" 
            fill="none" stroke="currentColor" stroke-width="1.5" />
          
          <!-- Label for Height (right of the dashed line, centered on its midpoint) -->
          <text x="${footX + 14}" y="${midY + 6}" 
            font-size="16" fill="currentColor">${labelText}</text>
        </svg>
      </div>
    `;

    return {
      questionText: `The height of the equilateral triangle shown is $${k}\\sqrt{3}$. What is the perimeter of the triangle?`,
      figureCode: svgCode,
      options: [], // Fill in the blank
      correctAnswer: perimeter.toString(),
      explanation: `
1. **Recall Formula:**
   The height $h$ of an equilateral triangle with side length $s$ is given by $h = \\frac{s\\sqrt{3}}{2}$.

2. **Solve for Side Length ($s$):**
   We are given $h = ${k}\\sqrt{3}$.
   $\\frac{s\\sqrt{3}}{2} = ${k}\\sqrt{3}$    $\\frac{s}{2} = ${k}$    $s = ${2 * k}$ 
3. **Calculate Perimeter:**
   The perimeter of an equilateral triangle is $3s$.
   $Perimeter = 3(${2 * k}) = ${perimeter}$.`
    };
  }
};