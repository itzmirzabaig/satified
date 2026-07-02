import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 330
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sides 3-9 and 15-25]
* - Difficulty factors: [Finding shortest side from area]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Shortest side = Area/Longest side]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_330 = {
  metadata: {
    id: "330",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const shortSide = getRandomInt(3, 9);
    const longSide = getRandomInt(15, 25);
    const area = shortSide * longSide;

    return {
      questionText: `The area of a rectangle is $${area}$ square inches. The length of the longest side of the rectangle is $${longSide}$ inches. What is the length, in inches, of the shortest side of this rectangle?`,
      figureCode: null,
      options: null,
      correctAnswer: shortSide.toString(),
      explanation: `The shortest side is found by dividing the area by the longest side: $${area} \\div ${longSide} = ${shortSide}$ inches.`
    };
  }
};
