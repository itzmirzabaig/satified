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
    
    // Pattern: Create two quadratics that complete to (x+p)² = q form
    const p1 = getRandomInt(3, 8);
    const q1 = getRandomInt(2, 5); // Not perfect square
    
    const p2 = getRandomInt(4, 9);
    const q2 = getRandomInt(3, 6) * 2; // Even multiple for clean combination
    
    // First equation: x² + 2p1x + (p1²-q1) = 0, roots are -p1±√q1
    // Second equation: x² + 2p2x + (p2²-q2) = 0, roots are -p2±√q2
    
    const c1 = p1*p1 - q1;
    const c2 = p2*p2 - q2;
    
    // New roots: (-p1-√q1) + (-p2-√q2) = -(p1+p2) - (√q1+√q2) ... this gets messy
    
    // Alternative: Use the pattern where √q2 = 2√q1 so they combine nicely
    // Let q2 = 4*q1, then √q2 = 2√q1
    
    const qBase = getRandomInt(2, 5);
    const finalQ1 = qBase;
    const finalQ2 = 4 * qBase; // So √finalQ2 = 2√finalQ1
    
    const finalC1 = p1*p1 - finalQ1;
    const finalC2 = p2*p2 - finalQ2;
    
    // Roots: -p1±√finalQ1 and -p2±2√finalQ1
    // New roots: (-p1-p2)±3√finalQ1 ... wait that's not right either
    
    // Let's just compute directly
    // r = -p1 - √finalQ1, s = -p1 + √finalQ1
    // t = -p2 - 2√finalQ1, u = -p2 + 2√finalQ1
    
    // r+t = -p1-p2 - 3√finalQ1
    // s+u = -p1-p2 + 3√finalQ1
    
    // Product: (-(p1+p2))² - (3√finalQ1)² = (p1+p2)² - 9*finalQ1
    
    const cValue = (p1 + p2) * (p1 + p2) - 9 * finalQ1;
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `The solutions to $x^2+${2*p1}x+${finalC1}=0$ are $r$ and $s$, where $r<s$. The solutions to $x^2+${2*p2}x+${finalC2}=0$ are $t$ and $u$, where $t<u$. The solutions to $x^2+${2*(p1+p2)}x+c=0$, where $c$ is a constant, are $r+t$ and $s+u$. What is the value of $c$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: cValue.toString(),
      explanation: `The correct answer is $${cValue}$. Completing the square for the first equation: $(x+${p1})^2=${finalQ1}$, so $r=-${p1}-\\sqrt{${finalQ1}}$ and $s=-${p1}+\\sqrt{${finalQ1}}$. For the second: $(x+${p2})^2=${finalQ2}$, so $t=-${p2}-2\\sqrt{${finalQ1}}$ and $u=-${p2}+2\\sqrt{${finalQ1}}$. Thus $r+t=-${p1+p2}-3\\sqrt{${finalQ1}}$ and $s+u=-${p1+p2}+3\\sqrt{${finalQ1}}$. The product $c=(-${p1+p2})^2-(3\\sqrt{${finalQ1}})^2=${(p1+p2)*(p1+p2)}-${9*finalQ1}=${cValue}$.`
    };
  }
};
