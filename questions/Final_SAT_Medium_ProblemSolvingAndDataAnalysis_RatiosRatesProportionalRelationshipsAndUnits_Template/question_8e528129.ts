import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8e528129
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 0.555, price: $8.00 per ounce]
 * - Difficulty factors: [Density × Price = Unit price conversion, decimal multiplication]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must handle decimal precision]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_8e528129 = {
  metadata: {
    // id: "8e528129",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 0.555 oz/cubic inch, $8.00/oz
    // Generate density with 3 decimal places, price as integer dollars
    
    const densityThousandths = getRandomInt(400, 750); // 0.400 to 0.750
    const density = densityThousandths / 1000;
    const pricePerOz = getRandomInt(5, 15); // $5 to $15
    
    // STEP 2: Calculate answer
    const pricePerCubicInch = density * pricePerOz;
    
    return {
      questionText: `Pure beeswax has a density of $${density}$ ounce per cubic inch. An online company sells pure beeswax at a price of $$${pricePerOz}.00$ per ounce. What is the selling price, in dollars per cubic inch, for pure beeswax purchased from this company?`,
      figureCode: null,
      options: null,
      correctAnswer: pricePerCubicInch.toFixed(2),
      explanation: `The correct answer is $$${pricePerCubicInch.toFixed(2)}$. The selling price, in dollars per cubic inch, is found by multiplying the density, in ounces per cubic inch, by the unit price, in dollars per ounce: $\\left(\\frac{${density} \\text{ ounce}}{1 \\text{ cubic inch}}\\right)\\left(\\frac{\$${pricePerOz}.00}{1 \\text{ ounce}}\\right)$ yields $\\frac{\$${pricePerCubicInch.toFixed(2)}}{1 \\text{ cubic inch}}$.`
    };
  }
};

/**
 * Question ID: 9fa781f8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio 9:5, x=162, find y]
 * - Difficulty factors: [Ratio to equation conversion, cross-multiplication]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/9fa781f8.ts