import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 12dae628
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: single digit to 30s]
 * - Difficulty factors: [Calculating mean]
 * - Distractor patterns: [14=median, 17=calculation error, 32=max]
 * - Constraints: [5 values, sum divisible by 5 for clean mean]
 * - Question type: [Raw Data→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_12dae628 = {
  metadata: {
    // id: "12dae628",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const mean = getRandomInt(12, 20);
    const sum = mean * 5;

    const v1 = getRandomInt(2, 6);
    const v2 = getRandomInt(7, 11);
    const v3 = getRandomInt(12, 16);
    const v4 = getRandomInt(17, 25);
    const v5 = sum - (v1 + v2 + v3 + v4);
    const values = [v1, v2, v3, v4, v5].sort((a, b) => a - b);

    const optionsData = [
      { text: values.toString(), isCorrect: false },
      { text: mean.toString(), isCorrect: true },
      { text: (mean + 1).toString(), isCorrect: false },
      { text: values.toString(), isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `What is the mean of the data shown?\n\n${values.join(', ')}`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: mean.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The mean is the sum of the values divided by the number of values: (${values.join(' + ')}) / 5 = ${sum} / 5 = ${mean}.`
    };
  }
};

/**
 * Question ID: ea95087d
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [employee counts: 100-400 range]
 * - Difficulty factors: [Reading table, subtraction]
 * - Distractor patterns: [83=wrong order, 152=difference, 235=correct, 495=sum]
 * - Constraints: [Warehouse > Supermarket]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */