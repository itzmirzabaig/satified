import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 4efea6a3
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sides 3-9 and 15-25]
* - Difficulty factors: [Finding shortest side from area]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Shortest side = Area/Longest side]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_4efea6a3 = {
  metadata: {
    // id: "4efea6a3",
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

/**
* Question ID: f39f88b7
*
* ORIGINAL ANALYSIS:
* - Number ranges: [base 30-50, height 60-100]
* - Difficulty factors: [Triangle area formula, ½ × base × height]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Area = ½ × base × height]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/