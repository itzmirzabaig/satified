import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ae041e52
 * 
 * FIXES:
 * - Replaced broken/unrelated SVG code with a proper drawing of a square inscribed in a circle.
 * - Fixed option generation to returns strings.
 * - Fixed LaTeX formatting.
 */

export const generator_ae041e52 = {
  metadata: {
    id: "ae041e52",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Math Logic:
    // Square inscribed in circle.
    // Diagonal of square = Diameter of circle.
    // Let side = s. Diagonal = s√2.
    // Radius r. Diameter = 2r.
    // s√2 = 2r => s = (2r)/√2 = r√2.
    
    // We generate a side length 's' (e.g. 20)
    // Then define radius r = (s * √2) / 2.
    // The question gives r and asks for s.
    
    const side = getRandomInt(10, 30) * 2; // Even number
    // Radius string for display: (side/2)√2
    const radiusLabel = `${side / 2}\\sqrt{2}`;
    
    // Distractors
    const d1 = `${side}\\sqrt{2}`; // Confusing s with diagonal
    const d2 = `${side / 2}\\sqrt{2}`; // Confusing s with radius
    const d3 = `${side * 2}`; // Diameter?

    const optionsData = [
      { text: side.toString(), isCorrect: true },
      { text: d1, isCorrect: false },
      { text: d2, isCorrect: false },
      { text: d3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // SVG Generation
    const size = 300;
    const cx = size / 2;
    const cy = size / 2;
    const rDraw = 100;
    
    // Square corners (45, 135, 225, 315 degrees)
    const corners = [45, 135, 225, 315].map(deg => {
      const rad = deg * Math.PI / 180;
      return {
        x: cx + rDraw * Math.cos(rad),
        y: cy + rDraw * Math.sin(rad)
      };
    });

    const svgCode = `
      <svg viewBox="0 0 ${size} ${size}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Circle -->
        <circle cx="${cx}" cy="${cy}" r="${rDraw}" fill="none" stroke="currentColor" stroke-width="2" />
        
        <!-- Square -->
        <polygon points="${corners.map(p => `${p.x},${p.y}`).join(' ')}" 
          fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-width="2" />
          
        <!-- Radius Line -->
        <line x1="${cx}" y1="${cy}" x2="${corners[0].x}" y2="${corners[0].y}" 
          stroke="currentColor" stroke-width="1.5" stroke-dasharray="4" />
          
        <!-- Radius Label -->
        <text x="${cx + 20}" y="${cy - 5}" fill="currentColor" font-size="14">r</text>
        
        <!-- Center Dot -->
        <circle cx="${cx}" cy="${cy}" r="3" fill="currentColor" />
      </svg>
    `;

    return {
      questionText: `A square is inscribed in a circle. The radius of the circle is $${radiusLabel}$ inches. What is the side length, in inches, of the square?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1. **Identify the Relationship:**
   The diagonal of a square inscribed in a circle is equal to the diameter of the circle.

2. **Calculate Diameter:**
   Given radius $r = ${radiusLabel}$.
   Diameter $d = 2r = 2(${side / 2}\\sqrt{2}) = ${side}\\sqrt{2}$.

3. **Calculate Side Length ($s$):**
   The diagonal of a square is given by $s\\sqrt{2}$.
   $s\\sqrt{2} = ${side}\\sqrt{2}$
   $s = ${side}$.`
    };
  }
};

/**
 * Question ID: c6dff223
 * 
 * ANALYSIS:
 * - Context: Similar Right Triangles & Trigonometry.
 * - Given: Triangle dimensions or trig ratio (tan).
 * - Find: Sine or Cosine of a corresponding angle.
 * - Logic: Trig ratios depend only on angle measure. If triangles are similar, corresponding angles are equal, so trig ratios are equal.
 */

export const generator_c6dff223 = {
  metadata: {
    id: "c6dff223",
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
      options: null, // Fill in the blank
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