import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1246
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 36, 45, fractions with 12, 4]
 * - Difficulty factors: [Parallel lines condition, slope comparison from different forms]
 * - Distractor patterns: [Wrong slope, same line (infinite solutions), wrong manipulation]
 * - Constraints: [Slope must equal 1/slopeBase, y-intercept must differ]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 *
 * FIXED (WRONG_ANSWER + BAD_EXPLANATION):
 * - The given line a_base*x = b_base*y - c_base rewrites as
 *   x = slopeBase*y - c_base/a_base. The old "same line" distractor (option C)
 *   used x = slopeBase*y - round(c_base/a_base). When c_base was NOT divisible
 *   by a_base, round(c_base/a_base) != c_base/a_base, so option C was actually
 *   parallel-and-DISTINCT — a SECOND valid "no solution" answer colliding with
 *   the intended unique correct choice B, and the explanation's "same line /
 *   infinitely many solutions" claim was false.
 *   Root fix: force c_base to be an exact multiple of a_base, so the intercept
 *   term c_base/a_base is an integer and option C is the GENUINE same line
 *   (infinitely many solutions). Choice B (slope 1/slopeBase, intercept 0) is
 *   then the only parallel-and-distinct line -> unique no-solution answer.
 * - Replaced the broken getRandomInt(min,max,[excl]) calls (3rd arg was
 *   silently ignored) with real exclusion loops, and guarded every distractor's
 *   effective slope so none can equal the given slope (1/slopeBase) or each
 *   other -> no distractor collision and exactly one correct choice per draw.
 */

export const generator_1246 = {
  metadata: {
    id: "1246",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;

    while (attempts < maxAttempts && !result) {
      attempts++;

      const slopeBase = getRandomInt(3, 6); // given slope = 1/slopeBase

      const a_base = getRandomInt(2, 5);
      const b_base = a_base * slopeBase; // slope = a_base/b_base = 1/slopeBase

      // c_base MUST be an exact multiple of a_base so that the given line
      // x = slopeBase*y - (c_base/a_base) has an INTEGER intercept term.
      // This lets the "same line" distractor reproduce it exactly.
      const cQuotient = getRandomInt(4, 10);      // integer x-intercept term
      const c_base = a_base * cQuotient;          // divisible by a_base
      const givenIntercept = cQuotient;           // = c_base / a_base (integer)

      // ── Option B: same slope, DIFFERENT (zero) intercept -> parallel & distinct
      //    Written as (1/factor1)x = factor2 y, i.e. slope 1/(factor1*factor2)
      //    with factor1*factor2 = slopeBase, so its slope is 1/slopeBase. ✓
      const factor1 = getRandomInt(2, slopeBase - 1);
      const factor2 = slopeBase / factor1;
      if (factor2 !== Math.floor(factor2) || factor2 <= 0) {
        continue; // slopeBase not factorable this way; retry
      }
      const optB_text = `\\frac{1}{${factor1}}x = ${factor2}y`;

      // ── Option A: wrong (different) slope, form x = optA_slope y
      let optA_slope = getRandomInt(2, 8);
      let guardA = 0;
      while (optA_slope === slopeBase && guardA++ < 50) optA_slope = getRandomInt(2, 8);
      if (optA_slope === slopeBase) continue;
      const optA_text = `x = ${optA_slope}y`;

      // ── Option C: SAME line as the given equation -> infinitely many solutions.
      //    x = slopeBase y - givenIntercept  (givenIntercept is an integer, so
      //    this is exactly the given line rewritten).
      const optC_text = `x = ${slopeBase}y - ${givenIntercept}`;

      // ── Option D: different slope, form (1/optD_den)x = optD_slope y ± k.
      //    Effective slope = 1/(optD_den*optD_slope); guard it != 1/slopeBase.
      const optD_den = getRandomInt(2, 4);
      let optD_slope = getRandomInt(2, 8);
      let guardD = 0;
      // avoid equal slope to given, and avoid equal x-form slope to option A
      while (
        (optD_den * optD_slope === slopeBase || optD_slope === optA_slope) &&
        guardD++ < 50
      ) {
        optD_slope = getRandomInt(2, 8);
      }
      if (optD_den * optD_slope === slopeBase || optD_slope === optA_slope) continue;
      const optD_sign = getRandomElement(['-', '+']);
      const optD_const = getRandomInt(10, 30);
      const optD_text = `\\frac{1}{${optD_den}}x = ${optD_slope}y ${optD_sign} ${optD_const}`;

      const questionText = `One of the two equations in a system of linear equations is ${a_base}x = ${b_base}y - ${c_base}. The system has no solution. Which equation could be the second equation in this system?`;

      const optionsData = [
        { text: optA_text, isCorrect: false, reason: "has a different slope, so the system would have exactly one solution" },
        { text: optB_text, isCorrect: true },
        { text: optC_text, isCorrect: false, reason: "is the same line as the given equation, so the system would have infinitely many solutions" },
        { text: optD_text, isCorrect: false, reason: "has a different slope, so the system would have exactly one solution" }
      ];

      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));

      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

      result = {
        questionText: questionText,
        figureCode: null,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: optB_text,
        explanation: `Choice ${correctLetter} is correct. A system has no solution when the lines are parallel and distinct (same slope, different $y$-intercepts). The given equation can be rewritten as $y = \\frac{${a_base}}{${b_base}}x + \\frac{${c_base}}{${b_base}}$, which has slope $\\frac{1}{${slopeBase}}$ and a nonzero $y$-intercept. Choice ${correctLetter} rewrites as $y = \\frac{1}{${slopeBase}}x$, the same slope but a different ($0$) $y$-intercept, so the lines are parallel and never meet. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
      };
    }

    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }

    return result;
  }
};
