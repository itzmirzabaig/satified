import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 338
*
* ORIGINAL ANALYSIS:
* - Number ranges: [width 5-10, difference 30-50]
* - Difficulty factors: [Word problem, finding length then area]
* - Distractor patterns: [width × difference, perimeter, sum of sides]
* - Constraints: [Length = width + 40, Area = length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_338 = {
  metadata: {
    id: "338",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const width = getRandomInt(5, 10);
    const difference = getRandomInt(30, 50);
    const length = width + difference;
    const area = length * width;

    // Each wrong choice is a real slip; two of the old ones were the width and
    // twice the width. The values never collide: width times difference is at
    // least 150, the perimeter is at most 140, and the sum is at most 70.
    const optionsData = [
      { text: (width * difference).toString(), isCorrect: false, reason: `it uses ${difference} as the length; the length is ${difference} centimeters longer than the width, so it is ${length} centimeters` },
      { text: (2 * (length + width)).toString(), isCorrect: false, reason: `it is the perimeter of the rectangle, $2(${length} + ${width})$, in centimeters, not its area` },
      { text: (width + length).toString(), isCorrect: false, reason: `it is the sum of the length and the width, $${length} + ${width}$, not their product` },
      { text: area.toString(), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The width of a rectangle is ${width} centimeters. The length of the rectangle is ${difference} centimeters longer than the width. What is the area, in square centimeters, of this rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: area.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The length of the rectangle is ${difference} centimeters longer than the width, so the length is $${width} + ${difference} = ${length}$ centimeters. The area of a rectangle is its length times its width, so the area is $${length}(${width}) = ${area}$ square centimeters. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
