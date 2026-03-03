import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: 0e40dfb0
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length: 2-5, width: 30-50]
* - Difficulty factors: [Identifying correct area formula vs perimeter]
* - Distractor patterns: [perimeter, twice the area, sum of sides]
* - Constraints: [Area expression is length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_0e40dfb0 = {
  metadata: {
    // id: "0e40dfb0",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(2, 5);
    const width = getRandomInt(30, 50);

    const optionsData = [
      { text: `2(${length}+${width})`, isCorrect: false, reason: "represents the perimeter, not the area" },
      { text: `2(${length} \\cdot ${width})`, isCorrect: false, reason: "is twice the area" },
      { text: `${length}+${width}`, isCorrect: false, reason: "represents the sum of sides (half perimeter), not the area" },
      { text: `${length} \\cdot ${width}`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A rectangle has a length of $${length}$ units and a width of $${width}$ units. Which expression gives the area, in square units, of this rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `${length} \\cdot ${width}`,
      explanation: `Choice ${correctOption.letter} is correct. The area of a rectangle is found by multiplying length by width: $${length} \\times ${width}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 689abc2a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sideTU: 4-8, scaleFactor: 2-4, perimeterTUV: 30-60]
* - Difficulty factors: [Similar triangles with table, scale factor from perimeters]
* - Distractor patterns: [divides by scale factor, repeats side length, adds perimeter to side]
* - Constraints: [Scale factor = XYZ perimeter / TUV perimeter, XY = TU × scale factor]
* - Question type: [Has Table, Multiple Choice Text]
* - Figure generation: [HTML Table]
*/