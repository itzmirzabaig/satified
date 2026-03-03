import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9fa781f8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio 9:5, x=162, find y]
 * - Difficulty factors: [Ratio to equation conversion, cross-multiplication]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must result in integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_9fa781f8 = {
  metadata: {
    // id: "9fa781f8",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: ratio x:y = 9:5, x=162, y=90
    // Strategy: ratio a:b, x = a*k, find y = b*k
    
    const a = getRandomInt(2, 15); // ratio first term
    const b = getRandomInt(2, 15); // ratio second term
    const k = getRandomInt(5, 30); // multiplier
    
    const x = a * k;
    const y = b * k;
    
    return {
      questionText: `The ratio x to y is equivalent to the ratio $${a}$ to $${b}$. If the value of x is $${x}$, what is the value of y?`,
      figureCode: null,
      options: null,
      correctAnswer: y.toString(),
      explanation: `The correct answer is ${y}. It's given that the ratio of $x$ to $y$ is equivalent to the ratio $${a}$ to $${b}$. It follows that $\\frac{x}{y}=\\frac{${a}}{${b}}$. Multiplying each side of this equation by $${b}y$ yields $\\frac{(${b}y) x}{y}=\\frac{${a}(${b}y)}{${b}}$, or $${b}x=${a}y$. Dividing each side of this equation by $${a}$ yields $\\frac{${b} x}{${a}}=y$. Substituting $${x}$ for $x$ in this equation yields $\\frac{${b}(${x})}{${a}}=y$, which is equivalent to $\\frac{${b * x}}{${a}}=y$, or $${y}=y$. Therefore, if the value of $x$ is $${x}$, the value of $y$ is ${y}.`
    };
  }
};

/**
 * Question ID: 97843
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio 1:26, x coaches, find athletes]
 * - Difficulty factors: [Ratio application, algebraic expression]
 * - Distractor patterns: [A: x/26 (division), C: x+26 (addition), D: 26/x (inverted)]
 * - Constraints: [Maintaining ratio when scaling]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/97843.ts