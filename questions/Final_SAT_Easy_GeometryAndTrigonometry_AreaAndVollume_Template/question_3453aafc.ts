import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 3453aafc
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 32-42, width close to length]
* - Difficulty factors: [Rectangle area, multiplication of similar-sized numbers]
* - Distractor patterns: [adds length and width, perimeter, squares width]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_3453aafc = {
  metadata: {
    // id: "3453aafc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(32, 42);
    const width = length - getRandomInt(2, 6);
    const area = length * width;

    const optionsData = [
      { text: (length + width).toString(), isCorrect: false, reason: "adds length and width" },
      { text: (2 * (length + width)).toString(), isCorrect: false, reason: "calculates perimeter instead of area" },
      { text: (width * width).toString(), isCorrect: false, reason: "squares the width" },
      { text: area.toString(), isCorrect: true }
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
      correctAnswer: area.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The area is $${length} \\times ${width} = ${area}$ square centimeters. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

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