import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1175
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4/5, 1/3, RHS: 1]
 * - Difficulty factors: [Finding x-intercept with fraction coefficients]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Set y=0, solve for x]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_1175 = {
  metadata: {
    id: "1175",
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
