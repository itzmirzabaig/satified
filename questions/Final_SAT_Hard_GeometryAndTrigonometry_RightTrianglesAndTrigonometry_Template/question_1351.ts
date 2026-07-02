import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1351
 * 
 * FIXES:
 * - SVG: Used robust coordinates for the trapezoid shape.
 * - Options: Verified LaTeX syntax for square roots.
 * - Logic: Perimeter of 3-triangle trapezoid = 5s. Area of 2 shaded triangles calculated correctly.
 */

export const generator_1351 = {
  metadata: {
    id: "1351",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // 1. Math Logic
    // Shape: Trapezoid formed by 3 congruent equilateral triangles.
    // Configuration: Two upright triangles on bottom, one inverted triangle on top in the middle.
    // Perimeter trace: Bottom (2s) + Right Leg (s) + Top (s) + Left Leg (s) = 5s.
    
    const side = getRandomInt(4, 12) * 2; // Even number ensures cleaner integers where possible
    const perimeter = 5 * side;
    
    // Area Calculation
    // Area of one equilateral triangle = (s^2 * √3) / 4
    // Shaded Area (2 triangles) = 2 * (s^2 * √3) / 4 = (s^2 * √3) / 2
    const sSquared = side * side;
    const coeffCorrect = sSquared / 2;
    
    // Distractors
    const coeffOneTri = sSquared / 4; 
    const coeffThreeTri = (sSquared * 3) / 4; 
    const coeffWrongFormula = side * 2; 

    const optionsData = [
      { text: `${coeffCorrect}\\sqrt{3}`, isCorrect: true },
      { text: `${coeffOneTri}\\sqrt{3}`, isCorrect: false }, 
      { text: `${coeffThreeTri}\\sqrt{3}`, isCorrect: false }, 
      { text: `${coeffWrongFormula}\\sqrt{3}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    // 2. SVG Generation
    const width = 320;
    const height = 180;
    
    // Triangle dimensions for drawing
    const drawSide = 80;
    const drawHeight = drawSide * Math.sqrt(3) / 2;
    
    // Centering logic
    // Total width of base is 2 * drawSide = 160
    const startX = (width - 2 * drawSide) / 2; 
    const startY = height - 30; // Bottom y-coordinate
    
    // Vertices
    // Bottom Left Triangle (Upright)
    const p1 = { x: startX, y: startY }; 
    const p2 = { x: startX + drawSide, y: startY }; 
    const pTopLeft = { x: startX + drawSide / 2, y: startY - drawHeight }; 
    
    // Bottom Right Triangle (Upright)
    const p3 = { x: startX + 2 * drawSide, y: startY };
    const pTopRight = { x: startX + 1.5 * drawSide, y: startY - drawHeight };

    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 350px; height: auto; display: block; margin: 0 auto;">
        <!-- Left Triangle (Shaded) -->
        <polygon points="${p1.x},${p1.y} ${p2.x},${p2.y} ${pTopLeft.x},${pTopLeft.y}" 
          fill="#3b82f6" fill-opacity="0.5" stroke="currentColor" stroke-width="2" />
          
        <!-- Middle Triangle (Inverted, Unshaded) -->
        <!-- Points: Top Left, Bottom Mid, Top Right -->
        <polygon points="${pTopLeft.x},${pTopLeft.y} ${p2.x},${p2.y} ${pTopRight.x},${pTopRight.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
          
        <!-- Right Triangle (Shaded) -->
        <polygon points="${p2.x},${p2.y} ${p3.x},${p3.y} ${pTopRight.x},${pTopRight.y}" 
          fill="#3b82f6" fill-opacity="0.5" stroke="currentColor" stroke-width="2" />
      </svg>
    `;

    return {
      questionText: `A graphic designer is creating a logo for a company. The logo is shown in the figure above. The logo is in the shape of a trapezoid and consists of three congruent equilateral triangles. If the perimeter of the logo is ${perimeter} centimeters, what is the combined area of the shaded regions, in square centimeters, of the logo?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1. **Find Side Length:**
   The perimeter of the trapezoid consists of the bottom base ($2s$), the top base ($s$), and the two legs ($s$ each).
   Total Perimeter = $2s + s + s + s = 5s$.
   Given Perimeter = ${perimeter}, we have $5s = ${perimeter} \\implies s = ${side}$.

2. **Calculate Area:**
   The shaded region consists of 2 congruent equilateral triangles.
   Area of one equilateral triangle = $\\frac{s^2\\sqrt{3}}{4}$.
   Area of two triangles = $2 \\times \\frac{${side}^2\\sqrt{3}}{4} = \\frac{${sSquared}\\sqrt{3}}{2} = ${coeffCorrect}\\sqrt{3}$.`
    };
  }
};
