import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 868
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (3, 5), radius²: 9, point: (6, c) where c=5]
 * - Difficulty factors: [Substituting point into circle equation, solving for y-coordinate]
 * - Distractor patterns: [None - fill in the blank, single correct answer]
 * - Constraints: [Point (6, c) is horizontally aligned with center y-coordinate]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_868 = {
  metadata: {
    id: "868",
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

    // STEP 2: Generate a point on the circle with the same y-coordinate as the
    // center. Then (x - h)^2 = r^2, so x = h +/- r. We take x = h + r (the point
    // directly to the right of the center), which forces c = k every draw.
    const pointX = h + r;
    const c = k; // y-coordinate equals the center's y-coordinate

    // Build the substituted (x - h) difference literally so the explanation shows
    // pointX - h = r without introducing a "+ -" glitch when h happens to be 0
    // (h is >= 1 here, so pointX - h = r is always a positive integer).
    const xDiff = pointX - h; // always equals r

    // STEP 3: Return question data
    return {
      questionText: `In the xy-plane, the graph of the equation $(x-${h})^{2}+(y-${k})^{2}=${rSquared}$ is a circle. The point $(${pointX}, c)$, where $c$ is a constant, lies on this circle. What is the value of $c$?`,
      figureCode: null,
      options: null,
      correctAnswer: c.toString(),
      explanation: `The correct answer is ${c}. Substitute the point $(${pointX}, c)$ into the equation to get $(${pointX}-${h})^{2}+(c-${k})^{2}=${rSquared}$. Since $(${pointX}-${h})=${xDiff}$, this becomes $(${xDiff})^{2}+(c-${k})^{2}=${rSquared}$, which is $(${rSquared})+(c-${k})^{2}=${rSquared}$. Subtracting ${rSquared} from both sides gives $(c-${k})^{2}=0$, so $(c-${k})=0$ and the value of the constant is $c=${k}$.`
    };
  }
};