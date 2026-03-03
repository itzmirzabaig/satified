import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ba8ca563
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 474552 (large perfect cube)]
 * - Difficulty factors: [Cube root calculation, surface area from side length]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Volume must be perfect cube for integer side length]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_ba8ca563 = {
  metadata: {
    // id: "ba8ca563",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate side length (will be cube rooted)
    // Original used 78³ = 474552
    const sideLength = getRandomInt(50, 99); // Double digit for difficulty
    
    // STEP 2: Calculate volume (perfect cube)
    const volume = sideLength * sideLength * sideLength;
    
    // STEP 3: Calculate surface area
    const faceArea = sideLength * sideLength;
    const surfaceArea = 6 * faceArea;
    
    return {
      questionText: `A cube has a volume of $${volume.toLocaleString()}$ cubic units. What is the surface area, in square units, of the cube?`,
      figureCode: null,
      options: null,
      correctAnswer: surfaceArea.toString(),
      explanation: `The volume of a cube is $s^3$, so $s = \\sqrt[3]{${volume.toLocaleString()}} = ${sideLength}$. Each face has area $${sideLength}^2 = ${faceArea.toLocaleString()}$, and a cube has 6 faces, so the surface area is $6 \\times ${faceArea.toLocaleString()} = ${surfaceArea.toLocaleString()}$.`
    };
  }
};

/**
 * Question ID: 228945
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [height: 22, diameter: 6]
 * - Difficulty factors: [Cone volume formula, diameter to radius conversion]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must convert diameter to radius]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */