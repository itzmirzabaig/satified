import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1126
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [g(x) = (x+14)(t-x), passes through (24,0)]
 * - Difficulty factors: [Factored form, finding parameter, evaluation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must find t from point, then evaluate g(0)]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1126 = {
  metadata: {
    id: "1126",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(5, 20);
    const p = getRandomInt(15, 40);
    
    const t = p;
    const g0 = a * t;
    
    const signA = `+${a}`;
    
    return {
      // Before: "xy-plane" was outside math, the explanation had no "The correct answer is"
      // opening, and the step that substitutes the point into g was skipped.
      questionText: `The function $g$ is defined by $g(x)=(x${signA})(t-x)$, where $t$ is a constant. In the $xy$-plane, the graph of $y=g(x)$ passes through the point $(${p}, 0)$. What is the value of $g(0)$?`,
      figureCode: null,
      options: [],
      correctAnswer: g0.toString(),
      explanation: `The correct answer is ${g0}. Since the graph passes through $(${p}, 0)$, $g(${p})=0$, so $(${p}+${a})(t-${p})=0$. The factor $${p}+${a}=${p + a}$ is not $0$, so $t-${p}=0$ and $t=${p}$. Therefore $g(x)=(x+${a})(${p}-x)$, and substituting $x=0$ gives $g(0)=(${a})(${p})=${g0}$.`
    };
  }
};
