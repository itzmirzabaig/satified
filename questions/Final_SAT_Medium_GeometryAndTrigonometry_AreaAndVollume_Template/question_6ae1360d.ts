import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6ae1360d
 * 
 * ANALYSIS:
 * - Skill: Area of a Circle
 * - Issue Fixed: LaTeX rendering of Pi. `\\\\pi` resulted in "b\pi" reading as text "bpi". 
 *   Changed to `\\pi` to correctly render the symbol $\pi$.
 * - Precision: Added rounding to ensure 'b' is a clean decimal (max 2 places).
 */

export const generator_6ae1360d = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Radius in tenths (e.g., 1.5, 2.1)
    const radiusTenths = getRandomInt(15, 25); 
    const radius = radiusTenths / 10;
    
    // STEP 2: Calculate derived values
    // Area = pi * r^2. Given Area = b * pi.
    // Therefore b = r^2.
    // Fix floating point precision (e.g. 2.2^2 = 4.84)
    const bRaw = radius * radius;
    const b = Number(bRaw.toFixed(2));
    
    // STEP 3: Return question data
    // FIX: Use \\pi instead of \\\\pi to render the symbol correctly
    return {
      questionText: `A circle has a radius of ${radius} inches. The area of the circle is $b\\pi$ square inches, where $b$ is a constant. What is the value of $b$?`,
      figureCode: null,
      options: [], // Fill-in-the-blank usually has empty options or specific handling
      correctAnswer: b.toString(),
      explanation: `The area of a circle is $A = \\pi r^2$. With radius $r = ${radius}$, the area is $A = \\pi(${radius})^2 = ${b}\\pi$. Since the area is given as $b\\pi$, we have $b = ${b}$.`
    };
  }
};