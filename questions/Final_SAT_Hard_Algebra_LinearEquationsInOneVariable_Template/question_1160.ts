import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1160
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5, 7, 2, 4, 16, 8 (small integers)]
 * - Difficulty factors: [Substitution method for repeated expression]
 * - Distractor patterns: [N/A - fill-in-blank]
 * - Constraints: [Answer must be integer]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 */

export const generator_1160 = {
  metadata: {
    id: "1160",
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
