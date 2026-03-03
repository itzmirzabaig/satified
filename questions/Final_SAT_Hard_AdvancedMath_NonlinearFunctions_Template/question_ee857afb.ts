import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: ee857afb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient implied: x² - 14x + 22]
 * - Difficulty factors: [Completing the square or vertex formula for minimum]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Minimum at x = -b/(2a)]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_ee857afb = {
  metadata: {
    // id: "ee857afb",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const b = -getRandomInt(10, 20);
    const c = getRandomInt(10, 30);
    const vertexX = -b / 2;
    
    return {
      questionText: `The given equation relates the variables $x$ and $y$: $y=x^2${b}x+${c}$. For what value of $x$ does the value of $y$ reach its minimum?`,
      figureCode: null,
      options: null,
      correctAnswer: vertexX.toString(),
      explanation: `The minimum occurs at $x=-\\frac{b}{2a}=-\\frac{${b}}{2}=${vertexX}$.`
    };
  }
};

/**
 * Question ID: 35e05e19
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 11, length: x, width: x-1]
 * - Difficulty factors: [Volume formula, algebraic modeling]
 * - Distractor patterns: [A: 11x(x-1), B: 11x(x+1), C/D: incorrect dimension placement]
 * - Constraints: [V = height × length × width]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */