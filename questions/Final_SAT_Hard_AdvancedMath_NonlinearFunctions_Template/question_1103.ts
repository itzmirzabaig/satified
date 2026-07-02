import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1103
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max depth 302.4 at 6 min, surface at 12 min]
 * - Difficulty factors: [Quadratic model, depth at specific time]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must use vertex form, evaluate at t=10]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_1103 = {
  metadata: {
    id: "1103",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const h = getRandomInt(4, 8);
    const k = getRandomInt(100, 400);
    const evalTime = Math.round(1.5 * h);
    
    const a = Math.round(-k / (h * h));
    const g_eval = Math.round(a * Math.pow(evalTime - h, 2) + k);
    
    return {
      questionText: `A seal's depth is modeled by quadratic $g$. Maximum depth is $${k}$ meters at ${h} minutes, and the seal surfaces at ${2*h} minutes. What is the depth at ${evalTime} minutes?`,
      figureCode: null,
      options: null,
      correctAnswer: g_eval.toString(),
      explanation: `The model is $g(t)=${a}(t-${h})^2+${k}$. At $t=${evalTime}$: $g(${evalTime})=${a}(${evalTime-h})^2+${k}=${g_eval}$ meters.`
    };
  }
};
