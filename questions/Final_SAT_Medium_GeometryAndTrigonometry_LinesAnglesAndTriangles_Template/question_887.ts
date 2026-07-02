import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 887
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base angles: 35-55 degrees]
 * - Difficulty factors: [Isosceles triangle properties, triangle sum theorem]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Two angles equal, sum = 180]
 * - Question type: [No Figure→Fill in the blank]
 * - Figure generation: [null]
 */

export const generator_887 = {
  metadata: {
    id: "887",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const baseAngle = getRandomInt(35, 55);
    const angleJ = 180 - 2 * baseAngle;
    
    // STEP 2: Return question data
    return {
      questionText: `In triangle $JKL$, the measures of $\\angle K$ and $\\angle L$ are each $${baseAngle}^{\\circ}$. What is the measure of $\\angle J$, in degrees? (Disregard the degree symbol when entering your answer.)`,
      figureCode: null,
      options: null,
      correctAnswer: angleJ.toString(),
      explanation: `The correct answer is ${angleJ}. The sum of the measures of the interior angles of a triangle is 180°. It's given that in triangle JKL, the measures of ∠K and ∠L are each ${baseAngle}°. Adding the measures, in degrees, of ∠K and ∠L gives ${baseAngle} + ${baseAngle}, or ${2 * baseAngle}. Therefore, the measure of ∠J, in degrees, is 180 - ${2 * baseAngle}, or ${angleJ}.`
    };
  }
};
