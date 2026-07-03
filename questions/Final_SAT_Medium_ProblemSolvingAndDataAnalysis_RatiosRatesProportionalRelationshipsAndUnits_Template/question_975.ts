import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 975
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [112 furlongs, 220 yards/furlong, 3 feet/yard]
 * - Difficulty factors: [Two-step conversion chain]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_975 = {
  metadata: {
    id: "975",
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
    
    // STEP 2: Calculate (all inputs are integers, so totalFeet is a clean integer)
    const totalFeet = furlongs * yardsPerFurlong * feetPerYard;
    // Display uses grouped digits for readability; the typed answer must be a
    // plain number (no commas), so correctAnswer uses String(totalFeet).
    const totalFeetDisplay = totalFeet.toLocaleString('en-US');

    return {
      questionText: `A distance of $${furlongs}$ furlongs is equivalent to how many feet? (1 furlong = $${yardsPerFurlong}$ yards and 1 yard = $${feetPerYard}$ feet)`,
      figureCode: null,
      options: null,
      correctAnswer: String(totalFeet),
      explanation: `The correct answer is ${totalFeetDisplay}. It's given that 1 furlong = $${yardsPerFurlong}$ yards and 1 yard = $${feetPerYard}$ feet. It follows that a distance of $${furlongs}$ furlongs is equivalent to $${furlongs} \\text{ furlongs} \\times \\frac{${yardsPerFurlong} \\text{ yards}}{1 \\text{ furlong}} \\times \\frac{${feetPerYard} \\text{ feet}}{1 \\text{ yard}}$, or ${totalFeetDisplay} feet.`
    };
  }
};
