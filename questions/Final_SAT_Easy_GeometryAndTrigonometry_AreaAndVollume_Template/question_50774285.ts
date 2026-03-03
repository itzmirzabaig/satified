import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_50774285 = {
  metadata: {
    // id: "50774285",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(10, 20);
    const width = getRandomInt(6, 12);
    const height = getRandomInt(10, 20);
    const volume = length * width * height;
    const baseArea = length * width;

    const optionsData = [
      { text: height.toString(), isCorrect: true },
      { text: (height + 9).toString(), isCorrect: false, reason: "results from miscalculation in division" },
      { text: (baseArea - 8).toString(), isCorrect: false, reason: "close to base area but incorrect" },
      { text: baseArea.toString(), isCorrect: false, reason: "calculates base area instead of height" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Each base of a right rectangular prism has a length of $${length}$ inches and a width of $${width}$ inches. The prism has a volume of $${volume}$ cubic inches. What is the height, in inches, of the prism?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: height.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The base area is $${length} \\times ${width} = ${baseArea}$. The height is $${volume} \\div ${baseArea} = ${height}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 29e9b28c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [perimeter 18-26, sides 6-12]
* - Difficulty factors: [Triangle perimeter with figure, solving for z]
* - Distractor patterns: [repeats side y, repeats side x, adds x and y]
* - Constraints: [z = perimeter - x - y]
* - Question type: [Has Figure (Mafs), Multiple Choice Text]
* - Figure generation: [Triangle with labeled sides]
*/