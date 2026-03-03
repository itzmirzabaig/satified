import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 76670c80
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side 30-60]
* - Difficulty factors: [Square perimeter, 4 × side]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Perimeter = 4 × side]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_76670c80 = {
  metadata: {
    // id: "76670c80",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const side = getRandomInt(30, 60);
    const perimeter = 4 * side;

    return {
      questionText: `Each side of a square has a length of ${side} centimeters. What is the perimeter of this square?`,
      figureCode: null,
      options: null,
      correctAnswer: perimeter.toString(),
      explanation: `The perimeter of a square is calculated by multiplying the side length by 4. Therefore, the perimeter is $4 \\times ${side} = ${perimeter}$.`
    };
  }
};

/**
* Question ID: 4420e500
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 3-8, width 2-6]
* - Difficulty factors: [Basic rectangle area]
* - Distractor patterns: [adds length and width, perimeter, squares sum]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/