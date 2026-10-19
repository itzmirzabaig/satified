import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 347
*
* ORIGINAL ANALYSIS:
* - Number ranges: [width 7-12, length 50-80]
* - Difficulty factors: [Finding width from area, division]
* - Distractor patterns: [length, area × length, area - length]
* - Constraints: [Width = Area/Length, must divide evenly]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_347 = {
  metadata: {
    id: "347",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const width = getRandomInt(7, 12);
    const length = getRandomInt(50, 80);
    const area = length * width;

    // Each wrong choice is a real slip; the old area / 2 choice was not one,
    // and it ended in .5 whenever the area was odd.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const optionsData = [
      { text: width.toString(), isCorrect: true, reason: '' },
      { text: length.toString(), isCorrect: false, reason: `${length} inches is the length of the rectangle, which is given, not its width` },
      { text: fmt(area * length), isCorrect: false, reason: `it results from multiplying the area by the length, $${area}(${length})$, instead of dividing the area by the length` },
      { text: (area - length).toString(), isCorrect: false, reason: `it results from subtracting the length from the area, $${area} - ${length}$, instead of dividing the area by the length` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The area of a rectangle is $${area}$ square inches. The length of the rectangle is $${length}$ inches. What is the width, in inches, of this rectangle?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: width.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The area of a rectangle is its length times its width. If $w$ is the width, in inches, then $${length}w = ${area}$. Dividing both sides by ${length} gives $w = ${width}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
