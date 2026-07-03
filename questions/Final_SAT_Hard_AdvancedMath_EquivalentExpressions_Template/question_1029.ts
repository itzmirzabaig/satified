import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1029
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [multiple radicals with variables, fractional exponents]
 * - Difficulty factors: [Converting radicals to rational exponents, multiplying, adding exponents, finding a+b]
 * - Distractor patterns: [n/a — fill-in]
 * - Constraints: [Result is ax^b where a and b are positive constants. The first
 *   radical's exponent is a multiple of its index, so b = q + 1/a2 and the answer
 *   a+b is an integer plus 1/a2. a2 is restricted to {4, 5, 8, 10} so the answer
 *   also has an exact terminating decimal form.]
 * - Question type: [Fill-in-the-blank - fraction or decimal]
 * - Figure generation: [None]
 */

export const generator_1029 = {
  metadata: {
    id: "1029",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const n = getRandomInt(4, 8);
    const a1 = getRandomInt(3, 6);
    const base1 = getRandomInt(2, 5);
    const q = getRandomInt(8, 12);
    const exp1 = a1 * q; // divisible by a1, so the first radical gives x^q exactly

    // Second radical index: reciprocal must be a terminating decimal so the
    // answer can be entered as a fraction OR a decimal.
    const a2 = getRandomElement([4, 5, 8, 10]);
    const base2 = getRandomInt(2, 4);

    // n * (base1^a1 * x^exp1)^(1/a1) * (base2^a2 * x)^(1/a2)
    //   = (n * base1 * base2) * x^(q + 1/a2)
    const coeff = n * base1 * base2; // a
    const bNum = q * a2 + 1;         // b = bNum/a2, lowest terms since gcd(q*a2+1, a2) = 1

    // a + b = coeff + q + 1/a2 = ((coeff + q)*a2 + 1)/a2, also in lowest terms.
    const whole = coeff + q;
    const finalNum = whole * a2 + 1;
    const decimalPart: Record<number, string> = { 4: '25', 5: '2', 8: '125', 10: '1' };
    const decimalStr = `${whole}.${decimalPart[a2]}`;

    // STEP 2: Format answer (plain a/b string — students type this)
    const correctAnswer = `${finalNum}/${a2}`;

    // STEP 3: Question text
    const questionText = `The expression $ ${n}\\sqrt[${a1}]{${base1}^{${a1}}x^{${exp1}}} \\cdot \\sqrt[${a2}]{${base2}^{${a2}}x}$ is equivalent to $ax^{b}$, where $a$ and $b$ are positive constants and $x > 1$. What is the value of $a + b$? (Enter your answer as a fraction or a decimal.)`;

    // STEP 4: Explanation (every number recomputed from the live variables)
    const explanation = `Convert each radical to a rational exponent:
$$\\sqrt[${a1}]{${base1}^{${a1}}x^{${exp1}}} = (${base1}^{${a1}}x^{${exp1}})^{\\frac{1}{${a1}}} = ${base1}x^{\\frac{${exp1}}{${a1}}} = ${base1}x^{${q}}$$

$$\\sqrt[${a2}]{${base2}^{${a2}}x} = (${base2}^{${a2}}x)^{\\frac{1}{${a2}}} = ${base2}x^{\\frac{1}{${a2}}}$$

Multiply, adding the exponents of $x$:
$$ ${n} \\cdot ${base1}x^{${q}} \\cdot ${base2}x^{\\frac{1}{${a2}}} = ${coeff}x^{${q} + \\frac{1}{${a2}}} = ${coeff}x^{\\frac{${bNum}}{${a2}}}$$

So $a = ${coeff}$ and $b = \\frac{${bNum}}{${a2}}$. Then:
$$a + b = ${coeff} + ${q} + \\frac{1}{${a2}} = ${whole} + \\frac{1}{${a2}} = \\frac{${finalNum}}{${a2}}$$

The answer may be entered as the fraction ${finalNum}/${a2} or the decimal ${decimalStr}.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
