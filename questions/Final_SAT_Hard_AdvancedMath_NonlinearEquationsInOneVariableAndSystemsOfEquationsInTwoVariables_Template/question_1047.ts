import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1047
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients 2, 3, constant 25, results in 5|4-x| = 25]
 * - Difficulty factors: [Combining like terms with absolute value, solving for positive solution]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must have positive and negative solutions, ask for positive one]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1047 = {
  metadata: {
    id: "1047",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 2|4-x| + 3|4-x| = 25
    // Pattern: a|b-x| + c|b-x| = d where a + c = some value that divides d nicely
    
    const insideValue = getRandomInt(2, 8); // The '4' in |4-x|
    const coeff1 = getRandomInt(1, 4);
    const coeff2 = getRandomInt(2, 5);
    const totalCoeff = coeff1 + coeff2;
    
    // Choose d to be divisible by totalCoeff for clean answer
    const multiplier = getRandomInt(3, 8);
    const d = totalCoeff * multiplier; // Ensures |inside - x| = multiplier
    
    // STEP 2: Calculate solutions
    // |insideValue - x| = multiplier
    // Case 1: insideValue - x = multiplier → x = insideValue - multiplier (smaller, possibly negative)
    // Case 2: insideValue - x = -multiplier → x = insideValue + multiplier (larger, positive)
    
    const x1 = insideValue - multiplier; // Usually negative or smaller
    const x2 = insideValue + multiplier; // Positive
    
    const positiveSolution = Math.max(x1, x2);
    
    // STEP 3: No figure needed
    const figureCode = null;
    
    return {
      questionText: `$${coeff1}|${insideValue}-x| + ${coeff2}|${insideValue}-x| = ${d}$\n\nWhat is the positive solution to the given equation?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: positiveSolution.toString(),
      explanation: `The correct answer is $${positiveSolution}$. Combining like terms: $${totalCoeff}|${insideValue}-x| = ${d}$, so $|${insideValue}-x| = ${multiplier}$. This gives two cases: ${insideValue}-x = ${multiplier}$ (so $x = ${x1}$) or ${insideValue}-x = -${multiplier}$ (so $x = ${x2}$). The positive solution is $${positiveSolution}$.`
    };
  }
};
