import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1461
 * 
 * FIXES:
 * - SVG Text: Replaced `${k}\\sqrt{3}` with `${k}√3` (Unicode) inside the SVG text tag so it renders correctly as text.
 * - Logic: Height to Perimeter relation maintained.
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

    // 2. SVG Configuration
    const width = 250;
    const height = 220;
    const pad = 30;
    
    // Draw Equilateral Triangle
    const sDraw = 160;
    const hDraw = sDraw * Math.sqrt(3) / 2;
    
    const pTop = { x: width / 2, y: pad };
    const pLeft = { x: (width - sDraw) / 2, y: pad + hDraw };
    const pRight = { x: (width + sDraw) / 2, y: pad + hDraw };
    const pBaseMid = { x: width / 2, y: pad + hDraw };

    // Use Unicode Square Root (√) for SVG text label
    const labelText = `${k}√3`;

    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 250px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${pLeft.x},${pLeft.y} ${pRight.x},${pRight.y} ${pTop.x},${pTop.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
          
        <!-- Height Line (dashed) -->
        <line x1="${pTop.x}" y1="${pTop.y}" x2="${pBaseMid.x}" y2="${pBaseMid.y}" 
          stroke="currentColor" stroke-width="1.5" stroke-dasharray="4" />
          
        <!-- Right Angle Marker -->
        <polyline points="${pBaseMid.x},${pBaseMid.y - 10} ${pBaseMid.x + 10},${pBaseMid.y - 10} ${pBaseMid.x + 10},${pBaseMid.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
          
        <!-- Label for Height -->
        <text x="${pBaseMid.x + 8}" y="${(pTop.y + pBaseMid.y) / 2}" 
          font-size="16" fill="currentColor">${labelText}</text>
      </svg>
    `;

    return {
      questionText: `The height of the equilateral triangle shown is ${k}\\sqrt{3}. What is the perimeter of the triangle?`,
      figureCode: svgCode,
      options: [], // Fill in the blank
      correctAnswer: perimeter.toString(),
      explanation: `
1. **Recall Formula:**
   The height $h$ of an equilateral triangle with side length $s$ is given by $h = \\frac{s\\sqrt{3}}{2}$.

2. **Solve for Side Length ($s$):**
   We are given $h = ${k}\\sqrt{3}$.
   $\\frac{s\\sqrt{3}}{2} = ${k}\\sqrt{3}$
   $\\frac{s}{2} = ${k}$
   $s = ${2 * k}$

3. **Calculate Perimeter:**
   The perimeter of an equilateral triangle is $3s$.
   $Perimeter = 3(${2 * k}) = ${perimeter}$.`
    };
  }
};
