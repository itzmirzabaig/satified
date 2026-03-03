import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 4420e500
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 3-8, width 2-6]
* - Difficulty factors: [Basic rectangle area]
* - Distractor patterns: [adds length and width, perimeter, squares sum]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_4420e500 = {
  metadata: {
    // id: "4420e500",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(3, 8);
    const width = getRandomInt(2, 6);
    const area = length * width;
    const perimeter = 2 * (length + width);

    const optionsData = [
      { text: `\\(${length + width} \\text{ cm}^2\\)`, isCorrect: false, reason: "adds length and width" },
      { text: `\\(${area} \\text{ cm}^2\\)`, isCorrect: true },
      { text: `\\(${perimeter} \\text{ cm}^2\\)`, isCorrect: false, reason: "calculates perimeter" },
      { text: `\\(${Math.pow(length + width, 2)} \\text{ cm}^2\\)`, isCorrect: false, reason: "squares the sum of length and width" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the area of a rectangle with a length of ${length} centimeters (cm) and a width of ${width} cm?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `\\(${area} \\text{ cm}^2\\)`,
      explanation: `Choice ${correctOption.letter} is correct. The area is calculated as length × width = ${length} × ${width} = ${area} cm². Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 165c30c4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 50-80, width approx half]
* - Difficulty factors: [Rectangle area with larger numbers]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/