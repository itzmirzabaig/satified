import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b74f2feb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [multiple radicals with variables, fractional exponents]
 * - Difficulty factors: [Converting radicals to rational exponents, multiplying, adding exponents, finding a+b]
 * - Distractor patterns: [Wrong exponent arithmetic, forgetting to add 36, wrong final addition]
 * - Constraints: [Result is ax^b where a and b are positive constants]
 * - Question type: [Fill-in-the-blank - fraction or decimal]
 * - Figure generation: [None]
 */

export const generator_b74f2feb = {
  metadata: {
    // id: "b74f2feb",
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
    const exp1 = a1 * getRandomInt(8, 12);
    
    const a2 = getRandomInt(6, 10);
    const base2 = getRandomInt(2, 4);
    const exp2 = 1;
    
    // Calculate
    const coeff = n * base1 * base2;
    const xExpNum = exp1 * a2 + exp2 * a1;
    const xExpDen = a1 * a2;
    
    // a + b = coeff + xExpNum/xExpDen = (coeff * xExpDen + xExpNum) / xExpDen
    const finalNum = coeff * xExpDen + xExpNum;
    const finalDen = xExpDen;
    
    // Simplify
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g = gcd(finalNum, finalDen);
    
    const simplifiedNum = finalNum / g;
    const simplifiedDen = finalDen / g;
    
    // STEP 2: Format answer
    let correctAnswer: string;
    if (simplifiedDen === 1) {
      correctAnswer = simplifiedNum.toString();
    } else {
      correctAnswer = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    }
    
    // STEP 3: Question text
    const questionText = `The expression $${n}\\sqrt[${a1}]{${base1}^{${a1}}x^{${exp1}}} \\cdot \\sqrt[${a2}]{${base2}^{${a2}}x}$ is equivalent to $ax^{b}$, where $a$ and $b$ are positive constants and $x > 1$. What is the value of $a + b$?`;
    
    // STEP 4: Explanation
    const explanation = `Convert radicals to rational exponents:
$$\\sqrt[${a1}]{${base1}^{${a1}}x^{${exp1}}} = (${base1}^{${a1}}x^{${exp1}})^{\\frac{1}{${a1}}} = ${base1}x^{\\frac{${exp1}}{${a1}}} = ${base1}x^{${exp1/a1}}$$

$$\\sqrt[${a2}]{${base2}^{${a2}}x} = (${base2}^{${a2}}x)^{\\frac{1}{${a2}}} = ${base2}x^{\\frac{1}{${a2}}}$$

Multiply (adding exponents):
$$${n} \\cdot ${base1}x^{${exp1/a1}} \\cdot ${base2}x^{\\frac{1}{${a2}}} = ${coeff}x^{\\frac{${exp1}}{${a1}} + \\frac{1}{${a2}}}$$

Add exponents with common denominator ${a1*a2}:
$$\\frac{${exp1}}{${a1}} + \\frac{1}{${a2}} = \\frac{${exp1*a2}}{${a1*a2}} + \\frac{${a1}}{${a1*a2}} = \\frac{${exp1*a2 + a1}}{${a1*a2}} = \\frac{${xExpNum}}{${xExpDen}}$$

So $a = ${coeff}$ and $b = \\frac{${xExpNum}}{${xExpDen}}$.

$$a + b = ${coeff} + \\frac{${xExpNum}}{${xExpDen}} = \\frac{${coeff * xExpDen}}{${xExpDen}} + \\frac{${xExpNum}}{${xExpDen}} = \\frac{${finalNum}}{${finalDen}} = ${correctAnswer}$$`;
    
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
 * Question ID: f89e1d6f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [difference of squares pattern with substitution]
 * - Difficulty factors: [Recognizing hidden difference of squares, substitution, factoring pattern]
 * - Distractor patterns: [Wrong expansion, wrong pattern, forgetting difference of squares]
 * - Constraints: [a = c + d]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */