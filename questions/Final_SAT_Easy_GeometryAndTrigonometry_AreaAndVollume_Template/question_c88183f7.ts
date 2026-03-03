import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: c88183f7
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 10-20, width 4-8]
* - Difficulty factors: [Rectangle perimeter formula]
* - Distractor patterns: [2×width, 2×length, 4×length]
* - Constraints: [Perimeter = 2(length + width)]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_c88183f7 = {
  metadata: {
    // id: "c88183f7",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(10, 20);
    const width = getRandomInt(4, 8);
    const perimeter = 2 * (length + width);

    const optionsData = [
      { text: (2 * width).toString(), isCorrect: false, reason: "calculates only 2 times the width" },
      { text: (2 * length).toString(), isCorrect: false, reason: "calculates only 2 times the length" },
      { text: perimeter.toString(), isCorrect: true },
      { text: (4 * length).toString(), isCorrect: false, reason: "treats as square with side equal to length" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A rectangle has a length of $${length}$ and a width of $${width}$. What is the perimeter of the rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: perimeter.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The perimeter is $2(${length} + ${width}) = 2(${length + width}) = ${perimeter}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 50774285
*
* ORIGINAL ANALYSIS:
* - Number ranges: [dimensions 10-25, height 10-25]
* - Difficulty factors: [Volume to height, division of large numbers]
* - Distractor patterns: [miscalculation, close to base area, base area]
* - Constraints: [Height = Volume / (length × width)]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/