import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7028c74f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation with factoring, sum of solutions]
 * - Difficulty factors: [Factor out common term, zero product property, sum solutions]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must factor correctly, find all solutions, sum them]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_7028c74f = {
  metadata: {
    // id: "7028c74f",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: a(x-b)(x-c) = d(x-c) → factor out (x-c): (x-c)(a(x-b)-d) = 0
    // Solutions: x = c and x = (ab+d)/a = b + d/a
    
    const a = getRandomInt(2, 5);
    const b = getRandomInt(10, 20); // The "17" in original
    const c = getRandomInt(-10, -3); // The negative solution
    const d = getRandomInt(3, 8);
    
    // Equation: a(x-b)(x-c) = d(x-c)
    // Expanded left: a(x² - (b+c)x + bc) = ax² - a(b+c)x + abc
    // Right side: dx - dc
    
    // Rearranging: ax² - a(b+c)x - dx + abc + dc = 0
    // ax² - (a(b+c)+d)x + c(ab+d) = 0
    
    const linearCoeff = -(a*(b+c) + d);
    const constant = c*(a*b + d);
    
    // Solutions: x = c and x = (ab+d)/a
    const sol1 = c;
    const sol2 = (a*b + d) / a;
    
    // Format sol2
    const gcd = (m: number, n: number): number => n === 0 ? m : gcd(n, m % n);
    const g = gcd(Math.abs(a*b + d), a);
    const num = (a*b + d) / g;
    const den = a / g;
    
    let sol2Display: string;
    let sumDisplay: string;
    
    if (den === 1) {
      sol2Display = num.toString();
      const sum = sol1 + num;
      sumDisplay = sum.toString();
    } else {
      sol2Display = `${num}/${den}`;
      // Sum: c + num/den = (c*den + num)/den
      const sumNum = c*den + num;
      const sumGcd = gcd(Math.abs(sumNum), den);
      sumDisplay = `${sumNum/sumGcd}/${den/sumGcd}`;
    }
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `What is the sum of the solutions to the given equation?\n\n$${a}(x-${b})(x-${c})=${d}(x-${c})$`,
      figureCode: figureCode,
      options: null,
      correctAnswer: sumDisplay,
      explanation: `The correct answer is $${sumDisplay}$. Factoring out $(x-${c})$: $(x-${c})[${a}(x-${b})-${d}]=0$. This gives $x=${c}$ or ${a}x-${a*b}=${d}$, so $x=${sol2Display}$. The sum is $${c}+${sol2Display}=${sumDisplay}$.`
    };
  }
};

/**
 * Question ID: 88a0c425
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-2x²+20x+c=0, exactly one solution, find c]
 * - Difficulty factors: [Negative leading coefficient, discriminant = 0]
 * - Distractor patterns: [A:-68=miscalculated, B:-50=correct, C:-32=miscalculated, D:0=wrong]
 * - Constraints: [Quadratic with negative leading coefficient, discriminant=0]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/88a0c425.ts