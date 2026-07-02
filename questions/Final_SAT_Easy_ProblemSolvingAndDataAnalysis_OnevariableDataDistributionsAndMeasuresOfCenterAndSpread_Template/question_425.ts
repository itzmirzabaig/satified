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
    const optionsData = [
      { text: `${median - 2}, ${median - 2}, ${median - 1}, ${median - 1}, ${median}, ${median}`, isCorrect: false },
      { text: `${median - 1}, ${median - 1}, ${median}, ${median}, ${median + 1}, ${median + 1}`, isCorrect: true },
      { text: `${median}, ${median}, ${median + 1}, ${median + 1}, ${median + 2}, ${median + 2}`, isCorrect: false },
      { text: `${median + 1}, ${median + 1}, ${median + 2}, ${median + 2}, ${median + 5}, ${median + 5}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Which of the following lists represents a data set that has the same median as the data set shown?\n\n${originalSet.join(', ')}`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The original median is ${median}. For an even data set, the median is the average of the two middle values. In choice ${correctOption.letter}, the middle values are ${median} and ${median}, giving a median of ${median}.`
    };
  }
};
