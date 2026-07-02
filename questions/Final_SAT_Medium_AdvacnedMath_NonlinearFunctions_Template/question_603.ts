import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 603
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 8x³ + 4, f(2) = 68]
 * - Difficulty factors: [Simple function evaluation, cubing]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [f(2) = 8(8) + 4 = 68]
 * - Question type: [No Figure→Fill in the Blank]
 * - Figure generation: [None - pure evaluation]
 */

export const generator_603 = {
  metadata: {
    id: "603",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: f(x) = 8x³ + 4, f(2) = 68
    // Randomize: coefficient (2-10), constant (1-10), input (2 or 3)
    const coeff = getRandomInt(2, 10); // 2 to 10
    const constant = getRandomInt(1, 10); // 1 to 10
    const x = getRandomInt(2, 3); // 2 or 3
    
    // STEP 2: Calculate result
    const result = coeff * x * x * x + constant;
    
    // STEP 3: Build question text
    const questionText = `The function $f$ is defined by $f(x) = ${coeff}x^3 + ${constant}$. What is the value of $f(${x})$?`;
    
    // STEP 4: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: null, // Fill-in-the-blank
      correctAnswer: `${result}`,
      explanation: `To find $f(${x})$, substitute $x = ${x}$ into the function: $f(${x}) = ${coeff}(${x})^3 + ${constant} = ${coeff}(${x*x*x}) + ${constant} = ${coeff * x*x*x} + ${constant} = ${result}$.`
    };
  }
};
