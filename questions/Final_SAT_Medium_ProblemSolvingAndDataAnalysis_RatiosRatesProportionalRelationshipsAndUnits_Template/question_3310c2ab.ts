import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 3310c2ab
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quarts: 76, conversion: 8 oz/cup, 4 cups/quart]
 * - Difficulty factors: [Multi-step unit conversion, quarts→cups→ounces]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_3310c2ab = {
  metadata: {
    // id: "3310c2ab",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 76 quarts, 8 oz = 1 cup, 4 cups = 1 quart
    // Strategy: Generate quarts such that result is clean
    const quarts = getRandomInt(10, 150); // like 76
    const ozPerCup = getRandomInt(4, 12); // like 8
    const cupsPerQuart = getRandomInt(2, 8); // like 4
    
    // STEP 2: Calculate conversion
    // quarts → cups → ounces
    const totalCups = quarts * cupsPerQuart;
    const totalOunces = totalCups * ozPerCup;
    
    return {
      questionText: `How many fluid ounces are equivalent to $${quarts}$ quarts? ($${ozPerCup}$ fluid ounces = 1 cup and $${cupsPerQuart}$ cups = 1 quart)`,
      figureCode: null,
      options: null,
      correctAnswer: totalOunces.toString(),
      explanation: `The correct answer is ${totalOunces.toLocaleString()}. It's given that $${cupsPerQuart}$ cups = 1 quart. It follows that $${quarts}$ quarts is equivalent to $(${quarts} \\text{ quarts}) (${cupsPerQuart} \\text{ cups} / 1 \\text{ quart})$, or $${totalCups}$ cups. It's also given that $${ozPerCup}$ fluid ounces = 1 cup. It follows that $${totalCups}$ cups is equivalent to $(${totalCups} \\text{ cups}) (${ozPerCup} \\text{ fluid ounces} / 1 \\text{ cup})$, or $${totalOunces.toLocaleString()}$ fluid ounces.`
    };
  }
};

/**
 * Question ID: 3726e079
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x/y = 4, 24x/ny = 4]
 * - Difficulty factors: [Algebraic manipulation with ratios, substitution]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [n must be integer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/3726e079.ts