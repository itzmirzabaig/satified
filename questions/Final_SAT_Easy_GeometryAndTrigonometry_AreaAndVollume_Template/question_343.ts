import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 343
*
* ORIGINAL ANALYSIS:
* - Number ranges: [width 6-9, length 7-12]
* - Difficulty factors: [Finding width from area, division]
* - Distractor patterns: [area-length, length², area×length]
* - Constraints: [Width = Area/Length, must divide evenly]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*
* FIXED:
* - Original distractors D1 (area−length) and D2 (length²) collide whenever
*   width === length + 1 (e.g. length 7, width 8 → both 49). Added a bounded
*   uniqueness retry (≤50) that redraws length/width until all four option
*   values are distinct, guaranteeing no DUP_OPTIONS for any draw.
* - Answer is integer by construction (area = length × width), so no float
*   artifacts. Explanation numbers all come from the same live variables and
*   the correct letter is taken from the shuffled array.
*/

export const generator_343 = {
  metadata: {
    id: "343",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let width = getRandomInt(6, 9);
    let length = getRandomInt(7, 12);
    let area = length * width;

    // Bounded retry: guarantee the four option values are all distinct.
    const optionVals = () => [
      width,                 // correct
      area - length,         // subtracts length from area instead of dividing
      length * length,       // squares the length
      area * length          // multiplies area by length
    ];
    let tries = 0;
    while (new Set(optionVals()).size < 4 && tries++ < 50) {
      width = getRandomInt(6, 9);
      length = getRandomInt(7, 12);
      area = length * width;
    }

    const optionsData = [
      { text: width.toString(), isCorrect: true },
      { text: (area - length).toString(), isCorrect: false, reason: "subtracts length from area instead of dividing" },
      { text: (length * length).toString(), isCorrect: false, reason: "squares the length" },
      { text: (area * length).toString(), isCorrect: false, reason: "multiplies area by length" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A rectangle has an area of $${area}$ square meters and a length of $${length}$ meters. What is the width, in meters, of the rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: width.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The width is found by dividing the area by the length: $${area} \\div ${length} = ${width}$ meters. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
