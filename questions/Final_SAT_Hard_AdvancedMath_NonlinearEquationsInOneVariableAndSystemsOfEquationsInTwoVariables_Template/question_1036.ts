import { getRandomInt, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1036
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x(kx-56)=-16, no real solution, find least integer k]
 * - Difficulty factors: [Expand to standard form, discriminant < 0, solve inequality for k]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Quadratic in x with parameter k, discriminant condition, integer constraint]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1036 = {
  metadata: {
    id: "1036",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: x(kx-56)=-16 → kx²-56x+16=0, discriminant: 3136-64k<0 → k>49, least k=50
    //
    // Pattern: x(kx-b) = -c → kx² - bx + c = 0
    // No real solutions ⟺ discriminant b² - 4kc < 0 ⟺ k > b²/(4c)

    const b = getRandomInt(40, 70); // Linear coefficient
    const c = getRandomInt(10, 25); // Constant

    // Need k > b²/(4c) (strict), so the least integer k = floor(b²/(4c)) + 1.
    // (This is correct even when b²/(4c) is an exact integer.)
    const numerator = b * b;
    const denominator = 4 * c;
    const threshold = numerator / denominator;
    const minK = Math.floor(threshold) + 1;

    // Show the exact fraction; add a clean 2-decimal approximation only when
    // the threshold is not an integer (never interpolate the raw float).
    const thresholdTex = numerator % denominator === 0
      ? `\\frac{${numerator}}{${denominator}}=${threshold}`
      : `\\frac{${numerator}}{${denominator}}\\approx ${round(threshold, 2)}`;

    return {
      questionText: `$x(kx-${b})=-${c}$\n\nIn the given equation, $k$ is an integer constant. If the equation has no real solution, what is the least possible value of $k$?`,
      figureCode: null,
      options: [],
      correctAnswer: minK.toString(),
      explanation: `The correct answer is ${minK}. Rewriting the given equation in standard form gives $kx^2-${b}x+${c}=0$. A quadratic equation has no real solutions exactly when its discriminant is negative: $(-${b})^2-4(k)(${c})<0$. Solving this inequality for $k$ gives $k>${thresholdTex}$. Since $k$ must be an integer, the least possible value of $k$ is ${minK}.`
    };
  }
};
