import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1030
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponential equation with cube root]
 * - Difficulty factors: [Converting between radical and rational exponent forms, solving exponential equation]
 * - Distractor patterns: [Wrong exponent arithmetic, forgetting to divide by 8]
 * - Constraints: [Must solve for c]
 * - Question type: [Fill-in-the-blank - fraction]
 * - Figure generation: [None]
 */

export const generator_1030 = {
  metadata: {
    id: "1030",
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

    // STEP 2: Format answer (students type it: plain a/b fraction, never LaTeX).
    // Note: num = m <= 9 < 12 <= den = n*root, so the answer is always a proper
    // fraction (finalDen >= 2); the integer branch is defensive only.
    const correctAnswer = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;
    const answerTex = finalDen === 1 ? `${finalNum}` : `\\frac{${finalNum}}{${finalDen}}`;

    // STEP 3: Question text ("\\," keeps a digit from directly following "$")
    const questionText = `If $\\,${base}^{${n}c} = \\sqrt[${root}]{${base}^{${m}}}$, what is the value of $c$? Enter your answer as a fraction.`;

    // STEP 4: Explanation
    const explanation = `Rewrite the radical using a rational exponent:
$$\\sqrt[${root}]{${base}^{${m}}} = ${base}^{\\frac{${m}}{${root}}}$$

So the equation becomes:
$$\\,${base}^{${n}c} = ${base}^{\\frac{${m}}{${root}}}$$

Since the bases are equal, the exponents must be equal:
$$\\,${n}c = \\frac{${m}}{${root}}$$

Solve for $c$ by dividing both sides by ${n}:
$$c = \\frac{${m}}{${root} \\cdot ${n}} = \\frac{${num}}{${den}}${g > 1 ? ` = ${answerTex}` : ''}$$

So $c = ${answerTex}$, which is entered as ${correctAnswer}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};
