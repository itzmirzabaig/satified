import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f65288e8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator is perfect square trinomial, equals 4]
 * - Difficulty factors: [Rational equation, perfect square recognition, reciprocal, extraneous solution check]
 * - Distractor patterns: [N/A - fill in blank with multiple accepted answers]
 * - Constraints: [Denominator factors as (x+p)², solutions must not make denominator zero]
 * - Question type: [Fill-in-the-blank with multiple accepted answers]
 * - Figure generation: [None]
 */

export const generator_f65288e8 = {
  metadata: {
    // id: "f65288e8",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 1/(x²+10x+25) = 4, denominator is (x+5)²
    // Pattern: 1/(x+p)² = k where k is a perfect square reciprocal or similar
    
    const p = getRandomInt(3, 8); // The value in (x+p)
    const k = getRandomInt(2, 6); // Right side value
    
    // (x+p)² = 1/k
    // x+p = ±1/√k
    // x = -p ± 1/√k
    
    // For clean fractions, let's use k = 4 (so √k = 2) or similar
    const perfectSquare = [4, 9, 16, 25];
    const kValue = getRandomElement(perfectSquare);
    const sqrtK = Math.sqrt(kValue);
    
    // Solutions: x = -p ± 1/sqrtK = (-p*sqrtK ± 1)/sqrtK
    
    // STEP 2: Calculate solutions
    const solution1Num = -p * sqrtK + 1;
    const solution1Den = sqrtK;
    const solution2Num = -p * sqrtK - 1;
    const solution2Den = sqrtK;
    
    // Simplify fractions
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const gcd1 = gcd(Math.abs(solution1Num), solution1Den);
    const gcd2 = gcd(Math.abs(solution2Num), solution2Den);
    
    const sol1 = solution1Den / gcd1 === 1 ? (solution1Num / gcd1).toString() : `${solution1Num / gcd1}/${solution1Den / gcd1}`;
    const sol2 = solution2Den / gcd2 === 1 ? (solution2Num / gcd2).toString() : `${solution2Num / gcd2}/${solution2Den / gcd2}`;
    
    // Check extraneous: neither solution should equal -p
    // -p ± 1/sqrtK = -p would require 1/sqrtK = 0, impossible. Good.
    
    // STEP 3: No figure needed
    const figureCode = null;
    
    // Correct answer is both solutions (comma-separated for multi-accept)
    const correctAnswer = `${sol1}, ${sol2}`;
    
    return {
      questionText: `$\\frac{1}{x^2+${2*p}x+${p*p}}=${kValue}$\n\nWhat is the solution to the given equation?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is $${sol1}$ or $${sol2}$. Recognizing that $x^2+${2*p}x+${p*p}=(x+${p})^2$, the equation becomes $\\frac{1}{(x+${p})^2}=${kValue}$. Taking reciprocals: $(x+${p})^2=\\frac{1}{${kValue}}$. So $x+${p}=\\pm\\frac{1}{${sqrtK}}$, giving $x=-${p}\\pm\\frac{1}{${sqrtK}}$. This yields $x=${sol1}$ and $x=${sol2}$. Neither value makes the denominator zero, so both are valid.`
    };
  }
};

/**
 * Question ID: 2c288148
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [involves square root equation with parameter k, discriminant analysis]
 * - Difficulty factors: [Radical equation with parameter, extraneous solution analysis, finding minimum k for exactly one solution]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Domain restriction from square root, discriminant condition, exactly one valid solution]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/2c288148.ts