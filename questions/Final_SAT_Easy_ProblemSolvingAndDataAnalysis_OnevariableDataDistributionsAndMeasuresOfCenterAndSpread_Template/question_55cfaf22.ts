import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 55cfaf22
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base values: 8-20, outlier: 25-40]
 * - Difficulty factors: [Comparing means, outlier effect]
 * - Distractor patterns: [A=X>Y, B=X < Y]
 * - Constraints: [Outlier must pull mean up]
 * - Question type: [Raw Data→Multiple Choice Text]
 * - Figure generation: [No figure]
 */

export const generator_55cfaf22 = {
  metadata: {
    // id: "55cfaf22",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate base set with 4 values
    const baseStart = getRandomInt(8, 15);
    const setX = [baseStart, baseStart + 2, baseStart + 4, baseStart + 6];
    // Generate outlier that's significantly larger
    const outlier = baseStart + getRandomInt(15, 25);
    const setY = [...setX, outlier];

    const optionsData = [
      { text: "The mean of data set X is greater than the mean of data set Y.", isCorrect: false },
      { text: "The mean of data set X is less than the mean of data set Y.", isCorrect: true },
      { text: "The means of data set X and data set Y are equal.", isCorrect: false },
      { text: "There is not enough information to compare the means.", isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Data set X: ${setX.join(', ')}\nData set Y: ${setY.join(', ')}\n\nWhich statement correctly compares the mean of data set X and the mean of data set Y?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Set Y contains all values of X plus a value (${outlier}) that is greater than any value in X, thus the mean of Y must be greater.`
    };
  }
};

/**
 * Question ID: 820d7a73
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [group numbers 1-6, cans 10-50 range]
 * - Difficulty factors: [Reading specific bar from bar graph]
 * - Constraints: [Group 6 must have visible value]
 * - Question type: [Bar Graph→Fill in Blank]
 * - Figure generation: [Mafs bar chart]
 */
