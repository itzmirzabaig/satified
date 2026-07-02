import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 334
*
* ORIGINAL ANALYSIS:
* - Number ranges: [base: 7-10, area: 49-100]
* - Difficulty factors: [Finding side from area, square root]
* - Distractor patterns: [area/4, area itself, area×2]
* - Constraints: [Side = √Area, area must be perfect square]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_334 = {
  metadata: {
    id: "334",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(7, 10);
    const area = base * base;
    const side = Math.sqrt(area);

    const optionsData = [
      { text: side.toString(), isCorrect: true },
      { text: (area / 4).toString(), isCorrect: false, reason: "divides area by 4 (confusing with perimeter logic)" },
      { text: area.toString(), isCorrect: false, reason: "states the area instead of the side length" },
      { text: (area * 2).toString(), isCorrect: false, reason: "doubles the area" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The area of a square is $${area}$ square inches. What is the side length, in inches, of this square?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: side.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The side length of a square is the square root of its area: $\\sqrt{${area}} = ${side}$ inches. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
