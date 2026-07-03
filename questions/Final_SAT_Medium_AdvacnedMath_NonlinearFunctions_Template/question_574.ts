import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 574
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(t) = 60000(2)^(t/410), doubling time = 410]
 * - Difficulty factors: [Understanding doubling time in exponential growth formula]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Doubling when exponent = 1, so t = 410]
 * - Question type: [No Figure→Fill in the Blank]
 * - Figure generation: [None - function interpretation]
 */

export const generator_574 = {
  metadata: {
    id: "574",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: doubling time 410
    // Randomize: doubling time (200-600)
    const doublingTime = getRandomInt(20, 60) * 10; // 200 to 600
    const initial = getRandomInt(4, 8) * 10000; // 40000 to 80000
    
    // STEP 2: Calculate derived values
    
    // STEP 3: Build question text
    // Fixed: \\frac instead of \\\\frac
    const questionText = `The function $f(t)=${initial}(2)^{\\frac{t}{${doublingTime}}}$ gives the number of bacteria in a population $t$ minutes after an initial observation. How much time, in minutes, does it take for the number of bacteria in the population to double?`;
    
    // STEP 4: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: `${doublingTime}`,
      explanation: `The correct answer is ${doublingTime}. In the expression $(2)^{\\frac{t}{${doublingTime}}}$, the number of bacteria doubles each time the exponent $\\frac{t}{${doublingTime}}$ increases by 1, because increasing the exponent by 1 multiplies the value of the expression by a factor of 2. The exponent $\\frac{t}{${doublingTime}}$ increases by 1 exactly when $t$ increases by ${doublingTime}. Therefore, it takes ${doublingTime} minutes for the number of bacteria in the population to double.`
    };
  }
};
