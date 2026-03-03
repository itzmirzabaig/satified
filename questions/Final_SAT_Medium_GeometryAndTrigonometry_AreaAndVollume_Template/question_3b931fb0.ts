import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3b931fb0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 377, base area: 13 (both specific)]
 * - Difficulty factors: [Cylinder volume formula manipulation, V = Bh]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Volume must be divisible by base area for integer height]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_3b931fb0 = {
  metadata: {
    // id: "3b931fb0",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Generate height and base area, then calculate volume
    const height = getRandomInt(20, 40);
    const baseArea = getRandomInt(10, 20);
    const volume = baseArea * height;
    
    // STEP 2: Return question data
    return {
      questionText: `A right circular cylinder has a volume of ${volume} cubic centimeters. The area of the base of the cylinder is ${baseArea} square centimeters. What is the height, in centimeters, of the cylinder?`,
      figureCode: null,
      options: null,
      correctAnswer: height.toString(),
      explanation: `The volume of a right circular cylinder is given by $V = Bh$, where $B$ is the area of the base and $h$ is the height. Substituting $V = ${volume}$ and $B = ${baseArea}$ gives ${volume} = ${baseArea}h$. Dividing both sides by ${baseArea} yields $h = ${height}$ centimeters.`
    };
  }
};

/**
 * Question ID: a4ed5285
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 5, height: 3 (single-digit)]
 * - Difficulty factors: [Right triangle area, identifying base/height from figure]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Base and height must be clear from figure orientation]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Mafs: Right triangle with legs labeled]
 */