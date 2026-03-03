import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f5aa5040
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [line: 2y=c, parabola: y=-2x²+9x, discriminant for one intersection]
 * - Difficulty factors: [Horizontal line, parabola intersection, discriminant = 0 condition]
 * - Distractor patterns: [N/A - fill in blank, accepts fraction or decimal]
 * - Constraints: [Line is horizontal, parabola opens down, find c for single intersection]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_f5aa5040 = {
  metadata: {
    // id: "f5aa5040",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: 2y=c, y=-2x²+9x, find c
    // Pattern: lineCoeff*y = c, parabola y = -a*x² + bx
    
    const lineCoeff = getRandomInt(2, 4);
    const parabolaA = getRandomInt(1, 4);
    const parabolaB = getRandomInt(5, 12);
    
    // y = c/lineCoeff intersects y = -ax² + bx
    // Substituting: c/lineCoeff = -ax² + bx
    // ax² - bx + c/lineCoeff = 0
    
    // For one solution: discriminant = b² - 4a(c/lineCoeff) = 0
    // b² = 4ac/lineCoeff → c = b²*lineCoeff/(4a)
    
    const cNumerator = parabolaB * parabolaB * lineCoeff;
    const cDenominator = 4 * parabolaA;
    
    // Simplify
    const gcd = (m: number, n: number): number => n === 0 ? m : gcd(n, m % n);
    const commonFactor = gcd(cNumerator, cDenominator);
    const simplifiedNum = cNumerator / commonFactor;
    const simplifiedDen = cDenominator / commonFactor;
    
    let cValue: string;
    if (simplifiedDen === 1) {
      cValue = simplifiedNum.toString();
    } else {
      cValue = `${simplifiedNum}/${simplifiedDen}`;
    }
    
    const decimalValue = (simplifiedNum / simplifiedDen).toFixed(2);
    
    // STEP 2: No figure needed
    const figureCode = null;
    
    return {
      questionText: `In the xy-plane, a line with equation $${lineCoeff}y=c$ for some constant $c$ intersects a parabola at exactly one point. If the parabola has equation $y=-${parabolaA}x^2+${parabolaB}x$, what is the value of $c$?`,
      figureCode: figureCode,
      options: null,
      correctAnswer: cValue, // Accepts fraction or decimal equivalent
      explanation: `The correct answer is $${cValue}$ (or ${decimalValue}). From the line, $y=\\frac{c}{${lineCoeff}}$. Substituting into the parabola: $\\frac{c}{${lineCoeff}}=-${parabolaA}x^2+${parabolaB}x$, giving $${parabolaA}x^2-${parabolaB}x+\\frac{c}{${lineCoeff}}=0$. For exactly one solution, the discriminant equals 0: $(-${parabolaB})^2-4(${parabolaA})(\\frac{c}{${lineCoeff}})=0$, so $${parabolaB*parabolaB}=\\frac{${4*parabolaA}c}{${lineCoeff}}$, thus $c=\\frac{${parabolaB*parabolaB*lineCoeff}}{${4*parabolaA}}=${cValue}$.`
    };
  }
};

/**
 * Question ID: d0a53ef5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radical equation √3x+34 = x-2, solutions 10 and -3]
 * - Difficulty factors: [Radical equation, squaring both sides, checking extraneous solutions]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must check for extraneous solutions, find smallest valid solution]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/d0a53ef5.ts