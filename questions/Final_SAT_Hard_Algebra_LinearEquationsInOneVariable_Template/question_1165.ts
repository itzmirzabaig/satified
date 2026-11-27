import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1165
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In One Variable
 * - Concept: Infinitely many solutions (Identity).
 * - Equation: (Ax + B)/C - s/D = r(x - E)
 * - Logic: 
 *    1. Match slopes: A/C = r
 *    2. Match constants: B/C - s/D = -rE
 * - Fix: Changed LaTeX delimiters to standard $ and $$ for compatibility.
 *        Enforced integer arithmetic so 's' is always a whole number.
 */

export const generator_1165 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate slope components
    // We want A/C = r
    const C = getRandomInt(2, 5);          // Denominator for x term
    const r = getRandomInt(2, 6);          // Slope (right side coefficient)
    const A = r * C;                       // Numerator for x term

    // 2. Generate constant components
    // We want constant term to resolve nicely.
    // Constant on Left: B/C - s/D
    // Constant on Right: -r * E
    // Equation: B/C - s/D = -rE  =>  s/D = B/C + rE  =>  s = D(B/C + rE)
    
    // To ensure 's' is an integer, let B be a multiple of C.
    const B_factor = getRandomInt(3, 9);
    const B = B_factor * C;                // B/C will be exactly B_factor
    
    const E = getRandomInt(2, 8);          // Right side shift
    const D = getRandomInt(3, 12);         // Denominator for s

    // 3. Calculate s
    // s = D * ( (B/C) + r*E )
    const term1 = B / C;      // Integer
    const term2 = r * E;      // Integer
    const s = D * (term1 + term2);

    // 4. Format the Question
    // Use $$ for display math equation
    const equation = `$$ \\frac{${A}x+${B}}{${C}} - \\frac{s}{${D}} = ${r}(x - ${E}) $$`;

    // 5. Explanation
    // Before: the steps were a bold outline, and "add to the right / add to the
    // left" described the move wrongly. Now plain sentences in the standard format.
    const explanation = `The correct answer is ${s}. An equation has infinitely many solutions when its two sides are equivalent, so the coefficients of $x$ must match and the constant terms must match.

Dividing each term in the first fraction by ${C} and distributing ${r} on the right side gives:
$$ ${r}x + ${B_factor} - \\frac{s}{${D}} = ${r}x - ${r * E} $$

The coefficient of $x$ is ${r} on both sides, so the constant terms must be equal:
$$ ${B_factor} - \\frac{s}{${D}} = -${r * E} $$

Adding $\\frac{s}{${D}}$ and ${r * E} to both sides gives:
$$ ${B_factor} + ${r * E} = \\frac{s}{${D}} $$

So $\\frac{s}{${D}} = ${term1 + term2}$. Multiplying both sides by ${D} gives $s = ${term1 + term2} \\cdot ${D} = ${s}$.`;

    return {
      // Before: the stem also called r a constant, but no r appears in the equation.
      questionText: `${equation}\nIn the given equation, $s$ is a constant and $s > 0$. If the equation has infinitely many solutions, what is the value of $s$?`,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer: s.toString(),
      explanation: explanation
    };
  }
};