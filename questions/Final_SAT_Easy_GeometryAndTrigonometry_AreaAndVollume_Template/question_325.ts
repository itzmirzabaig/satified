import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 325
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 50-80, width approx half]
* - Difficulty factors: [Rectangle area with larger numbers]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_325 = {
  metadata: {
    id: "325",
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
