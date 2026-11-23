import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1071
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [three quadratics, roots r,s and t,u, new quadratic with roots r+t and s+u, find c]
 * - Difficulty factors: [Vieta's formulas, sum of roots, completing the square, product calculation]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Multiple steps: find roots, sum them, calculate product for new quadratic]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1071 = {
  metadata: {
    id: "1071",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original pattern: x²+6x+7=0 has roots -3±√2, x²+8x+8=0 has roots -4±2√2
    // New roots: (-3-√2)+(-4-2√2) = -7-3√2 and (-3+√2)+(-4+2√2) = -7+3√2
    // Product: (-7-3√2)(-7+3√2) = 49 - 18 = 31
    
    // Fix: before, p2 and qBase were drawn independently, so p2^2 - 4*qBase could be
    // 0 or negative ("x^2+8x+0=0", "x^2+8x+-4=0"), and qBase = 4 made the radical
    // a whole number (sqrt{4}). Now qBase is never a perfect square and p2 is
    // redrawn until the constant of the second equation is positive.
    // Roots: r, s = -p1 -/+ sqrt(q) and t, u = -p2 -/+ 2 sqrt(q), so
    // (r+t)(s+u) = (p1+p2)^2 - 9q.
    const p1 = getRandomInt(3, 8);
    const qBase = [2, 3, 5][getRandomInt(0, 2)];
    let p2 = getRandomInt(4, 9);
    while (p2 * p2 <= 4 * qBase) p2 = getRandomInt(4, 9);
    const finalQ1 = qBase;
    const finalQ2 = 4 * qBase; // So sqrt(finalQ2) = 2 sqrt(finalQ1)

    const finalC1 = p1*p1 - finalQ1;
    const finalC2 = p2*p2 - finalQ2;

    const cValue = (p1 + p2) * (p1 + p2) - 9 * finalQ1;
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `The solutions to $x^2+${2*p1}x+${finalC1}=0$ are $r$ and $s$, where $r \\lt s$. The solutions to $x^2+${2*p2}x+${finalC2}=0$ are $t$ and $u$, where $t \\lt u$. The solutions to $x^2+${2*(p1+p2)}x+c=0$, where $c$ is a constant, are $r+t$ and $s+u$. What is the value of $c$?`,
      figureCode: figureCode,
      options: [],
      correctAnswer: cValue.toString(),
      explanation: `The correct answer is ${cValue}. Completing the square in the first equation gives $(x+${p1})^2=${finalQ1}$, so $r=-${p1}-\\sqrt{${finalQ1}}$ and $s=-${p1}+\\sqrt{${finalQ1}}$. Completing the square in the second equation gives $(x+${p2})^2=${finalQ2}$, so $t=-${p2}-2\\sqrt{${finalQ1}}$ and $u=-${p2}+2\\sqrt{${finalQ1}}$. Thus $r+t=-${p1+p2}-3\\sqrt{${finalQ1}}$ and $s+u=-${p1+p2}+3\\sqrt{${finalQ1}}$. In an equation of the form $x^2+bx+c=0$, the constant $c$ equals the product of the solutions, so $c=(r+t)(s+u)=(-${p1+p2})^2-(3\\sqrt{${finalQ1}})^2=${(p1+p2)*(p1+p2)}-${9*finalQ1}=${cValue}$.`
    };
  }
};