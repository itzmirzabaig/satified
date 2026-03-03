import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9691901
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients in system: 1, 20, 100, 7]
 * - Difficulty factors: [System of nonlinear equations, substitution, perfect square trinomial]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [System must have unique solution, quadratic must factor nicely]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_9691901 = {
  metadata: {
    // id: "9691901",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original had x² + y + 7 = 7 and 20x + 100 - y = 0
    // We want a system that yields a perfect square when substituted
    
    // Generate parameters for perfect square: (x + p)² = x² + 2px + p²
    const p = getRandomInt(3, 12); // This will be the root
    const linearCoeff = 2 * p; // Coefficient of x in final quadratic
    const constantTerm = p * p; // Constant term
    
    // First equation: x² + y + c1 = c1 → y = -x²
    const c1 = getRandomInt(5, 15);
    
    // Second equation structure: ax + b - y = 0 → y = ax + b
    // Substituting: ax + b = -x² → x² + ax + b = 0
    // We want this to be (x + p)² = x² + 2px + p² = 0
    // So a = 2p and b = p²
    
    const a = linearCoeff;
    const b = constantTerm;
    
    // Generate c2 such that: ax + (b + c1) - y = 0... need to think carefully
    
    // Actually: y = ax + (b - adjustment), let's be cleaner
    // Second equation: ax + (b + c1) - y = 0... need to think carefully
    
    // Original: 20x + 100 - y = 0 and x² + y + 7 = 7
    // From first: y = -x², substitute into second: 20x + 100 - (-x²) = 0 → x² + 20x + 100 = 0
    
    // So if we want x² + ax + b = 0 where b = p² and a = 2p:
    // Second equation should be: ax + b - y = 0 (when y = -x² from first)
    
    // Adjust first equation constant
    const firstConstant = getRandomInt(3, 12);
    
    // STEP 2: Calculate derived values
    // Solution is x = -p (double root, but we treat as single solution x = -p)
    const xSolution = -p;
    const ySolution = -(xSolution * xSolution); // y = -x²
    
    // STEP 3: No figure needed
    const figureCode = null;
    
    return {
      questionText: `$x^2 + y + ${firstConstant} = ${firstConstant}$\n$${a}x + ${b + firstConstant} - y = 0$\n\nThe solution to the given system of equations is $(x, y)$. What is the value of $x$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: xSolution.toString(),
      explanation: `The correct answer is $${xSolution}$. From the first equation, $y = -x^2$. Substituting into the second equation: $${a}x + ${b + firstConstant} - (-x^2) = 0$, which gives $x^2 + ${a}x + ${b} = 0$. This factors as $(x + ${p})^2 = 0$, so $x = ${xSolution}$.`
    };
  }
};

/**
 * Question ID: 3a9d60b2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients 2, 3, constant 25, results in 5|4-x| = 25]
 * - Difficulty factors: [Combining like terms with absolute value, solving for positive solution]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must have positive and negative solutions, ask for positive one]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/3a9d60b2.ts