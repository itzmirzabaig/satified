import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 90bcaa61
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(t) = 60000(2)^(t/410), doubling time = 410]
 * - Difficulty factors: [Understanding doubling time in exponential growth formula]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Doubling when exponent = 1, so t = 410]
 * - Question type: [No Figure→Fill in the Blank]
 * - Figure generation: [None - function interpretation]
 */

export const generator_90bcaa61 = {
  metadata: {
    // id: "90bcaa61",
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
      options: null, // Fill-in-the-blank
      correctAnswer: `${doublingTime}`,
      // Fixed: \\frac instead of \\\\frac throughout
      explanation: `The correct answer is ${doublingTime}. The expression $(2)^{\\frac{t}{${doublingTime}}}$ doubles when the exponent $\\frac{t}{${doublingTime}}$ increases by 1 (since $2^1 = 2$). For the exponent to increase by 1, $t$ must increase by ${doublingTime}$. Therefore, the doubling time is ${doublingTime} minutes.`
    };
  }
};

/**
 * Question ID: dd8ac009
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 670, rate: 0.006 (0.6%), table values]
 * - Difficulty factors: [Exponential growth from table, compound interest]
 * - Distractor patterns: [A: wrong structure, C: missing principal, D: extreme values]
 * - Constraints: [d = P(1+r)^t, P = 670, r = 0.006]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */