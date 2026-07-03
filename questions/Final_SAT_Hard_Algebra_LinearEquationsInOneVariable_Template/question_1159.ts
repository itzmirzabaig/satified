import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1159
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [0.8, 0.46, 8, 0.001, 1.9 (decimals)]
 * - Difficulty factors: [Decimal arithmetic, careful distribution]
 * - Distractor patterns: [N/A - fill-in-blank, decimal answer]
 * - Constraints: [Decimal answer to 4 places]
 * - Question type: [Equation→Fill-in-blank]
 * - Figure generation: [None]
 */

export const generator_1159 = {
  metadata: {
    id: "1159",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate decimal equation
    // Form: ax - b = c(x - d) + e
    
    let valid = false;
    let a!: number, b!: number, c!: number, d!: number, e!: number, solution: number, solutionRounded!: string;
    
    while (!valid) {
      a = parseFloat((Math.random() * 1.5 + 0.3).toFixed(1)); // 0.3 to 1.8
      b = parseFloat((Math.random() * 0.8 + 0.1).toFixed(2)); // 0.10 to 0.90
      c = getRandomInt(5, 15);
      d = parseFloat((Math.random() * 0.01).toFixed(3)); // Small decimal
      e = parseFloat((Math.random() * 3 + 0.5).toFixed(1)); // 0.5 to 3.5
      
      // Calculate solution: ax - b = cx - cd + e
      // ax - cx = b - cd + e
      // x(a - c) = b - cd + e
      // x = (b - c*d + e)/(a - c)
      
      const numerator = b - c * d + e;
      const denominator = a - c;
      const solutionRaw = numerator / denominator;
      
      // Ensure reasonable decimal answer
      if (Math.abs(solutionRaw) <= 10 && Math.abs(solutionRaw) >= 0.001) {
        solution = solutionRaw;
        solutionRounded = solution.toFixed(4);
        valid = true;
      }
    }
    
    const explanation = `Applying the distributive property to the right-hand side of the given equation yields $${a}t - ${b} = ${c}t - ${(c * d).toFixed(3)} + ${e}$, or $${a}t - ${b} = ${c}t + ${(e - c * d).toFixed(3)}$. Subtracting $${a}t$ from both sides of this equation yields $-${b} = ${(c - a).toFixed(1)}t + ${(e - c * d).toFixed(3)}$. Adding ${b} to both sides yields $${(e - c * d + b).toFixed(3)} = ${(c - a).toFixed(1)}t$. Dividing both sides by ${(c - a).toFixed(1)} yields $t = ${solutionRounded}$. Therefore, the value of $t$ is approximately ${parseFloat(solutionRounded) < 0 ? parseFloat(solutionRounded).toFixed(3) : parseFloat(solutionRounded).toFixed(3)}.`;
    
    return {
      questionText: `What value of $t$ is the solution to the equation $${a}t - ${b} = ${c}(t - ${d}) + ${e}$?`,
      figureCode: null,
      options: [],
      correctAnswer: parseFloat(solutionRounded) < 0 ? solutionRounded : parseFloat(solutionRounded).toFixed(3),
      explanation: explanation
    };
  }
};
