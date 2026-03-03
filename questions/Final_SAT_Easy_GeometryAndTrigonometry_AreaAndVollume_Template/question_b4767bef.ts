import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: b4767bef
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sides 3-8, ensuring valid triangle]
* - Difficulty factors: [Triangle perimeter, solving for third side]
* - Distractor patterns: [subtracts given sides, adds given sides, adds all numbers]
* - Constraints: [Third side = perimeter - side1 - side2, must satisfy triangle inequality]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_b4767bef = {
  metadata: {
    // id: "b4767bef",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const side1 = getRandomInt(3, 6);
    const side2 = getRandomInt(4, 8);
    const side3 = getRandomInt(Math.abs(side1 - side2) + 1, side1 + side2 - 1);
    const perimeter = side1 + side2 + side3;

    const optionsData = [
      { text: (side2 - side1).toString(), isCorrect: false, reason: "subtracts the two given sides" },
      { text: side3.toString(), isCorrect: true },
      { text: (side1 + side2).toString(), isCorrect: false, reason: "adds the two given sides" },
      { text: (side1 + side2 + perimeter).toString(), isCorrect: false, reason: "adds all numbers in the problem" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The lengths of two sides of a triangle are $${side1}$ centimeters and $${side2}$ centimeters. If the perimeter of the triangle is $${perimeter}$ centimeters, what is the length, in centimeters, of the third side of this triangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: side3.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The third side is found by subtracting the two known sides from the perimeter: $${perimeter} - ${side1} - ${side2} = ${side3}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: c88183f7
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 10-20, width 4-8]
* - Difficulty factors: [Rectangle perimeter formula]
* - Distractor patterns: [2×width, 2×length, 4×length]
* - Constraints: [Perimeter = 2(length + width)]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/