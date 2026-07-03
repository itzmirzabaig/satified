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
    // Pattern: x^(m/2) / x^(n/3) = x^(m/2 - n/3)
    
    const m = getRandomInt(3, 9);
    const n = getRandomInt(2, 7);
    
    // Calculate the result: m/2 - n/3 = (3m - 2n)/6
    const numerator = 3 * m - 2 * n;
    const denominator = 6;
    
    // Simplify fraction if possible
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g = gcd(Math.abs(numerator), denominator);
    
    const finalNum = numerator / g;
    const finalDen = denominator / g;
    
    // STEP 2: Format the answer.
    // correctAnswer is what students type: plain integer or a/b fraction only.
    // answerDisplay is the LaTeX rendering used inside the explanation.
    let correctAnswer: string;
    let answerDisplay: string;
    if (finalDen === 1) {
      correctAnswer = finalNum.toString();
      answerDisplay = finalNum.toString();
    } else if (finalNum < 0) {
      correctAnswer = `${finalNum}/${finalDen}`;
      answerDisplay = `-\\frac{${Math.abs(finalNum)}}{${finalDen}}`;
    } else {
      correctAnswer = `${finalNum}/${finalDen}`;
      answerDisplay = `\\frac{${finalNum}}{${finalDen}}`;
    }

    // STEP 3: Build question
    const questionText = `If $\\frac{\\sqrt{x^{${m}}}}{\\sqrt[3]{x^{${n}}}} = x^{\\frac{a}{b}}$ for all positive values of $x$, what is the value of $\\frac{a}{b}$? (If your answer is a fraction, enter it as a fraction, for example 7/6.)`;
    
    // STEP 4: Explanation
    const explanation = `First, rewrite the radicals as rational exponents:
- $\\sqrt{x^{${m}}} = x^{\\frac{${m}}{2}}$
- $\\sqrt[3]{x^{${n}}} = x^{\\frac{${n}}{3}}$

The expression becomes:
$$\\frac{x^{\\frac{${m}}{2}}}{x^{\\frac{${n}}{3}}} = x^{\\frac{${m}}{2} - \\frac{${n}}{3}}$$

To subtract the exponents, find a common denominator of 6:
$$\\frac{${m}}{2} - \\frac{${n}}{3} = \\frac{${3 * m}}{6} - \\frac{${2 * n}}{6} = \\frac{${3 * m} - ${2 * n}}{6} = \\frac{${numerator}}{${denominator}}$$

${g > 1 ? `Simplifying by dividing the numerator and denominator by ${g}: $\\frac{${numerator}}{${denominator}} = ${answerDisplay}$` : 'This fraction is already in lowest terms.'}

Therefore, $\\frac{a}{b} = ${answerDisplay}$.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
