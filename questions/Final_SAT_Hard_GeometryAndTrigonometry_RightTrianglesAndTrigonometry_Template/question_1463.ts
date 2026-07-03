import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1463
 * 
 * ANALYSIS:
 * - Context: Right Triangle Trigonometry (Cosine Ratio).
 * - Given: Side lengths adjacent to angle x and hypotenuse.
 * - Find: cos(x).
 * - Logic: cos(x) = Adj / Hyp.
 */

export const generator_1463 = {
  metadata: {
    id: "1463",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // Use Pythagorean Triples or random reasonable numbers
    // Since it's fill-in-the-blank fraction, integer sides are preferred.
    const triples = [
      [11, 60, 61],
      [9, 40, 41],
      [12, 35, 37],
      [20, 21, 29]
    ];
    const triple = getRandomElement(triples) as [number, number, number];
    
    // Decide which leg is adjacent to x
    const adj = triple[0];
    const opp = triple[1];
    const hyp = triple[2];

    // 2. SVG Configuration
    const width = 300;
    const height = 200;
    const pad = 40;
    
    // Draw triangle
    // Right angle at bottom-right
    // Angle x at bottom-left
    // Adjacent side is bottom horizontal
    // Opposite side is right vertical
    
    const pCorner = { x: width - pad, y: height - pad }; // Right Angle
    const pTop = { x: width - pad, y: pad };
    const pLeft = { x: pad, y: height - pad }; // Angle x

    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${pCorner.x},${pCorner.y} ${pTop.x},${pTop.y} ${pLeft.x},${pLeft.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
        
        <!-- Right Angle Marker -->
        <polyline points="${pCorner.x},${pCorner.y - 15} ${pCorner.x - 15},${pCorner.y - 15} ${pCorner.x - 15},${pCorner.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
          
        <!-- Angle x Marker -->
        <path d="M ${pLeft.x + 30} ${pLeft.y} A 30 30 0 0 0 ${pLeft.x + 25} ${pLeft.y - 15}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
        <text x="${pLeft.x + 40}" y="${pLeft.y - 5}" font-size="16" fill="currentColor">x°</text>
        
        <!-- Labels -->
        <!-- Adjacent Side (Bottom) -->
        <text x="${(pLeft.x + pCorner.x) / 2}" y="${pCorner.y + 25}" 
          font-size="16" font-weight="bold" fill="currentColor" text-anchor="middle">${adj}</text>
          
        <!-- Hypotenuse -->
        <text x="${(pLeft.x + pTop.x) / 2 - 10}" y="${(pLeft.y + pTop.y) / 2 - 10}" 
          font-size="16" font-weight="bold" fill="currentColor">${hyp}</text>
          
        <!-- Opposite (optional, usually blank in this specific problem type, but could add for confusion? No, stick to given info) -->
        <!-- We only label Adj and Hyp to make it a direct recall question -->
      </svg>
    `;

    return {
      questionText: `In the right triangle shown above, what is the value of $\\cos x^{\\circ}$?`,
      figureCode: svgCode,
      options: [], // Fill in the blank
      correctAnswer: `${adj}/${hyp}`,
      explanation: `In a right triangle, the cosine of an acute angle is defined as the ratio of the length of the adjacent side to the length of the hypotenuse.
      
$\\cos x^{\\circ} = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$

From the figure:
- The side adjacent to angle $x^{\\circ}$ has length ${adj}.
- The hypotenuse has length ${hyp}.

Therefore, $\\cos x^{\\circ} = \\frac{${adj}}{${hyp}}$.`
    };
  }
};
