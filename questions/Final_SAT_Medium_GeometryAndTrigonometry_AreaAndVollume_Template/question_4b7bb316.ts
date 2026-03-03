import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 4b7bb316
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge length: 29 (double-digit)]
 * - Difficulty factors: [Surface area calculation, open-top box (5 faces)]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Must be perfect square for clean calculation, 5 faces not 6]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_4b7bb316 = {
  metadata: {
    // id: "4b7bb316",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original uses 29, so use double-digit numbers 20-40
    const edgeLength = getRandomInt(20, 40);
    
    // STEP 2: Calculate derived values
    const faceArea = edgeLength * edgeLength; // s²
    const totalSurfaceArea = 5 * faceArea; // 5 faces (no lid)
    
    // STEP 3: Build question text
    const questionText = `The length of each edge of a box is ${edgeLength} inches. Each side of the box is in the shape of a square. The box does not have a lid. What is the exterior surface area, in square inches, of this box without a lid?`;
    
    // STEP 4: Return question data (fill-in-the-blank)
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: totalSurfaceArea.toString(),
      explanation: `The exterior surface area of a figure is the sum of the areas of all its faces. Since the box does not have a lid and each side is a square, the box consists of 5 congruent square faces. The area of each square face is ${edgeLength}² = ${faceArea} square inches. Therefore, the total exterior surface area is 5 × ${faceArea} = ${totalSurfaceArea} square inches.`
    };
  }
};

/**
 * Question ID: f67e4efc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 45π, height: 5 (single-digit)]
 * - Difficulty factors: [Cylinder volume formula manipulation, solving for radius]
 * - Distractor patterns: [B: 45/5/2=4.5 (division chain), C: 9 (r² value), D: 40 (45-5 subtraction)]
 * - Constraints: [Volume must be divisible by height for clean integer radius]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */