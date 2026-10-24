import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 425
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: 5-25]
 * - Difficulty factors: [Finding matching median across data sets]
 * - Distractor patterns: [different medians]
 * - Constraints: [Original has odd count, options have even count]
 * - Question type: [Raw Data→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_425 = {
  metadata: {
    id: "425",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate a random median
    const median = getRandomInt(7, 15);
    // Generate original set with the target median
    const originalSet = [
      median - 3,
      median - 2,
      median - 1,
      median,
      median + 2,
      median + 5,
      median + 10
];

    // Generate options with different medians
    // Each list has six values, so its median is the mean of the 3rd and 4th.
    const lists = [
      [median - 2, median - 2, median - 1, median - 1, median, median],
      [median - 1, median - 1, median, median, median + 1, median + 1],
      [median, median, median + 1, median + 1, median + 2, median + 2],
      [median + 1, median + 1, median + 2, median + 2, median + 5, median + 5]
    ];
    const optionsData = lists.map(l => {
      const m = (l[2] + l[3]) / 2;
      return {
        text: l.join(', '),
        isCorrect: m === median,
        reason: m === median ? '' : `the two middle values of this list are ${l[2]} and ${l[3]}, so its median is ${m}, not ${median}`
      };
    });

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Which of the following lists represents a data set that has the same median as the data set shown?\n\n${originalSet.join(', ')}`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The data set shown has 7 values listed in order, so its median is the 4th value, ${median}. Each list in the choices has 6 values listed in order, so its median is the mean of the 3rd and 4th values. In choice ${correctOption.letter}, these values are ${median} and ${median}, so the median is ${median}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
