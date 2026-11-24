import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1147
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient implied: x² - 14x + 22]
 * - Difficulty factors: [Completing the square or vertex formula for minimum]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Minimum at x = -b/(2a)]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1147 = {
  metadata: {
    id: "1147",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const b = -getRandomInt(10, 20);
    const c = getRandomInt(10, 30);
    const vertexX = -b / 2;
    
    // Fixed: the explanation used a and b without defining them, skipped why the
    // vertex is a minimum, and did not open with the correct answer.
    return {
      questionText: `The equation $y=x^2${b}x+${c}$ relates the variables $x$ and $y$. For what value of $x$ does $y$ reach its minimum value?`,
      figureCode: null,
      options: [],
      correctAnswer: vertexX.toString(),
      explanation: `The correct answer is ${vertexX}. The graph of this equation is a parabola that opens upward because the coefficient of $x^2$ is positive, so $y$ reaches its minimum value at the vertex. For a quadratic in the form $y=px^2+qx+r$, the $x$-coordinate of the vertex is $-\\frac{q}{2p}$. Here $p=1$ and $q=${b}$, so $x=-\\frac{${b}}{2(1)}=${vertexX}$.`
    };
  }
};
