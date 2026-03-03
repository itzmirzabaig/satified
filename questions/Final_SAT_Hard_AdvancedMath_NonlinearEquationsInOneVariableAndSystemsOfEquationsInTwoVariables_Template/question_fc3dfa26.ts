import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: fc3dfa26
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Rational Equations
 * - Difficulty: Hard
 * - Logic: Solve rational equation with common denominator. Check for extraneous solutions.
 * - Form: A/(x^2-p^2) - (Bx+C)/(x^2-p^2) = (x+p)/(x^2-p^2)
 * - Solution: Linear equation resulting from numerators, checking denom != 0.
 */

export const generator_fc3dfa26 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Setup Parameters
    // We want denominator x^2 - p^2
    const p = getRandomInt(3, 6); 
    const pSq = p * p;

    // 2. Determine Target Solution (x)
    // We want x to be a simple fraction like 1/2, -1/2, 3/2, -3/2, or integer
    // constraint: x != p and x != -p
    const targetNumerator = getRandomElement([1, -1, 3, -3, 5]); 
    const targetDenominator = getRandomElement([1, 2]); // Allow integers or halves
    const targetX = targetNumerator / targetDenominator;

    // Retry if we accidentally picked the extraneous solution (unlikely with halves, but good practice)
    if (Math.abs(targetX) === p) {
        return generator_fc3dfa26.generate();
    }

    // 3. Work Backwards to find coefficients
    // Equation: A/(x^2-p^2) - (Bx+C)/(x^2-p^2) = (x+p)/(x^2-p^2)
    // Eliminating denominator: A - (Bx + C) = x + p
    // A - Bx - C = x + p
    // A - C - p = x(B + 1)
    
    // Pick B such that (B+1) works well with our target X
    // If target denom is 2, make B+1 even (so B is odd)
    // If target denom is 1, B can be anything
    let B: number;
    if (targetDenominator === 2) {
        B = getRandomElement([1, 3, 5]); 
    } else {
        B = getRandomInt(2, 5);
    }

    // Calculate the required constant term on LHS
    // LHS_const = x(B+1) + p
    const rhsVal = targetX * (B + 1) + p;
    
    // We need A - C = rhsVal
    // Pick C randomly, solve for A
    const C = getRandomInt(-5, 5);
    const A = rhsVal + C;

    // 4. Formatting
    const formatPoly = (coef: number, constant: number) => {
        const sign = constant >= 0 ? '+' : '-';
        return `${coef}x ${sign} ${Math.abs(constant)}`;
    };

    const fractionX = targetDenominator === 1 
        ? `${targetNumerator}` 
        : `\\frac{${targetNumerator}}{${targetDenominator}}`;

    const equation = `$$
    \\frac{${A}}{x^2 - ${pSq}} - \\frac{${formatPoly(B, C)}}{x^2 - ${pSq}} = \\frac{x + ${p}}{x^2 - ${pSq}}
    $$`;

    // 5. Options
    // Correct answer
    const optCorrect = fractionX;
    
    // Distractors
    const optExtraneous1 = `${p}`;   // Makes denominator zero
    const optExtraneous2 = `${-p}`;  // Makes denominator zero
    const optSignError = targetDenominator === 1 
        ? `${-targetNumerator}` 
        : `\\frac{${-targetNumerator}}{${targetDenominator}}`; // Opposite sign

    // Shuffle
    const optionsData = [
        { text: optCorrect, isCorrect: true },
        { text: optExtraneous1, isCorrect: false },
        { text: optExtraneous2, isCorrect: false },
        { text: optSignError, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData);
    const correctLetter = String.fromCharCode(65 + shuffledOptions.findIndex(o => o.isCorrect));

    // 6. Explanation
    // Reconstruct the linear steps for explanation text
    const term1 = A - C; // The constant after combining A and -C
    const termX = -(B + 1); // The x coefficient after moving x to LHS ( -Bx - x ) -> actually better to move x to RHS
    // A - C - p = x(B+1)
    const constantLHS = A - C - p;
    const coeffRHS = B + 1;

    return {
      questionText: `What value of $x$ satisfies the equation below?\n${equation}`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctLetter, // Or text depending on platform reqs
      explanation: `
        Multiplying the entire equation by the common denominator $(x^2 - ${pSq})$ (assuming $x \\neq \\pm ${p}$):
        $$ ${A} - (${formatPoly(B, C)}) = x + ${p} $$
        Distribute the negative sign:
        $$ ${A} - ${B}x - ${C >= 0 ? C : `(${C})`} = x + ${p} $$
        Combine constant terms on the left ($ ${A} - ${C} = ${A-C} $):
        $$ ${A-C} - ${B}x = x + ${p} $$
        Add $${B}x$ to both sides and subtract ${p} from both sides:
        $$ ${A-C} - ${p} = x + ${B}x $$
        $$ ${A-C-p} = ${B+1}x $$
        Divide by ${B+1}:
        $$ x = ${fractionX} $$
        
        Finally, we check for extraneous solutions. The denominator is zero when $x = ${p}$ or $x = ${-p}$. Since our solution is neither, it is valid.
      `
    };
  }
};