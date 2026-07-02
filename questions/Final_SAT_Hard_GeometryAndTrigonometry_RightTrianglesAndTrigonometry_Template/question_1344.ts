import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1344
 * 
 * FIXES:
 * - Replaced broken/invisible figure with a clean SVG right triangle.
 * - Fixed LaTeX syntax `^\\\\circ` to `^{\\circ}` in the text.
 * - Used `x°` directly in SVG text to avoid LaTeX rendering issues inside the image.
 * - Added correct labels for "Opposite" and "Hypotenuse" values based on the random triple.
 */

export const generator_1344 = {
  metadata: {
    id: "1344",
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
