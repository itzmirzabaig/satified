import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: cb4894f9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [19.700 mph, 1760 yards/mile]
 * - Difficulty factors: [Unit conversion, multiplication with decimals]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must handle 3 decimal places in speed]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_cb4894f9 = {
  metadata: {
    // id: "cb4894f9",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 19.700 mph, 1760 yards/mile, answer = 34672
    const speedMph = getRandomInt(10000, 25000) / 1000; // 10.000 to 25.000 mph
    const yardsPerMile = getRandomInt(1400, 2200);
    
    // STEP 2: Calculate
    const speedYardsPerHour = Math.round(speedMph * yardsPerMile);
    
    return {
      questionText: `A triathlon is a multisport race consisting of three different legs. A triathlon participant completed the cycling leg with an average speed of $${speedMph.toFixed(3)}$ miles per hour. What was the average speed, in yards per hour, of the participant during the cycling leg? (1 mile = $${yardsPerMile}$ yards)`,
      figureCode: null,
      options: null,
      correctAnswer: speedYardsPerHour.toLocaleString(),
      explanation: `The correct answer is ${speedYardsPerHour.toLocaleString()}. It's given that 1 mile = $${yardsPerMile}$ yards. It follows that an average speed of $${speedMph.toFixed(3)}$ miles per hour is equivalent to $(${speedMph.toFixed(3)} \\text{ miles/hour})(${yardsPerMile} \\text{ yards/mile})$, or ${speedYardsPerHour.toLocaleString()} yards per hour.`
    };
  }
};

/**
 * Question ID: 1180401d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total area: 92.1, water: 11.3, population: 621,000]
 * - Difficulty factors: [Subtraction for land area, then division, closest answer]
 * - Distractor patterns: [A: use total area (6740), C/D: order of magnitude errors]
 * - Constraints: [Must subtract water area first, then calculate density]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/1180401d.ts