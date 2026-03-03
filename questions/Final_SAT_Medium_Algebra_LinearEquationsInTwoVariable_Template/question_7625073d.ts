import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7625073d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 7, 7, total: 840, b: 71]
 * - Difficulty factors: [Substitution and solving linear equation]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [g must be positive integer]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_7625073d = {
  metadata: {
    // id: "7625073d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    // 7g + 7b = 840 → g + b = 120
    // If b = 71, then g = 49
    const coef = getRandomInt(2, 12);
    const sum = getRandomInt(80, 150);
    const total = coef * sum;
    const bVal = getRandomInt(20, sum - 20);
    const gVal = sum - bVal;
    
    return {
      questionText: `The equation \\( ${coef}g + ${coef}b = ${total} \\) represents the number of blue tiles, \\( b \\), and the number of green tiles, \\( g \\), an artist needs for an ${total}-square-inch tile project. The artist needs ${bVal} blue tiles for the project. How many green tiles does he need?`,
      figureCode: null,
      options: null,
      correctAnswer: gVal.toString(),
      explanation: `The correct answer is ${gVal}. It's given that the equation \\( ${coef}g + ${coef}b = ${total} \\) represents the number of blue tiles, \\( b \\), and the number of green tiles, \\( g \\), an artist needs for an ${total}-square-inch tile project. It's also given that the artist needs ${bVal} blue tiles for the project. Substituting ${bVal} for \\( b \\) in the equation \\( ${coef}g + ${coef}b = ${total} \\) yields \\( ${coef}g + ${coef}(${bVal}) = ${total} \\), or \\( ${coef}g + ${coef * bVal} = ${total} \\). Subtracting ${coef * bVal} from both sides of this equation yields \\( ${coef}g = ${total - coef * bVal} \\). Dividing both sides of this equation by ${coef} yields \\( g = ${gVal} \\). Therefore, the artist needs ${gVal} green tiles for the project.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-c5e38487.ts
/**
 * Question ID: c5e38487
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total: 56, acetic acid: 10]
 * - Difficulty factors: [Simple subtraction in context]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Water = total - acid]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */
