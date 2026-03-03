import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_d2047497 = {
  metadata: {
    // id: "d2047497",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(12, 20);
    const width = getRandomInt(5, 9);
    const area = length * width;
    const perimeter = 2 * (length + width);

    const optionsData = [
      { text: `${length + width}\\text{ cm}^2`, isCorrect: false, reason: "adds length and width" },
      { text: `${perimeter}\\text{ cm}^2`, isCorrect: false, reason: "calculates perimeter" },
      { text: `${area}\\text{ cm}^2`, isCorrect: true },
      { text: `${(length + width) * (length + width)}\\text{ cm}^2`, isCorrect: false, reason: "squares the sum of length and width" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the area of a rectangle with a length of $${length}$ centimeters ($\\text{cm}$) and a width of $${width}\\text{ cm}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${area}\\text{ cm}^2`,
      explanation: `Choice ${correctOption.letter} is correct. The area is $${length} \\times ${width} = ${area}\\text{ cm}^2$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 4efea6a3
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sides 3-9 and 15-25]
* - Difficulty factors: [Finding shortest side from area]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Shortest side = Area/Longest side]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/