import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 806
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 8, 4, results: 198, 98 (triple-digit)]
 * - Difficulty factors: [Subtraction method, solve for b]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Clean subtraction gives 4b = 100]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_806 = {
  metadata: {
    id: "806",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const aCoeff = getRandomInt(1, 4);
    const bCoeff1 = getRandomInt(6, 10);
    const bCoeff2 = getRandomInt(2, 5);
    const bValue = getRandomInt(10, 40);
    
    // Calculate right sides
    const aValue = getRandomInt(10, 50);
    const right1 = aCoeff * aValue + bCoeff1 * bValue;
    const right2 = aCoeff * aValue + bCoeff2 * bValue;
    
    // STEP 2: Build question text
    const questionText = `$$\\begin{cases} ${aCoeff}a + ${bCoeff1}b = ${right1} \\\\ ${aCoeff}a + ${bCoeff2}b = ${right2} \\end{cases}$$ \n\nThe solution to the given system of equations is $(a, b)$. What is the value of $b$?`;
    
    // STEP 3: Return fill-in-the-blank
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: bValue.toString(),
      explanation: `Subtracting the second equation from the first yields $((${aCoeff})a - (${aCoeff})a) + ((${bCoeff1})b - (${bCoeff2})b) = (${right1}) - (${right2})$, which simplifies to $((${bCoeff1 - bCoeff2}))b = (${right1 - right2})$. Dividing by ${bCoeff1 - bCoeff2} yields $b = ${bValue}$.`
    };
  }
};
