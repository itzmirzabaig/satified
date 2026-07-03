import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 832
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 8, volume: 216]
 * - Difficulty factors: [Triangular prism volume, solving for base area]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Volume divisible by height for integer base area]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_832 = {
  metadata: {
    id: "832",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const height = getRandomInt(5, 12);
    const baseArea = getRandomInt(20, 40);
    const volume = baseArea * height;
    
    // STEP 2: Return question data
    return {
      questionText: `A triangular prism has a height of ${height} centimeters (cm) and a volume of ${volume} cm³. What is the area, in cm², of the base of the prism? (The volume of a triangular prism is equal to $Bh$, where $B$ is the area of the base and $h$ is the height of the prism.)`,
      figureCode: null,
      options: null,
      correctAnswer: baseArea.toString(),
      explanation: `The volume of a triangular prism is $V = Bh$, where $B$ is the base area and $h$ is the height. Substituting $V = ${volume}$ and $h = ${height}$ gives $V = B \\cdot ${height}$. Dividing both sides by ${height} yields $B = \\dfrac{${volume}}{${height}} = ${baseArea}$, so the area of the base is ${baseArea} cm².`
    };
  }
};
