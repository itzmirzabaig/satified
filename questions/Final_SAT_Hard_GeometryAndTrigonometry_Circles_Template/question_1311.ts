import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1311
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (-6, -3), r²: 121]
 * - Difficulty factors: [Reading standard form]
 * - Distractor patterns: [Using r² instead of r, sign errors]
 * - Constraints: [Perfect square radius]
 * - Question type: [Conceptual→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_1311 = {
  metadata: {
    id: "1311",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center
    const h = -getRandomInt(3, 10);
    const k = -getRandomInt(3, 10);
    
    // STEP 2: Generate radius (perfect square)
    const r = getRandomInt(6, 15);
    const rSquared = r * r;
    
    return {
      questionText: `The equation $(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y${k >= 0 ? '-' : '+'}${Math.abs(k)})^{2}=${rSquared}$ defines a circle in the $xy$-plane. What is the radius of the circle?`,
      figureCode: null,
      options: null,
      correctAnswer: r.toString(),
      explanation: `The equation is in standard form $(x-h)^{2}+(y-k)^{2}=r^{2}$. Comparing to the given equation, $r^{2}=${rSquared}$. Taking the square root, $r=${r}$ (radius is positive).`
    };
  }
};
