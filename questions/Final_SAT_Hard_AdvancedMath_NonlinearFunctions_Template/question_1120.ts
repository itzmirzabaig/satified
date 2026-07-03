import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1120
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 4x² - 50x + 126]
 * - Difficulty factors: [Completing the square, vertex x-coordinate]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Answer is 25/4 or 6.25]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_1120 = {
  metadata: {
    id: "1120",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const a = getRandomInt(2, 6);
    const b = -getRandomInt(30, 70);
    const c = getRandomInt(50, 150);
    
    const vertexX = -b / (2 * a);
    const isInteger = Number.isInteger(vertexX);
    
    return {
      questionText: `The function $f$ is defined by $f(x)=${a}x^2${b}x+${c}$. For what value of $x$ does $f(x)$ reach its minimum?`,
      figureCode: null,
      options: [],
      correctAnswer: isInteger ? vertexX.toString() : `${(-b).toString()}/${(2*a).toString()}`,
      explanation: `The minimum occurs at $x=-\\frac{b}{2a}=-\\frac{${b}}{${2*a}}=${isInteger ? vertexX : `\\frac{${-b}}{${2*a}}`}$.`
    };
  }
};
