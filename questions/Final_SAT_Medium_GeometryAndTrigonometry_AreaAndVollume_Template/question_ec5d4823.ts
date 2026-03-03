import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ec5d4823
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 4, width: 9, height: 10 (single-digit)]
 * - Difficulty factors: [Rectangular prism volume, simple multiplication]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [All dimensions single-digit for medium difficulty]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

export const generator_ec5d4823 = {
  metadata: {
    // id: "ec5d4823",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const length = getRandomInt(3, 8);
    const width = getRandomInt(5, 12);
    const height = getRandomInt(8, 15);
    
    // STEP 2: Calculate volume
    const volume = length * width * height;
    
    // STEP 3: Return question data
    return {
      questionText: `What is the volume, in cubic centimeters, of a right rectangular prism that has a length of ${length} centimeters, a width of ${width} centimeters, and a height of ${height} centimeters?`,
      figureCode: null,
      options: null,
      correctAnswer: volume.toString(),
      explanation: `The volume of a right rectangular prism is calculated by multiplying its three dimensions: length × width × height. Multiplying ${length} × ${width} × ${height} gives a volume of ${volume} cubic centimeters.`
    };
  }
};

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