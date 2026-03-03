import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 575f1e12
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 25-40, width 20-35]
* - Difficulty factors: [Rectangle area, larger double-digit multiplication]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_575f1e12 = {
  metadata: {
    // id: "575f1e12",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(25, 40);
    const width = getRandomInt(20, 35);
    const area = length * width;

    return {
      questionText: `What is the area, in square centimeters, of a rectangle with a length of $${length}$ centimeters (cm) and a width of $${width}$ cm?`,
      figureCode: null,
      options: null,
      correctAnswer: area.toString(),
      explanation: `The area of a rectangle is calculated by multiplying length by width. Therefore, the area is $${length} \\times ${width} = ${area}$ square centimeters.`
    };
  }
};

/**
* Question ID: b4767bef
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sides 3-8, ensuring valid triangle]
* - Difficulty factors: [Triangle perimeter, solving for third side]
* - Distractor patterns: [subtracts given sides, adds given sides, adds all numbers]
* - Constraints: [Third side = perimeter - side1 - side2, must satisfy triangle inequality]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/