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
 */

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
      options: [],
      correctAnswer: a.toString(),
      explanation: `The y-intercept of $y=f(x)-${shift}$ is at $x=0$: since $f(0)=-a^{0}+b=-1+b$, we get $-1+b-${shift}=\\frac{${y_int_num}}{${b_den}}$. Solving, $b=\\frac{${y_int_num}}{${b_den}}+${shift}+1=\\frac{${b_num}}{${b_den}}$. Given $ab=\\frac{${prod_num}}{${b_den}}$, we have $a\\cdot\\frac{${b_num}}{${b_den}}=\\frac{${prod_num}}{${b_den}}$, thus $a=${a}$.`
    };
  }
};
