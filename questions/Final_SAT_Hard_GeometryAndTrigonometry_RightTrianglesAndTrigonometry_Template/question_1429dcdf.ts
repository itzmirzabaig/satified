import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1429dcdf
 * 
 * FIXES:
 * - Replaced broken/invisible figure with a clean SVG right triangle.
 * - Fixed LaTeX syntax `^\\\\circ` to `^{\\circ}` in the text.
 * - Used `x°` directly in SVG text to avoid LaTeX rendering issues inside the image.
 * - Added correct labels for "Opposite" and "Hypotenuse" values based on the random triple.
 */

export const generator_1429dcdf = {
  metadata: {
    id: "1429dcdf",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Pythagorean Triple
    // We need a right triangle.
    const triples = [
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
      [7, 24, 25],
      [20, 21, 29]
    ];
    const triple = getRandomElement(triples) as [number, number, number];
    const [leg1, leg2, hyp] = triple;

    // Randomly choose which leg is "Opposite" to angle x
    const isLeg1Opposite = Math.random() < 0.5;
    const opposite = isLeg1Opposite ? leg1 : leg2;
    const adjacent = isLeg1Opposite ? leg2 : leg1;
    
    // 2. SVG Configuration
    // Draw a standard right triangle
    const width = 300;
    const height = 200;
    const pad = 40;
    
    // Coordinates: Right angle at bottom-right (w-pad, h-pad)
    // Vertical leg goes up. Horizontal leg goes left.
    const xCorner = width - pad;
    const yCorner = height - pad;
    const xLeft = pad;
    const yTop = pad;

    // To prevent distortion, we just draw a generic right triangle shape 
    // and label it with the numbers. Scale doesn't need to perfect for SAT diagrams.
    // Let's draw angle x at the top vertex.
    // Opposite side is the horizontal bottom.
    // Adjacent side is the vertical.
    // Hypotenuse is the diagonal.

    const vTop = { x: xCorner, y: yTop };      // Vertex with angle x
    const vBottom = { x: xCorner, y: yCorner }; // Right Angle Vertex
    const vLeft = { x: xLeft, y: yCorner };    // Third Vertex

    // Let's place Angle x at the LEFT vertex (vLeft) for better layout
    // Angle x at vLeft.
    // Opposite side = Segment(vTop, vBottom) (Vertical right side)
    // Adjacent side = Segment(vLeft, vBottom) (Horizontal bottom side)
    // Hypotenuse = Segment(vLeft, vTop)
    
    const labelOppVal = opposite;
    const labelHypVal = hyp;

    const svgCode = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; max-width: 350px; height: auto; display: block; margin: 0 auto; font-family: sans-serif;">
        <!-- Triangle -->
        <polygon points="${vLeft.x},${vLeft.y} ${vBottom.x},${vBottom.y} ${vTop.x},${vTop.y}" 
          fill="none" stroke="currentColor" stroke-width="2" />
        
        <!-- Right Angle Marker -->
        <polyline points="${vBottom.x},${vBottom.y - 15} ${vBottom.x - 15},${vBottom.y - 15} ${vBottom.x - 15},${vBottom.y}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />

        <!-- Angle Arc for x -->
        <path d="M ${vLeft.x + 30} ${vLeft.y} A 30 30 0 0 0 ${vLeft.x + 25} ${vLeft.y - 15}" 
          fill="none" stroke="currentColor" stroke-width="1.5" />
        <text x="${vLeft.x + 45}" y="${vLeft.y - 5}" font-size="16" fill="currentColor">x°</text>

        <!-- Labels -->
        <!-- Hypotenuse Label -->
        <text x="${(vLeft.x + vTop.x) / 2 - 10}" y="${(vLeft.y + vTop.y) / 2 - 10}" 
          font-size="16" font-weight="bold" fill="currentColor">${labelHypVal}</text>

        <!-- Opposite Label (Vertical Right) -->
        <text x="${vBottom.x + 10}" y="${(vBottom.y + vTop.y) / 2}" 
          font-size="16" font-weight="bold" fill="currentColor" dominant-baseline="middle">${labelOppVal}</text>

      </svg>
    `;

    return {
      questionText: `In the triangle shown, what is the value of $\\sin x^{\\circ}$?`,
      figureCode: svgCode,
      options: null, // Fill in the blank
      correctAnswer: `${opposite}/${hyp}`, // Format: 16/23
      explanation: `In a right triangle, the sine of an acute angle is defined as the ratio of the length of the opposite side to the length of the hypotenuse. 
      
$\\sin x^{\\circ} = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$

From the figure:
- The side opposite angle $x^{\\circ}$ has length ${opposite}.
- The hypotenuse has length ${hyp}.

Therefore, $\\sin x^{\\circ} = \\frac{${opposite}}{${hyp}}$.`
    };
  }
};

/**
 * Question ID: 4c95c7d4
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

export const generator_4c95c7d4 = {
  metadata: {
    id: "4c95c7d4",
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
    
    const optCorrect = makeOption(correctAreaCoeff);
    const optOneTri = makeOption(correctAreaCoeff / 2);
    const optThreeTri = makeOption(correctAreaCoeff * 1.5);
    
    // Distractor 4: Assume s = P/4 (Square perimeter logic) -> s_wrong = 5s/4 = 1.25s
    // Area ~ (1.25s)^2 ... just make a random integer distractor
    const optRandom = makeOption(correctAreaCoeff + 2 * side);

    const optionsData = [
      { text: optCorrect, isCorrect: true },
      { text: optOneTri, isCorrect: false },
      { text: optThreeTri, isCorrect: false },
      { text: optRandom, isCorrect: false }
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