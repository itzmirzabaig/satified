import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e6cb2402
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [3, 4, 13, 36 (small integers)]
 * - Difficulty factors: [No solution condition with parameter k]
 * - Distractor patterns: [N/A - fill-in-blank, but note: original answer 16/17 seems wrong]
 * - Constraints: [Must have no solution: a = c but b ≠ d in ax+b=cx+d form]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 * 
 * NOTE: The original explanation says "k = 16/17" but the math doesn't work.
 * 3(kx + 13) = 4x + 36
 * 3kx + 39 = 4x + 36
 * For no solution: 3k = 4 so k = 4/3, and 39 ≠ 36 ✓
 * So k should be 4/3, not 16/17.
 * Let me verify: 16/17 ≈ 0.94, and 3*(16/17) = 48/17 ≈ 2.82 ≠ 4
 * This appears to be an error in the original. Correct answer should be 4/3.
 * However, I'll preserve the difficulty and generate similar questions correctly.
 */

export const generator_e6cb2402 = {
  metadata: {
    // id: "e6cb2402",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation with no solution
    // Form: a(kx + b) = cx + d where ak = c but ab ≠ d
    
    let valid = false;
    let a: number, c: number, kNum: number, kDenom: number, finalKNum: number, finalKDenom: number, b: number, d: number;
    
    while (!valid) {
      a = getRandomInt(2, 5);
      c = getRandomInt(3, 8);
      
      // k must equal c/a
      kNum = c;
      kDenom = a;
      
      // Simplify k
      const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
      const divisor = gcd(kNum, kDenom);
      finalKNum = kNum / divisor;
      finalKDenom = kDenom / divisor;
      
      // Constants: ab ≠ d
      b = getRandomInt(10, 20);
      d = getRandomInt(5, 15);
      
      // Ensure ab ≠ d
      if (a * b !== d) {
        valid = true;
      }
    }
    
    // STEP 2: Format answer
    let correctAnswer: string;
    if (finalKDenom === 1) {
      correctAnswer = finalKNum.toString();
    } else {
      correctAnswer = `\\\\frac{${finalKNum}}{${finalKDenom}}`;
    }
    
    // STEP 3: Build explanation
    const explanation = `It's given that the equation $${a}(kx + ${b}) = ${c}x + ${d}$ has no solution. A linear equation in the form $ax + b = cx + d$, where $a, b, c,$ and $d$ are constants, has no solution only when the coefficients of $x$ on each side of the equation are equal and the constant terms aren't equal.

Dividing both sides of the given equation by ${a} yields:
$kx + ${b} = \\\\frac{${c}}{${a}}x + \\\\frac{${d}}{${a}}$

Since the coefficients of $x$ on each side of the equation must be equal for no solution:
$k = \\\\frac{${c}}{${a}} = ${correctAnswer}$

Note that $${finalKNum}/${finalKDenom}$ is the correct answer format. The constant terms are ${b} and $\\\\frac{${d}}{${a}}$, which are not equal (${b} ≠ ${(d/a).toFixed(2)}), confirming no solution exists.`;
    
    return {
      questionText: `In the equation $${a}(kx + ${b}) = ${c}x + ${d}$, $k$ is a constant. The equation has no solution. What is the value of $k$?`,
      figureCode: null,
      options: null,
      correctAnswer: finalKDenom === 1 ? correctAnswer : `${finalKNum}/${finalKDenom}`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 7d5d1b32
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [2, 14/15, 18/19, n > 1 (fractions and inequalities)]
 * - Difficulty factors: [No solution with fractions, parameter constraint n > 1]
 * - Distractor patterns: [N/A - fill-in-blank]
 * - Constraints: [Coefficient of x must match, constants must differ, n > 1 ensures constants differ]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 */

// File: generators/linear-equations-in-one-variable/7d5d1b32.ts