import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1464
 * 
 * ANALYSIS:
 * - Context: Similar Right Triangles & Trigonometry.
 * - Given: Triangle dimensions or trig ratio (tan).
 * - Find: Sine or Cosine of a corresponding angle.
 * - Logic: Trig ratios depend only on angle measure. If triangles are similar, corresponding angles are equal, so trig ratios are equal.
 */

export const generator_1464 = {
  metadata: {
    id: "1464",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // Use 20-21-29 triple
    const opp = 21;
    const adj = 20;
    const hyp = 29;
    
    // Scale factor for the "given" triangle
    const scale = getRandomInt(1, 3);
    const sOpp = opp * scale;
    const sAdj = adj * scale;
    const sHyp = hyp * scale;
    
    // Question: 
    // Triangle ABC is a right triangle with right angle at B.
    // AB = sAdj, BC = sOpp.
    // Triangle DEF is similar to ABC where D corresponds to A.
    // What is sin(D)?
    // sin(D) = sin(A) = Opp / Hyp = BC / AC = 21 / 29.
    
    const correctVal = `${opp}/${hyp}`;

    // 2. SVG Configuration
    const width = 300;
    const height = 220;
    const pad = 40;
    
    // Draw Triangle ABC
    // Right angle at B (bottom-right)
    // A at top-right? No, usually:
    // Vertical leg BC, Horizontal leg AB?
    // Let's put B at bottom-right.
    // AB (adj) is horizontal bottom.
    // BC (opp) is vertical right.
    // Hypotenuse AC connects top-right to bottom-left? No.
    // A is (pad, height-pad). B is (width-pad, height-pad). C is (width-pad, pad).
    // Angle A is at bottom-left.
    // Adjacent side AB is horizontal.
    // Opposite side BC is vertical.
    
    const pA = { x: pad, y: height - pad };
    const pB = { x: width - pad, y: height - pad };
    const pC = { x: width - pad, y: pad };
    
    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle ABC -->
        <polygon points="${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
          
        <!-- Right Angle Marker at B -->
        <polyline points="${pB.x},${pB.y - 20} ${pB.x - 20},${pB.y - 20} ${pB.x - 20},${pB.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
          
        <!-- Labels -->
        <text x="${pA.x - 15}" y="${pA.y + 10}" font-weight="bold" fill="currentColor">A</text>
        <text x="${pB.x + 10}" y="${pB.y + 10}" font-weight="bold" fill="currentColor">B</text>
        <text x="${pC.x + 10}" y="${pC.y - 5}" font-weight="bold" fill="currentColor">C</text>
        
        <!-- Side Lengths -->
        <text x="${(pA.x + pB.x) / 2}" y="${pB.y + 25}" text-anchor="middle" fill="currentColor">${sAdj}</text>
        <text x="${pB.x + 15}" y="${(pB.y + pC.y) / 2}" dominant-baseline="middle" fill="currentColor">${sOpp}</text>
      </svg>
    `;

    return {
      questionText: `Triangle $ABC$ is a right triangle with the right angle at $B$, as shown above. Triangle $DEF$ (not shown) is similar to triangle $ABC$, where vertex $D$ corresponds to vertex $A$, vertex $E$ corresponds to vertex $B$, and vertex $F$ corresponds to vertex $C$. What is the value of $\\sin D$?`,
      figureCode: svgCode,
      options: [], // Fill in the blank
      correctAnswer: correctVal,
      explanation: `
1. **Identify Corresponding Angles:**
   Since triangle $ABC$ is similar to triangle $DEF$, corresponding angles are congruent.
   Vertex $D$ corresponds to vertex $A$, so $\\angle D = \\angle A$.
   Therefore, $\\sin D = \\sin A$.

2. **Calculate $\\sin A$:**
   In right triangle $ABC$:
   - Opposite side to $A$ is $BC = ${sOpp}$.
   - Adjacent side to $A$ is $AB = ${sAdj}$.
   
   First, find the hypotenuse $AC$ using the Pythagorean theorem:
   $AC^2 = AB^2 + BC^2 = (${sAdj})^2 + (${sOpp})^2$
   $AC^2 = ${sAdj*sAdj} + ${sOpp*sOpp} = ${sHyp*sHyp}$
   $AC = ${sHyp}$
   
   Now, calculate the sine ratio:
   $\\sin A = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} = \\frac{BC}{AC} = \\frac{${sOpp}}{${sHyp}}$.
   
3. **Simplify:**
   $\\frac{${sOpp}}{${sHyp}} = \\frac{${opp}}{${hyp}}$`
    };
  }
};
