import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 165c30c4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 50-80, width approx half]
* - Difficulty factors: [Rectangle area with larger numbers]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_165c30c4 = {
  metadata: {
    // id: "165c30c4",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(50, 80);
    const width = Math.floor(length / 2) + getRandomInt(-5, 5);
    const area = length * width;

    return {
      questionText: `A rectangle has a length of ${length} inches and a width of ${width} inches. What is the area, in square inches, of the rectangle?`,
      figureCode: null,
      options: null,
      correctAnswer: area.toString(),
      explanation: `The area of a rectangle is calculated by multiplying length by width. Therefore, the area is ${length} × ${width} = ${area} square inches.`
    };
  }
};

/**
* Question ID: d683a9cc
*
* ORIGINAL ANALYSIS:
* - Number ranges: [dimensions 2-8]
* - Difficulty factors: [Volume of prism with figure]
* - Distractor patterns: [l×w×2, l×w, l+w+h]
* - Constraints: [Volume = l × w × h]
* - Question type: [Has Figure (Mafs), Multiple Choice Text]
* - Figure generation: [3D rectangular prism representation]
*/