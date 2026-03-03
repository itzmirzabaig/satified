import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: cbc4c163
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Quadratic function vertex evaluation
 * - Number ranges: Coefficient 5, inner term (1/4 - x)², constant 11/4
 * - Difficulty: Medium - evaluating at vertex x-value
 */

export const generator_cbc4c163 = {
  metadata: {
    // id: "cbc4c163",
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
    
    const questionText = `The function $f$ is defined by $f(x)=${a}\\left(\\frac{${hFractionNum}}{${hFractionDen}}-x\\right)^{2}+\\frac{${kNum}}{${kDen}}$. What is the value of $f\\left(\\frac{${hFractionNum}}{${hFractionDen}}\\right)$?`;
    
    const correctAnswer = `\\frac{${kNum}}{${kDen}}`;
    
    const explanation = `To find $f\\left(\\frac{${hFractionNum}}{${hFractionDen}}\\right)$, substitute $x = \\frac{${hFractionNum}}{${hFractionDen}}$: $f\\left(\\frac{${hFractionNum}}{${hFractionDen}}\\right) = ${a}\\left(\\frac{${hFractionNum}}{${hFractionDen}} - \\frac{${hFractionNum}}{${hFractionDen}}\\right)^{2} + \\frac{${kNum}}{${kDen}} = ${a}(0)^{2} + \\frac{${kNum}}{${kDen}} = \\frac{${kNum}}{${kDen}}$.`;
    
    return {
      questionText,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer,
      explanation
    };
  }
};

/**
 * Question ID: f1c81b3b
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential function find parameter then evaluate
 * - Number ranges: Coefficient 19, g(3)=2375, find g(4)
 * - Difficulty: Medium - solving for base then evaluating
 */