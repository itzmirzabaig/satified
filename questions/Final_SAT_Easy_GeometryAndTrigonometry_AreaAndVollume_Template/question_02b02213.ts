import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 02b02213
*
* ORIGINAL ANALYSIS:
* - Number ranges: [length 3-6, width 7-12]
* - Difficulty factors: [Rectangle perimeter]
* - Distractor patterns: [half perimeter, calculation errors]
* - Constraints: [Perimeter = 2(length + width)]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_02b02213 = {
  metadata: {
    // id: "02b02213",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(3, 6);
    const width = getRandomInt(7, 12);
    const perimeter = 2 * (length + width);

    const optionsData = [
      { text: (length + width).toString(), isCorrect: false, reason: "adds length and width (half the perimeter)" },
      { text: (perimeter - 9).toString(), isCorrect: false, reason: "calculation error" },
      { text: (perimeter - 4).toString(), isCorrect: false, reason: "calculation error" },
      { text: perimeter.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `What is the perimeter, in inches, of a rectangle with a length of $${length}$ inches and a width of $${width}$ inches?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: perimeter.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The perimeter is $2(${length} + ${width}) = 2(${length + width}) = ${perimeter}$ inches. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};