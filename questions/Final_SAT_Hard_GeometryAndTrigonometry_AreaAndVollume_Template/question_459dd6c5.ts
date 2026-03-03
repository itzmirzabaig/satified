import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 459dd6c5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 4, area ABC: 270]
 * - Difficulty factors: [Similar triangles, area ratio, finding smaller from larger]
 * - Distractor patterns: [N/A - fill in blank with multiple acceptable answers]
 * - Constraints: [Fractional answer acceptable]
 * - Question type: [Fill-in-the-blank, multi-accept]
 * - Figure generation: [None]
 */

export const generator_459dd6c5 = {
  metadata: {
    // id: "459dd6c5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate scale factor and areas
    const scaleFactor = getRandomInt(3, 6);
    const smallerArea = getRandomInt(50, 150);
    const largerArea = smallerArea * scaleFactor * scaleFactor;
    
    // STEP 2: Format answer as fraction and decimal
    // Area of DEF = Area of ABC / scaleFactor²
    const answer = largerArea / (scaleFactor * scaleFactor);
    
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const simplifiedNum = largerArea / gcd(largerArea, scaleFactor * scaleFactor);
    const simplifiedDen = (scaleFactor * scaleFactor) / gcd(largerArea, scaleFactor * scaleFactor);
    
    const simplifiedFraction = simplifiedDen === 1 ? simplifiedNum.toString() : `${simplifiedNum}/${simplifiedDen}`;
    const decimalAnswer = (largerArea / (scaleFactor * scaleFactor)).toFixed(2);
    
    return {
      questionText: `Triangles $ABC$ and $DEF$ are similar. Each side length of triangle $ABC$ is $${scaleFactor}$ times the corresponding side length of triangle $DEF$. The area of triangle $ABC$ is $${largerArea}$ square inches. What is the area, in square inches, of triangle $DEF$?`,
      figureCode: null,
      options: null,
      correctAnswer: `${simplifiedFraction}, ${decimalAnswer}, ${Math.round(answer * 100) / 100}`,
      explanation: `Since the linear scale factor is $${scaleFactor}$, the area scale factor is $${scaleFactor}^2 = ${scaleFactor * scaleFactor}$. The area of $DEF$ is $\\frac{${largerArea}}{${scaleFactor * scaleFactor}} = ${simplifiedFraction} = ${decimalAnswer}$ square inches (or equivalent).`
    };
  }
};

/**
 * Question ID: 310c87fe
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [surface area: 54]
 * - Difficulty factors: [Surface area to volume, cube formulas]
 * - Distractor patterns: [A: 18 (6×3), B: 27 (correct), C: 36 (6²), D: 81 (9²)]
 * - Constraints: [SA must be divisible by 6 for integer side]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */