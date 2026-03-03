import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: eb672707
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [14 teaspoons, 3 tsp = 1 tbsp]
 * - Difficulty factors: [Simple division, fraction result]
 * - Distractor patterns: [None - fill in blank, accept fraction/decimal]
 * - Constraints: [Accept 14/3, 4.666, 4.667]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_eb672707 = {
  metadata: {
    // id: "eb672707",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 14 tsp, 3 tsp = 1 tbsp, answer = 14/3
    const teaspoons = getRandomInt(5, 40);
    const tspPerTbsp = getRandomInt(2, 5);
    
    // STEP 2: Calculate (result will be fraction)
    const tablespoons = teaspoons / tspPerTbsp;
    const fraction = `\\frac{${teaspoons}}{${tspPerTbsp}}`;
    
    return {
      questionText: `How many tablespoons are equivalent to $${teaspoons}$ teaspoons? ($${tspPerTbsp}$ teaspoons = 1 tablespoon)`,
      figureCode: null,
      options: null,
      correctAnswer: fraction,
      explanation: `The correct answer is $${fraction}$. It's given that $${tspPerTbsp}$ teaspoons is equivalent to 1 tablespoon. Therefore, $${teaspoons}$ teaspoons is equivalent to $(${teaspoons} \\text{ teaspoons})\\left( \\frac{1 \\text{ tablespoon}}{${tspPerTbsp} \\text{ teaspoons}} \\right)$, or $${fraction}$ tablespoons. Note that ${teaspoons}/${tspPerTbsp}, ${tablespoons.toFixed(3)}, and ${(Math.ceil(tablespoons * 1000) / 1000).toFixed(3)} are examples of ways to enter a correct answer.`
    };
  }
};

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

// File: generators/ratios-rates-proportional-relationships-and-units/cb4894f9.ts