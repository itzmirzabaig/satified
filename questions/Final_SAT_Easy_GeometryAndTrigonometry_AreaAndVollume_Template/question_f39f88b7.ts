import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_f39f88b7 = {
  metadata: {
    // id: "f39f88b7",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(30, 50);
    const height = getRandomInt(60, 100);
    const area = (base * height) / 2;

    return {
      questionText: `A triangle has a base length of ${base} centimeters and a height of ${height} centimeters. What is the area, in square centimeters, of the triangle?`,
      figureCode: null,
      options: null,
      correctAnswer: area.toString(),
      explanation: `The area of a triangle is calculated using the formula $A = \\frac{1}{2}bh$. Therefore, the area is $\\frac{1}{2}(${base})(${height}) = ${area}$ square centimeters.`
    };
  }
};

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