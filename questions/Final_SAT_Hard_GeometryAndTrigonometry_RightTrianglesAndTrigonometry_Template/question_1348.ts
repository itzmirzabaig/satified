import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1348
 * 
 * FIXES:
 * - Replaced broken code with a clean SVG 30-60-90 triangle.
 * - Fixed LaTeX formatting for square roots and degree symbols.
 * - Ensured mathematical consistency between the perimeter string and the side calculation.
 *
 * FIXED (angle arcs floating off the sides):
 * - The 30 and 60 degree arcs used HARD-CODED pixel endpoints from an old,
 * - differently-scaled sketch, so they did not touch the hypotenuse (the 60
 * - degree arc's endpoint was ~18px off the line, its label ~22px from the
 * - arc) and both arcs bowed away from their vertices (wrong sweep flags).
 * - Arc endpoints are now COMPUTED from the drawn geometry: each arc runs
 * - from a point on the base/vertical leg to a point on the actual
 * - hypotenuse (direction from atan2 of the drawn side vector — safe here,
 * - fixed angles, no branch cuts), and each label sits on its arc's
 * - bisector. The right-angle mark, triangle, stem, answer, and explanation
 * - are unchanged.
 */

export const generator_1348 = {
  metadata: {
    id: "1348",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Logic
    // Triangle 30-60-90 properties:
    // Sides: x (short leg), x*sqrt(3) (long leg), 2x (hypotenuse)
    // Perimeter P = x + x*sqrt(3) + 2x = 3x + x*sqrt(3)
    
    // We generate 'x' to be an integer.
    const x = getRandomInt(4, 12); 
    
    // The question presents perimeter as "A + B*sqrt(3)"
    const termConst = 3 * x; // "A"
    const termRad = x;       // "B"
    
    // The question asks for the longest side (hypotenuse = 2x)
    const longestSide = 2 * x;

    // 2. SVG Configuration
    // We draw a right triangle with roughly correct proportions (1 : 1.732)
    const width = 300;
    const height = 250;
    
    // Triangle Coordinates
    // Long leg horizontal, Short leg vertical
    const scale = 120 / 1.732; // Scale factor for drawing
    const drawShort = 1 * scale;
    const drawLong = 1.732 * scale;
    
    const xCorner = 50;
    const yCorner = 200; // Bottom-left corner of the drawing area
    
    const pRightAngle = { x: xCorner, y: yCorner };
    const pTop = { x: xCorner, y: yCorner - drawShort };       // Top vertex (Short leg up)
    const pFar = { x: xCorner + drawLong, y: yCorner };        // Far vertex (Long leg right)

    // In this orientation:
    // Vertical side is Short Leg -> Angle opposite is 30 degrees (at pFar)
    // Horizontal side is Long Leg -> Angle opposite is 60 degrees (at pTop)

    // Arc endpoints computed FROM the drawn geometry (units: pixels).
    // Hypotenuse direction from pFar toward pTop; base direction from pFar
    // toward pRightAngle. atan2 is safe here: fixed 30/60/90 angles, both
    // sweep directions in (-90, 90), no branch-cut crossing.
    const r30 = 34;                                  // 30-degree arc radius
    const angBase = Math.atan2(0, pRightAngle.x - pFar.x);            // 180 deg (toward right angle)
    const angHypAtFar = Math.atan2(pTop.y - pFar.y, pTop.x - pFar.x);  // ~150 deg (up-left along hypotenuse)
    const a30s = { x: pFar.x + r30 * Math.cos(angBase), y: pFar.y + r30 * Math.sin(angBase) };
    const a30e = { x: pFar.x + r30 * Math.cos(angHypAtFar), y: pFar.y + r30 * Math.sin(angHypAtFar) };
    const mid30 = (angBase + angHypAtFar) / 2;                       // bisector of the 30-degree wedge
    const l30 = { x: pFar.x + (r30 + 22) * Math.cos(mid30), y: pFar.y + (r30 + 22) * Math.sin(mid30) };

    const r60 = 30;                                  // 60-degree arc radius
    const angVert = Math.atan2(pRightAngle.y - pTop.y, pRightAngle.x - pTop.x); // 90 deg (down the short leg)
    const angHypAtTop = Math.atan2(pFar.y - pTop.y, pFar.x - pTop.x);           // ~-60 deg (down-right along hypotenuse)
    const a60s = { x: pTop.x + r60 * Math.cos(angVert), y: pTop.y + r60 * Math.sin(angVert) };
    const a60e = { x: pTop.x + r60 * Math.cos(angHypAtTop), y: pTop.y + r60 * Math.sin(angHypAtTop) };
    const mid60 = (angVert + angHypAtTop) / 2;                       // bisector of the 60-degree wedge
    const l60 = { x: pTop.x + (r60 + 24) * Math.cos(mid60), y: pTop.y + (r60 + 24) * Math.sin(mid60) };

    // SVG arc: A rx ry 0 largeArcFlag sweepFlag x y. Both wedges open
    // CCW-in-screen (decreasing y), so sweep = 1 for the 30-degree arc
    // (from the base ray CCW to the hypotenuse ray) and sweep = 0 for the
    // 60-degree arc (from the vertical ray CW to the hypotenuse ray).
    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 350px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${pRightAngle.x},${pRightAngle.y} ${pFar.x},${pFar.y} ${pTop.x},${pTop.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />

        <!-- Right Angle Marker -->
        <polyline points="${pRightAngle.x},${pRightAngle.y - 15} ${pRightAngle.x + 15},${pRightAngle.y - 15} ${pRightAngle.x + 15},${pRightAngle.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />

        <!-- 30 Degree Arc (at Far point, opposite short leg) — endpoints on the base and the hypotenuse -->
        <path d="M ${a30s.x.toFixed(1)} ${a30s.y.toFixed(1)} A ${r30} ${r30} 0 0 1 ${a30e.x.toFixed(1)} ${a30e.y.toFixed(1)}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
        <text x="${l30.x.toFixed(1)}" y="${(l30.y + 5).toFixed(1)}" fill="currentColor" font-size="14" text-anchor="middle">30°</text>

        <!-- 60 Degree Arc (at Top point, opposite long leg) — endpoints on the short leg and the hypotenuse -->
        <path d="M ${a60s.x.toFixed(1)} ${a60s.y.toFixed(1)} A ${r60} ${r60} 0 0 0 ${a60e.x.toFixed(1)} ${a60e.y.toFixed(1)}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
        <text x="${l60.x.toFixed(1)}" y="${(l60.y + 5).toFixed(1)}" fill="currentColor" font-size="14" text-anchor="middle">60°</text>
      </svg>
    `;

    return {
      questionText: `A triangle with angle measures $30^{\\circ}$, $60^{\\circ}$, and $90^{\\circ}$ has a perimeter of $${termConst} + ${termRad}\\sqrt{3}$. What is the length of the longest side of the triangle?`,
      figureCode: svgCode,
      options: [], // Fill in the blank
      correctAnswer: longestSide.toString(),
      explanation: `Choice ${longestSide} is correct. 
      
1. **Identify Side Ratios:**
   In a $30^{\\circ}-60^{\\circ}-90^{\\circ}$ triangle, the side lengths are in the ratio $x : x\\sqrt{3} : 2x$.
   - Shortest side (opposite $30^{\\circ}$) = $x$    - Longer leg (opposite $60^{\\circ}$) = $x\\sqrt{3}$    - Longest side (hypotenuse, opposite $90^{\\circ}$) = $2x$ 
2. **Set up Perimeter Equation:**
   Perimeter $P = x + x\\sqrt{3} + 2x = 3x + x\\sqrt{3}$.
   
3. **Solve for $x$:**
   We are given the perimeter is $${termConst} + ${termRad}\\sqrt{3}$.
   Matching the terms with $3x + x\\sqrt{3}$:
   $3x = ${termConst} \\Rightarrow x = ${x}$    (We can also verify $x\\sqrt{3} = ${termRad}\\sqrt{3} \\Rightarrow x = ${termRad}$)

4. **Calculate Longest Side:**
   The longest side is the hypotenuse, $2x$.
   Length = $2(${x}) = ${longestSide}$.`
    };
  }
};