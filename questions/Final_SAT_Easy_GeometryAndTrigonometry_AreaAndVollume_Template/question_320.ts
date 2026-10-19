import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 320
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 3-6, width 7-12]
* - Difficulty factors: [Rectangle perimeter]
* - Distractor patterns: [half perimeter, calculation errors]
* - Constraints: [Perimeter = 2(length + width)]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_320 = {
  metadata: {
    id: "320",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(3, 6);
    const width = getRandomInt(7, 12);
    const perimeter = 2 * (length + width);

    // Each wrong choice is a real slip; two of the old ones were the
    // perimeter minus 9 and minus 4 ("calculation error"). The four values are
    // always distinct for these ranges.
    const optionsData = [
      { text: (length + width).toString(), isCorrect: false, reason: `${length + width} is the sum of one length and one width; a rectangle has two lengths and two widths, so this sum must be doubled` },
      { text: (length * width).toString(), isCorrect: false, reason: `${length * width} is the area of the rectangle, in square inches, not its perimeter` },
      { text: (2 * length + width).toString(), isCorrect: false, reason: `it adds only three of the four sides, $${length} + ${length} + ${width}$, and leaves out one width` },
      { text: perimeter.toString(), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the perimeter, in inches, of a rectangle with a length of $${length}$ inches and a width of $${width}$ inches?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: perimeter.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The perimeter of a rectangle is the sum of its four side lengths, which is twice the sum of its length and width. The perimeter is $2(${length} + ${width}) = 2(${length + width}) = ${perimeter}$ inches. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};