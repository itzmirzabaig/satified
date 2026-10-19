import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 346
*
* ORIGINAL ANALYSIS:
* - Number ranges: [base even 30-50, height 60-100]
* - Difficulty factors: [Triangle area formula, ½ × base × height]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Area = ½ × base × height]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/

export const generator_346 = {
  metadata: {
    id: "346",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The base is even so the area is a whole number; with an odd base and an
    // odd height it used to end in .5.
    const base = 2 * getRandomInt(15, 25);
    const height = getRandomInt(60, 100);
    const area = (base * height) / 2;
    const fmt = (n: number) => n.toLocaleString('en-US');

    return {
      questionText: `A triangle has a base length of ${base} centimeters and a height of ${height} centimeters. What is the area, in square centimeters, of the triangle?`,
      figureCode: null,
      options: [],
      correctAnswer: area.toString(),
      explanation: `The correct answer is ${fmt(area)}. The area $A$ of a triangle is given by the formula $A = \\frac{1}{2}bh$, where $b$ is the length of the base and $h$ is the height. Therefore, the area of this triangle is $\\frac{1}{2}(${base})(${height}) = ${fmt(area)}$ square centimeters.`
    };
  }
};
