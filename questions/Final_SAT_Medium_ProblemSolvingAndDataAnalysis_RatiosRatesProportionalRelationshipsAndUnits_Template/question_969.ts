import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 969
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x/y = 4, 24x/ny = 4]
 * - Difficulty factors: [Algebraic manipulation with ratios, substitution]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [n must be integer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_969 = {
  metadata: {
    id: "969",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: x/y = 4, 24x/ny = 4, find n=24
    // General form: x/y = k, mx/ny = k, find n
    // (m/n) * (x/y) = k → (m/n) * k = k → m/n = 1 → n = m
    
    const k = getRandomInt(2, 9); // ratio value like 4
    const m = getRandomInt(10, 40); // coefficient like 24
    
    // STEP 2: Calculate answer
    const n = m; // Because (m/n) * k = k implies m/n = 1
    
    return {
      questionText: `If $\\frac{x}{y}=${k}$ and $\\frac{${m} x}{n y}=${k}$, what is the value of $n$?`,
      figureCode: null,
      options: [],
      correctAnswer: n.toString(),
      explanation: `The correct answer is ${n}. The equation $\\frac{${m}x}{ny} = ${k}$ can be rewritten as $\\left(\\frac{${m}}{n}\\right)\\left(\\frac{x}{y}\\right) = ${k}$. It's given that $\\frac{x}{y} = ${k}$. Substituting ${k} for $\\frac{x}{y}$ in the equation $\\left(\\frac{${m}}{n}\\right)\\left(\\frac{x}{y}\\right) = ${k}$ yields $\\left(\\frac{${m}}{n}\\right)(${k}) = ${k}$. Multiplying both sides of this equation by $n$ yields $(${m})(${k}) = ${k}n$. Dividing both sides of this equation by ${k} yields $${m} = n$. Therefore, the value of $n$ is ${m}.`
    };
  }
};
