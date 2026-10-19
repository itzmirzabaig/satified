import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 342
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 10-20, width 4-8]
* - Difficulty factors: [Rectangle perimeter formula]
* - Distractor patterns: [length + width, area, 2 × length + width]
* - Constraints: [Perimeter = 2(length + width)]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_342 = {
  metadata: {
    id: "342",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(10, 20);
    const width = getRandomInt(4, 8);
    const perimeter = 2 * (length + width);

    // Each wrong choice is a real slip. With a length of at least 10 and a
    // width of at most 8, the four values never collide.
    const optionsData = [
      { text: (length + width).toString(), isCorrect: false, reason: `it is the sum of one length and one width, $${length} + ${width}$; a rectangle has two lengths and two widths, so this is only half the perimeter` },
      { text: (length * width).toString(), isCorrect: false, reason: `it is the area of the rectangle, $${length}(${width})$, not its perimeter` },
      { text: perimeter.toString(), isCorrect: true, reason: '' },
      { text: (2 * length + width).toString(), isCorrect: false, reason: `it includes both lengths but only one width, $2(${length}) + ${width}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A rectangle has a length of $${length}$ and a width of $${width}$. What is the perimeter of the rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: perimeter.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The perimeter of a rectangle is the sum of the lengths of its four sides: two lengths and two widths. Therefore, the perimeter is $2(${length} + ${width}) = 2(${length + width}) = ${perimeter}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
