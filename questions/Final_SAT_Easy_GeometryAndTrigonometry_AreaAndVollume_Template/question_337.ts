import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 337
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length: 5-9, width: 4-8 (single-digit, simple multiplication)]
* - Difficulty factors: [Basic rectangle area formula, single-digit multiplication]
* - Distractor patterns: [adds length+width, perimeter, half the area (triangle formula)]
* - Constraints: [Area = length × width, clean integer answer]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_337 = {
  metadata: {
    id: "337",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Each wrong choice is a real slip; the old ones were the area plus 8 and
    // twice the area. Redraw until the four values differ (8 by 8 makes half
    // the area equal the perimeter).
    let length = 5, width = 4;
    do {
      length = getRandomInt(5, 9);
      width = getRandomInt(4, 8);
    } while (new Set([length + width, 2 * (length + width), length * width, (length * width) / 2]).size < 4);
    const area = length * width;
    const perimeter = 2 * (length + width);

    const optionsData = [
      { text: (length + width).toString(), isCorrect: false, reason: `it is the sum of the length and the width, $${length} + ${width}$, not their product` },
      { text: perimeter.toString(), isCorrect: false, reason: `it is the perimeter of the rectangle, $2(${length} + ${width})$, in inches, not its area` },
      { text: area.toString(), isCorrect: true, reason: '' },
      { text: (area / 2).toString(), isCorrect: false, reason: `it is half the product of the length and the width, which is the formula for the area of a triangle, not a rectangle` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the area, in square inches, of a rectangle with a length of $${length}$ inches and a width of $${width}$ inches?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: area.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The area of a rectangle is found by multiplying the length by the width. Therefore, the area is $${length} \\times ${width} = ${area}$ square inches. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
