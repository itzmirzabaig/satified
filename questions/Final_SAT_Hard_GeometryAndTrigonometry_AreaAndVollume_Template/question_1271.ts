import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1271
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 4, area ABC: 270]
 * - Difficulty factors: [Similar triangles, area ratio, finding smaller from larger]
 * - Distractor patterns: [N/A - fill in blank with multiple acceptable answers]
 * - Constraints: [Fractional answer acceptable]
 * - Question type: [Fill-in-the-blank, multi-accept]
 * - Figure generation: [None]
 */

export const generator_1271 = {
  metadata: {
    id: "1271",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate scale factor and areas.
    // The smaller triangle's area is chosen first as a whole number, and the
    // larger triangle's area is built as smallerArea · k². This guarantees the
    // answer (largerArea / k² = smallerArea) is always an exact integer, so the
    // fill-in answer is a single plain number.
    const scaleFactor = getRandomInt(3, 6);
    const smallerArea = getRandomInt(50, 150);
    const areaScale = scaleFactor * scaleFactor;
    const largerArea = smallerArea * areaScale;

    // Area of DEF = Area of ABC / scaleFactor² = smallerArea (exact integer).
    const answer = smallerArea;

    return {
      questionText: `Triangles $ABC$ and $DEF$ are similar. Each side length of triangle $ABC$ is ${scaleFactor} times the corresponding side length of triangle $DEF$. The area of triangle $ABC$ is ${largerArea} square inches. What is the area, in square inches, of triangle $DEF$?`,
      figureCode: null,
      options: [],
      correctAnswer: answer.toString(),
      explanation: `When two figures are similar with linear scale factor $k$, their areas are in the ratio $k^2$. Here $k = ${scaleFactor}$, so the area scale factor is $k^2 = ${areaScale}$. Triangle $ABC$ is the larger triangle, so the area of triangle $DEF$ is $\\dfrac{${largerArea}}{${areaScale}} = ${answer}$ square inches.`
    };
  }
};
