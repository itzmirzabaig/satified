import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 3d12b1e0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-16x²-8x+c=0, exactly one solution, find c]
 * - Difficulty factors: [Negative leading coefficient, discriminant = 0]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Discriminant calculation with negative a]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_3d12b1e0 = {
  metadata: {
    // id: "3d12b1e0",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: -ax² + bx + c = 0, discriminant = b² + 4ac = 0 (since a is negative)
    
    const a = -1 * getRandomInt(4, 20); // Negative leading coefficient
    const b = getRandomInt(4, 20); // Linear coefficient
    
    // Discriminant: b² - 4ac = 0 → b² = 4ac → c = b²/(4a)
    // Since a is negative, c will be negative
    
    const cValue = (b * b) / (4 * a);
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `$${a}x^2 ${b >= 0 ? '-' : '+'} ${Math.abs(b)}x + c = 0$\n\nIn the given equation, $c$ is a constant. The equation has exactly one solution. What is the value of $c$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: cValue.toString(),
      explanation: `The correct answer is $${cValue}$. For exactly one solution, the discriminant equals 0: $(${b})^2-4(${a})c=0$, so $${b*b}+${-4*a}c=0$, thus $c=${cValue}$.`
    };
  }
};

/**
 * Question ID: 71014fb1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [(x-1)²=-4]
 * - Difficulty factors: [Square of real number cannot be negative]
 * - Distractor patterns: [A: one solution, B: two solutions, C: infinite, D: zero/correct]
 * - Constraints: [No real solutions since left side ≥ 0, right side < 0]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/71014fb1.ts