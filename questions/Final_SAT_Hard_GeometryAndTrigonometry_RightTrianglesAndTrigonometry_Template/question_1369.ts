import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1369
 * 
 * FIXES:
 * - Replaced broken code with a proper SVG of a right triangle.
 * - Logic: Generate legs such that Hypotenuse = k * sqrt(d).
 *   Legs a, b. a^2 + b^2 = k^2 * d.
 *   Let a = k * x, b = k * y.
 *   Hypotenuse = k * sqrt(x^2 + y^2).
 *   So d = x^2 + y^2.
 *   We choose x, y such that x^2 + y^2 is not a perfect square (so d remains inside sqrt).
 */

export const generator_1369 = {
  metadata: {
    id: "1369",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Logic
    // We need Hypotenuse = 3 * sqrt(d) (or m * sqrt(d))
    // Let multiplier m = 3 (fixed per original question style) or random small int.
    const m = 3; 
    
    // Choose base legs x, y such that x^2 + y^2 = d (where d is not a perfect square)
    // Common non-square sums of squares:
    // 7^2 + 8^2 = 49 + 64 = 113
    // 5^2 + 8^2 = 25 + 64 = 89
    // 4^2 + 7^2 = 16 + 49 = 65
    // 2^2 + 7^2 = 4 + 49 = 53
    
    const basePairs = [
      [7, 8], // d=113
      [5, 8], // d=89
      [4, 7], // d=65
      [2, 7]  // d=53
    ];
    
    const pair = getRandomElement(basePairs) as [number, number];
    const x = pair[0];
    const y = pair[1];
    
    const d = x * x + y * y;
    
    // Actual legs
    const leg1 = m * x;
    const leg2 = m * y;
    
    // 2. SVG Generation
    const width = 300;
    const height = 250;
    const pad = 40;
    
    // Scale drawing to fit
    // Max dimension is roughly max(leg1, leg2)
    // We just draw a generic right triangle and label it.
    
    const pCorner = { x: pad, y: height - pad }; // Right Angle (Bottom-Left)
    const pTop = { x: pad, y: pad }; // Top
    const pRight = { x: width - pad, y: height - pad }; // Right
    
    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${pCorner.x},${pCorner.y} ${pRight.x},${pRight.y} ${pTop.x},${pTop.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
          
        <!-- Right Angle Marker -->
        <polyline points="${pCorner.x},${pCorner.y - 20} ${pCorner.x + 20},${pCorner.y - 20} ${pCorner.x + 20},${pCorner.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
          
        <!-- Labels for Legs -->
        <text x="${pCorner.x - 10}" y="${(pCorner.y + pTop.y) / 2}" 
          font-size="16" fill="currentColor" text-anchor="end" dominant-baseline="middle">${leg1}</text>
          
        <text x="${(pCorner.x + pRight.x) / 2}" y="${pCorner.y + 25}" 
          font-size="16" fill="currentColor" text-anchor="middle">${leg2}</text>
      </svg>
    `;

    return {
      questionText: `A right triangle has legs with lengths of ${leg1} centimeters and ${leg2} centimeters. If the length of this triangle's hypotenuse, in centimeters, can be written in the form $${m}\\sqrt{d}$, where $d$ is an integer, what is the value of $d$?`,
      figureCode: svgCode,
      options: null, // Fill in the blank
      correctAnswer: d.toString(),
      explanation: `
1. **Use Pythagorean Theorem:**
   $a^2 + b^2 = c^2$
   $(${leg1})^2 + (${leg2})^2 = c^2$
   $${leg1 * leg1} + ${leg2 * leg2} = c^2$
   $${leg1 * leg1 + leg2 * leg2} = c^2$

2. **Simplify the Radical:**
   $c = \\sqrt{${leg1 * leg1 + leg2 * leg2}}$
   
   Factor out the perfect square. We know the legs were $${m} \\times ${x}$ and $${m} \\times ${y}$.
   So sum is $${m}^2(${x}^2 + ${y}^2) = ${m * m}(${d})$.
   $c = \\sqrt{${m * m} \\cdot ${d}} = ${m}\\sqrt{${d}}$.

3. **Identify d:**
   Comparing to the form $${m}\\sqrt{d}$, we see that $d = ${d}$.`
    };
  }
};
