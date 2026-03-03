import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: d135f4bf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = (x-6)(x-2)(x+6), shift: 4]
 * - Difficulty factors: [Cubic function, transformation, evaluation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [g(0) = f(0) + 4]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_d135f4bf = {
  metadata: {
    // id: "d135f4bf",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // f(x) = (x-a)(x-b)(x+c) where we use c as the positive root
    // g(x) = f(x) + k, find g(0) = f(0) + k = abc + k
    
    const r1 = getRandomInt(2, 8);
    const r2 = getRandomInt(2, 8);
    const r3 = getRandomInt(2, 8);
    const shift = getRandomInt(2, 8);
    
    const f0 = (-r1) * (-r2) * (r3);
    const g0 = f0 + shift;
    
    const factor1 = `(x-${r1})`;
    const factor2 = `(x-${r2})`;
    const factor3 = `(x+${r3})`;
    
    return {
      questionText: `The function $f$ is defined by $f(x)=${factor1}${factor2}${factor3}$. In the xy-plane, the graph of $y=g(x)$ is the result of translating the graph of $y=f(x)$ up ${shift} units. What is the value of $g(0)$?`,
      figureCode: null,
      options: null,
      correctAnswer: g0.toString(),
      explanation: `Since $g(x)=f(x)+${shift}$, we have $g(0)=f(0)+${shift}$. Computing $f(0)=(-${r1})(-${r2})(${r3})=${f0}$. Thus $g(0)=${f0}+${shift}=${g0}$.`
    };
  }
};

/**
 * Question ID: 271ffad7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 7, max: 51.1, time to max: 3]
 * - Difficulty factors: [Quadratic symmetry, projectile motion]
 * - Distractor patterns: [A: 3 (time to max), B: 6 (correct), C: 7 (initial height), D: 9 (arbitrary)]
 * - Constraints: [Symmetric around vertex, return to initial height at 2×time_to_max]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */