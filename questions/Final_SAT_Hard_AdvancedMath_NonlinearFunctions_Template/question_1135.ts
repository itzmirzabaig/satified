import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1135
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shift: 15, y-int: -99/7, product: 65/7]
 * - Difficulty factors: [Exponential with transformations, fraction arithmetic]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield integer a]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1135 = {
  metadata: {
    id: "1135",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const shift = getRandomInt(10, 20);
    const a = getRandomInt(3, 12);
    const b_num = getRandomInt(5, 20);
    const b_den = getRandomInt(5, 15);
    
    const y_int_num = -1 * b_den + b_num - shift * b_den;
    const prod_num = a * b_num;
    
    return {
      questionText: `Function $f$ is defined by $f(x)=-a^{x}+b$, where $a$ and $b$ are constants. In the xy-plane, the graph of $y=f(x)-${shift}$ has a y-intercept at $(0,-\\frac{${Math.abs(y_int_num)}}{${b_den}})$. The product of $a$ and $b$ is $\\frac{${prod_num}}{${b_den}}$. What is the value of $a$?`,
      figureCode: null,
      options: [],
      correctAnswer: a.toString(),
      explanation: `At $x=0$: $-1+b-${shift}=-\\frac{${Math.abs(y_int_num)}}{${b_den}}$, so $b=\\frac{${b_num}}{${b_den}}$. Given $ab=\\frac{${prod_num}}{${b_den}}$, we get $a\\cdot\\frac{${b_num}}{${b_den}}=\\frac{${prod_num}}{${b_den}}$, thus $a=${a}$.`
    };
  }
};
