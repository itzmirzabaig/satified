import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1354
 * 
 * FIXES:
 * - Replaced broken code with a proper SVG of an isosceles right triangle.
 * - Fixed LaTeX formatting (removed double backslashes where single needed for standard strings in this context, or ensured consistency).
 * - Fixed options return type to be `string[]`.
 * - Logic: Perimeter = leg(2 + sqrt(2)). Solved for leg correctly.
 */

export const generator_1354 = {
  metadata: {
    id: "1354",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Math Logic
    // Isosceles Right Triangle (45-45-90)
    // Legs = L, Hypotenuse = L√2
    // Perimeter P = 2L + L√2 = L(2 + √2)
    
    // We want the perimeter to be presented as "Base + Base√2" => Base(1 + √2)
    // So L(2 + √2) = Base(1 + √2)
    // L = [Base(1 + √2)] / (2 + √2)
    // Multiply num/den by (2 - √2):
    // Num: Base(1 + √2)(2 - √2) = Base(2 - √2 + 2√2 - 2) = Base(√2)
    // Den: (2 + √2)(2 - √2) = 4 - 2 = 2
    // So L = (Base * √2) / 2 = (Base/2)√2
    
    const base = getRandomInt(40, 120) * 2; // Ensure even for clean integer division
    const halfBase = base / 2;
    
    // Options
    const optCorrect = `${halfBase}\\sqrt{2}`;
    const optWrong1 = `${halfBase}`; // Forgot √2
    const optWrong2 = `${base}\\sqrt{2}`; // Forgot to divide by 2
    const optWrong3 = `${base}`; // Just the base number
    
    const optionsData = [
      { text: optCorrect, isCorrect: true },
      { text: optWrong1, isCorrect: false },
      { text: optWrong2, isCorrect: false },
      { text: optWrong3, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // 2. SVG Generation
    // Draw an Isosceles Right Triangle
    const width = 300;
    const height = 250;
    const pad = 40;
    const legLen = 180;
    
    // Right angle at bottom-left for simplicity
    const pCorner = { x: pad, y: height - pad };
    const pTop = { x: pad, y: height - pad - legLen };
    const pRight = { x: pad + legLen, y: height - pad };

    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 300px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${pCorner.x},${pCorner.y} ${pRight.x},${pRight.y} ${pTop.x},${pTop.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
        
        <!-- Right Angle Marker -->
        <polyline points="${pCorner.x},${pCorner.y - 20} ${pCorner.x + 20},${pCorner.y - 20} ${pCorner.x + 20},${pCorner.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
          
        <!-- Congruence Marks on Legs -->
        <!-- Vertical Leg Mark -->
        <line x1="${pCorner.x - 10}" y1="${(pCorner.y + pTop.y) / 2}" x2="${pCorner.x + 10}" y2="${(pCorner.y + pTop.y) / 2}" 
          stroke="currentColor" stroke-width="2" />
        <!-- Horizontal Leg Mark -->
        <line x1="${(pCorner.x + pRight.x) / 2}" y1="${pCorner.y - 10}" x2="${(pCorner.x + pRight.x) / 2}" y2="${pCorner.y + 10}" 
          stroke="currentColor" stroke-width="2" />
      </svg>
    `;

    return {
      questionText: `An isosceles right triangle has a perimeter of $${base} + ${base}\\sqrt{2}$ inches. What is the length, in inches, of one leg of this triangle?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1. **Set up the Perimeter Formula:**
   Let the length of a leg be $\\ell$. Since it is an isosceles right triangle, the hypotenuse is $\\ell\\sqrt{2}$.
   Perimeter $P = \\ell + \\ell + \\ell\\sqrt{2} = 2\\ell + \\ell\\sqrt{2} = \\ell(2 + \\sqrt{2})$.

2. **Equate to Given Value:**
   We are given $P = ${base} + ${base}\\sqrt{2} = ${base}(1 + \\sqrt{2})$.
   $\\ell(2 + \\sqrt{2}) = ${base}(1 + \\sqrt{2})$

3. **Solve for $\\ell$:**
   $\\ell = \\frac{${base}(1 + \\sqrt{2})}{2 + \\sqrt{2}}$
   
   To rationalize the denominator, multiply numerator and denominator by $(2 - \\sqrt{2})$:
   $\\ell = \\frac{${base}(1 + \\sqrt{2})(2 - \\sqrt{2})}{(2 + \\sqrt{2})(2 - \\sqrt{2})}$
   
   Numerator: ${base}(2 - \\sqrt{2} + 2\\sqrt{2} - 2) = ${base}(\\sqrt{2})$
   Denominator: $4 - 2 = 2$
   
   $\\ell = \\frac{${base}\\sqrt{2}}{2} = ${halfBase}\\sqrt{2}$.`
    };
  }
};
