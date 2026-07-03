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
    // smallest e >= 10 with (e - a) divisible by m (e stays <= 14 <= 20)
    const e = 10 + (((a - 10) % m) + m) % m;
    const y = (e - a) / m;                  // guaranteed positive integer
    
    const explanation = `To solve this problem, you can define a new variable for the repeating expression. Let $y = ${c} - ${d}x$. Then substitute $y$ into the equation:
$${a} - ${b}y = ${e} - ${f}y$

Now, solve for $y$.
Add $${f}y$ to both sides:
$${a} + ${f - b}y = ${e}$

Subtract $${a}$ from both sides:
$${f - b}y = ${e - a}$

Divide by $${f - b}$:
$y = ${y}$

Since $y = ${c} - ${d}x$, the value of ${c} - ${d}x is $${y}$.`;
    
    return {
      questionText: `If $${a} - ${b}(${c} - ${d}x) = ${e} - ${f}(${c} - ${d}x)$, what is the value of $${c} - ${d}x$?`,
      figureCode: null,
      options: [],
      correctAnswer: y.toString(),
      explanation: explanation
    };
  }
};
