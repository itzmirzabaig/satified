import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1120
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 4x² - 50x + 126]
 * - Difficulty factors: [Completing the square, vertex x-coordinate]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Answer is 25/4 or 6.25]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1120 = {
  metadata: {
    id: "1120",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(2, 6);
    const b = -getRandomInt(30, 70);
    const c = getRandomInt(50, 150);
    
    // Reduce the answer (it used to be stored and shown unreduced, like 50/6).
    const gcd = (p: number, q: number): number => (q === 0 ? p : gcd(q, p % q));
    const num = -b;
    const den = 2 * a;
    const g = gcd(num, den);
    const rn = num / g;
    const rd = den / g;
    const answerText = rd === 1 ? `${rn}` : `${rn}/${rd}`;
    const answerTex = rd === 1 ? `${rn}` : `\\frac{${rn}}{${rd}}`;
    // Skip the simplify step when the fraction is already in lowest terms.
    const simplifyStep = g === 1 ? '' : `=${answerTex}`;

    return {
      questionText: `The function $f$ is defined by $f(x)=${a}x^2${b}x+${c}$. For what value of $x$ does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: [],
      correctAnswer: answerText,
      explanation: `The correct answer is ${answerText}. The coefficient of $x^2$ is positive, so the parabola opens upward and $f(x)$ reaches its minimum at the vertex. For a quadratic $Ax^2+Bx+C$, the $x$-coordinate of the vertex is $x=-\\frac{B}{2A}$. Here $A=${a}$ and $B=${b}$, so $x=-\\frac{${b}}{2(${a})}=\\frac{${num}}{${den}}${simplifyStep}$.`
    };
  }
};
