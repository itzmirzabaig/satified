import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 73ddfdac
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [112 furlongs, 220 yards/furlong, 3 feet/yard]
 * - Difficulty factors: [Two-step conversion chain]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_73ddfdac = {
  metadata: {
    // id: "73ddfdac",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 112 furlongs, 220 yards/furlong, 3 feet/yard, answer = 73,920
    const furlongs = getRandomInt(50, 200);
    const yardsPerFurlong = getRandomInt(180, 250);
    const feetPerYard = getRandomInt(2, 5);
    
    // STEP 2: Calculate
    const totalFeet = furlongs * yardsPerFurlong * feetPerYard;
    
    return {
      questionText: `A distance of $${furlongs}$ furlongs is equivalent to how many feet? (1 furlong = $${yardsPerFurlong}$ yards and 1 yard = $${feetPerYard}$ feet)`,
      figureCode: null,
      options: null,
      correctAnswer: totalFeet.toLocaleString(),
      explanation: `The correct answer is ${totalFeet.toLocaleString()}. It's given that 1 furlong = $${yardsPerFurlong}$ yards and 1 yard = $${feetPerYard}$ feet. It follows that a distance of $${furlongs}$ furlongs is equivalent to $${furlongs} \\text{ furlongs} \\times \\frac{${yardsPerFurlong} \\text{ yards}}{1 \\text{ furlong}} \\times \\frac{${feetPerYard} \\text{ feet}}{1 \\text{ yard}}$, or ${totalFeet.toLocaleString()} feet.`
    };
  }
};

/**
 * Question ID: 61b87506
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio j:k = 11:12, j×17, k×?]
 * - Difficulty factors: [Ratio preservation principle]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Answer is always same multiplier as j]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/61b87506.ts