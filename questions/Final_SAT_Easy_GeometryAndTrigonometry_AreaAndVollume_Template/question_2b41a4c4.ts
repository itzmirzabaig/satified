import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 2b41a4c4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [dimensions: 8-15]
* - Difficulty factors: [Volume of rectangular prism, triple multiplication]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Volume = l × w × h]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_2b41a4c4 = {
  metadata: {
    // id: "2b41a4c4",
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
      options: null,
      correctAnswer: volume.toString(),
      explanation: `The volume of a right rectangular prism is calculated by multiplying length × width × height. Therefore, the volume is $${length} \\times ${width} \\times ${height} = ${volume}$ cubic meters.`
    };
  }
};

/**
* Question ID: d0b6d927
*
* ORIGINAL ANALYSIS:
* - Number ranges: [width 6-9, length 7-12]
* - Difficulty factors: [Finding width from area, division]
* - Distractor patterns: [area-length, length², area×length]
* - Constraints: [Width = Area/Length, must divide evenly]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/