import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 336
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side 30-60]
* - Difficulty factors: [Square perimeter, 4 × side]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Perimeter = 4 × side]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_336 = {
  metadata: {
    id: "336",
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
      options: [],
      correctAnswer: perimeter.toString(),
      explanation: `The perimeter of a square is calculated by multiplying the side length by 4. Therefore, the perimeter is $4 \\times ${side} = ${perimeter}$.`
    };
  }
};
