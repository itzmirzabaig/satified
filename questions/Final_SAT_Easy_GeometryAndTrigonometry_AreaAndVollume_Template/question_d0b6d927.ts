import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: d0b6d927
*
* ORIGINAL ANALYSIS:
* - Number ranges: [width 6-9, length 7-12]
* - Difficulty factors: [Finding width from area, division]
* - Distractor patterns: [area-length, length², area×length]
* - Constraints: [Width = Area/Length, must divide evenly]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_d0b6d927 = {
  metadata: {
    // id: "d0b6d927",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const width = getRandomInt(6, 9);
    const length = getRandomInt(7, 12);
    const area = length * width;

    const optionsData = [
      { text: width.toString(), isCorrect: true },
      { text: (area - length).toString(), isCorrect: false, reason: "subtracts length from area instead of dividing" },
      { text: (length * length).toString(), isCorrect: false, reason: "squares the length" },
      { text: (area * length).toString(), isCorrect: false, reason: "multiplies area by length" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A rectangle has an area of $${area}$ square meters and a length of $${length}$ meters. What is the width, in meters, of the rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: width.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The width is found by dividing the area by the length: $${area} \\div ${length} = ${width}$ meters. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 0d43db90
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side lengths: 3-9]
* - Difficulty factors: [Triangle perimeter, solving for missing side]
* - Distractor patterns: [repeats side AB, repeats side AC, adds two sides]
* - Constraints: [BC = Perimeter - AB - AC]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/