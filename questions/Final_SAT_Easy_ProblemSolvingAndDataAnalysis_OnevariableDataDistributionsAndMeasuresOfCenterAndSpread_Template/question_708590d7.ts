import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 708590d7
 *
 * ORIGINAL ANALYSIS: [Comparing means of two data sets]
 * - Number ranges: [data values: 1-10 range, Easy difficulty]
 * - Difficulty factors: [Comparing means of two given data sets]
 * - Constraints: [Easy - Set A has higher values than Set B, 6 values each, means clearly different]
 * - Question type: [Raw Data → Multiple Choice Text]
 */

export const generator_708590d7 = {
  metadata: {
    // id: "708590d7",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Set A: 6 values in a higher range
    const aBase = getRandomInt(3, 6);
    const setA = [
      aBase, aBase, aBase + getRandomInt(1,2), aBase + getRandomInt(1,2),
      aBase + getRandomInt(2,3), aBase + getRandomInt(2,3)
    ].sort((a, b) => a - b);

    // Set B: 6 values clearly lower than Set A
    const bBase = getRandomInt(1, aBase - 2);
    const setB = [
      bBase, bBase + getRandomInt(1,2), bBase + getRandomInt(1,2),
      bBase + getRandomInt(1,2), bBase + getRandomInt(2,3), bBase + getRandomInt(2,3)
    ].sort((a, b) => a - b);

    const meanA = (setA.reduce((a, b) => a + b, 0) / setA.length);
    const meanB = (setB.reduce((a, b) => a + b, 0) / setB.length);
    const meanAStr = meanA.toFixed(1);
    const meanBStr = meanB.toFixed(1);

    const optionsData = [
      { text: `The mean of each data set is ${Math.min(Math.round(meanA), Math.round(meanB))}.`, isCorrect: false },
      { text: `The mean of each data set is ${Math.max(Math.round(meanA), Math.round(meanB))}.`, isCorrect: false },
      { text: "The mean of data set A is less than the mean of data set B.", isCorrect: false },
      { text: "The mean of data set A is greater than the mean of data set B.", isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Data set A: ${setA.join(', ')}\nData set B: ${setB.join(', ')}\n\nWhich of the following statements correctly compares the means of data set A and data set B?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The mean of A is ${meanAStr}, and the mean of B is ${meanBStr}. Therefore, the mean of data set A is greater.`
    };
  }
};

