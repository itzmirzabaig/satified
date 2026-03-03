import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 571174f3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 2/5, 7/5, 2/7, 5/2]
 * - Difficulty factors: [Infinitely many solutions condition, ratio of parameters]
 * - Distractor patterns: [None - fill in blank, but need fraction format]
 * - Constraints: [Coefficients must be proportional: A1/A2 = B1/B2 = C1/C2]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_571174f3 = {
  metadata: {
    // id: "571174f3",
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
      
      const num = getRandomInt(2, 5);
      const den = getRandomInt(3, 8);
      const c1_num = getRandomInt(1, 5);
      const c1_den = getRandomInt(2, 8);
      
      const mult = getRandomInt(2, 4);
      const A1 = num;
      const B1 = mult * num;
      const den1 = den;
      
      const A2 = getRandomInt(2, 5);
      const B2 = A2 * mult;
      
      const C1 = c1_num;
      const C2 = C1 * den1 * A2 / A1;
      
      if (C2 !== Math.floor(C2)) {
        continue;
      }
      
      const g_val = A1;
      const k_val = den1 * A2;
      
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const g_gcd = gcd(g_val, k_val);
      
      const g_final = g_val / g_gcd;
      const k_final = k_val / g_gcd;
      
      result = {
        questionText: `In the given system of equations, $g$ and $k$ are constants. The system has infinitely many solutions. What is the value of $\\frac{g}{k}$? $$\\frac{${A1}}{${den1}}x + \\frac{${B1}}{${den1}}y = \\frac{${C1}}{${c1_den}}$$ $$${A2}x + ${B2}y = \\frac{${C2}}{1}$$`,
        figureCode: null,
        options: null,
        correctAnswer: `${g_final}/${k_final}`,
        explanation: `For infinitely many solutions, the equations must represent the same line, meaning all coefficients are proportional. The ratio of x-coefficients is $\\frac{${A1}/${den1}}{${A2}} = \\frac{${g_final}}{${k_final}}$, which equals the ratio of y-coefficients $\\frac{${B1}/${den1}}{${B2}} = \\frac{${B1}}{${den1 * B2}} = \\frac{${g_final}}{${k_final}}$. Therefore, $\\frac{g}{k} = \\frac{${g_final}}{${k_final}}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: 979c6ebc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [same line system, parametric point form]
 * - Difficulty factors: [Equivalent equations recognition, parametric representation]
 * - Distractor patterns: [Swapped coordinates, wrong slope sign, wrong constant]
 * - Constraints: [Equations must be equivalent (one is multiple of other)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */