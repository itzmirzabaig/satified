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
    // Redraw until the answer fits the 5 character SAT answer field as a
    // fraction or a decimal (e.g. 1377/8 and 172.125 both used to be too long).
    const decimalPart: Record<number, string> = { 4: '25', 5: '2', 8: '125', 10: '1' };
    let n = 0, a1 = 0, base1 = 0, q = 0, exp1 = 0, a2 = 0, base2 = 0;
    let coeff = 0, bNum = 0, whole = 0, finalNum = 0, decimalStr = '';
    do {
      n = getRandomInt(4, 8);
      a1 = getRandomInt(3, 6);
      base1 = getRandomInt(2, 5);
      q = getRandomInt(8, 12);
      exp1 = a1 * q; // divisible by a1, so the first radical gives x^q exactly

      // Second radical index: reciprocal must be a terminating decimal so the
      // answer can be entered as a fraction OR a decimal.
      a2 = getRandomElement([4, 5, 8, 10]);
      base2 = getRandomInt(2, 4);

      // n * (base1^a1 * x^exp1)^(1/a1) * (base2^a2 * x)^(1/a2)
      //   = (n * base1 * base2) * x^(q + 1/a2)
      coeff = n * base1 * base2; // a
      bNum = q * a2 + 1;         // b = bNum/a2, lowest terms since gcd(q*a2+1, a2) = 1

      // a + b = coeff + q + 1/a2 = ((coeff + q)*a2 + 1)/a2, also in lowest terms.
      whole = coeff + q;
      finalNum = whole * a2 + 1;
      decimalStr = `${whole}.${decimalPart[a2]}`;
    } while (`${finalNum}/${a2}`.length > 5 && decimalStr.length > 5);

    // STEP 2: Format answer (plain a/b string — students type this)
    const correctAnswer = `${finalNum}/${a2}`;

    // STEP 3: Question text
    const questionText = `The expression $ ${n}\\sqrt[${a1}]{${base1}^{${a1}}x^{${exp1}}} \\cdot \\sqrt[${a2}]{${base2}^{${a2}}x}$ is equivalent to $ax^{b}$, where $a$ and $b$ are positive constants and $x > 1$. What is the value of $a + b$? (Enter your answer as a fraction or a decimal.)`;

    // STEP 4: Explanation (every number recomputed from the live variables)
    // The explanation used to skip "The correct answer is" and was split
    // across display lines; it is now one paragraph that leads with the answer.
    const explanation = `The correct answer is $\\frac{${finalNum}}{${a2}}$, which can be entered as ${finalNum}/${a2} or ${decimalStr}. Rewriting each radical with a rational exponent gives $\\sqrt[${a1}]{${base1}^{${a1}}x^{${exp1}}} = (${base1}^{${a1}}x^{${exp1}})^{\\frac{1}{${a1}}} = ${base1}x^{\\frac{${exp1}}{${a1}}} = ${base1}x^{${q}}$ and $\\sqrt[${a2}]{${base2}^{${a2}}x} = (${base2}^{${a2}}x)^{\\frac{1}{${a2}}} = ${base2}x^{\\frac{1}{${a2}}}$. Multiplying and adding the exponents of $x$ gives $${n}(${base1}x^{${q}})(${base2}x^{\\frac{1}{${a2}}}) = ${coeff}x^{${q} + \\frac{1}{${a2}}} = ${coeff}x^{\\frac{${bNum}}{${a2}}}$. So $a = ${coeff}$ and $b = \\frac{${bNum}}{${a2}}$, and $a + b = ${coeff} + ${q} + \\frac{1}{${a2}} = ${whole} + \\frac{1}{${a2}} = \\frac{${finalNum}}{${a2}}$.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
