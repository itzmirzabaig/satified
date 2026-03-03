import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 59352689
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 7/8, 5/8, 4/7, 5/4, 7/4, 15/4, answer: 7/2]
 * - Difficulty factors: [Complex fraction clearing, no solution condition]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [p must make lines parallel]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_59352689 = {
  metadata: {
    // id: "59352689",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;
    
    while (attempts < maxAttempts && !result) {
      attempts++;
      
      const a_num = getRandomInt(3, 6);
      const a_den = getRandomInt(4, 8);
      const b_num = getRandomInt(2, 5);
      const c_num = getRandomInt(2, 6);
      const c_den = getRandomInt(3, 7);
      
      const mult = getRandomInt(2, 4);
      const A1 = a_num;
      const B1 = mult * a_num;
      const den1 = a_den;
      
      const A2 = getRandomInt(2, 5);
      const B2 = A2 * mult;
      
      const C1 = c_num;
      const C2 = C1 * den1 * A2 / A1;
      
      if (C2 !== Math.floor(C2)) {
        continue;
      }
      
      const p_answer_num = b_num;
      const p_answer_den = 2;
      
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const pg = gcd(p_answer_num, p_answer_den);
      
      const eq1_left_y = b_num;
      const eq1_x = a_num;
      const eq1_c_num = c_num;
      const eq1_c_den = c_den;
      
      const eq2_x = a_num;
      const eq2_c1 = getRandomInt(5, 10);
      const eq2_c2 = eq2_c1 + getRandomInt(2, 5);
      
      const eq1 = `\\frac{${eq1_left_y}}{${a_den}}y - \\frac{${eq1_x}}{${a_den}}x = \\frac{${eq1_c_num}}{${eq1_c_den}} - \\frac{${eq1_left_y}}{${a_den}}y`;
      const eq2 = `\\frac{${eq2_x}}{2}x + \\frac{${eq2_c1}}{2} = py + \\frac{${eq2_c2}}{2}`;
      
      result = {
        questionText: `In the given system of equations, $p$ is a constant. If the system has no solution, what is the value of $p$? $$${eq1}$$ $$${eq2}$$`,
        figureCode: null,
        options: null,
        correctAnswer: `${p_answer_num/pg}/${p_answer_den/pg}`,
        explanation: `Clearing fractions, the first equation becomes $-${eq1_x}x + ${2 * eq1_left_y}y = C_1$ and the second becomes $${eq2_x}x - 4py = ${eq2_c2 - eq2_c1}$. For no solution, the ratios of coefficients must be equal: $\\frac{-${eq1_x}}{${eq2_x}} = \\frac{${2 * eq1_left_y}}{-4p}$. This gives $-1 = \\frac{${2 * eq1_left_y}}{-4p}$, so $p = \\frac{${p_answer_num/pg}}{${p_answer_den/pg}}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: 14360f84
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, -18, -4, h, constants: 5, 2, answer: 18]
 * - Difficulty factors: [No solution, identifying h for parallel lines]
 * - Distractor patterns: [Sign errors, calculation errors]
 * - Constraints: [h must make y-coefficients proportional with x-coefficients]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */