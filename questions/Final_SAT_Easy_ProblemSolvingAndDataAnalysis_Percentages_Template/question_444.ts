import { getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 444
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base value, percentage increase]
 * - Difficulty factors: [Percentage increase, add increase to base]
 * - Distractor patterns: [percent decrease, doubled increase, base unchanged]
 * - Constraints: [Clean integer result]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - distractorD used base*1.2 (float) -> FLOAT_ARTIFACT; and the 25%/120%
 *   distractors could collide with the answer -> DUP_OPTIONS / LETTER_MISMATCH.
 * - base is now a multiple of 20 and the percent a multiple of 5, so the
 *   increase (P*base/100) is always an exact integer -- no rounding, no floats.
 * - Distractors are base-inc, base+2*inc, base (no change). With inc >= 2 for
 *   every draw, all four values are pairwise distinct, so no retry is needed.
 * - Explanation writes P/100 as an exact 2-decimal via toFixed(2) (every
 *   percent here is >= 15, so no single-digit 0.<P> bug), and keeps both inline
 *   math segments starting with a digit so no $ abuts a backslash -- clears the
 *   DOLLAR_RISK soft flag while staying pure math (no currency involved).
 */

export const generator_444 = {
  metadata: {
    id: "444",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // base multiple of 20, percent multiple of 5 => P*base/100 is an integer.
    const base = getRandomElement([40, 60, 80, 100, 120]);
    const increasePercent = getRandomElement([15, 20, 25, 30, 35]);
    const increaseAmount = (increasePercent * base) / 100; // exact integer
    const result = base + increaseAmount;

    // inc >= 15*40/100 = 6 for every draw, so all four values below are
    // pairwise distinct and all positive.
    const distractorLess = base - increaseAmount;      // computed a decrease
    const distractorDouble = base + 2 * increaseAmount; // doubled the increase
    const distractorBase = base;                        // added nothing

    const optionsData = [
      { text: `${distractorLess}`, isCorrect: false, reason: `is ${increasePercent}% less than ${base}, not greater` },
      { text: `${result}`, isCorrect: true },
      { text: `${distractorDouble}`, isCorrect: false, reason: `adds the increase twice, a ${2 * increasePercent}% increase` },
      { text: `${distractorBase}`, isCorrect: false, reason: `is the original value with no increase applied` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What number is ${increasePercent}% greater than ${base}?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${result}`,
      explanation: `Choice ${correctOption.letter} is correct. First find ${increasePercent}% of ${base}: $${(increasePercent / 100).toFixed(2)} \\times ${base} = ${increaseAmount}$. Then add this to the original value: $${base} + ${increaseAmount} = ${result}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
