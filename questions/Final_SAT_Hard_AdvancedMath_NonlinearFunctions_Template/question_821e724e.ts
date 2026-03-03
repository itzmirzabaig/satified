import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 821e724e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [g(x) = (x+14)(t-x), passes through (24,0)]
 * - Difficulty factors: [Factored form, finding parameter, evaluation]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must find t from point, then evaluate g(0)]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_821e724e = {
  metadata: {
    // id: "821e724e",
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
      questionText: `The function $g$ is defined by $g(x)=(x${signA})(t-x)$, where $t$ is a constant. In the xy-plane, the graph of $y=g(x)$ passes through the point $(${p},0)$. What is the value of $g(0)$?`,
      figureCode: null,
      options: null,
      correctAnswer: g0.toString(),
      explanation: `Since $g(${p})=0$ and $g(x)=0$ when $x=-${a}$ or $x=t$, we have $t=${p}$. Then $g(0)=(${a})(${t})=${g0}$.`
    };
  }
};

/**
 * Question ID: ce508fb0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(-4) calculation, then g(c)]
 * - Difficulty factors: [Function composition, evaluation, fractions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Correct answer is -4.9 or -49/10]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */