import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1110
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shift: 6, x: 4, cubic function with specific roots]
 * - Difficulty factors: [Function transformation, cubic evaluation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must compute g(4) where g(x) = f(x) + 6]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1110 = {
  metadata: {
    id: "1110",
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
    
    const asFactor = (r: number) =>
      r === 0 ? `x` : r > 0 ? `(x-${r})` : `(x+${Math.abs(r)})`;
    const factor1 = asFactor(r1);
    const factor2 = asFactor(r2);
    const factor3 = asFactor(r3);

    // Each factor evaluated at evalPoint, shown as a clean signed integer (no "--").
    const t1 = evalPoint - r1;
    const t2 = evalPoint - r2;
    const t3 = evalPoint - r3;
    const wrap = (n: number) => (n < 0 ? `(${n})` : `${n}`);

    return {
      questionText: `The function $f$ is defined by $f(x)=${factor1}${factor2}${factor3}$. In the $xy$-plane, when the graph of $y=f(x)$ is shifted up ${shift} units, the resulting graph is defined by the function $g$. If the graph of $y=g(x)$ passes through the point $(${evalPoint}, b)$, where $b$ is a constant, what is the value of $b$?`,
      figureCode: null,
      options: [],
      correctAnswer: g_eval.toString(),
      explanation: `Shifting the graph of $f$ up ${shift} units gives $g(x)=f(x)+${shift}$, so $g(${evalPoint})=f(${evalPoint})+${shift}$. Evaluating $f$ at $x=${evalPoint}$: $f(${evalPoint})=${wrap(t1)}\\cdot${wrap(t2)}\\cdot${wrap(t3)}=${f_eval}$. Therefore $b=${f_eval}+${shift}=${g_eval}$.`
    };
  }
};
