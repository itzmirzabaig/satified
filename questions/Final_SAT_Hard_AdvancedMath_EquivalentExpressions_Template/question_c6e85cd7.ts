import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c6e85cd7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponential equation with cube root]
 * - Difficulty factors: [Converting between radical and rational exponent forms, solving exponential equation]
 * - Distractor patterns: [Wrong exponent arithmetic, forgetting to divide by 8]
 * - Constraints: [Must solve for c]
 * - Question type: [Fill-in-the-blank - fraction]
 * - Figure generation: [None]
 */

export const generator_c6e85cd7 = {
  metadata: {
    // id: "c6e85cd7",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const base = 4;
    const n = getRandomInt(6, 10);
    const m = getRandomInt(5, 9);
    const root = getRandomInt(2, 4);
    
    // Calculate: nc = m/root, so c = m/(n*root)
    const num = m;
    const den = n * root;
    
    // Simplify
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const g = gcd(num, den);
    
    const finalNum = num / g;
    const finalDen = den / g;
    
    // STEP 2: Format answer
    let correctAnswer: string;
    if (finalDen === 1) {
      correctAnswer = finalNum.toString();
    } else {
      correctAnswer = `\\frac{${finalNum}}{${finalDen}}`;
    }
    
    // STEP 3: Question text
    const questionText = `If $${base}^{${n}c} = \\sqrt[${root}]{${base}^{${m}}}$, what is the value of $c$?`;
    
    // STEP 4: Explanation
    const explanation = `Rewrite the radical using a rational exponent:
$$\\sqrt[${root}]{${base}^{${m}}} = ${base}^{\\frac{${m}}{${root}}}$$

Set up the equation:
$$${base}^{${n}c} = ${base}^{\\frac{${m}}{${root}}}$$

Since the bases are equal, set the exponents equal:
$$${n}c = \\frac{${m}}{${root}}$$

Solve for $c$:
$$c = \\frac{${m}}{${root} \\cdot ${n}} = \\frac{${num}}{${den}} = ${correctAnswer}$$`;
    
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
 * Question ID: ad038c19
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [binomial expansion with fraction]
 * - Difficulty factors: [(a + b/2)² expansion, careful with middle term and fraction squared]
 * - Distractor patterns: [Missing middle term, wrong fraction square, wrong middle term coefficient]
 * - Constraints: [None]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */