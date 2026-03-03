import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c9417793
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [absolute value |x-9|+45=63, sum of solutions]
 * - Difficulty factors: [Isolate absolute value, split into cases, sum solutions]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Simple arithmetic, check both cases]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_c9417793 = {
  metadata: {
    // id: "c9417793",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: |x - h| + a = b, find sum of solutions
    
    const h = getRandomInt(5, 15);
    const a = getRandomInt(30, 60);
    const b = a + getRandomInt(15, 30); // So b - a is positive
    
    // |x - h| = b - a
    // x - h = ±(b - a)
    // x = h ± (b - a)
    
    const diff = b - a;
    const sol1 = h + diff;
    const sol2 = h - diff;
    const sum = sol1 + sol2; // = 2h
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `What is the sum of the solutions to the given equation?\n\n$|x-${h}|+${a}=${b}$`,
      figureCode: figureCode,
      options: null,
      correctAnswer: sum.toString(),
      explanation: `The correct answer is $${sum}$. Subtracting ${a}$: $|x-${h}|=${diff}$. This gives $x-${h}=${diff}$ or $x-${h}=-${diff}$, so $x=${sol1}$ or $x=${sol2}$. The sum is $${sol1}+${sol2}=${sum}$.`
    };
  }
};

/**
 * Question ID: 30281058
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [parabola y=x²-9, line through (1,a) and (5,b), find slope]
 * - Difficulty factors: [Find points on parabola, calculate slope]
 * - Distractor patterns: [A: 6/correct, B: 2, C: -2, D: -6]
 * - Constraints: [Calculate y-values, use slope formula]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/30281058.ts