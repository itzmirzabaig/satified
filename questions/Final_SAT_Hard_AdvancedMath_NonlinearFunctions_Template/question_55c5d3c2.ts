import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 55c5d3c2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y-int (0,-25), point (2,23), a > 0]
 * - Difficulty factors: [Exponential system, solving for two parameters]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield integer a and integer answer for a+b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_55c5d3c2 = {
  metadata: {
    // id: "55c5d3c2",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // f(0) = 1 + b = y_int, so b = y_int - 1
    // f(2) = a² + b = y_point, so a² = y_point - b = y_point - y_int + 1
    
    const a = getRandomInt(3, 12);
    const y_int = -getRandomInt(15, 40);
    const b = y_int - 1;
    const y_point = a * a + b;
    
    return {
      questionText: `The function $f$ is defined by $f(x)=a^{x}+b$, where $a$ and $b$ are constants and $a>0$. The graph has a y-intercept at $(0,${y_int})$ and passes through $(2,${y_point})$. What is the value of $a+b$?`,
      figureCode: null,
      options: null,
      correctAnswer: (a + b).toString(),
      explanation: `From the y-intercept: $1+b=${y_int}$, so $b=${b}$. From the point: $a^2+${b}=${y_point}$, so $a^2=${a*a}$ and $a=${a}$. Thus $a+b=${a}+(${b})=${a+b}$.`
    };
  }
};

/**
 * Question ID: 58dcc59f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 104, length = width + 5]
 * - Difficulty factors: [Quadratic word problem, rectangle dimensions]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must yield positive integer solution]
 * - Question type: [Fill-in-the-blank word problem]
 * - Figure generation: [None]
 */