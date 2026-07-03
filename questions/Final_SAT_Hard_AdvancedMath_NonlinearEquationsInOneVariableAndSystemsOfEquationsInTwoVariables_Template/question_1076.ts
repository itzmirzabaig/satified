import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1076
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator is perfect square trinomial, equals 4]
 * - Difficulty factors: [Rational equation, perfect square recognition, reciprocal, extraneous solution check]
 * - Distractor patterns: [N/A - fill in blank; asks for the greater or lesser of the two solutions]
 * - Constraints: [Denominator factors as (x+p)², solutions must not make denominator zero]
 * - Question type: [Fill-in-the-blank, single fraction answer]
 * - Figure generation: [None]
 */

export const generator_1076 = {
  metadata: {
    id: "1076",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Pattern: 1/(x+p)^2 = k with k a perfect square, so x = -p ± 1/sqrt(k).
    const p = getRandomInt(3, 8); // The value in (x+p)
    // k restricted to squares whose root divides a power of 10 (2, 4, 5),
    // so both solutions also have exact clean-decimal forms.
    const kValue = getRandomElement([4, 16, 25]);
    const s = Math.sqrt(kValue); // 2, 4, or 5

    // Solutions: x = -p ± 1/s = (±1 - p*s)/s.
    // The numerator is ≡ ±1 (mod s), so gcd(numerator, s) = 1 and each
    // fraction is already in lowest terms with denominator s ≥ 2.
    const numGreater = 1 - p * s;  // numerator of the greater solution (negative)
    const numLesser = -1 - p * s;  // numerator of the lesser solution (negative)

    // Ask for one specific solution so the fill-in answer is a single fraction.
    const askGreater = getRandomInt(0, 1) === 1;
    const num = askGreater ? numGreater : numLesser;
    const which = askGreater ? 'greater' : 'lesser';

    // num is always negative, so the string is "-N/s" — a valid a/b answer.
    const correctAnswer = `${num}/${s}`;

    // Extraneous check: neither solution equals -p, since ±1/s ≠ 0.

    return {
      questionText: `$\\frac{1}{x^2+${2 * p}x+${p * p}}=${kValue}$\n\nWhat is the ${which} solution to the given equation? (Enter your answer as a fraction or decimal.)`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `The correct answer is $-\\frac{${-num}}{${s}}$ (equivalently, $${num / s}$). Since $x^2+${2 * p}x+${p * p}=(x+${p})^2$, the equation can be written as $\\frac{1}{(x+${p})^2}=${kValue}$. Taking the reciprocal of both sides gives $(x+${p})^2=\\frac{1}{${kValue}}$. Taking square roots of both sides, $x+${p}=\\pm\\frac{1}{${s}}$, so $x=-${p}\\pm\\frac{1}{${s}}$. The two solutions are $-\\frac{${-numGreater}}{${s}}$ and $-\\frac{${-numLesser}}{${s}}$; neither value makes the denominator $(x+${p})^2$ equal zero, so neither is extraneous. The ${which} of the two solutions is $-\\frac{${-num}}{${s}}=${num / s}$.`
    };
  }
};
