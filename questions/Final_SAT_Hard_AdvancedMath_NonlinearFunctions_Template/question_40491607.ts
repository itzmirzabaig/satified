import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 40491607
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shift: 6, x: 4, cubic function with specific roots]
 * - Difficulty factors: [Function transformation, cubic evaluation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must compute g(4) where g(x) = f(x) + 6]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_40491607 = {
  metadata: {
    // id: "40491607",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // f(x) = (x-r1)(x-r2)(x-r3)
    // g(x) = f(x) + shift
    // g(evalPoint) = f(evalPoint) + shift
    
    const r1 = getRandomInt(-5, 2);
    const r2 = getRandomInt(3, 6);
    const r3 = getRandomInt(-8, -3);
    const shift = getRandomInt(3, 10);
    const evalPoint = getRandomInt(4, 8);
    
    const f_eval = (evalPoint - r1) * (evalPoint - r2) * (evalPoint - r3);
    const g_eval = f_eval + shift;
    
    const factor1 = r1 >= 0 ? `(x-${r1})` : `(x+${Math.abs(r1)})`;
    const factor2 = r2 >= 0 ? `(x-${r2})` : `(x+${Math.abs(r2)})`;
    const factor3 = r3 >= 0 ? `(x-${r3})` : `(x+${Math.abs(r3)})`;
    
    return {
      questionText: `In the $xy$-plane, when the graph of the function $f$, where $y=f(x)$, is shifted up ${shift} units, the resulting graph is defined by the function $g$. If the graph of $y=g(x)$ crosses through the point $(${evalPoint}, b)$, where $b$ is a constant, what is the value of $b$?`,
      figureCode: null,
      options: null,
      correctAnswer: g_eval.toString(),
      explanation: `Since $g(x)=f(x)+${shift}$, we have $g(${evalPoint})=f(${evalPoint})+${shift}$. Given $f(x)=${factor1}${factor2}${factor3}$, we get $f(${evalPoint})=(${evalPoint}-${r1})(${evalPoint}-${r2})(${evalPoint}-${r3})=${f_eval}$. Thus $b=${f_eval}+${shift}=${g_eval}$.`
    };
  }
};

/**
 * Question ID: 7902bed0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max height: 51.84, time to max: 1.8, total time: 3.6]
 * - Difficulty factors: [Projectile motion, vertex form of quadratic]
 * - Distractor patterns: [A: -t²+3.6, B: -t²+51.84, C: wrong vertex, D: correct]
 * - Constraints: [h = -16(t-1.8)² + 51.84]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */