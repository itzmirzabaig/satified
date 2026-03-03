import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: f60bb551
*
* ORIGINAL ANALYSIS:
* - Number ranges: [width 7-12, length 50-80]
* - Difficulty factors: [Finding width from area, division]
* - Distractor patterns: [length, area/2, area-length]
* - Constraints: [Width = Area/Length, must divide evenly]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_f60bb551 = {
  metadata: {
    // id: "f60bb551",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const width = getRandomInt(7, 12);
    const length = getRandomInt(50, 80);
    const area = length * width;

    const optionsData = [
      { text: width.toString(), isCorrect: true },
      { text: length.toString(), isCorrect: false, reason: "states the length instead of width" },
      { text: (area / 2).toString(), isCorrect: false, reason: "divides area by 2" },
      { text: (area - length).toString(), isCorrect: false, reason: "subtracts length from area" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The area of a rectangle is $${area}$ square inches. The length of the rectangle is $${length}$ inches. What is the width, in inches, of this rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: width.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The width is $${area} \\div ${length} = ${width}$ inches. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: d2047497
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 12-20, width 5-9]
* - Difficulty factors: [Rectangle area with units]
* - Distractor patterns: [adds length and width, perimeter, squares sum]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/