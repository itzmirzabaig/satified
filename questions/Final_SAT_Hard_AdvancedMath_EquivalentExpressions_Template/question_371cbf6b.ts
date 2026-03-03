import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 371cbf6b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: small integers 3-5, constants: small integers 2-9]
 * - Difficulty factors: [Polynomial expansion, coefficient comparison, system of equations]
 * - Distractor patterns: [Wrong products, wrong signs, partial solutions]
 * - Constraints: [Equation must hold for all x, so coefficients must match exactly]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic manipulation only]
 */

export const generator_371cbf6b = {
  metadata: {
    // id: "371cbf6b",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random coefficients for (ax + m)(nx² + bx + p) = expanded form
    // Original used: (ax+3)(5x²-bx+4) = 20x³-9x²-2x+12, find ab = 24
    
    // Generate base values - all randomized
    const a = getRandomInt(2, 6);
    const n = getRandomInt(3, 7);
    const m = getRandomInt(2, 5);
    const p = getRandomInt(2, 5);
    const b = getRandomInt(2, 6);
    
    // Calculate the product a*n for x³ coefficient
    const cubicCoeff = a * n;
    
    // Calculate expanded form coefficients
    // (ax + m)(nx² - bx + p) = anx³ - abx² + apx + mnx² - mbx + mp
    // = anx³ + (-ab + mn)x² + (ap - mb)x + mp
    
    const coeffX2 = -a * b + m * n;
    const coeffX1 = a * p - m * b;
    const constant = m * p;
    
    // Calculate correct answer: a * b
    const correctAnswer = (a * b).toString();
    
    // STEP 2: Format question text with proper signs
    const signB = b >= 0 ? '-' : '+';
    const absB = Math.abs(b);
    
    const signCoeffX2 = coeffX2 >= 0 ? '+' : '-';
    const absCoeffX2 = Math.abs(coeffX2);
    
    const signCoeffX1 = coeffX1 >= 0 ? '+' : '-';
    const absCoeffX1 = Math.abs(coeffX1);
    
    const signConst = constant >= 0 ? '+' : '-';
    const absConst = Math.abs(constant);
    
    // STEP 3: Build question text
    const questionText = `The equation $(${a}x+${m})(${n}x^{2}${signB}${absB}x+${p})=${cubicCoeff}x^{3}${signCoeffX2}${absCoeffX2}x^{2}${signCoeffX1}${absCoeffX1}x${signConst}${absConst}$ is true for all $x$, where $a$ and $b$ are constants. What is the value of $ab$?`;
    
    // STEP 4: Create explanation with step-by-step expansion
    const explanation = `Expanding the left side: $(${a}x+${m})(${n}x^{2}${signB}${absB}x+${p})$.
    
Using the distributive property:
- $${a}x \\cdot ${n}x^{2} = ${cubicCoeff}x^{3}$
- $${a}x \\cdot (${signB}${absB}x) = ${a * -b < 0 ? '' : '+'}${a * -b}x^{2}$
- $${a}x \\cdot ${p} = ${a * p < 0 ? '' : '+'}${a * p}x$
- $${m} \\cdot ${n}x^{2} = ${m * n < 0 ? '' : '+'}${m * n}x^{2}$
- $${m} \\cdot (${signB}${absB}x) = ${m * -b < 0 ? '' : '+'}${m * -b}x$
- $${m} \\cdot ${p} = ${m * p < 0 ? '' : '+'}${m * p}$

Combining like terms:
- $x^{3}$ coefficient: $${cubicCoeff}$
- $x^{2}$ coefficient: $${a * -b}${m * n >= 0 ? '+' : ''}${m * n} = ${coeffX2}$
- $x$ coefficient: $${a * p}${m * -b >= 0 ? '+' : ''}${m * -b} = ${coeffX1}$
- Constant: $${constant}$

Comparing with the right side, the coefficients match. From the expansion, the value being subtracted in the second factor is $${b}$, so $b = ${b}$ and $a = ${a}$. Therefore, $ab = ${a} \\times ${b} = ${correctAnswer}$.`;
    
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