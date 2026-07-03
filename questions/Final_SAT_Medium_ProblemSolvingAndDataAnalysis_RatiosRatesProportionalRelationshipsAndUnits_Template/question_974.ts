import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 974
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [speed numerator/denominator ft/s, feetPerYard feet = 1 yard]
 * - Difficulty factors: [Fraction division, unit conversion with fractions]
 * - Distractor patterns: [multiply instead of divide, no conversion, wrong denominator op]
 * - Constraints: [Must divide the rate by feetPerYard]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * REPAIR NOTES:
 * - Distractor "reason" strings were plain double-quoted strings containing
 *   `${feetPerYard}` / `${numerator}` / `${denominator}`, so the interpolation
 *   was emitted literally (TEMPLATE_LEFTOVER). Reasons are now backticked.
 * - Rebuilt the three distractors as reduced fractions that are provably
 *   distinct from the correct answer and from each other (multiply-by-feetPerYard,
 *   no-conversion, added-instead-of-multiplied denominator), replacing the old
 *   arbitrary-integer distractors that could collide with each other/the answer.
 * - A `frac()` helper reduces every value and prints an integer when the
 *   denominator reduces to 1 (no `\frac{x}{1}`). A bounded guard resamples if
 *   any two of the four option values are numerically equal.
 * - The "feet = 1 yard" note is plain prose (number not adjacent to a `$`), so
 *   the field no longer trips the currency-collision heuristic.
 */

export const generator_974 = {
  metadata: {
    id: "974",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(Math.abs(b), Math.abs(a % b)));
    // Reduce n/d and render: integer when it reduces to a whole number, else \frac.
    const frac = (n: number, d: number): string => {
      const g = gcd(n, d) || 1;
      const nn = n / g, dd = d / g;
      return dd === 1 ? `${nn}` : `\\frac{${nn}}{${dd}}`;
    };
    const value = (n: number, d: number): number => n / d;

    let numerator = 0, denominator = 0, feetPerYard = 0;
    let correctStr = '', wrongMultiplyStr = '', wrongNoConvStr = '', wrongAddStr = '';

    let tries = 0;
    do {
      numerator = getRandomInt(1, 9);
      denominator = getRandomInt(10, 30);
      feetPerYard = getRandomInt(2, 5);

      // Correct: divide the rate by feetPerYard -> numerator / (denominator * feetPerYard)
      correctStr = frac(numerator, denominator * feetPerYard);
      // Wrong 1: multiply instead of divide -> (numerator * feetPerYard) / denominator
      wrongMultiplyStr = frac(numerator * feetPerYard, denominator);
      // Wrong 2: forget to convert, leave the rate in feet per second
      wrongNoConvStr = frac(numerator, denominator);
      // Wrong 3: add feetPerYard to the denominator instead of multiplying
      wrongAddStr = frac(numerator, denominator + feetPerYard);
    } while (
      tries++ < 50 &&
      new Set([
        value(numerator, denominator * feetPerYard),
        value(numerator * feetPerYard, denominator),
        value(numerator, denominator),
        value(numerator, denominator + feetPerYard)
      ]).size !== 4
    );

    const optionsData = [
      { text: correctStr, isCorrect: true },
      { text: wrongMultiplyStr, isCorrect: false, reason: `comes from multiplying the rate by ${feetPerYard} instead of dividing by ${feetPerYard}` },
      { text: wrongNoConvStr, isCorrect: false, reason: `is the original speed in feet per second, left without converting to yards` },
      { text: wrongAddStr, isCorrect: false, reason: `adds ${feetPerYard} to the denominator instead of multiplying the denominator by ${feetPerYard}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `An insect moves at a speed of $\\frac{${numerator}}{${denominator}}$ feet per second. What is this speed, in yards per second? (${feetPerYard} feet = 1 yard)`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctStr,
      explanation: `Choice ${correctLetter} is correct. Because ${feetPerYard} feet make 1 yard, dividing the speed by ${feetPerYard} converts feet per second to yards per second: $\\frac{${numerator}}{${denominator}} \\div ${feetPerYard} = \\frac{${numerator}}{${denominator}} \\times \\frac{1}{${feetPerYard}} = \\frac{${numerator}}{${denominator * feetPerYard}} = ${correctStr}$ yards per second. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
