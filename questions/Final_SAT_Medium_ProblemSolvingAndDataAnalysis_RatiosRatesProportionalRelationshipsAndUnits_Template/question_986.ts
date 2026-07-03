import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 986
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [19.700 mph, 1760 yards/mile]
 * - Difficulty factors: [Unit conversion, multiplication with decimals]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must handle 3 decimal places in speed]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 *
 * REPAIR NOTES:
 * - Fill-in answer must be a plain number (no thousands separators). The grader
 *   accepts a bare integer, so we emit the raw string, not toLocaleString().
 * - To keep a decimal speed while guaranteeing an EXACT integer answer (so the
 *   explanation's "=" is literally true and no float artifact can appear), we use
 *   a half-mile-per-hour speed (x.5) together with an EVEN yards/mile factor:
 *   (w + 0.5) * yardsPerMile = w*yardsPerMile + yardsPerMile/2, an integer when
 *   yardsPerMile is even. Speed is displayed to 3 decimals ("19.500") to match the
 *   original's decimal flavor; the product is always whole.
 */

export const generator_986 = {
  metadata: {
    id: "986",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 19.700 mph, 1760 yards/mile, answer = 34672 (exact).
    // wholeMph in [10, 24]; speed = wholeMph + 0.5 -> a genuine decimal (e.g. 19.500).
    const wholeMph = getRandomInt(10, 24);
    const speedMph = wholeMph + 0.5; // 10.5 .. 24.5
    // yardsPerMile forced EVEN so (wholeMph + 0.5) * yardsPerMile is an exact integer.
    const yardsPerMile = getRandomInt(700, 1100) * 2; // even, 1400 .. 2200

    // STEP 2: Calculate — exact integer, no rounding.
    const speedYardsPerHour = wholeMph * yardsPerMile + yardsPerMile / 2;
    const speedStr = speedMph.toFixed(3); // "19.500"

    return {
      questionText: `A triathlon is a multisport race consisting of three different legs. A triathlon participant completed the cycling leg with an average speed of $${speedStr}$ miles per hour. What was the average speed, in yards per hour, of the participant during the cycling leg? (1 mile = $${yardsPerMile}$ yards)`,
      figureCode: null,
      options: [],
      correctAnswer: String(speedYardsPerHour),
      explanation: `The correct answer is $${speedYardsPerHour}$. It's given that 1 mile = $${yardsPerMile}$ yards. It follows that an average speed of $${speedStr}$ miles per hour is equivalent to $(${speedStr}\\text{ miles/hour})(${yardsPerMile}\\text{ yards/mile})$, or $${speedYardsPerHour}$ yards per hour.`
    };
  }
};
