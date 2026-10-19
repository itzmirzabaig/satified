import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 339
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sides 3-8, ensuring valid triangle]
* - Difficulty factors: [Triangle perimeter, solving for third side]
* - Distractor patterns: [subtracts only one given side, adds given sides]
* - Constraints: [Third side = perimeter - side1 - side2, must satisfy triangle inequality]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_339 = {
  metadata: {
    id: "339",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The old wrong choices included side2 - side1, which was 0 or negative
    // when side1 >= side2, and the sum of every number in the problem. Each
    // wrong choice is now a real slip. Redraw until the four values differ.
    let side1 = 3, side2 = 4, side3 = 5;
    do {
      side1 = getRandomInt(3, 6);
      side2 = getRandomInt(4, 8);
      side3 = getRandomInt(Math.abs(side1 - side2) + 1, side1 + side2 - 1);
    } while (new Set([side3, side2 + side3, side1 + side3, side1 + side2]).size < 4);
    const perimeter = side1 + side2 + side3;

    const optionsData = [
      { text: (perimeter - side1).toString(), isCorrect: false, reason: `it results from subtracting only ${side1} from the perimeter; both known sides, ${side1} and ${side2}, must be subtracted` },
      { text: side3.toString(), isCorrect: true, reason: '' },
      { text: (side1 + side2).toString(), isCorrect: false, reason: `it is the sum of the two given sides, $${side1} + ${side2}$, not the length of the third side` },
      { text: (perimeter - side2).toString(), isCorrect: false, reason: `it results from subtracting only ${side2} from the perimeter; both known sides, ${side1} and ${side2}, must be subtracted` }
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
      explanation: `Choice ${correctOption.letter} is correct. The perimeter of a triangle is the sum of the lengths of its three sides. If $x$ is the length of the third side, then $${side1} + ${side2} + x = ${perimeter}$, so $x = ${perimeter} - ${side1} - ${side2} = ${side3}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
