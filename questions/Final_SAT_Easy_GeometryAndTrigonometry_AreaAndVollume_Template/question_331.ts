import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 331
*
* ORIGINAL ANALYSIS:
* - Number ranges: [dimensions 10-25, height 10-25]
* - Difficulty factors: [Volume to height, division of large numbers]
* - Distractor patterns: [miscalculation, close to base area, base area]
* - Constraints: [Height = Volume / (length × width)]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_331 = {
  metadata: {
    id: "331",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Each wrong choice is a real slip; two of the old ones were the height
    // plus 9 and the base area minus 8. Dividing the volume by only the
    // length or only the width gives a whole number because the volume is
    // length times width times height. Redraw until the four values differ.
    let length = 10, width = 6, height = 11;
    do {
      length = getRandomInt(10, 20);
      width = getRandomInt(6, 12);
      height = getRandomInt(10, 20);
    } while (new Set([height, length * width, width * height, length * height]).size < 4);
    const volume = length * width * height;
    const baseArea = length * width;
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: height.toString(), isCorrect: true, reason: '' },
      { text: fmt(width * height), isCorrect: false, reason: `it results from dividing the volume by the length, ${length}, only; the volume must be divided by the area of the base, $${length}(${width})$` },
      { text: fmt(length * height), isCorrect: false, reason: `it results from dividing the volume by the width, ${width}, only; the volume must be divided by the area of the base, $${length}(${width})$` },
      { text: fmt(baseArea), isCorrect: false, reason: `${fmt(baseArea)} is the area of the base, in square inches, not the height` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Each base of a right rectangular prism has a length of $${length}$ inches and a width of $${width}$ inches. The prism has a volume of $${fmt(volume)}$ cubic inches. What is the height, in inches, of the prism?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: height.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The volume of a right rectangular prism is the area of its base times its height. The area of each base is $${length}(${width}) = ${fmt(baseArea)}$ square inches, so $${fmt(baseArea)}h = ${fmt(volume)}$, where $h$ is the height. Dividing both sides by ${fmt(baseArea)} gives $h = ${height}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
