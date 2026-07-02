import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1364
 * 
 * FIXES:
 * - Replaced broken/unrelated SVG code with a proper drawing of a square inscribed in a circle.
 * - Fixed option generation to returns strings.
 * - Fixed LaTeX formatting.
 */

export const generator_1364 = {
  metadata: {
    id: "1364",
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
