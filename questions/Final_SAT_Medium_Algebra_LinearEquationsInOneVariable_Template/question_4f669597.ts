import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 4f669597
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 8, 5, constants: 1, -1, 8]
 * - Difficulty factors: [Distributing, combining like terms]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Standard linear equation solving]
 * - Question type: [Fill-in-the-blank]
 */

export const generator_4f669597 = {
  metadata: {
    // id: "4f669597",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation: a(p+b) + c(p+d) = e*p
    // Expand: ap + ab + cp + cd = ep
    // (a+c-e)p = -(ab+cd)
    
    const a = getRandomInt(2, 4);
    const b = getRandomInt(1, 3);
    const c = getRandomInt(5, 10);
    const d = getRandomInt(-3, -1);
    const e = getRandomInt(3, 8);
    
    // Calculate answer
    const leftCoeff = a + c;
    const constant = a * b + c * d;
    const pCoeff = leftCoeff - e;
    
    // Ensure we get a clean decimal
    const numerator = -constant;
    const answer = numerator / pCoeff;
    
    const correctAnswer = answer.toFixed(1);
    
    return {
      questionText: `\\( ${a}(p+${b})+${c}(p${d})=${e}p \\)\n\nWhat value of \\( p \\) is the solution of the equation above?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The correct answer is ${correctAnswer}. Distributing gives \\( ${a}p+${a*b}+${c}p${c*d}=${e}p \\). Combining like terms: \\(${(a+c)}p${constant > 0 ? '+' : ''}${constant}=${e}p\\). Subtracting \\( ${e}p \\) from both sides and subtracting ${constant} from both sides yields \\(${pCoeff}p=${-constant}\\), so \\(p=\\frac{${-constant}}{${pCoeff}}=${correctAnswer}\\).`
    };
  }
};

/**
 * Question ID: ce314070
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 4, constant: -1/2, right side: -5]
 * - Difficulty factors: [Manipulating equation to target expression, working with fractions]
 * - Distractor patterns: [A is wrong sign, B is miscalculation, C is half of right side]
 * - Constraints: [Target expression 8x-1 is exactly 2×(4x - 1/2)]
 * - Question type: [Multiple Choice Text]
 */