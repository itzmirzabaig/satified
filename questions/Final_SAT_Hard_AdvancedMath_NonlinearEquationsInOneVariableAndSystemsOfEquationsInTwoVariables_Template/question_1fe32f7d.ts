import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1fe32f7d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-x²+bx-676=0, no real solution, find max b]
 * - Difficulty factors: [Discriminant < 0 condition, negative leading coefficient, perfect square]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Discriminant must be negative, b must be positive integer, 676=26²]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1fe32f7d = {
  metadata: {
    // id: "1fe32f7d",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: -x² + bx - 676 = 0, discriminant = b² - 4(-1)(-676) = b² - 2704 < 0, so b² < 2704, b < 52, max b = 51
    
    // Pattern: -x² + bx - c = 0 where c is perfect square
    const root = getRandomInt(15, 35); // Square root of c
    const c = root * root; // Perfect square
    
    // Discriminant: b² - 4(-1)(-c) = b² - 4c < 0
    // So b² < 4c, meaning b < 2*root
    // Max integer b = 2*root - 1
    
    const maxB = 2 * root - 1;
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `$-x^2 + bx - ${c} = 0$\n\nIn the given equation, $b$ is a positive integer. The equation has no real solution. What is the greatest possible value of $b$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: maxB.toString(),
      explanation: `The correct answer is $${maxB}$. For no real solutions, the discriminant must be negative: $b^2-4(-1)(-${c})=b^2-${4*c}<0$. Thus $b^2<${4*c}$, so $|b|<${2*root}$. Since $b$ is a positive integer, the greatest possible value is $${maxB}$.`
    };
  }
};

/**
 * Question ID: c303ad23
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [3x²-18x-15=0, find x²-6x]
 * - Difficulty factors: [Divide by common factor, recognize pattern, no need to solve fully]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Divide by 3 to simplify, notice x²-6x appears directly]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/c303ad23.ts