import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_89c39d77 = {
  metadata: {
    // id: "89c39d77",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 20.300 mph, 1760 yards/mile, answer = 35728
    const speedMph = getRandomInt(15000, 25000) / 1000;
    const yardsPerMile = getRandomInt(1500, 2000);
    
    // STEP 2: Calculate
    const speedYph = Math.round(speedMph * yardsPerMile);
    
    return {
      questionText: `A competition consisted of four different events. One participant completed the first event with an average speed of $${speedMph.toFixed(3)}$ miles per hour. What was this average speed, in yards per hour? (1 mile = $${yardsPerMile}$ yards)`,
      figureCode: null,
      options: null,
      correctAnswer: speedYph.toLocaleString(),
      explanation: `The correct answer is ${speedYph.toLocaleString()}. It's given that 1 mile = $${yardsPerMile}$ yards. It follows that an average speed of $${speedMph.toFixed(3)}$ miles per hour is equivalent to (${speedMph.toFixed(3)} \\text{ miles/1 hour})(${yardsPerMile} \\text{ yards/1 mile}), or ${speedYph.toLocaleString()} yards per hour.`
    };
  }
};

/**
 * Question ID: 674a4084
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed: 3/20 ft/s, 3 feet = 1 yard]
 * - Difficulty factors: [Fraction division, unit conversion with fractions]
 * - Distractor patterns: [B: 9/20 (multiply by 3), C: 6, D: 20]
 * - Constraints: [Must divide by 3]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/674a4084.ts