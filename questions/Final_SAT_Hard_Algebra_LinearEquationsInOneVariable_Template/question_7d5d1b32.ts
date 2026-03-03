import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_7d5d1b32 = {
  metadata: {
    // id: "7d5d1b32",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation with fractions
    // Form: 2(kx - n) = ax + b where 2k = a, and -2n ≠ b, and n > 1
    
    let valid = false;
    let a: number, rightXNum: number, c: number, kNum: number, kDenom: number, finalKNum: number, finalKDenom: number, n: number, rightConstNum: number, rightConstDenom: number;
    
    while (!valid) {
      a = getRandomInt(2, 4);
      c = getRandomInt(10, 20);
      rightXNum = getRandomInt(-15, -5);
      
      kNum = rightXNum;
      kDenom = a * c;
      
      const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
      const kGcd = gcd(Math.abs(kNum), kDenom);
      finalKNum = kNum / kGcd;
      finalKDenom = kDenom / kGcd;
      
      rightConstNum = getRandomInt(-20, -10);
      rightConstDenom = getRandomInt(15, 25);
      
      n = getRandomInt(2, 5);
      
      const leftConst = -a * n;
      const rightConst = rightConstNum / rightConstDenom;
      
      if (leftConst !== rightConst) {
        valid = true;
      }
    }
    
    // Fixed: Use \\frac instead of \\\\frac for proper LaTeX rendering
    const kDisplay = `\\frac{${finalKNum}}{${finalKDenom}}`;
    
    // Fixed: Removed excessive escaping, use \\frac, \\times, \\div properly
    const explanation = `A linear equation in the form $ax + b = cx + d$ has no solution only when the coefficients of $x$ on each side of the equation are equal and the constant terms are not equal.

Dividing both sides of the given equation by ${a} yields:
$kx - n = \\frac{${rightXNum}}{${c}}x + \\frac{${rightConstNum}}{${rightConstDenom}}$

Since it's given that the equation has no solution, the coefficient of $x$ on both sides of this equation must be equal, and the constant terms on both sides of this equation must not be equal.

Since $\\frac{${Math.abs(rightConstNum)}}{${rightConstDenom}} < 1$, and it's given that $n > 1$ (specifically $n = ${n}$), the constant condition is satisfied.

Thus, $k$ must equal $\\frac{${rightXNum}}{${c}} \\div ${a} = \\frac{${rightXNum}}{${c}} \\times \\frac{1}{${a}} = ${kDisplay}$.

Note that ${finalKNum}/${finalKDenom} and ${(finalKNum/finalKDenom).toFixed(3)} are acceptable ways to enter the answer.`;
    
    return {
      // Fixed: Use \\frac instead of \\\\frac
      questionText: `In the equation $${a}(kx - n) = \\frac{${rightXNum}}{${c}}x + \\frac{${rightConstNum}}{${rightConstDenom}}$, $k$ and $n$ are constants and $n > 1$. The equation has no solution. What is the value of $k$?`,
      figureCode: null,
      options: null,
      correctAnswer: `${finalKNum}/${finalKDenom}`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 771bd0ca
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-2, 3, 38 (small integers)]
 * - Difficulty factors: [Simple linear equation solving]
 * - Distractor patterns: [N/A - fill-in-blank]
 * - Constraints: [Integer answer]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 * 
 * Note: Original seems to be -2(t + 3) = 38, solution t = -22
 */