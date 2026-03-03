import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: ff501705
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 3/2, 1/4, 2/3, 1/2, fractions with p]
 * - Difficulty factors: [Complex fraction manipulation, no solution condition (parallel lines)]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [After clearing fractions, coefficients must be proportional but constants not]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_ff501705 = {
  metadata: {
    // id: "ff501705",
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
      
      const finalA1 = getRandomInt(2, 5);
      const finalB1 = getRandomInt(3, 8) * finalA1;
      const finalC1 = getRandomInt(10, 30);
      
      const ratio = getRandomInt(2, 4);
      const finalA2 = finalA1 * ratio;
      const finalB2 = finalB1 * ratio;
      const finalC2 = finalC1 * ratio + getRandomInt(1, 5);
      
      // Work backwards to complex fraction form
      const b_half = finalB1 / 2;
      const a_quarter = finalA1 / 4;
      const c_twelfth = finalC1 / 12;
      
      // Check if c_twelfth is clean
      if (c_twelfth !== Math.floor(c_twelfth)) {
        continue;
      }
      
      const p_value = -finalB2 / 2;
      
      const eq2_const1 = getRandomInt(5, 10);
      const eq2_const2 = finalC2 * 2 - eq2_const1;
      
      const eq1_text = `\\frac{${b_half * 2}}{2}y - \\frac{${finalA1}}{4}x = \\frac{${finalC1}}{12} - \\frac{${b_half * 2}}{2}y`;
      const eq2_text = `\\frac{${finalA2}}{2}x + \\frac{${eq2_const1}}{2} = ${p_value}y + \\frac{${eq2_const2}}{2}`;
      
      result = {
        questionText: `In the given system of equations, $p$ is a constant. If the system has no solution, what is the value of $p$? $$${eq1_text}$$ $$${eq2_text}$$`,
        figureCode: null,
        options: null,
        correctAnswer: p_value.toString(),
        explanation: `For no solution, the lines must be parallel (same slope) but distinct. Converting to standard form, the first equation becomes $${finalA1}x + ${finalB1}y = ${finalC1}$ and the second becomes $${finalA2}x ${finalB2 >= 0 ? '+' : ''}${finalB2}y = ${finalC2}$. The ratio of x-coefficients is $\\frac{${finalA2}}{${finalA1}} = ${ratio}$, so the y-coefficients must also have ratio ${ratio}. This gives $\\frac{p}{${finalB1}} = ${ratio}$, so $p = ${p_value}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: 1b1deebe
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: ax+by=72, 6x+2by=56, intersection at (4,y)]
 * - Difficulty factors: [System with parameters, elimination with constraint]
 * - Distractor patterns: [Calculation errors, wrong substitution]
 * - Constraints: [x=4 must satisfy both equations after finding a]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */