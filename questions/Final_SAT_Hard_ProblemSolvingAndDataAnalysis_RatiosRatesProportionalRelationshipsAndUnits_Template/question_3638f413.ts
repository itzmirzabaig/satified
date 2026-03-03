import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3638f413
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [final amount: 480 (triple-digit), years: 4 (doubling periods)]
 * - Difficulty factors: [Exponential decay/growth, working backwards from final to initial]
 * - Distractor patterns: [Fill-in-the-blank - no distractors needed]
 * - Constraints: [Final amount must be divisible by 2⁴ = 16 for clean integer answer]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */

export const generator_3638f413 = {
  metadata: {
    // id: "3638f413",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate initial investment (x) that gives clean final value
    // We need final = x × 2⁴ = x × 16, so x = final / 16
    // Choose x as integer 20-50 to get final 320-800
    const initialX = getRandomInt(20, 50);
    const years = 4;
    const multiplier = Math.pow(2, years); // 16
    const finalAmount = initialX * multiplier;
    
    // STEP 2: Calculate answer (working backwards)
    const correctAnswer = initialX;
    
    return {
      questionText: `Jeremy deposited x dollars in his investment account on January 1, 2001. The amount of money in the account doubled each year until Jeremy had $${finalAmount}$ dollars in his investment account on January 1, 2005. What is the value of x?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer.toString(),
      explanation: `The correct answer is ${correctAnswer}. The situation can be represented by the equation $x(2^${years})=${finalAmount}$, where the 2 represents the fact that the amount doubled each year and the ${years} represents the number of years between January 1, 2001, and January 1, 2005. Simplifying gives $${multiplier}x=${finalAmount}$. Therefore, $x=${correctAnswer}$.`
    };
  }
};

/**
 * Question ID: 8637294f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [4a/b = 6.7 (decimal), a/(bn) = 26.8 (decimal)]
 * - Difficulty factors: [Complex fraction manipulation, substitution, solving for variable in denominator]
 * - Distractor patterns: [Fill-in-the-blank - no distractors needed]
 * - Constraints: [Values must align so that a/b from first equation substitutes cleanly into second]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */