import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fd8745fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base angles: 35-55 degrees]
 * - Difficulty factors: [Isosceles triangle properties, triangle sum theorem]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Two angles equal, sum = 180]
 * - Question type: [No Figure→Fill in the blank]
 * - Figure generation: [null]
 */

export const generator_fd8745fc = {
  metadata: {
    // id: "fd8745fc",
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

/**
 * Question ID: 2085e10e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 40-50 and 85-95 degrees]
 * - Difficulty factors: [AA similarity, determining sufficiency of information]
 * - Distractor patterns: [A: redundant info, B: redundant info, C: redundant info]
 * - Constraints: [AA similarity requires only two angles]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */
