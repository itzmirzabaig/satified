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
    
    // Substituting y = c - dx turns  a - b y = e - f y  into
    //   (f - b) y = e - a   =>   y = (e - a)/(f - b).
    // f > b is enforced so (f - b) is a positive divisor. We then choose e
    // ANSWER-FIRST so y is a clean positive integer with NO retry: within the
    // window e in [10, 20] (11 values) there is always a value congruent to a
    // modulo (f - b) because (f - b) <= 5, so (e - a) is divisible exactly.
    const a = getRandomInt(3, 8);
    const b = getRandomInt(5, 10);
    const c = getRandomInt(2, 6);
    const d = getRandomInt(3, 7);
    const f = b + getRandomInt(2, 5);      // f > b  =>  f - b in [2, 5]
    const m = f - b;
    // Previously e was the smallest value >= 10 that worked, so the answer was
    // usually 1. Now y is drawn first and e is built from it.
    const y = getRandomInt(2, 7);           // the answer, a positive integer
    const e = a + m * y;
    
    // Previously the explanation did not start with the answer and left the
    // expression c - dx outside math in its last sentence.
    const explanation = `The correct answer is ${y}. The expression $${c} - ${d}x$ appears on both sides, so let $y = ${c} - ${d}x$. Substituting $y$ into the equation gives $${a} - ${b}y = ${e} - ${f}y$. Adding $${f}y$ to both sides gives $${a} + ${f - b}y = ${e}$. Subtracting $${a}$ from both sides gives $${f - b}y = ${e - a}$, and dividing both sides by $${f - b}$ gives $y = ${y}$. Since $y = ${c} - ${d}x$, the value of $${c} - ${d}x$ is $${y}$.`;
    
    return {
      questionText: `If $${a} - ${b}(${c} - ${d}x) = ${e} - ${f}(${c} - ${d}x)$, what is the value of $${c} - ${d}x$?`,
      figureCode: null,
      options: [],
      correctAnswer: y.toString(),
      explanation: explanation
    };
  }
};
