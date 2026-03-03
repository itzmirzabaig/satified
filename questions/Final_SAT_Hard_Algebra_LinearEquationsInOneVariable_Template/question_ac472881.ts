import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ac472881
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

export const generator_ac472881 = {
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
    const explanation = `
      For an equation to have infinitely many solutions, it must be an identity. This means the coefficient of $x$ on both sides must be the same, and the constant terms on both sides must be the same.
      <br/><br/>
      <strong>1. Simplify the equation:</strong>
      $$ \\frac{${A}x}{${C}} + \\frac{${B}}{${C}} - \\frac{s}{${D}} = ${r}x - ${r}(${E}) $$
      $$ ${r}x + ${B/C} - \\frac{s}{${D}} = ${r}x - ${r*E} $$
      <br/>
      <strong>2. Compare coefficients of $x$:</strong>
      Left side: $${r}x$. Right side: $${r}x$. (These match, as expected).
      <br/><br/>
      <strong>3. Compare constant terms:</strong>
      Left side: $${B/C} - \\frac{s}{${D}}$
      <br/>
      Right side: $-${r*E}$
      <br/>
      Set them equal:
      $$ ${B/C} - \\frac{s}{${D}} = -${r*E} $$
      <br/>
      <strong>4. Solve for $s$:</strong>
      Add $\\frac{s}{${D}}$ to the right and add $${r*E}$ to the left:
      $$ ${B/C} + ${r*E} = \\frac{s}{${D}} $$
      $$ ${B/C + r*E} = \\frac{s}{${D}} $$
      Multiply by $${D}$:
      $$ s = ${B/C + r*E} \\cdot ${D} $$
      $$ s = ${s} $$
    `;
    
    return {
      questionText: `${equation}\nIn the given equation, $s$ and $r$ are constants, and $s > 0$. If the equation has infinitely many solutions, what is the value of $s$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: s.toString(),
      explanation: explanation
    };
  }
};