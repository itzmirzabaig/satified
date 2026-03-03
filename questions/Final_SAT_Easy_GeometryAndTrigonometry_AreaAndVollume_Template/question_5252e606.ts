import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_5252e606 = {
  metadata: {
    // id: "5252e606",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const side = getRandomInt(45, 65);
    const area = side * side;

    const optionsData = [
      { text: (side * 2).toString(), isCorrect: false, reason: "multiplies side by 2 instead of squaring" },
      { text: (side * 4).toString(), isCorrect: false, reason: "calculates perimeter (4 × side) instead of area" },
      { text: area.toString(), isCorrect: true },
      { text: ((side * 4) * (side * 4)).toString(), isCorrect: false, reason: "squares the perimeter instead of the side" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The side length of a square is $${side}$ centimeters $(\\text{cm})$. What is the area, in $\\text{cm}^2$, of the square?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: area.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The area of a square is calculated by squaring the side length: $${side}^2 = ${area}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: bb560789
*
* ORIGINAL ANALYSIS:
* - Number ranges: [triangle area: 60-100, square side: 3-6 (simple values)]
* - Difficulty factors: [Combining areas of different shapes, basic addition]
* - Distractor patterns: [adds half triangle to side, adds triangle area to side]
* - Constraints: [Square area = side², total = triangle + square]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/