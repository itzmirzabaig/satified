import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1365
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hypotenuse: 26, sin ratio: 5/13 (Pythagorean triple 5-12-13 scaled)]
 * - Difficulty factors: [Trigonometric ratio application, Pythagorean theorem, finding non-hypotenuse side]
 * - Constraints: [Must use scaled 5-12-13 triangle, hypotenuse is 26 = 2×13]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [Right triangle with hypotenuse labeled]
 */

export const generator_1365 = {
  metadata: {
    id: "1365",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: sin(B) = 5/13, hypotenuse AB = 26
    // This is a 5-12-13 triangle scaled by 2
    // sin(B) = AC/AB = AC/26 = 5/13 → AC = 10
    // Then BC = sqrt(26² - 10²) = sqrt(676 - 100) = sqrt(576) = 24
    
    // Generate primitive triple and scale
    const primitiveTriples = [
      [3, 4, 5],
      [5, 12, 13],
      [8, 15, 17],
      [7, 24, 25]
    ];
    
    const triple = getRandomElement(primitiveTriples) as [number, number, number];
    const scaleFactor = getRandomInt(2, 5);
    
    const shorterLeg = triple[0] * scaleFactor;
    const longerLeg = triple[1] * scaleFactor;
    const hypotenuse = triple[2] * scaleFactor;
    
    // Use shorter leg as opposite side in sin ratio
    const numerator = triple[0];
    const denominator = triple[2];
    
    // Right triangle ABC: right angle at C. B at bottom-left, C at bottom-right
    // (end of the longer horizontal leg BC), A directly above C (shorter vertical
    // leg CA). Hypotenuse AB is labeled with its length. Plain SVG, pixel space.
    const W = 450, H = 300;
    const bx = 70,  by = 240;                 // B (bottom-left)
    const sc = 300 / hypotenuse;              // scale so hypotenuse spans ~300px horizontally worth of legs
    const cx = bx + longerLeg * sc, cy = by;  // C (right angle, end of BC)
    const ax = cx,                  ay = by - shorterLeg * sc; // A (top)
    const rm = 14;                            // right-angle marker (px)
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">`
      + `<polygon points="${bx},${by} ${cx},${cy} ${ax},${ay}" fill="#3b82f6" fill-opacity="0.08" stroke="#3b82f6" stroke-width="2" stroke-linejoin="round"/>`
      + `<path d="M ${cx - rm},${cy} L ${cx - rm},${cy - rm} L ${cx},${cy - rm}" fill="none" stroke="currentColor" stroke-width="1.2"/>`
      + `<circle cx="${bx}" cy="${by}" r="3" fill="currentColor"/>`
      + `<circle cx="${cx}" cy="${cy}" r="3" fill="currentColor"/>`
      + `<circle cx="${ax}" cy="${ay}" r="3" fill="currentColor"/>`
      + `<text x="${bx - 12}" y="${by + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">B</text>`
      + `<text x="${cx + 12}" y="${cy + 16}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">C</text>`
      + `<text x="${ax + 12}" y="${ay - 4}" text-anchor="middle" font-size="15" font-style="italic" fill="currentColor">A</text>`
      + `<text x="${(bx + ax) / 2 - 6}" y="${(by + ay) / 2 - 8}" text-anchor="end" font-size="14" fill="currentColor">${hypotenuse}</text>`
      + `</svg></div>`;

    return {
      questionText: `In the right triangle $ABC$ shown, the right angle is at $C$ and $\\sin(B) = \\frac{${numerator}}{${denominator}}$. What is the length of side $\\overline{BC}$?`,
      figureCode: mafsCode,
      options: [], // Fill in the blank
      correctAnswer: longerLeg.toString(),
      explanation: `The sine of angle $B$ is the ratio of the opposite side ($AC$) to the hypotenuse ($AB$). Given $\\sin(B) = \\frac{${numerator}}{${denominator}}$ and $AB = ${hypotenuse}$, then $\\frac{AC}{${hypotenuse}} = \\frac{${numerator}}{${denominator}} \\implies AC = ${shorterLeg}$. By the Pythagorean theorem, $BC = \\sqrt{${hypotenuse}^2 - ${shorterLeg}^2} = \\sqrt{${hypotenuse * hypotenuse} - ${shorterLeg * shorterLeg}} = \\sqrt{${longerLeg * longerLeg}} = ${longerLeg}$.`
    };
  }
};
