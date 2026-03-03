import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 4771a64a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5, 7, 2, 4, 16, 8 (small integers)]
 * - Difficulty factors: [Substitution method for repeated expression]
 * - Distractor patterns: [N/A - fill-in-blank]
 * - Constraints: [Answer must be integer]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 */

export const generator_4771a64a = {
  metadata: {
    // id: "4771a64a",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form: a - b(c - dx) = e - f(c - dx)
    // Let y = c - dx, then a - by = e - fy
    // Solve: a - by = e - fy → fy - by = e - a → y(f - b) = e - a → y = (e-a)/(f-b)
    
    let valid = false;
    let a: number, b: number, c: number, d: number, e: number, f: number, y: number;
    
    while (!valid) {
      a = getRandomInt(3, 8);
      b = getRandomInt(5, 10);
      c = getRandomInt(2, 6);
      d = getRandomInt(3, 7);
      e = getRandomInt(10, 20);
      f = getRandomInt(b + 2, b + 5); // Ensure f ≠ b
      
      // Calculate y = (e - a)/(f - b)
      const numerator = e - a;
      const denominator = f - b;
      
      // Ensure integer solution
      if (numerator % denominator === 0) {
        y = numerator / denominator;
        valid = true;
      }
    }
    
    const explanation = `To solve this problem, you can define a new variable for the repeating expression. Let $y = ${c} - ${d}x$. Then substitute $y$ into the equation:
$${a} - ${b}y = ${e} - ${f}y$

Now, solve for $y$.
Add $${f}y$ to both sides:
$${a} + ${f - b}y = ${e}$

Subtract $${a}$ from both sides:
$${f - b}y = ${e - a}$

Divide by $${f - b}$:
$y = ${y}$

Since $y = ${c} - ${d}x$, the value of ${c} - ${d}x$ is $${y}$.`;
    
    return {
      questionText: `If ${a} - ${b}(${c} - ${d}x) = ${e} - ${f}(${c} - ${d}x), what is the value of ${c} - ${d}x?`,
      figureCode: null,
      options: null,
      correctAnswer: y.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: 3f8a701b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [9, 5, a, b (parameters)]
 * - Difficulty factors: [No solution conditions with multiple statements to evaluate]
 * - Distractor patterns: [A: None, B: I only, C: I and II, D: I and III]
 * - Constraints: [a=9 necessary, b≠5/9 necessary, b=5 not necessary]
 * - Question type: [Equation→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/linear-equations-in-one-variable/3f8a701b.ts