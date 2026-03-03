import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 25da87f8
 * 
 * FIXES:
 * - Replaced broken code with a clean SVG 30-60-90 triangle.
 * - Fixed LaTeX formatting for square roots and degree symbols.
 * - Ensured mathematical consistency between the perimeter string and the side calculation.
 */

export const generator_25da87f8 = {
  metadata: {
    id: "25da87f8",
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
    
    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 350px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${pRightAngle.x},${pRightAngle.y} ${pFar.x},${pFar.y} ${pTop.x},${pTop.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />

        <!-- Right Angle Marker -->
        <polyline points="${pRightAngle.x},${pRightAngle.y - 15} ${pRightAngle.x + 15},${pRightAngle.y - 15} ${pRightAngle.x + 15},${pRightAngle.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />

        <!-- 30 Degree Arc (at Far point, opposite short leg) -->
        <path d="M ${pFar.x - 40} ${pFar.y} A 40 40 0 0 1 ${pFar.x - 35} ${pFar.y - 20}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
        <text x="${pFar.x - 55}" y="${pFar.y - 10}" fill="currentColor" font-size="14">30°</text>

        <!-- 60 Degree Arc (at Top point, opposite long leg) -->
        <path d="M ${pTop.x} ${pTop.y + 30} A 30 30 0 0 0 ${pTop.x + 15} ${pTop.y + 26}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
        <text x="${pTop.x + 10}" y="${pTop.y + 50}" fill="currentColor" font-size="14">60°</text>
      </svg>
    `;

    return {
      questionText: `A triangle with angle measures $30^{\\circ}$, $60^{\\circ}$, and $90^{\\circ}$ has a perimeter of $${termConst} + ${termRad}\\sqrt{3}$. What is the length of the longest side of the triangle?`,
      figureCode: svgCode,
      options: null, // Fill in the blank
      correctAnswer: longestSide.toString(),
      explanation: `Choice ${longestSide} is correct. 
      
1. **Identify Side Ratios:**
   In a $30^{\\circ}-60^{\\circ}-90^{\\circ}$ triangle, the side lengths are in the ratio $x : x\\sqrt{3} : 2x$.
   - Shortest side (opposite $30^{\\circ}$) = $x$
   - Longer leg (opposite $60^{\\circ}$) = $x\\sqrt{3}$
   - Longest side (hypotenuse, opposite $90^{\\circ}$) = $2x$

2. **Set up Perimeter Equation:**
   Perimeter $P = x + x\\sqrt{3} + 2x = 3x + x\\sqrt{3}$.
   
3. **Solve for $x$:**
   We are given the perimeter is $${termConst} + ${termRad}\\sqrt{3}$.
   Matching the terms with $3x + x\\sqrt{3}$:
   $3x = ${termConst} \\Rightarrow x = ${x}$
   (We can also verify $x\\sqrt{3} = ${termRad}\\sqrt{3} \\Rightarrow x = ${termRad}$)

4. **Calculate Longest Side:**
   The longest side is the hypotenuse, $2x$.
   Length = $2(${x}) = ${longestSide}$.`
    };
  }
};