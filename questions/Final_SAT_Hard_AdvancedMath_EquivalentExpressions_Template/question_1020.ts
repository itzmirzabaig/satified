import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1020
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponents: 5 and 4, roots: square and cube]
 * - Difficulty factors: [Rational exponents, root conversion, exponent rules]
 * - Distractor patterns: [Wrong exponent arithmetic, forgetting to subtract]
 * - Constraints: [Must simplify rational exponents correctly]
 * - Question type: [Fill-in-the-blank - fraction]
 * - Figure generation: [None]
 */

export const generator_1020 = {
  metadata: {
    id: "1020",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random exponents for radicals
    // Pattern: x^(m/2) / x^(n/3) = x^(m/2 - n/3) = x^((3m - 2n)/6)
    // Before: 3m - 2n could be 0 or negative (answers like 0 or -5/6), and
    // the explanation used markdown bullets with no "The correct answer is"
    // opening. Now 3m - 2n is kept positive.
    let m = 0, n = 0;
    do {
      m = getRandomInt(3, 9);
      n = getRandomInt(2, 7);
    } while (3 * m - 2 * n <= 0);

    const numerator = 3 * m - 2 * n;
    const denominator = 6;

    // Simplify fraction if possible
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g = gcd(numerator, denominator);

    const finalNum = numerator / g;
    const finalDen = denominator / g;

    // STEP 2: Format the answer.
    // correctAnswer is what students type: plain integer or a/b fraction only.
    // answerDisplay is the LaTeX rendering used inside the explanation.
    const correctAnswer = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;
    const answerDisplay = finalDen === 1 ? `${finalNum}` : `\\frac{${finalNum}}{${finalDen}}`;

    // STEP 3: Build question. The entry hint used to give 7/6 as an example,
    // which is the actual answer when m = 5, n = 4 or m = 7, n = 7.
    const questionText = `If $\\frac{\\sqrt{x^{${m}}}}{\\sqrt[3]{x^{${n}}}} = x^{\\frac{a}{b}}$ for all positive values of $x$, what is the value of $\\frac{a}{b}$? (If your answer is not an integer, enter it as a fraction.)`;

    // STEP 4: Explanation (one paragraph, inline math)
    const explanation = `The correct answer is ${correctAnswer}. Rewrite each radical as a power with a rational exponent: $\\sqrt{x^{${m}}} = x^{\\frac{${m}}{2}}$ and $\\sqrt[3]{x^{${n}}} = x^{\\frac{${n}}{3}}$. Dividing powers with the same base subtracts the exponents, so the expression equals $x^{\\frac{${m}}{2} - \\frac{${n}}{3}}$. With the common denominator 6, $\\frac{${m}}{2} - \\frac{${n}}{3} = \\frac{${3 * m}}{6} - \\frac{${2 * n}}{6} = \\frac{${numerator}}{6}${g > 1 ? ` = ${answerDisplay}` : ''}$. Therefore $\\frac{a}{b} = ${answerDisplay}$.`;

    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
