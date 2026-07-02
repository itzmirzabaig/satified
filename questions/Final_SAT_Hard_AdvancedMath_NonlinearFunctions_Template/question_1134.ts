import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1134
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(x) = (x+5)(x-6)(x-7), find c in standard form]
 * - Difficulty factors: [Cubic expansion, constant term identification]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [c = product of roots with signs = (-5)(6)(7) = -210... wait, need to check]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1134 = {
  metadata: {
    id: "1134",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const r1 = -getRandomInt(3, 8);
    const r2 = getRandomInt(4, 10);
    const r3 = getRandomInt(4, 10);
    
    const c = -r1 * r2 * r3;
    
    const factor1 = r1 >= 0 ? `(x-${r1})` : `(x+${Math.abs(r1)})`;
    const factor2 = r2 >= 0 ? `(x-${r2})` : `(x+${Math.abs(r2)})`;
    const factor3 = r3 >= 0 ? `(x-${r3})` : `(x+${Math.abs(r3)})`;
    
    return {
      questionText: `$h(x)=${factor1}${factor2}${factor3}=x^3+ax^2+bx+c$. What is $c$?`,
      figureCode: null,
      options: null,
      correctAnswer: c.toString(),
      explanation: `Expanding, the constant term $c$ equals $(${-r1})(${-r2})(${-r3})=${c}$.`
    };
  }
};
