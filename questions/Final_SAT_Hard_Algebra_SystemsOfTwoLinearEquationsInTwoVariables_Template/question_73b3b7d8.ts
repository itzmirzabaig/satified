import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 73b3b7d8
 * Skill: Systems Of Two Linear Equations In Two Variables
 * Difficulty: Hard
 * 
 * Description: Given a system of equations (and its graph), find the value of 30x.
 * Fixes:
 * - Added missing SVG line drawing logic (original code drew axes but no equation lines).
 * - Ensures x is a fraction compatible with "30x" (e.g., x = k/30, k/3, etc.).
 */
export const generator_73b3b7d8 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE SOLUTION
    // ----------------------------------------------------------------------
    // We want the answer to be an integer A = 30x.
    // So x = A / 30.
    // Let's pick A such that x is in a reasonable range (e.g., 0 to 4).
    const answer = getRandomInt(20, 80); // e.g. 20 -> x = 2/3. 45 -> x = 1.5.
    const x = answer / 30;
    
    // Pick a y coordinate for the intersection (keep it somewhat integer-ish or half)
    const y = getRandomInt(2, 6); // e.g., 3

    // ----------------------------------------------------------------------
    // 2. GENERATE EQUATIONS
    // ----------------------------------------------------------------------
    // Line 1: Slope m1 (integer)
    const m1 = getRandomElement([1, 2, 3]);
    // y = m1*x + b1  ->  b1 = y - m1*x
    const b1 = y - (m1 * x);

    // Line 2: Slope m2 (negative integer)
    const m2 = getRandomElement([-1, -2]);
    // y = m2*x + b2  ->  b2 = y - m2*x
    const b2 = y - (m2 * x);

    // Convert to Standard Form: Ax + By = C
    // y = mx + b  =>  -mx + y = b
    // Multiply by 30 to clear any potential denominators from x (since x = A/30)
    // Actually, x might have denom 30. b = y - m(A/30) = (30y - mA)/30.
    // So -mx + y = (30y - mA)/30
    // -30mx + 30y = 30y - mA
    // A_std = -30m, B_std = 30, C_std = 30y - mA (all integers)
    // We can simplify by GCD later if we want, but raw integers are fine for the generator.

    const makeStandard = (m: number, xVal: number, yVal: number) => {
      // Form: -mx + y = b
      // Scale by 30 to ensure integers
      let A = -30 * m;
      let B = 30;
      let C = 30 * yVal - 30 * m * xVal;

      // Simplify by removing common factors
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const common = Math.abs(gcd(A, gcd(B, C)));
      
      A /= common;
      B /= common;
      C /= common;

      // Ensure A is positive for neatness
      if (A < 0) {
        A *= -1; B *= -1; C *= -1;
      }
      
      const B_str = B >= 0 ? `+ ${B}y` : `- ${Math.abs(B)}y`;
      return `${A}x ${B_str} = ${C}`;
    };

    const eq1_str = makeStandard(m1, x, y);
    const eq2_str = makeStandard(m2, x, y);
    // ----------------------------------------------------------------------
    // 4. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `
$$
\\begin{cases}
${eq1_str} \\\\
${eq2_str}
\\end{cases}
$$
The solution to the given system of equations is $(x, y)$. What is the value of $30x$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: answer.toString(),
      explanation: `
        The correct answer is ${answer}.
        <br/><br/>
        1. <b>Identify the System:</b>
        The problem provides the system:
        $$ ${eq1_str} $$
        $$ ${eq2_str} $$
        <br/>
        2. <b>Solve for $x$:</b>
        (Note: You can solve algebraically or inspect the graph if the intersection is clear, but solving is precise).
        Multiply equations or substitute to isolate $x$.
        Solving this system yields $x = ${x.toFixed(4).replace(/0+$/, '')}$ (or fraction $x = \\frac{${answer}}{30}$).
        <br/>
        3. <b>Calculate $30x$:</b>
        $$ 30 \\times \\left(\\frac{${answer}}{30}\\right) = ${answer} $$
      `
    };
  }
};