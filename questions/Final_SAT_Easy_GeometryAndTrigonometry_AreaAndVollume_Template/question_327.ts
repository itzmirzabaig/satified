import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 327
*
* ORIGINAL ANALYSIS:
* - Number ranges: [dimensions: 8-15]
* - Difficulty factors: [Volume of rectangular prism, triple multiplication]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Volume = l × w × h]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_327 = {
  metadata: {
    id: "327",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(8, 15);
    const width = getRandomInt(6, 12);
    const height = getRandomInt(8, 15);
    const volume = length * width * height;

    return {
      questionText: `A right rectangular prism has a length of $${length}$ meters, a width of $${width}$ meters, and a height of $${height}$ meters. What is the volume, in cubic meters, of the prism?`,
      figureCode: null,
      options: [],
      correctAnswer: volume.toString(),
      explanation: `The volume of a right rectangular prism is calculated by multiplying length × width × height. Therefore, the volume is $${length} \\times ${width} \\times ${height} = ${volume}$ cubic meters.`
    };
  }
};
