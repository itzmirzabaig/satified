import { getRandomInt, round } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1416
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [very small percentage of the form m×10^-e %, sample mass in grams]
 * - Difficulty factors: [Very small percentage, unit conversion attention]
 * - Distractor patterns: [Decimal place errors, percentage conversion errors]
 * - Constraints: [answer = sampleMass × (m×10^-e)/100 must be a clean, typeable decimal]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - straightforward calculation]
 *
 * NUMBER CONSTRUCTION (float-safe, ≤4-decimal answer for every draw):
 *   percentage = mantissa × 10^-exponent %, with exponent ∈ {2,3}.
 *   As a fraction of the mass this is mantissa × 10^-(exponent+2).
 *   sampleMass is a multiple of 100 (units = 100·k grams), so
 *     answer = 100k × mantissa × 10^-(exponent+2) = k × mantissa × 10^-exponent.
 *   With exponent ≤ 3 that is at most 3 decimal places. The whole answer is built
 *   from the integer (k·mantissa) divided by 10^exponent, so no float artifact can
 *   appear, and the explanation is computed from the same live variables.
 */

export const generator_1416 = {
  metadata: {
    id: "1416",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Very small percentage m×10^-e % (0.001% .. 0.09%) and a sample mass
    // that is a whole number of hundreds of grams so the answer stays clean.
    const mantissa = getRandomInt(1, 9);        // 1-9
    const exponent = getRandomInt(2, 3);        // 10^-2 % .. 10^-3 %  (i.e. 0.01% .. 0.001%)
    const hundreds = getRandomInt(1, 9);        // k
    const sampleMass = hundreds * 100;          // 100 .. 900 grams

    // STEP 2: Answer, built from integers to avoid any floating-point drift.
    //   answer = sampleMass × (mantissa × 10^-exponent) / 100
    //          = (hundreds × mantissa) / 10^exponent
    const answerNumerator = hundreds * mantissa;          // integer
    const denomPow = Math.pow(10, exponent);              // 100 or 1000 (exact)
    const maxMass = round(answerNumerator / denomPow, 4); // ≤3 decimals by construction

    // The percentage written as an ordinary decimal (for the explanation), built
    // from integers: mantissa × 10^-exponent, so 0.09 .. 0.001 (≤3 decimals).
    const percentValue = round(mantissa / denomPow, 4);   // percent, e.g. 0.02
    // Intermediate numerator percentValue × sampleMass (a clean value); dividing
    // by 100 converts "percent of the mass" into the actual mass in grams.
    const scaledProduct = round(percentValue * sampleMass, 4); // e.g. 0.02×300 = 6

    return {
      questionText: `According to a set of standards, a certain type of substance can contain a maximum of $${mantissa} \\times 10^{-${exponent}}\\%$ phosphorus by mass. If a sample of this substance has a mass of ${sampleMass} grams, what is the maximum mass, in grams, of phosphorus the sample can contain to meet these standards?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: maxMass.toString(),
      explanation: `The maximum allowed is ${percentValue}% of the sample by mass. Finding ${percentValue}% of ${sampleMass} grams means multiplying ${sampleMass} by ${percentValue} and dividing by 100: $\\frac{${sampleMass} \\times ${percentValue}}{100} = \\frac{${scaledProduct}}{100} = ${maxMass}$ grams.`
    };
  }
};
