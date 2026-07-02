import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 711
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 5/13, intercept: -23]
 * - Difficulty factors: [Identifying slope from slope-intercept form]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Clean fraction]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_711 = {
  metadata: {
    id: "711",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const num = getRandomInt(2, 10);
    const den = getRandomInt(num + 1, 20);
    const intercept = getRandomInt(-30, -10);
    
    return {
      questionText: `What is the slope of the graph of $y=\\frac{${num} x}{${den}}${intercept}$ in the xy-plane?`,
      figureCode: null,
      options: null,
      correctAnswer: `\\frac{${num}}{${den}}`,
      explanation: `The correct answer is $\\frac{${num}}{${den}}$. The graph of a line in the xy-plane can be represented by the equation $y=mx+b$, where $m$ is the slope of the line and $b$ is the y-coordinate of the y-intercept. The given equation can be written as $y=\\left(\\frac{${num}}{${den}}\\right) x${intercept}$. Therefore, the slope of the graph of this equation in the xy-plane is $\\frac{${num}}{${den}}$. Note that ${num}/${den}, ${(num/den).toFixed(4)}, and ${Math.round(num/den * 1000)/1000} are examples of ways to enter a correct answer.`
    };
  }
};
