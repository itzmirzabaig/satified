import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 16d66178
 * 
 * FIXES:
 * - Fixed LaTeX formatting: `^\\\\circ` changed to `^{\\circ}` to prevent "missing open brace" errors.
 * - Fixed options return type: Now returns `string[]` instead of `object[]`.
 * - Logic: Ensures angles A and B are complementary (sum to 90), making the identity valid.
 */

export const generator_16d66178 = {
  metadata: {
    id: "16d66178",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Generate complementary angles
    const angleA = getRandomInt(15, 40);
    const angleB = 90 - angleA;
    
    // The expression sin(A)cos(B) + cos(A)sin(B) is the expansion of sin(A+B)
    // Since A+B=90, sin(90)=1.
    // We look for an option that also equals 1.
    // Option C: cos^2(B) + cos^2(A)
    // Since A and B are complementary, cos(A) = sin(B).
    // So cos^2(B) + sin^2(B) = 1. Correct.

    const optionsData = [
      { 
        text: `2(\\cos ${angleB}^{\\circ})(\\sin ${angleA}^{\\circ})`, 
        isCorrect: false 
      },
      { 
        text: `2(\\cos ${angleB}^{\\circ}) + 2(\\cos ${angleA}^{\\circ})`, 
        isCorrect: false 
      },
      { 
        text: `(\\cos ${angleB}^{\\circ})^2 + (\\cos ${angleA}^{\\circ})^2`, 
        isCorrect: true 
      },
      { 
        text: `(\\cos ${angleB}^{\\circ})^2 + (\\sin ${angleA}^{\\circ})^2`, 
        isCorrect: false 
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Which of the following expressions is equivalent to $(\\sin ${angleA}^{\\circ})(\\cos ${angleB}^{\\circ}) + (\\cos ${angleA}^{\\circ})(\\sin ${angleB}^{\\circ})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
First, evaluate the given expression using the sine addition formula $\\sin(x+y) = \\sin x \\cos y + \\cos x \\sin y$:
$(\\sin ${angleA}^{\\circ})(\\cos ${angleB}^{\\circ}) + (\\cos ${angleA}^{\\circ})(\\sin ${angleB}^{\\circ}) = \\sin(${angleA}^{\\circ} + ${angleB}^{\\circ}) = \\sin(90^{\\circ}) = 1$.

Now, evaluate the correct choice:
The expression is $(\\cos ${angleB}^{\\circ})^2 + (\\cos ${angleA}^{\\circ})^2$.
Since angles ${angleA}^{\\circ} and ${angleB}^{\\circ} are complementary ($90 - ${angleB} = ${angleA}$), we know that $\\cos ${angleA}^{\\circ} = \\sin ${angleB}^{\\circ}$.
Substituting this into the expression gives:
$(\\cos ${angleB}^{\\circ})^2 + (\\sin ${angleB}^{\\circ})^2$
By the Pythagorean identity $\\sin^2 \\theta + \\cos^2 \\theta = 1$, this equals 1.

Therefore, the expressions are equivalent.`
    };
  }
};

/**
 * Question ID: ae041e52
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

export const generator_ae041e52 = {
  metadata: {
    id: "ae041e52",
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