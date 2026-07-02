import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1460
 * 
 * ANALYSIS:
 * - Context: Square inscribed in a circle.
 * - Given: Radius r.
 * - Find: Perimeter of the square.
 * - Logic: 
 *   The diagonal of the square is the diameter of the circle (2r).
 *   Let side of square be s. Diagonal = s√2.
 *   s√2 = 2r => s = (2r)/√2 = r√2.
 *   Perimeter = 4s = 4r√2.
 */

export const generator_1460 = {
  metadata: {
    id: "1460",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Generate Values
    // Make radius a multiple of sqrt(2) or just an integer? 
    // Let's make r a "something sqrt(2)" value so the side length comes out as an integer, 
    // which is common in SAT non-calculator style problems (though calc is allowed now).
    // Let r = k * sqrt(2).
    // Diameter = 2 * k * sqrt(2).
    // Diagonal of square = s * sqrt(2) = 2 * k * sqrt(2)
    // s = 2k.
    // Perimeter = 8k.
    
    const k = getRandomInt(5, 12);
    const radiusDisplay = `${k}\\sqrt{2}`; 
    const sideLength = 2 * k;
    const perimeter = 4 * sideLength;

    // 2. SVG Configuration
    const size = 300;
    const cx = size / 2;
    const cy = size / 2;
    const rDraw = 100; // Visual radius
    
    // Square coordinates inscribed in circle
    // Corners at 45, 135, 225, 315 degrees
    // x = cx + r*cos(theta), y = cy + r*sin(theta)
    const corners = [45, 135, 225, 315].map(deg => {
      const rad = deg * Math.PI / 180;
      return {
        x: cx + rDraw * Math.cos(rad),
        y: cy + rDraw * Math.sin(rad)
      };
    });

    const svgCode = `
      <svg viewBox="0 0 ${size} ${size}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto;">
        <!-- Circle -->
        <circle cx="${cx}" cy="${cy}" r="${rDraw}" fill="none" stroke="currentColor" stroke-width="2" />
        
        <!-- Inscribed Square -->
        <polygon points="${corners.map(p => `${p.x},${p.y}`).join(' ')}" 
          fill="#3b82f6" fill-opacity="0.2" stroke="currentColor" stroke-width="2" />
          
        <!-- Radius Line -->
        <line x1="${cx}" y1="${cy}" x2="${corners[0].x}" y2="${corners[0].y}" 
          stroke="currentColor" stroke-width="1.5" stroke-dasharray="4" />
          
        <!-- Radius Label -->
        <text x="${cx + 20}" y="${cy - 10}" fill="currentColor" font-size="16">r</text>
        
        <!-- Center Point -->
        <circle cx="${cx}" cy="${cy}" r="3" fill="currentColor" />
      </svg>
    `;

    // 3. Options
    // Correct: 8k
    // Distractor 1: 4k (using radius as side)
    // Distractor 2: 4k * sqrt(2) (forgetting to multiply/divide correctly)
    // Distractor 3: 2k * sqrt(2)
    
    const optionsData = [
      { text: `${perimeter}`, isCorrect: true },
      { text: `${4 * k}`, isCorrect: false },
      { text: `${4 * k}\\sqrt{2}`, isCorrect: false },
      { text: `${8 * k}\\sqrt{2}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `A square is inscribed in a circle with radius $${radiusDisplay}$ inches. What is the perimeter of the square in inches?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1. **Identify the relationship:**
   When a square is inscribed in a circle, the diagonal of the square is equal to the diameter of the circle.

2. **Calculate the diameter:**
   Given radius $r = ${radiusDisplay}$.
   Diameter $d = 2 \\times r = 2 \\times ${radiusDisplay} = ${2 * k}\\sqrt{2}$.

3. **Calculate the side length ($s$):**
   For a square with side $s$, the diagonal is $s\\sqrt{2}$.
   $s\\sqrt{2} = ${2 * k}\\sqrt{2}$
   $s = ${2 * k}$

4. **Calculate the perimeter:**
   Perimeter $P = 4s = 4(${2 * k}) = ${perimeter}$.`
    };
  }
};
