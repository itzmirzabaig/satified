import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1139
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y-intercept: -75/7, product ab: 320/7]
 * - Difficulty factors: [Exponential with transformations, system of equations with fractions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield integer answer for a]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 *
 * FIXED: fractions were unreduced (114/6), b could be a whole number written as
 * a fraction, and the negative intercept printed as a fraction with a negative
 * numerator. b is now drawn in lowest terms and the product is reduced.
 */

const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));

export const generator_1139 = {
  metadata: {
    id: "1139",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // y = f(x) - 12 = -a^x + b - 12
    // y-intercept (0, -75/7): -1 + b - 12 = -75/7, so b = 16/7
    // ab = 320/7, so a = 20

    const a = getRandomInt(3, 12);
    let b_num = getRandomInt(5, 25);
    let b_den = getRandomInt(5, 15);
    // b must be a fraction in lowest terms (b_den >= 5, so it is never whole).
    while (gcd(b_num, b_den) !== 1) {
      b_num = getRandomInt(5, 25);
      b_den = getRandomInt(5, 15);
    }
    const shift = getRandomInt(8, 20);

    // y-intercept is b - (shift + 1), always negative for these ranges, and
    // already in lowest terms because gcd(b_num, b_den) = 1.
    const y_int_abs = (shift + 1) * b_den - b_num;
    const bTex = `\\frac{${b_num}}{${b_den}}`;
    const yTex = `-\\frac{${y_int_abs}}{${b_den}}`;

    // Product ab in lowest terms (a whole number when b_den divides a).
    const g = gcd(a * b_num, b_den);
    const prodN = (a * b_num) / g;
    const prodD = b_den / g;
    const prodTex = prodD === 1 ? `${prodN}` : `\\frac{${prodN}}{${prodD}}`;

    return {
      questionText: `The function $f$ is defined by $f(x)=-a^{x}+b$, where $a$ and $b$ are positive constants. In the $xy$-plane, the graph of $y=f(x)-${shift}$ has a $y$-intercept at $\\left(0,${yTex}\\right)$. The product of $a$ and $b$ is $${prodTex}$. What is the value of $a$?`,
      figureCode: null,
      options: [],
      correctAnswer: a.toString(),
      explanation: `The correct answer is ${a}. The $y$-intercept occurs where $x=0$. Since $a^0=1$, $f(0)=-1+b$, so the value of $y=f(x)-${shift}$ at $x=0$ is $-1+b-${shift}=b-${shift + 1}$. Setting this equal to $${yTex}$ gives $b=${shift + 1}-\\frac{${y_int_abs}}{${b_den}}=${bTex}$. Since $ab=${prodTex}$, dividing both sides by $${bTex}$ gives $a=${prodTex}\\cdot\\frac{${b_den}}{${b_num}}=${a}$.`
    };
  }
};
