import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 1362ccde
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 15/4, constants: 1, -8/4=-2]
 * - Difficulty factors: [Substitution method, finding x-y instead of individual values]
 * - Distractor patterns: [None - fill in blank, but calculation is complex]
 * - Constraints: [Solution must be integers for clean x-y value]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two intersecting lines with intersection point marked]
 */

export const generator_1362ccde = {
  metadata: {
    // id: "1362ccde",
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
      
      const m1 = getRandomInt(2, 5);
      const b1 = getRandomInt(1, 5);
      
      const m2_num = getRandomInt(2, 5);
      const m2_den = getRandomInt(2, 4);
      const m2 = m2_num / m2_den;
      const b2 = getRandomInt(-5, 5);
      
      const x_num = (b2 - b1) * m2_den;
      const x_den = m1 * m2_den - m2_num;
      
      if (x_den === 0 || x_num % x_den !== 0) {
        continue;
      }
      
      const x_sol = x_num / x_den;
      const y_sol = m1 * x_sol + b1;
      
      const answer = x_sol - y_sol;
      
      const eq1 = `${m2_den}y = ${m2_num}x ${b2 >= 0 ? '-' : '+'} ${Math.abs(b2)}`;
      
      // Fix double sign issue
      const signB1 = b1 >= 0 ? '+' : '-';
      const eq2 = `y = ${m1}x ${signB1} ${Math.abs(b1)}`;
      
      // Calculate viewBox
      const xMin = Math.floor(Math.min(x_sol, 0)) - 2;
      const xMax = Math.ceil(Math.max(x_sol, 15)) + 2;
      const yMin = Math.floor(Math.min(y_sol, -50)) - 5;
      const yMax = Math.ceil(Math.max(y_sol, 10)) + 5;
      
      result = {
        questionText: `The solution to the given system of equations is $(x, y)$. What is the value of $x-y$? $$${eq1}$$ $$${eq2}$$`,
        figureCode: null,
        options: null,
        correctAnswer: answer.toString(),
        explanation: `Substituting $y = ${m1}x ${signB1} ${Math.abs(b1)}$ into ${eq1} gives ${m2_den}(${m1}x ${signB1} ${Math.abs(b1)}) = ${m2_num}x ${b2 >= 0 ? '-' : '+'} ${Math.abs(b2)}$. Simplifying yields $x = ${x_sol}$ and $y = ${y_sol}$. Therefore, $x - y = ${x_sol} - ${y_sol} = ${answer}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: 52cb8ea4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 7/5, -4/5, 4/8=1/2, -9/8]
 * - Difficulty factors: [Clever elimination without solving individually, 3x+3y directly]
 * - Distractor patterns: [Sign errors, solving individually then adding]
 * - Constraints: [Subtracting equations must give clean 3x+3y value]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two intersecting lines]
 */