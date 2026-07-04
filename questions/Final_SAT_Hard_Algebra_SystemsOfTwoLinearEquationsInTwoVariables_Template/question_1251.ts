import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1251
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 7/8, 5/8, 4/7, 5/4, 7/4, 15/4, answer: 7/2]
 * - Difficulty factors: [Complex fraction clearing, no solution condition]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [p must make lines parallel]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_1251 = {
  metadata: {
    id: "1251",
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
      
      // eq1: (b/d)y - (a/d)x = c_num/c_den - (b/d)y  ->  (2b/d)y - (a/d)x = c_num/c_den
      //   times d:  -a x + 2b y = d*c_num/c_den
      // eq2: (a/2)x + c1/2 = p y + c2/2  ->  (a/2)x - p y = (c2-c1)/2
      //   times 2:  a x - 2p y = c2 - c1
      // No solution: coefficient ratios equal (-a/a = 2b/-2p = -1) => p = b,
      // provided the constant ratio differs (guaranteed: LHS c_num/c_den is a
      // non-integer/ fractional constant while the eq2 constant is an integer).
      const p_answer = b_num;

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
        options: [],
        correctAnswer: `${p_answer}`,
        explanation: `Combine like terms and clear fractions. The first equation $\\frac{${eq1_left_y}}{${a_den}}y - \\frac{${eq1_x}}{${a_den}}x = \\frac{${eq1_c_num}}{${eq1_c_den}} - \\frac{${eq1_left_y}}{${a_den}}y$ gives $\\frac{${2 * eq1_left_y}}{${a_den}}y - \\frac{${eq1_x}}{${a_den}}x = \\frac{${eq1_c_num}}{${eq1_c_den}}$, and multiplying by $${a_den}$ yields $-${eq1_x}x + ${2 * eq1_left_y}y = \\frac{${a_den * eq1_c_num}}{${eq1_c_den}}$. The second equation $\\frac{${eq2_x}}{2}x + \\frac{${eq2_c1}}{2} = py + \\frac{${eq2_c2}}{2}$ gives $\\frac{${eq2_x}}{2}x - py = \\frac{${eq2_c2 - eq2_c1}}{2}$, and multiplying by $2$ yields $${eq2_x}x - 2py = ${eq2_c2 - eq2_c1}$. A system has no solution when the two lines are parallel, so the coefficients of $x$ and $y$ are proportional: $\\frac{-${eq1_x}}{${eq2_x}} = \\frac{${2 * eq1_left_y}}{-2p}$. Since $\\frac{-${eq1_x}}{${eq2_x}} = -1$, this gives $-1 = \\frac{${2 * eq1_left_y}}{-2p}$, so $2p = ${2 * eq1_left_y}$ and $p = ${p_answer}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};
