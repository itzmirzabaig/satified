import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 979
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20.300 mph, 1760 yards/mile]
 * - Difficulty factors: [Decimal mph conversion to yards/hour]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must handle 3 decimal places]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_979 = {
  metadata: {
    id: "979",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 20.300 mph, 1760 yards/mile, answer = 35728 (exact integer).
    // The answer (yards/hour) must be a whole number a student can grid in, so
    // we require (thousandths * yardsPerMile) to be divisible by 1000, i.e. the
    // product speedMph * yardsPerMile lands on an exact integer with no
    // rounding and no float artifacts. Bounded retry picks such a pair.
    let thousandths = getRandomInt(15000, 25000); // mph * 1000: 15.000 .. 25.000
    let yardsPerMile = getRandomInt(1500, 2000);
    let tries = 0;
    while ((thousandths * yardsPerMile) % 1000 !== 0 && tries++ < 50) {
      thousandths = getRandomInt(15000, 25000);
      yardsPerMile = getRandomInt(1500, 2000);
    }
    // Guaranteed-exact fallback if the retry budget is exhausted: a whole-number
    // mph (thousandths a multiple of 1000) makes the product an integer for any
    // yardsPerMile.
    if ((thousandths * yardsPerMile) % 1000 !== 0) {
      thousandths = getRandomInt(15, 25) * 1000;
    }
    const speedMph = thousandths / 1000;

    // STEP 2: Calculate — exact integer by construction.
    const speedYph = (thousandths * yardsPerMile) / 1000;
    const speedYphDisplay = speedYph.toLocaleString('en-US');

    return {
      questionText: `A competition consisted of four different events. One participant completed the first event with an average speed of $${speedMph.toFixed(3)}$ miles per hour. What was this average speed, in yards per hour? (1 mile = $${yardsPerMile}$ yards)`,
      figureCode: null,
      options: null,
      correctAnswer: String(speedYph),
      explanation: `The correct answer is ${speedYphDisplay}. It's given that 1 mile = $${yardsPerMile}$ yards. It follows that an average speed of $${speedMph.toFixed(3)}$ miles per hour is equivalent to $${speedMph.toFixed(3)} \\text{ miles/1 hour} \\times ${yardsPerMile} \\text{ yards/1 mile}$, or ${speedYphDisplay} yards per hour.`
    };
  }
};
