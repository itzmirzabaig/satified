import { getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: fb58c0db
 * Skill: Circles (Arc Length Fraction)
 * Difficulty: Hard
 * 
 * Description: Calculate what fraction of the circumference an arc represents.
 * Fixes:
 * - Corrected LaTeX escape sequences (changed `\\\\` to `\\`).
 * - Improved math mode delimiters.
 */
export const generator_fb58c0db = {
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
    // Arc length = (num/den) * pi
    const num = getRandomElement([1, 2, 3, 4, 5]);
    const den = getRandomElement([3, 4, 5, 6]); 
    
    // ----------------------------------------------------------------------
    // 2. CALCULATE FRACTION
    // ----------------------------------------------------------------------
    // Radius = 1
    // Circumference = 2 * pi * r = 2 * pi
    
    // Fraction = ArcLength / Circumference
    // Fraction = (num * pi / den) / (2 * pi)
    // Fraction = num / (2 * den)
    
    const fracNum = num;
    const fracDen = 2 * den;
    
    // Simplify fraction
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const common = gcd(fracNum, fracDen);
    
    const finalNum = fracNum / common;
    const finalDen = fracDen / common;
    
    // Format Answer
    const answer = finalDen === 1 ? `${finalNum}` : `\\frac{${finalNum}}{${finalDen}}`;
    
    // Format Arc Length for Question
    const arcLengthLatex = `\\frac{${num}\\pi}{${den}}`;

    // ----------------------------------------------------------------------
    // 3. RETURN DATA
    // ----------------------------------------------------------------------
    return {
      questionText: `Points $A$ and $B$ lie on a circle with radius $1$, and arc $AB$ has length $${arcLengthLatex}$. What fraction of the circumference of the circle is the length of arc $AB$?`,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: answer,
      explanation: `
        The correct answer is ${answer}.
        <br/><br/>
        1. <b>Calculate the circumference:</b>
        The formula for the circumference of a circle is $C = 2\\pi r$.
        Given the radius $r = 1$:
        $$ C = 2\\pi(1) = 2\\pi $$
        <br/>
        2. <b>Set up the fraction:</b>
        We need to find the ratio of the arc length to the circumference.
        $$ \\text{Fraction} = \\frac{\\text{Arc Length}}{\\text{Circumference}} $$
        $$ \\text{Fraction} = \\frac{${arcLengthLatex}}{2\\pi} $$
        <br/>
        3. <b>Simplify the expression:</b>
        $$ \\frac{${num}\\pi}{${den}} \\div 2\\pi = \\frac{${num}\\pi}{${den} \\times 2\\pi} $$
        Cancel $\\pi$ from numerator and denominator:
        $$ \\frac{${num}}{${den} \\times 2} = \\frac{${num}}{${2 * den}} $$
        <br/>
        Simplify the fraction $\\frac{${fracNum}}{${fracDen}}$:
        $$ ${answer} $$
      `
    };
  }
};