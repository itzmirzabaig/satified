import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1483
 * 
 * ANALYSIS:
 * - Context: Linear Modeling (Weight/Length).
 * - Function: W(L) = A*L + C.
 * - Given: Length L, calculate W.
 * - Variables: decimals common (e.g. 0.6).
 */
export const generator_1483 = {
  metadata: {
    id: "1483",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    // W = m*x + b
    const m = getRandomInt(2, 6); // Integer coefficient (e.g. 4)
    const b = parseFloat((getRandomInt(2, 9) / 10).toFixed(1)); // Decimal constant (e.g. 0.6)
    
    // Input x (e.g. 0.5, 1.5, 2.5)
    // x should be simple decimal
    const x = parseFloat((getRandomInt(1, 15) / 10).toFixed(1)); // e.g. 0.5 or 1.2
    
    // Calculate result
    const result = m * x + b;
    // Format to max 2 decimals to avoid floating point issues
    const answer = parseFloat(result.toFixed(2)).toString();
    
    return {
      questionText: `A certain spring has a length of ${b} meters when no weight is attached. The length of the spring increases by ${m} meters for each kilogram of weight attached. If a weight of ${x} kilograms is attached to the spring, what is the total length of the spring, in meters?`,
      figureCode: null,
      options: null, // Fill in blank
      correctAnswer: answer,
      explanation: `The total length $L$ can be modeled by the linear equation $L = ${m}w + ${b}$, where $w$ is the weight in kilograms.
      
Substitute $w = ${x}$:
$L = ${m}(${x}) + ${b}$
$L = ${parseFloat((m*x).toFixed(2))} + ${b}$
$L = ${answer}$ meters.`
    };
  }
};
