import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9f70fd47
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3/7, -5/9, constant: 21]
 * - Difficulty factors: [Finding y-intercept with fraction coefficients]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Set x=0, solve for y]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_9f70fd47 = {
  metadata: {
    // id: "9f70fd47",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const num1 = getRandomInt(2, 5);
    const den1 = getRandomInt(5, 9);
    const num2 = getRandomInt(3, 7);
    const den2 = getRandomInt(7, 11);
    const c = getRandomInt(15, 30);
    
    // y-intercept: -5y/9 + 21 = 0 => -5y/9 = -21 => y = 21*9/5 = 189/5
    // General: (num2/den2)*y = c => y = c*den2/num2
    
    const yInt = (c * den2) / num2;
    const num = c * den2;
    const den = num2;
    
    // Simplify if possible
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(num, den);
    
    const answerStr = den / divisor === 1 ? (num / divisor).toString() : `\\frac{${num / divisor}}{${den / divisor}}`;
    
    return {
      questionText: `What is the y-coordinate of the y-intercept of the graph of \\( \\frac{${num1} x}{${den1}}=-\\frac{${num2} y}{${den2}}+${c} \\) in the xy-plane?`,
      figureCode: null,
      options: null,
      correctAnswer: answerStr,
      explanation: `Setting $x=0$: $0 = -\\frac{${num2}y}{${den2}} + ${c}$, so $\\frac{${num2}y}{${den2}} = ${c}$, giving $y = \\frac{${c} \\cdot ${den2}}{${num2}} = \\frac{${num}}{${den}}${den / divisor === 1 ? '' : ` = \\frac{${num / divisor}}{${den / divisor}}`}$.`
    };
  }
};

/**
 * Question ID: a1fd2304
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [25% solution, 10% solution, 3 liters, target 15%]
 * - Difficulty factors: [Mixture problem with percentages]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [0.25x + 0.10(3) = 0.15(x+3)]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */