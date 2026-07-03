import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 597
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Quadratic function vertex evaluation
 * - Number ranges: Coefficient 5, inner term (1/4 - x)², constant 11/4
 * - Difficulty: Medium - evaluating at vertex x-value
 */

export const generator_597 = {
  metadata: {
    id: "597",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(2, 8);
    const h = getRandomInt(2, 6);
    const k = getRandomInt(3, 10);
    const kNum = k; // numerator
    const kDen = 4; // denominator
    
    // Create fraction representation
    const hFractionNum = 1;
    const hFractionDen = h;
    
    const questionText = `The function $f$ is defined by $f(x)=${a}\\left(\\frac{${hFractionNum}}{${hFractionDen}}-x\\right)^{2}+\\frac{${kNum}}{${kDen}}$. What is the value of $f\\left(\\frac{${hFractionNum}}{${hFractionDen}}\\right)$? (If the answer is not a whole number, it may be entered as a fraction or a decimal.)`;

    // Fill-in answer must be a plain number or a/b fraction — reduce k/4.
    const gcd = (x: number, y: number): number => (y === 0 ? Math.abs(x) : gcd(y, x % y));
    const g = gcd(kNum, kDen);
    const ansNum = kNum / g;
    const ansDen = kDen / g;
    const correctAnswer = ansDen === 1 ? `${ansNum}` : `${ansNum}/${ansDen}`;

    const explanation = `To find $f\\left(\\frac{${hFractionNum}}{${hFractionDen}}\\right)$, substitute $x = \\frac{${hFractionNum}}{${hFractionDen}}$: $f\\left(\\frac{${hFractionNum}}{${hFractionDen}}\\right) = ${a}\\left(\\frac{${hFractionNum}}{${hFractionDen}} - \\frac{${hFractionNum}}{${hFractionDen}}\\right)^{2} + \\frac{${kNum}}{${kDen}} = ${a}(0)^{2} + \\frac{${kNum}}{${kDen}} = \\frac{${kNum}}{${kDen}}$. This value can be entered as ${correctAnswer}.`;

    return {
      questionText,
      figureCode: null,
      options: [], // Fill-in-the-blank
      correctAnswer,
      explanation
    };
  }
};
