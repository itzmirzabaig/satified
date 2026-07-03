import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 329
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 3-8, width 2-6]
* - Difficulty factors: [Basic rectangle area]
* - Distractor patterns: [adds length and width, perimeter, squares sum]
* - Constraints: [Area = length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_329 = {
  metadata: {
    id: "329",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw until the four option values (sum, area, perimeter, sum-squared)
    // are pairwise distinct. The main collision is area == perimeter
    // (e.g. 4x4 -> 16 & 16, or 3x6 -> 18 & 18); the bounded retry removes it.
    let length = getRandomInt(3, 8);
    let width = getRandomInt(2, 6);
    let tries = 0;
    while (tries++ < 50) {
      const a = length * width;
      const p = 2 * (length + width);
      const s = length + width;
      const sq = s * s;
      const vals = [s, a, p, sq];
      const allDistinct = new Set(vals).size === vals.length;
      if (allDistinct) break;
      length = getRandomInt(3, 8);
      width = getRandomInt(2, 6);
    }

    const area = length * width;
    const perimeter = 2 * (length + width);
    const sum = length + width;

    const optionsData = [
      { text: `\\(${sum} \\text{ cm}^2\\)`, isCorrect: false, reason: "adds the length and width instead of multiplying them" },
      { text: `\\(${area} \\text{ cm}^2\\)`, isCorrect: true },
      { text: `\\(${perimeter} \\text{ cm}^2\\)`, isCorrect: false, reason: "finds the perimeter instead of the area" },
      { text: `\\(${sum * sum} \\text{ cm}^2\\)`, isCorrect: false, reason: "squares the sum of the length and width" }
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
      explanation: `Choice ${correctOption.letter} is correct. The area of a rectangle is length × width = ${length} × ${width} = ${area} cm². Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
