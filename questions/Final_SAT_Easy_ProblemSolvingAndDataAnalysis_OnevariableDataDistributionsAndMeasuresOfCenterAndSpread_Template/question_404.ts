import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 404
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [data values: single digit to 30s]
 * - Difficulty factors: [Calculating mean]
 * - Distractor patterns: [median, calculation error (÷4), max value]
 * - Constraints: [5 values, sum divisible by 5 for clean integer mean]
 * - Question type: [Raw Data→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_404 = {
  metadata: {
    id: "404",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Answer-first construction: pick the mean, so sum = 5 * mean is exact and
    // the reported mean is always a clean integer.
    let mean = 0;
    let sum = 0;
    let values: number[] = [];
    let median = 0;
    let maxVal = 0;
    let divErr = 0; // classic mistake: divide the sum by 4 instead of 5

    // Build a data set whose three natural distractors are all distinct from
    // one another and from the correct mean. Ranges are wide, so a collision is
    // rare; a bounded retry guarantees termination.
    let tries = 0;
    do {
      mean = getRandomInt(12, 20);
      sum = mean * 5;

      const v1 = getRandomInt(2, 6);
      const v2 = getRandomInt(7, 11);
      const v3 = getRandomInt(12, 16);
      const v4 = getRandomInt(17, 25);
      const v5 = sum - (v1 + v2 + v3 + v4); // guaranteed >= 2 across all ranges

      values = [v1, v2, v3, v4, v5].sort((a, b) => a - b);
      median = values[2];
      maxVal = values[4];
      divErr = Math.round(sum / 4);
      tries++;
    } while (
      tries < 50 &&
      new Set([mean, median, maxVal, divErr]).size !== 4
    );

    const optionsData = [
      { text: mean.toString(), isCorrect: true },
      { text: median.toString(), isCorrect: false },
      { text: divErr.toString(), isCorrect: false },
      { text: maxVal.toString(), isCorrect: false }
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
      explanation: `Choice ${correctOption.letter} is correct. The mean is the sum of the values divided by the number of values: (${values.join(' + ')}) / 5 = ${sum} / 5 = ${mean}. The value ${median} is the median (the middle value), ${maxVal} is the largest value, and ${divErr} comes from mistakenly dividing the sum by 4 instead of 5.`
    };
  }
};
