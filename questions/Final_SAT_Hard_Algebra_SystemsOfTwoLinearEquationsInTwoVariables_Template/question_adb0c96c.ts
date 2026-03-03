import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: adb0c96c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 24, 1, 6, 1, constants: 48, 72]
 * - Difficulty factors: [Large coefficients, subtraction elimination]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Solution must be clean integer]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two lines intersecting, point marked]
 */

export const generator_adb0c96c = {
  metadata: {
    // id: "adb0c96c",
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
      
      const a1 = getRandomInt(15, 30);
      const a2 = getRandomInt(5, 10);
      const c1 = getRandomInt(40, 60);
      const c2 = getRandomInt(60, 90);
      
      const x_num = c1 - c2;
      const x_den = a1 - a2;
      
      if (x_den === 0 || x_num % x_den !== 0) {
        continue;
      }
      
      const x_sol = x_num / x_den;
      const y_sol = c1 - a1 * x_sol;
      
      // Calculate viewBox
      const xMin = -5;
      const xMax = 5;
      const yMin = Math.floor(y_sol / 10) * 10 - 10;
      const yMax = Math.ceil(y_sol / 10) * 10 + 10;
  
      
      const eq1 = `${a1}x + y = ${c1}`;
      const eq2 = `${a2}x + y = ${c2}`;
      
      result = {
        questionText: `The solution to the given system of equations is $(x, y)$. What is the value of $y$? $$${eq1}$$ $$${eq2}$$`,
        figureCode: null,
        options: null,
        correctAnswer: y_sol.toString(),
        explanation: `Subtracting the second equation from the first gives $${a1 - a2}x = ${c1 - c2}$, so $x = ${x_sol}$. Substituting back into the second equation: $${a2}(${x_sol}) + y = ${c2}$, which gives $y = ${y_sol}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: d7bf55e1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [prices: $12, $8, total tickets: 30, total cost: $300, answer: $180]
 * - Difficulty factors: [Word problem, system setup, answer asks for total not quantity]
 * - Distractor patterns: [Number of adult tickets instead of total cost, number of child tickets]
 * - Constraints: [System must have integer solution]
 * - Question type: [Figure+Table→Fill in blank]
 * - Figure generation: [Intersection showing the solution]
 */