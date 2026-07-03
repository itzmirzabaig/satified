import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 980
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 0.555, price: $8.00 per ounce]
 * - Difficulty factors: [Density × Price = Unit price conversion, decimal multiplication]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must handle decimal precision]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_980 = {
  metadata: {
    id: "980",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 0.555 oz/cubic inch, $8.00/oz, answer = $4.44 (exact).
    // density = thousandths/1000 (3 decimals), price = integer dollars.
    // The selling price (dollars per cubic inch) must be an exact currency value
    // with at most 2 decimals a student can grid in, so we require
    // (densityThousandths * pricePerOz) % 10 === 0. Then
    // pricePerCubicInch = (densityThousandths * pricePerOz) / 1000 has at most
    // two decimal places and carries no float/rounding artifact.
    let densityThousandths = getRandomInt(400, 750); // 0.400 .. 0.750
    let pricePerOz = getRandomInt(5, 15);            // $5 .. $15
    let tries = 0;
    while ((densityThousandths * pricePerOz) % 10 !== 0 && tries++ < 50) {
      densityThousandths = getRandomInt(400, 750);
      pricePerOz = getRandomInt(5, 15);
    }
    // Guaranteed-exact fallback: a density that is a multiple of 10 thousandths
    // (i.e. at most 2 decimals) makes the product a multiple of 10 for any price.
    if ((densityThousandths * pricePerOz) % 10 !== 0) {
      densityThousandths = getRandomInt(40, 75) * 10;
    }
    const density = densityThousandths / 1000;

    // STEP 2: Calculate answer — exact 2-decimal value built from INTEGER cents
    // (no float in the answer path). priceCents is thousandths*dollars; dividing
    // by 10 gives whole cents because the product is a multiple of 10.
    const cents = (densityThousandths * pricePerOz) / 10; // integer number of cents, e.g. 555*8/10 = 444
    const dollarsPart = Math.floor(cents / 100);
    const centsPart = cents % 100;
    const answerStr = `${dollarsPart}.${String(centsPart).padStart(2, '0')}`; // e.g. "4.44"

    return {
      questionText: `Pure beeswax has a density of $${density}$ ounce per cubic inch. An online company sells pure beeswax at a price of \\$${pricePerOz}.00 per ounce. What is the selling price, in dollars per cubic inch, for pure beeswax purchased from this company?`,
      figureCode: null,
      options: null,
      correctAnswer: answerStr,
      explanation: `The correct answer is \\$${answerStr}. The selling price, in dollars per cubic inch, is found by multiplying the density, in ounces per cubic inch, by the unit price, in dollars per ounce: $\\left(\\frac{${density} \\text{ ounce}}{1 \\text{ cubic inch}}\\right)\\left(\\frac{\\$${pricePerOz}.00}{1 \\text{ ounce}}\\right)$ yields $\\frac{\\$${answerStr}}{1 \\text{ cubic inch}}$.`
    };
  }
};
