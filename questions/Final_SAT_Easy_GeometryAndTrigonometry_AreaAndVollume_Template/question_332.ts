import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 332
*
* ORIGINAL ANALYSIS:
* - Number ranges: [side: 45-65 (double-digit, results in 4-digit square)]
* - Difficulty factors: [Square area formula, squaring double-digit numbers]
* - Distractor patterns: [2×side, perimeter (4×side), perimeter squared]
* - Constraints: [Area = side², clean integer answer]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_332 = {
  metadata: {
    id: "332",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const side = getRandomInt(45, 65);
    const area = side * side;
    const fmt = (n: number) => n.toLocaleString('en-US');

    const optionsData = [
      { text: (side * 2).toString(), isCorrect: false, reason: "multiplies the side length by 2 instead of by itself" },
      { text: (side * 4).toString(), isCorrect: false, reason: "is the perimeter of the square, 4 times the side length, not its area" },
      { text: fmt(area), isCorrect: true, reason: '' },
      { text: fmt((side * 4) * (side * 4)), isCorrect: false, reason: "squares the perimeter of the square instead of the side length" }
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
      correctAnswer: fmt(area),
      explanation: `Choice ${correctOption.letter} is correct. The area of a square is calculated by squaring the side length: $${side}^2 = ${fmt(area)}$. Choice ${incorrectOptions[0].letter} is incorrect because it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because it ${incorrectOptions[2].reason}.`
    };
  }
};
