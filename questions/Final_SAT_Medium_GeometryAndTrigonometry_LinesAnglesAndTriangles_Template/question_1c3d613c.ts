import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1c3d613c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2-4, angle: 15-35 degrees]
 * - Difficulty factors: [SSS similarity, corresponding angles equal]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [All sides proportional implies similar, corresponding angles equal]
 * - Question type: [No Figure→Fill in the blank]
 * - Figure generation: [null]
 */

export const generator_1c3d613c = {
  metadata: {
    // id: "1c3d613c",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const scaleFactor = getRandomInt(2, 4);
    const angleBAC = getRandomInt(15, 35);
    
    // STEP 2: Return question data
    return {
      questionText: `Triangle ABC and triangle DEF are shown. The relationship between the side lengths of AB, BC, and AC to DE, EF, and DF is such that each ratio equals ${scaleFactor}. If the measure of angle BAC is ${angleBAC}°, what is the measure, in degrees, of angle EDF? (Disregard the degree symbol when gridding your answer.)`,
      figureCode: null,
      options: null,
      correctAnswer: angleBAC.toString(),
      explanation: `The correct answer is ${angleBAC}. By the equality given, the three pairs of corresponding sides of the two triangles are in the same proportion. By the side-side-side (SSS) similarity theorem, triangle ABC is similar to triangle DEF. In similar triangles, the measures of corresponding angles are congruent. Since angle BAC corresponds to angle EDF, these two angles are congruent and their measures are equal. It's given that the measure of angle BAC is ${angleBAC}°, so the measure of angle EDF is also ${angleBAC}°.`
    };
  }
};

/**
 * Question ID: 7a8ad237
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [acute angle: 55-75 degrees]
 * - Difficulty factors: [Congruent triangles, corresponding angles, triangle sum]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Corresponding angles equal, sum = 180]
 * - Question type: [No Figure→Fill in the blank]
 * - Figure generation: [null]
 */
