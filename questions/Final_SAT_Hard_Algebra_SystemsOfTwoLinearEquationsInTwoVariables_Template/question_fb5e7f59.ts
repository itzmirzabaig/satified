import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: fb5e7f59
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: -1, -w, 2, -w, constants: -337, 47, y=19, answer: 11]
 * - Difficulty factors: [Substitution with given point, solving for parameter w]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [q must be consistent, w must be integer]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_fb5e7f59 = {
  metadata: {
    // id: "fb5e7f59",
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
      
      const w_answer = getRandomInt(5, 15);
      const y_val = getRandomInt(10, 25);
      
      const c1 = -getRandomInt(200, 400);
      const q_val = (c1 + w_answer * y_val) / -1;
      const c2 = 2 * q_val - w_answer * y_val;
      
      if (c2 !== Math.floor(c2)) {
        continue;
      }
      
      const eq1 = `-x - ${w_answer}y = ${c1}`;
      const eq2 = `2x - ${w_answer}y = ${c2}`;
      
      result = {
        questionText: `In the given system of equations, $w$ is a constant. In the xy-plane, the graphs of these equations intersect at the point $(q, ${y_val})$, where $q$ is a constant. What is the value of $w$? $$${eq1}$$ $$${eq2}$$`,
        figureCode: null,
        options: null,
        correctAnswer: w_answer.toString(),
        explanation: `Substituting the point $(q, ${y_val})$ into both equations gives $-q - ${w_answer}(${y_val}) = ${c1}$ and $2q - ${w_answer}(${y_val}) = ${c2}$. From the first equation, $q = ${q_val}$. Substituting into the second: $2(${q_val}) - ${w_answer}(${y_val}) = ${c2}$, which confirms $w = ${w_answer}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

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