import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9f934297
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 28, width: 15, height: 16]
 * - Difficulty factors: [Surface area of rectangular prism, 6 faces calculation]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Must calculate all 3 pairs of faces]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_9f934297 = {
  metadata: {
    // id: "9f934297",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate dimensions (double-digit like original)
    const length = getRandomInt(20, 40);
    const width = getRandomInt(10, 25);
    const height = getRandomInt(12, 30);
    
    // STEP 2: Calculate surface area
    // SA = 2(lw + lh + wh)
    const face1 = length * width;
    const face2 = length * height;
    const face3 = width * height;
    const surfaceArea = 2 * (face1 + face2 + face3);
    
    return {
      questionText: `A right rectangular prism has a length of $${length}$ centimeters (cm), a width of $${width}$ cm, and a height of $${height}$ cm. What is the surface area, in cm², of the right rectangular prism?`,
      figureCode: null,
      options: null,
      correctAnswer: surfaceArea.toString(),
      explanation: `The surface area is $2(lw + lh + wh) = 2((${length})(${width}) + (${length})(${height}) + (${width})(${height})) = 2(${face1} + ${face2} + ${face3}) = 2(${face1 + face2 + face3}) = ${surfaceArea}$ cm².`
    };
  }
};

/**
 * Question ID: 94726
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: (1/3)π, height: 9]
 * - Difficulty factors: [Solving cone volume for radius, algebraic manipulation]
 * - Distractor patterns: [A: 1/3 (correct), B: 1/√3 (wrong algebra), C: √3 (confused), D: 3 (solving for height)]
 * - Constraints: [Clean fractional answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */