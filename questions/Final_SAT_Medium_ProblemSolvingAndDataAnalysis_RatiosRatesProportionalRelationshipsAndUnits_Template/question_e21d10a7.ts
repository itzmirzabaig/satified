import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e21d10a7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [moon1: 252 days, moon2: 287 days, 29 orbits]
 * - Difficulty factors: [Multiplication, then difference calculation]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_e21d10a7 = {
  metadata: {
    // id: "e21d10a7",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 252 and 287 days, 29 orbits, difference = 1015
    const period1 = getRandomInt(100, 300);
    const periodDiff = getRandomInt(20, 60);
    const period2 = period1 + periodDiff;
    const orbits = getRandomInt(10, 40);
    
    // STEP 2: Calculate answer
    const time1 = period1 * orbits;
    const time2 = period2 * orbits;
    const difference = time2 - time1; // = periodDiff * orbits
    
    return {
      questionText: `One of a planet's moons orbits the planet every $${period1}$ days. A second moon orbits the planet every $${period2}$ days. How many more days does it take the second moon to orbit the planet $${orbits}$ times than it takes the first moon to orbit the planet $${orbits}$ times?`,
      figureCode: null,
      options: null,
      correctAnswer: difference.toLocaleString(),
      explanation: `The correct answer is ${difference.toLocaleString()}. It's given that the first moon orbits the planet every $${period1}$ days. Therefore, it takes the first moon $${period1}(${orbits})$, or $${time1.toLocaleString()}$, days to orbit the planet $${orbits}$ times. It's also given that the second moon orbits the planet every $${period2}$ days. Therefore, it takes the second moon $${period2}(${orbits})$, or $${time2.toLocaleString()}$, days to orbit the planet $${orbits}$ times. Since it takes the first moon $${time1.toLocaleString()}$ days and the second moon $${time2.toLocaleString()}$ days, it takes the second moon $${time2.toLocaleString()} - ${time1.toLocaleString()}$, or $${difference.toLocaleString()}$, more days than it takes the first moon to orbit the planet $${orbits}$ times.`
    };
  }
};

/**
 * Question ID: 1d945139
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [r objects = t mass, find mass of 146r objects]
 * - Difficulty factors: [Proportional reasoning with algebraic expressions]
 * - Distractor patterns: [A: 146-t (subtraction), B: 146+t (addition), C: t/146 (division)]
 * - Constraints: [Must scale proportionally]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/1d945139.ts