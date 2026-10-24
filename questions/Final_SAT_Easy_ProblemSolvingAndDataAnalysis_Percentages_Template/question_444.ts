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
    // 100 is left out: there, adding the percent as a number gives the answer.
    const base = getRandomElement([40, 60, 80, 120, 140]);
    const increasePercent = getRandomElement([15, 20, 25, 30, 35]);
    const increaseAmount = (increasePercent * base) / 100; // exact integer
    const result = base + increaseAmount;

    // Wrong choices: a decrease instead of an increase, the increase alone,
    // and the percent added as a number. The last two replaced "adds the
    // increase twice" and the unchanged base.
    const optionsData = [
      { text: `${base - increaseAmount}`, isCorrect: false, reason: `${base - increaseAmount} is ${increasePercent}% less than ${base}, not ${increasePercent}% greater` },
      { text: `${result}`, isCorrect: true, reason: '' },
      { text: `${increaseAmount}`, isCorrect: false, reason: `${increaseAmount} is ${increasePercent}% of ${base}, the amount of the increase; it must be added to ${base}` },
      { text: `${base + increasePercent}`, isCorrect: false, reason: `${base + increasePercent} results from adding ${increasePercent} to ${base} instead of adding ${increasePercent}% of ${base}` }
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
      explanation: `Choice ${correctOption.letter} is correct. First find ${increasePercent}% of ${base}: $${(increasePercent / 100).toFixed(2)} \\times ${base} = ${increaseAmount}$. Then add this to the original value: $${base} + ${increaseAmount} = ${result}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
