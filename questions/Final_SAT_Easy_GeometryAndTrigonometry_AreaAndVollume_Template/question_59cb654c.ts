import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 59cb654c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [base: 7-10, area: 49-100]
* - Difficulty factors: [Finding side from area, square root]
* - Distractor patterns: [area/4, area itself, area×2]
* - Constraints: [Side = √Area, area must be perfect square]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_59cb654c = {
  metadata: {
    // id: "59cb654c",
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

/**
* Question ID: 2b41a4c4
*
* ORIGINAL ANALYSIS:
* - Number ranges: [dimensions: 8-15]
* - Difficulty factors: [Volume of rectangular prism, triple multiplication]
* - Distractor patterns: [No options - fill in blank]
* - Constraints: [Volume = l × w × h]
* - Question type: [No figure, Fill in the blank]
* - Figure generation: [None]
*/