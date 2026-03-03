import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 947133
 * Skill: Circles (Completing the Square)
 * Difficulty: Hard
 * 
 * Description: Find the radius of a circle given its equation in general form (x^2 + bx + y^2 + cy = D).
 * Fixes:
 * - Fixed "frac" rendering as text by using correct escape sequence `\\frac`.
 * - Constrained coefficients to be odd integers to guarantee the constant term is a fraction (x/2), matching the original problem style.
 */
export const generator_947133 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // ----------------------------------------------------------------------
    // 1. GENERATE VALUES
    // ----------------------------------------------------------------------
    // We want the equation: x^2 + bx + y^2 + cy = D
    // To match the difficulty of the original (which had D = 199/2), we want
    // the completion of squares to result in fractions.
    // If b and c are odd, (b/2)^2 ends in .25. 
    // Two odd coefficients -> .25 + .25 = .5.
    // D = r^2 - .5, so D ends in .5, making it expressible as Int/2.
    
    // Generate odd coefficients (e.g., 3, 5, 7, 9)
    const bCoeff = getRandomInt(1, 5) * 2 + 1; 
    const cCoeff = getRandomInt(1, 5) * 2 + 1;

    // Radius (integer)
    const rVal = getRandomInt(8, 15);
    const rSquared = rVal * rVal;

    // ----------------------------------------------------------------------
    // 2. CALCULATE CONSTANT D
    // ----------------------------------------------------------------------
    // Completing the square terms:
    // (x + b/2)^2  => adds (b/2)^2 to LHS
    // (y + c/2)^2  => adds (c/2)^2 to LHS
    // Equation: (x + b/2)^2 + (y + c/2)^2 = D + (b/2)^2 + (c/2)^2 = r^2
    
    const completeX = Math.pow(bCoeff / 2, 2); // e.g., 2.25
    const completeY = Math.pow(cCoeff / 2, 2); // e.g., 6.25
    
    // Calculate D
    const D = rSquared - completeX - completeY; // Ends in .5
    
    // Format D as a fraction
    // Since D ends in .5, D*2 is an integer.
    const numerator = Math.round(D * 2);
    const DDisplay = `\\frac{${numerator}}{2}`;

    // ----------------------------------------------------------------------
    // 3. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `The graph of $x^{2}+${bCoeff}x+y^{2}+${cCoeff}y=${DDisplay}$ in the $xy$-plane is a circle. What is the length of the circle's radius?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: rVal.toString(),
      explanation: `
        The correct answer is ${rVal}.
        <br/><br/>
        To find the radius, we must complete the square for both the $x$ and $y$ terms to convert the equation into the standard form $(x-h)^2 + (y-k)^2 = r^2$.
        <br/><br/>
        1. <b>Group terms:</b>
        $$ (x^2 + ${bCoeff}x) + (y^2 + ${cCoeff}y) = ${DDisplay} $$
        <br/>
        2. <b>Complete the square for $x$:</b>
        Take half of the coefficient of $x$ ($${bCoeff}$), which is $\\frac{${bCoeff}}{2}$, and square it:
        $$ \\left(\\frac{${bCoeff}}{2}\\right)^2 = ${completeX} $$
        <br/>
        3. <b>Complete the square for $y$:</b>
        Take half of the coefficient of $y$ ($${cCoeff}$), which is $\\frac{${cCoeff}}{2}$, and square it:
        $$ \\left(\\frac{${cCoeff}}{2}\\right)^2 = ${completeY} $$
        <br/>
        4. <b>Add these values to both sides:</b>
        $$ \\left(x + \\frac{${bCoeff}}{2}\\right)^2 + \\left(y + \\frac{${cCoeff}}{2}\\right)^2 = ${DDisplay} + ${completeX} + ${completeY} $$
        <br/>
        Convert ${completeX} and ${completeY} to halves to add to the fraction:
        ${completeX} = $\\frac{${completeX * 2}}{2}$
        ${completeY} = $\\frac{${completeY * 2}}{2}$
        <br/><br/>
        Sum the right side:
        $$ \\frac{${numerator}}{2} + \\frac{${completeX * 2}}{2} + \\frac{${completeY * 2}}{2} = \\frac{${numerator + (completeX * 2) + (completeY * 2)}}{2} $$
        $$ \\frac{${rSquared * 2}}{2} = ${rSquared} $$
        <br/>
        5. <b>Identify radius:</b>
        The equation is now in the form $(x-h)^2 + (y-k)^2 = ${rSquared}$.
        Since $r^2 = ${rSquared}$, the radius $r = \\sqrt{${rSquared}} = ${rVal}$.
      `
    };
  }
};