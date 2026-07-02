import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1073
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x²-34x+c=0, no real solutions if c>289, find least n where c>n means no solution]
 * - Difficulty factors: [Discriminant < 0, find threshold value]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Quadratic with discriminant condition, 289 = 17²]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1073 = {
  metadata: {
    id: "1073",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: x² - 2px + c = 0, discriminant = 4p² - 4c < 0 → c > p²
    
    const p = getRandomInt(12, 25);
    const b = 2 * p; // The linear coefficient
    
    // Discriminant: b² - 4c < 0 → 4p² - 4c < 0 → c > p²
    const threshold = p * p;
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `$x^2 - ${b}x + c = 0$\n\nIn the given equation, $c$ is a constant. The equation has no real solutions if $c > n$. What is the least possible value of $n$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: threshold.toString(),
      explanation: `The correct answer is $${threshold}$. For no real solutions, the discriminant is negative: $(-${b})^2-4c<0$, so $${b*b}<4c$, thus $c>${threshold}$. The least possible value of $n$ is $${threshold}$.`
    };
  }
};
