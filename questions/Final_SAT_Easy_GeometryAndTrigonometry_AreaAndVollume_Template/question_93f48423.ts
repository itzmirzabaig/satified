import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 93f48423
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length: 5-9, width: 4-8 (single-digit, simple multiplication)]
* - Difficulty factors: [Basic rectangle area formula, single-digit multiplication]
* - Distractor patterns: [adds length+width, random miscalculation, doubles the area]
* - Constraints: [Area = length × width, clean integer answer]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_93f48423 = {
  metadata: {
    // id: "93f48423",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(5, 9);
    const width = getRandomInt(4, 8);
    const area = length * width;

    const optionsData = [
      { text: (length + width).toString(), isCorrect: false, reason: "adds length and width instead of multiplying (semi-perimeter)" },
      { text: (length * width + 8).toString(), isCorrect: false, reason: "random miscalculation" },
      { text: area.toString(), isCorrect: true },
      { text: (area * 2).toString(), isCorrect: false, reason: "doubles the correct area" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the area, in square inches, of a rectangle with a length of $${length}$ inches and a width of $${width}$ inches?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: area.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The area of a rectangle is found by multiplying the length by the width. Therefore, the area is $${length} \\times ${width} = ${area}$ square inches. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 5252e606
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side: 45-65 (double-digit, results in 4-digit square)]
* - Difficulty factors: [Square area formula, squaring double-digit numbers]
* - Distractor patterns: [2×side, perimeter (4×side), perimeter squared]
* - Constraints: [Area = side², clean integer answer]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/