import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b96ff36e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (3, 5), radius²: 9, point: (6, c) where c=5]
 * - Difficulty factors: [Substituting point into circle equation, solving for y-coordinate]
 * - Distractor patterns: [None - fill in the blank, single correct answer]
 * - Constraints: [Point (6, c) is horizontally aligned with center y-coordinate]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_b96ff36e = {
  metadata: {
    // id: "b96ff36e",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center coordinates and radius (similar to original: center (3,5), r=3)
    const h = getRandomInt(1, 6);
    const k = getRandomInt(2, 8);
    const r = getRandomInt(2, 5); // Small radius for clean numbers
    const rSquared = r * r;
    
    // STEP 2: Generate a point on the circle with same y-coordinate as center (horizontal)
    // This makes (x - h)² = r², so x = h ± r
    // We choose x = h + r (to the right of center)
    const pointX = h + r;
    const c = k; // y-coordinate is same as center
    
    // STEP 3: Return question data
    return {
      questionText: `In the xy-plane, the graph of the equation $(x-${h})^{2}+(y-${k})^{2}=${rSquared}$ is a circle. The point $(${pointX}, c)$, where $c$ is a constant, lies on this circle. What is the value of $c$?`,
      figureCode: null,
      options: null,
      correctAnswer: c.toString(),
      explanation: `The correct answer is ${c}. Substituting the point $(${pointX}, c)$ into the equation: $(${pointX}-${h})^{2}+(c-${k})^{2}=${rSquared}$. This simplifies to $${r}^{2}+(c-${k})^{2}=${rSquared}$, or ${rSquared}+(c-${k})^{2}=${rSquared}$. Subtracting ${rSquared} from both sides gives $(c-${k})^{2}=0$. Therefore, $c-${k}=0$, so $c=${k}$.`
    };
  }
};