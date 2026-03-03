import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 96c3e32d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 874 in², pressure: 19 psi]
 * - Difficulty factors: [Pressure × Area = Force, large number multiplication]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must multiply]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_96c3e32d = {
  metadata: {
    // id: "96c3e32d",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 874 in², 19 psi, force = 16606
    const area = getRandomInt(500, 1200);
    const pressure = getRandomInt(10, 40);
    
    // STEP 2: Calculate
    const force = area * pressure;
    
    return {
      questionText: `One side of a flat board has an area of $${area}$ square inches. If a pressure of $${pressure}$ pounds per square inch of area is exerted on this side of the board, what is the total force, in pounds, exerted on this side of the board?`,
      figureCode: null,
      options: null,
      correctAnswer: force.toLocaleString(),
      explanation: `The correct answer is ${force.toLocaleString()}. It's given that one side of a flat board has an area of $${area}$ square inches. If a pressure of $${pressure}$ pounds per square inch of area is exerted on this side of the board, the total force exerted on this side of the board is (${area} \\text{ square inches})(${pressure} \\text{ pounds/1 square inch}), or ${force.toLocaleString()} pounds.`
    };
  }
};

/**
 * Question ID: 89c39d77
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20.300 mph, 1760 yards/mile]
 * - Difficulty factors: [Decimal mph conversion to yards/hour]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must handle 3 decimal places]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/89c39d77.ts