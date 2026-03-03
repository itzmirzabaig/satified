import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 9f2ecade
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(x) = (x+5)(x-6)(x-7), find c in standard form]
 * - Difficulty factors: [Cubic expansion, constant term identification]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [c = product of roots with signs = (-5)(6)(7) = -210... wait, need to check]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_9f2ecade = {
  metadata: {
    // id: "9f2ecade",
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

/**
 * Question ID: f44b4125
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 18(1.25)^x + 41, g(x) = 9(0.73)^x]
 * - Difficulty factors: [Exponential max value display, growth vs decay]
 * - Distractor patterns: [A: I only, B: II only, C: I and II, D: Neither]
 * - Constraints: [Only II displays max value as coefficient]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */