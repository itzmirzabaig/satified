import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 341
*
* ORIGINAL ANALYSIS:
* - Number ranges: [triangle area: 60-100, square side: 3-9, not 4]
* - Difficulty factors: [Combining areas of different shapes, basic addition]
* - Distractor patterns: [adds side, adds 2 × side, adds perimeter instead of side²]
* - Constraints: [Square area = side², total = triangle + square]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_341 = {
  metadata: {
    id: "341",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const triangleArea = getRandomInt(60, 100);
    // Each wrong choice is a real slip in finding the area of the square; the
    // old ones were the total plus 10 and a rounded half of the triangle's
    // area. A side of 4 is skipped because 4 times 4 is also the perimeter.
    let squareSide = 4;
    while (squareSide === 4) squareSide = getRandomInt(3, 9);
    const squareArea = squareSide * squareSide;
    const totalArea = triangleArea + squareArea;

    const optionsData = [
      { text: (triangleArea + squareSide).toString(), isCorrect: false, reason: `it results from adding the side length of square S, ${squareSide}, to the area of triangle R instead of the area of square S` },
      { text: (triangleArea + 2 * squareSide).toString(), isCorrect: false, reason: `it results from using $2(${squareSide})$ as the area of square S; the area is $${squareSide}^2$, not $2(${squareSide})$` },
      { text: (triangleArea + 4 * squareSide).toString(), isCorrect: false, reason: `it results from adding the perimeter of square S, $4(${squareSide})$, to the area of triangle R instead of the area of square S` },
      { text: totalArea.toString(), isCorrect: true, reason: '' }
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
      explanation: `Choice ${correctOption.letter} is correct. The area of a square is the square of its side length, so the area of square S is $${squareSide}^2 = ${squareArea}$ square centimeters. The total area of triangle R and square S is $${triangleArea} + ${squareArea} = ${totalArea}$ square centimeters. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
