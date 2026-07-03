import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1459
 * 
 * ANALYSIS:
 * - Figure: Trapezoid made of 3 congruent equilateral triangles.
 * - Given: Perimeter of the entire figure.
 * - Find: Area of the shaded region (2 of the triangles).
 * - Logic: 
 *   Perimeter of this trapezoid = 5 * side_length.
 *   Calculate side_length.
 *   Area of 1 triangle = (s^2 * sqrt(3)) / 4.
 *   Shaded Area = 2 * Area of 1 triangle.
 */

export const generator_1459 = {
  metadata: {
    id: "1459",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // 1. Generate Numbers
    // Perimeter needs to be a multiple of 5 for integer side length
    const side = getRandomInt(4, 12) * 2; // Even numbers keep area cleaner (divisible by 4)
    const perimeter = side * 5;
    
    // Area Calculation
    // Area of one equilateral triangle = (s^2 * sqrt(3)) / 4
    // Shaded Area (2 triangles) = (s^2 * sqrt(3)) / 2
    const sSquared = side * side;
    const correctAreaCoeff = sSquared / 2; // e.g. if s=4, s^2=16, coeff=8. Ans: 8sqrt(3)

    // 2. SVG Configuration
    // Shape: Isosceles Trapezoid (Bottom base 2s, Top base s, Legs s)
    // Composed of 3 equilateral triangles.
    // Triangle 1: Bottom-Left (Shaded)
    // Triangle 2: Bottom-Right (Shaded)
    // Triangle 3: Top-Middle (Unshaded, inverted)
    // Wait, standard config is usually 3 triangles in a row? 
    // Or 2 on bottom, 1 on top inverted. This creates a trapezoid.
    // Perimeter check: 
    // Bottom: s + s = 2s
    // Top: s (inverted triangle base)
    // Sides: s (left tri) + s (right tri)
    // Total Perimeter = 2s + s + s + s = 5s. Correct.
    
    const h = Math.sqrt(3) / 2 * side; // Height for drawing
    const scale = 150 / side; // Scale to fit in viewbox
    const drawH = h * scale;
    const drawS = side * scale;
    
    const startX = 20;
    const startY = 180; // Bottom left y

    // Points
    const p1 = { x: startX, y: startY }; // Bottom Left
    const p2 = { x: startX + drawS, y: startY }; // Bottom Mid
    const p3 = { x: startX + 2 * drawS, y: startY }; // Bottom Right
    const p4 = { x: startX + 1.5 * drawS, y: startY - drawH }; // Top Right
    const p5 = { x: startX + 0.5 * drawS, y: startY - drawH }; // Top Left

    // SVG Code
    const svgCode = `
      <svg viewBox="0 0 350 220" style="width: 100%; max-width: 400px; height: auto; display: block; margin: 0 auto;">
        <!-- Triangle 1 (Bottom Left) - Shaded -->
        <polygon points="${p1.x},${p1.y} ${p2.x},${p2.y} ${p5.x},${p5.y}" 
          fill="#3b82f6" fill-opacity="0.5" stroke="currentColor" stroke-width="2" />
          
        <!-- Triangle 2 (Top Middle) - Unshaded -->
        <polygon points="${p5.x},${p5.y} ${p2.x},${p2.y} ${p4.x},${p4.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
          
        <!-- Triangle 3 (Bottom Right) - Shaded -->
        <polygon points="${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}" 
          fill="#3b82f6" fill-opacity="0.5" stroke="currentColor" stroke-width="2" />
          
        <!-- Label for Figure (optional, but helps verify "figure shown") -->
      </svg>
    `;

    // 3. Options
    // Correct: coeff * sqrt(3)
    // Distractor 1: Area of 1 triangle (coeff/2 * sqrt(3))
    // Distractor 2: Area of 3 triangles (coeff*1.5 * sqrt(3))
    // Distractor 3: Perimeter logic error (e.g. s = P/3 or P/4)
    
    const makeOption = (val: number) => `${val}\\sqrt{3}`;
    
    const optCorrect = makeOption(correctAreaCoeff);          // 2 triangles: s^2/2
    const optOneTri = makeOption(correctAreaCoeff / 2);       // forgot to double: s^2/4
    const optThreeTri = makeOption(correctAreaCoeff * 1.5);   // used all 3 triangles: 3s^2/4

    // Distractor 4: dropped the 4 in the triangle-area denominator
    // (used A = s^2*sqrt(3)/2 per triangle, then doubled) -> coefficient s^2.
    // Since correct = s^2/2, one = s^2/4, three = 3s^2/4, the value s^2 is
    // strictly greater than all three for every s in [8,24], so no collision.
    const optForgotDenom = makeOption(sSquared);

    const optionsData = [
      { text: optCorrect, isCorrect: true },
      { text: optOneTri, isCorrect: false },
      { text: optThreeTri, isCorrect: false },
      { text: optForgotDenom, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `The figure shown is composed of three congruent equilateral triangles. If the perimeter of the figure is ${perimeter}, what is the area of the shaded region?`,
      figureCode: svgCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
1. **Find the side length ($s$):**
   The perimeter of the composite figure consists of 5 equal sides of the equilateral triangles (the top side, the two bottom sides, and the two slanted outer sides).
   $Perimeter = 5s = ${perimeter}$
   $s = ${side}$

2. **Calculate the area of one triangle:**
   The area of an equilateral triangle is given by $A = \\frac{s^2\\sqrt{3}}{4}$.
   $A_{triangle} = \\frac{${side}^2\\sqrt{3}}{4} = \\frac{${sSquared}\\sqrt{3}}{4} = ${sSquared/4}\\sqrt{3}$

3. **Calculate the shaded area:**
   The shaded region consists of 2 triangles.
   $A_{shaded} = 2 \\times ${sSquared/4}\\sqrt{3} = ${correctAreaCoeff}\\sqrt{3}$`
    };
  }
};
