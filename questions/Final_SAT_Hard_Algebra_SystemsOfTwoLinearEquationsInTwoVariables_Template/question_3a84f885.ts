import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 3a84f885
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients in grouped form, answer: 1677]
 * - Difficulty factors: [Clever addition without solving, recognizing pattern]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Pattern must give integer answer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_3a84f885 = {
  metadata: {
    // id: "3a84f885",
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
      
      const a = getRandomInt(2, 5);
      const b = getRandomInt(2, 5);
      const target = getRandomInt(1000, 2000);
      
      const halfTarget = target / 3;
      const inner = halfTarget / 2;
      
      if (inner !== Math.floor(inner)) {
        continue;
      }
      
      const c1 = getRandomInt(1, 5);
      const c2 = getRandomInt(5, 10);
      
      const val1 = getRandomInt(100, 200);
      const val2 = 2 * (target / 3) - val1;
      
      const eq1 = `(x - ${c1}) + (-${b})(y + ${c2}) = ${val1}`;
      const eq2 = `(x - ${c1}) + ${b}(y + ${c2}) = ${val2}`;
      
      result = {
        questionText: `The solution to the given system of equations is $(x, y)$. What is the value of $${3 * a}(x - ${c1})$? $$${eq1}$$ $$${eq2}$$`,
        figureCode: null,
        options: null,
        correctAnswer: (3 * (val1 + val2) / 2).toString(),
        explanation: `Adding the two equations eliminates the $y$ terms: $2(x - ${c1}) = ${val1} + ${val2} = ${val1 + val2}$. Therefore, $${3 * a}(x - ${c1}) = ${3 * a} \\\\times \\frac{${val1 + val2}}{2} = ${3 * (val1 + val2) / 2}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: 75012ee7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equations: 2x+3y=7, equivalent multiple, parametric solutions]
 * - Difficulty factors: [Equivalent equations, parametric form identification]
 * - Distractor patterns: [Wrong coordinate order, wrong parameter placement]
 * - Constraints: [Equations must be equivalent]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */