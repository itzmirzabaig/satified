import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 328
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 32-42, width close to length]
* - Difficulty factors: [Rectangle area, multiplication of similar-sized numbers]
* - Distractor patterns: [adds length and width, perimeter, squares width]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_328 = {
  metadata: {
    id: "328",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(32, 42);
    const width = length - getRandomInt(2, 6);
    const area = length * width;
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: (length + width).toString(), isCorrect: false, reason: "adds the length and the width instead of multiplying them" },
      { text: (2 * (length + width)).toString(), isCorrect: false, reason: "is the perimeter of the rectangle, not its area" },
      { text: fmt(width * width), isCorrect: false, reason: "multiplies the width by itself instead of multiplying the length by the width" },
      { text: fmt(area), isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the area, in square centimeters, of a rectangle with a length of $${length}$ centimeters and a width of $${width}$ centimeters?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: fmt(area),
      explanation: `Choice ${correctOption.letter} is correct. The area is $${length} \\times ${width} = ${fmt(area)}$ square centimeters. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};
