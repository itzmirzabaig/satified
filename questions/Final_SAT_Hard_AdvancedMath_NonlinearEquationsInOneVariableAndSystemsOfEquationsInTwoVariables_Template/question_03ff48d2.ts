import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 03ff48d2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x(kx-56)=-16, no real solution, find least integer k]
 * - Difficulty factors: [Expand to standard form, discriminant < 0, solve inequality for k]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Quadratic in x with parameter k, discriminant condition, integer constraint]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_03ff48d2 = {
  metadata: {
    // id: "03ff48d2",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: x(kx-56)=-16 → kx²-56x+16=0, discriminant: 3136-64k<0 → k>49, least k=50
    
    // Pattern: x(ax-b) = -c → ax² - bx + c = 0
    // Discriminant: b² - 4ac < 0 → b² < 4ac → a > b²/(4c)
    
    const b = getRandomInt(40, 70); // Linear coefficient
    const c = getRandomInt(10, 25); // Constant
    
    // Need a > b²/(4c), so minimum integer a = floor(b²/(4c)) + 1
    const threshold = (b * b) / (4 * c);
    const minA = Math.floor(threshold) + 1;
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `In the given equation, $k$ is an integer constant. If the equation has no real solution, what is the least possible value of $k$?\n\n$x(kx-${b})=-${c}$`,
      figureCode: figureCode,
      options: null,
      correctAnswer: minA.toString(),
      explanation: `The correct answer is $${minA}$. Expanding: $kx^2-${b}x+${c}=0$. For no real solutions, the discriminant is negative: $(-${b})^2-4(k)(${c})<0$, so $${b*b}<${4*c}k$, thus $k>${threshold}$. Since $k$ is an integer, the least possible value is $${minA}$.`
    };
  }
};

/**
 * Question ID: 7028c74f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation with factoring, sum of solutions]
 * - Difficulty factors: [Factor out common term, zero product property, sum solutions]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must factor correctly, find all solutions, sum them]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/7028c74f.ts