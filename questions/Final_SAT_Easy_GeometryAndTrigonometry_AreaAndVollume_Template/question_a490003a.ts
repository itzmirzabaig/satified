import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: a490003a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [width 5-10, difference 30-50]
* - Difficulty factors: [Word problem, finding length then area]
* - Distractor patterns: [width, 2×width, sum of sides]
* - Constraints: [Length = width + 40, Area = length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_a490003a = {
  metadata: {
    // id: "a490003a",
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

    const optionsData = [
      { text: width.toString(), isCorrect: false, reason: "states the width instead of the area" },
      { text: (width * 2).toString(), isCorrect: false, reason: "calculates twice the width" },
      { text: (width + length).toString(), isCorrect: false, reason: "adds length and width instead of multiplying" },
      { text: area.toString(), isCorrect: true }
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
      explanation: `Choice ${correctOption.letter} is correct. The length is ${width} + ${difference} = ${length} cm. The area is ${length} × ${width} = ${area} square centimeters. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 02b02213
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 3-6, width 7-12]
* - Difficulty factors: [Rectangle perimeter]
* - Distractor patterns: [half perimeter, calculation errors]
* - Constraints: [Perimeter = 2(length + width)]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/