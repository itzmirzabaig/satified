import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 358f18bc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, -48, 2304 (large numbers suggest completing square)]
 * - Difficulty factors: [Completing the square, vertex form, minimum value]
 * - Distractor patterns: [Not applicable - fill-in-the-blank]
 * - Constraints: [Must complete square cleanly to get integer/whole number minimum]
 * - Question type: [Fill-in-the-blank quadratic minimum]
 * - Figure generation: [None]
 */

export const generator_358f18bc = {
  metadata: {
    // id: "358f18bc",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // f(x) = x² - 2bx + c where c = b² + k and k is the minimum
    // f(x) = (x - b)² - b² + c = (x-b)² + (c - b²)
    // Minimum is c - b²
    
    const b = getRandomInt(15, 30);
    const minValue = getRandomInt(1000, 2500);
    const c = b * b + minValue;
    
    return {
      questionText: `The function $f(x) = x^2 - ${2*b}x + ${c}$. What is the minimum value of the given function?`,
      figureCode: null,
      options: null,
      correctAnswer: minValue.toString(),
      explanation: `Completing the square: $f(x) = x^2 - ${2*b}x + ${b}^2 - ${b}^2 + ${c} = (x-${b})^2 + ${minValue}$. Since $(x-${b})^2 \\geq 0$, the minimum value is ${minValue}$ when $x=${b}$.`
    };
  }
};

/**
 * Question ID: 8490cc45
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 2, coefficient: -8, constant: 22]
 * - Difficulty factors: [Exponential function, y-intercept evaluation]
 * - Distractor patterns: [A: (0,14) correct, B: (0,2) sign error, C: (0,22) forgot coefficient, D: (0,-8) just coefficient]
 * - Constraints: [Clean integer result]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */