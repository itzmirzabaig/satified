import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 2b1a27cd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max depth 302.4 at 6 min, surface at 12 min]
 * - Difficulty factors: [Quadratic model, depth at specific time]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must use vertex form, evaluate at t=10]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */

export const generator_2b1a27cd = {
  metadata: {
    // id: "2b1a27cd",
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

/**
 * Question ID: 1073d70c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [40 comments, 190% increase each hour]
 * - Difficulty factors: [Percent increase to growth factor, exponential model]
 * - Distractor patterns: [A: 1.19, B: 1.9, C: 19, D: 2.9]
 * - Constraints: [190% increase means 290% of original, factor is 2.9]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */