import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_bb560789 = {
  metadata: {
    // id: "bb560789",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const triangleArea = getRandomInt(60, 100);
    const squareSide = getRandomInt(3, 6);
    const squareArea = squareSide * squareSide;
    const totalArea = triangleArea + squareArea;

    const optionsData = [
      { text: (Math.floor(triangleArea / 2) + squareSide).toString(), isCorrect: false, reason: "adds half the triangle area to the square side" },
      { text: (triangleArea + squareSide).toString(), isCorrect: false, reason: "adds triangle area to square side instead of square area" },
      { text: (triangleArea + squareArea + 10).toString(), isCorrect: false, reason: "calculation error" },
      { text: totalArea.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Triangle R has an area of $${triangleArea}$ square centimeters $\\left(\\text{cm}^{2}\\right)$. Square S has side lengths of $${squareSide}\\text{ cm}$. What is the total area of triangle R and square S, in $\\text{cm}^{2}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: totalArea.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The area of square S is $${squareSide} \\times ${squareSide} = ${squareArea}$ cm². The total area is $${triangleArea} + ${squareArea} = ${totalArea}$ cm². Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: babd7461
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sideJK: 10-20, perimeterJKL: 30-50, sideRS: 100-150]
* - Difficulty factors: [Similar triangles, scale factor from sides applied to perimeter]
* - Distractor patterns: [multiplies perimeter by side, squares the scale factor]
* - Constraints: [Scale factor = RS/JK, RST perimeter = scale factor × JKL perimeter]
* - Question type: [Has Figure (Mafs), Multiple Choice Text]
* - Figure generation: [Similar triangles with labels]
*/