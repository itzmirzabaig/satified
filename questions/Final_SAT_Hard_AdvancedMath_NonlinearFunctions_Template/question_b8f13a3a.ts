import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: b8f13a3a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y-intercept: -75/7, product ab: 320/7]
 * - Difficulty factors: [Exponential with transformations, system of equations with fractions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield integer answer for a]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_b8f13a3a = {
  metadata: {
    // id: "b8f13a3a",
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
    const b_num = getRandomInt(5, 25);
    const b_den = getRandomInt(5, 15);
    const shift = getRandomInt(8, 20);
    
    // y-intercept: -1 + b - shift = b_num/b_den - shift
    const y_int_num = -1 * b_den + b_num - shift * b_den;
    
    // Product a·b = a · b_num/b_den = (a·b_num)/b_den
    const prod_num = a * b_num;
    
    return {
      questionText: `Function $f$ is defined by $f(x)=-a^{x}+b$, where $a$ and $b$ are constants. In the xy-plane, the graph of $y=f(x)-${shift}$ has a y-intercept at $(0,\\frac{${y_int_num}}{${b_den}})$. The product of $a$ and $b$ is $\\frac{${prod_num}}{${b_den}}$. What is the value of $a$?`,
      figureCode: null,
      options: null,
      correctAnswer: a.toString(),
      explanation: `From the y-intercept: $-\\frac{${b_num}}{${b_den}}+b-${shift}=\\frac{${y_int_num}}{${b_den}}$, so $b=\\frac{${b_num}}{${b_den}}$. Given $ab=\\frac{${prod_num}}{${b_den}}$, we have $a\\cdot\\frac{${b_num}}{${b_den}}=\\frac{${prod_num}}{${b_den}}$, thus $a=${a}$.`
    };
  }
};

/**
 * Question ID: 8e1da169
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [roots: 44, 46]
 * - Difficulty factors: [Quadratic in factored form, vertex/minimum]
 * - Distractor patterns: [A: 46 (root), B: 45 (correct), C: 44 (root), D: -1 (difference)]
 * - Constraints: [Minimum is at midpoint of roots]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */