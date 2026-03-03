import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 154823
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4/5, 1/3, RHS: 1]
 * - Difficulty factors: [Finding x-intercept with fraction coefficients]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Set y=0, solve for x]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_154823 = {
  metadata: {
    // id: "154823",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const num = getRandomInt(2, 7);
    const den = getRandomInt(3, 8);
    const rhs = getRandomInt(1, 4);
    
    // x-intercept: (num/den)*x = rhs => x = rhs*den/num
    const xInt = (rhs * den) / num;
    
    // Ensure it's a nice decimal or fraction
    const answerStr = Number.isInteger(xInt) ? xInt.toString() : (rhs * den).toString() + '/' + num;
    const decimalStr = (rhs * den / num).toFixed(2);
    
    return {
      questionText: `The line with the equation \\( \\frac{${num}}{${den}}x + \\frac{1}{${den + 2}}y = ${rhs} \\) is graphed in the \\( xy \\)-plane. What is the \\( x \\)-coordinate of the \\( x \\)-intercept of the line?`,
      figureCode: null,
      options: null,
      correctAnswer: decimalStr.replace(/\.?0+$/, ''),
      explanation: `Setting $y=0$: $\\frac{${num}}{${den}}x = ${rhs}$, so $x = ${rhs} \\cdot \\frac{${den}}{${num}} = \\frac{${rhs * den}}{${num}}${Number.isInteger(xInt) ? '' : ` \\approx ${decimalStr}`}$.`
    };
  }
};

/**
 * Question ID: 9d0396d4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -7/8, y-intercept: 7, find d when y=4]
 * - Difficulty factors: [Finding x-coordinate given y-value on line]
 * - Distractor patterns: [A: 7/2, B: 26/7, C: 24/7 (correct), D: 27/8]
 * - Constraints: [d = 24/7 when y=4]
 * - Question type: [Figure → Multiple Choice Text]
 * - Figure generation: [Line with y-intercept and x-intercept]
 */