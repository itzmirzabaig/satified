import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1163
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [-2, 3, 38 (small integers)]
 * - Difficulty factors: [Simple linear equation solving]
 * - Distractor patterns: [N/A - fill-in-blank]
 * - Constraints: [Integer answer]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 * 
 * Note: Original seems to be -2(t + 3) = 38, solution t = -22
 */

export const generator_1163 = {
  metadata: {
    id: "1163",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate simple linear equation
    // Form: a(t + b) = c where a is negative, c is positive
    
    let valid = false;
    let a: number, b: number, c: number, t: number;
    
    while (!valid) {
      a = getRandomInt(-5, -2);
      b = getRandomInt(2, 8);
      c = getRandomInt(20, 60);
      
      // Calculate solution: t = c/a - b
      t = c / a - b;
      
      // Ensure integer solution
      if (Number.isInteger(t)) {
        valid = true;
      }
    }
    
    const explanation = `The given equation can be rewritten as $${a}(t + ${b}) = ${c}$. Dividing both sides of this equation by ${a} yields $t + ${b} = ${c/a}$. Subtracting ${b} from both sides of this equation yields $t = ${c/a} - ${b} = ${t}$. Therefore, ${t} is the value of $t$ that is the solution to the given equation.`;
    
    return {
      questionText: `What value of $t$ is the solution to the equation $${a}(t + ${b}) = ${c}$?`,
      figureCode: null,
      options: null,
      correctAnswer: t.toString(),
      explanation: explanation
    };
  }
};
