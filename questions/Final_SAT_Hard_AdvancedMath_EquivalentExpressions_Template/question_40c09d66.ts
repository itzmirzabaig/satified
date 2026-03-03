import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 40c09d66
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponents: 5 and 4, roots: square and cube]
 * - Difficulty factors: [Rational exponents, root conversion, exponent rules]
 * - Distractor patterns: [Wrong exponent arithmetic, forgetting to subtract]
 * - Constraints: [Must simplify rational exponents correctly]
 * - Question type: [Fill-in-the-blank - fraction]
 * - Figure generation: [None]
 */

export const generator_40c09d66 = {
  metadata: {
    // id: "40c09d66",
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
    
    // STEP 2: Format the answer
    let correctAnswer: string;
    if (finalDen === 1) {
      correctAnswer = finalNum.toString();
    } else {
      correctAnswer = `\\frac{${finalNum}}{${finalDen}}`;
    }
    
    // STEP 3: Build question
    const questionText = `If $\\frac{\\sqrt{x^{${m}}}}{\\sqrt[3]{x^{${n}}}} = x^{\\frac{a}{b}}$ for all positive values of $x$, what is the value of $\\frac{a}{b}$?`;
    
    // STEP 4: Explanation
    const explanation = `First, rewrite the radicals as rational exponents:
- $\\sqrt{x^{${m}}} = x^{\\frac{${m}}{2}}$
- $\\sqrt[3]{x^{${n}}} = x^{\\frac{${n}}{3}}$

The expression becomes:
$$\\frac{x^{\\frac{${m}}{2}}}{x^{\\frac{${n}}{3}}} = x^{\\frac{${m}}{2} - \\frac{${n}}{3}}$$

To subtract the exponents, find a common denominator of 6:
$$\\frac{${m}}{2} - \\frac{${n}}{3} = \\frac{${3 * m}}{6} - \\frac{${2 * n}}{6} = \\frac{${3 * m} - ${2 * n}}{6} = \\frac{${numerator}}{${denominator}}$$

${g > 1 ? `Simplifying by dividing numerator and denominator by ${g}: $\\frac{${finalNum}}{${finalDen}}$` : 'This fraction is already in lowest terms.'}

Therefore, $\\frac{a}{b} = ${correctAnswer}$.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 34847f8a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerators: 2,3, denominators: linear factors, result: rx+t]
 * - Difficulty factors: [Rational expression addition, common denominators, distributing]
 * - Distractor patterns: [Wrong sign on r or t, not distributing 2 and 3, calculation errors]
 * - Constraints: [x > 2 to avoid division by zero, r and t must be positive]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */