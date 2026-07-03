import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1070
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radical equation √3x+34 = x-2, solutions 10 and -3]
 * - Difficulty factors: [Radical equation, squaring both sides, checking extraneous solutions]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must check for extraneous solutions, find smallest valid solution]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1070 = {
  metadata: {
    id: "1070",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: √(3x+34) = x-2, solutions -3 and 10, smallest is -3
    // Pattern: √(ax+b) = x-c where one solution is extraneous
    
    const a = getRandomInt(2, 5);
    const c = getRandomInt(1, 4); // The subtraction on right side
    
    // We want solutions to be integers. If √(ax+b) = x-c, then ax+b = (x-c)² = x² - 2cx + c²
    // x² - (2c+a)x + (c²-b) = 0
    
    // Let's pick two integer solutions p and q, where p < c (so p-c < 0, making it extraneous if √(ap+b) ≥ 0)
    // And q > c (valid solution)
    
    const validSolution = getRandomInt(c + 2, c + 8);
    const extraneousSolution = getRandomInt(-5, c - 1); // Less than c, so x-c is negative
    
    // From solutions p and q: sum = 2c+a, product = c²-b
    const sum = validSolution + extraneousSolution;
    const product = validSolution * extraneousSolution;
    
    // sum = 2c + a → check consistency
    // Actually: sum = 2c + a, so a = sum - 2c
    const calculatedA = sum - 2*c;
    
    // product = c² - b → b = c² - product
    const calculatedB = c*c - product;
    
    // Verify: √(a*p+b) should equal p-c (but p-c < 0, so it's extraneous)
    // √(a*q+b) should equal q-c > 0 ✓
    
    // STEP 2: Calculate answer
    const smallestSolution = Math.min(validSolution, extraneousSolution);
    
    // STEP 3: No figure needed
    const figureCode = null;
    
    return {
      questionText: `$\\sqrt{${calculatedA}x+${calculatedB}} = x - ${c}$\n\nWhat is the smallest solution to the given equation?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: smallestSolution.toString(),
      explanation: `The correct answer is $${smallestSolution}$. Squaring both sides: $${calculatedA}x+${calculatedB}=(x-${c})^2=x^2-${2*c}x+${c*c}$. Rearranging: $x^2-${2*c+calculatedA}x+${c*c-calculatedB}=0$, which factors as $(x-${validSolution})(x-${extraneousSolution})=0$. The solutions are $${validSolution}$ and $${extraneousSolution}$. Checking: when $x=${extraneousSolution}$, the right side is ${extraneousSolution-c} < 0$, but the square root is non-negative, so this is extraneous. When $x=${validSolution}$, both sides equal ${validSolution-c}$. The smallest solution is $${smallestSolution}$.`
    };
  }
};
