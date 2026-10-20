import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 418
 *
 * ORIGINAL ANALYSIS: [Comparing means of two data sets]
 * - Number ranges: [data values: 1-10 range, Easy difficulty]
 * - Difficulty factors: [Comparing means of two given data sets]
 * - Constraints: [Easy - Set A has higher values than Set B, 6 values each, means clearly different]
 * - Question type: [Raw Data → Multiple Choice Text]
 */

export const generator_418 = {
  metadata: {
    id: "418",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Set A: 6 values in a higher range
    const aBase = getRandomInt(3, 6);
    const high = [
      aBase, aBase, aBase + getRandomInt(1,2), aBase + getRandomInt(1,2),
      aBase + getRandomInt(2,3), aBase + getRandomInt(2,3)
    ].sort((a, b) => a - b);

    // Set B: 6 values clearly lower than Set A
    const bBase = getRandomInt(1, aBase - 2);
    const low = [
      bBase, bBase + getRandomInt(1,2), bBase + getRandomInt(1,2),
      bBase + getRandomInt(1,2), bBase + getRandomInt(2,3), bBase + getRandomInt(2,3)
    ].sort((a, b) => a - b);

    // Data set A used to be the larger one on every draw; now either set can be.
    const aIsHigh = Math.random() < 0.5;
    const setA = aIsHigh ? high : low;
    const setB = aIsHigh ? low : high;
    const sumA = setA.reduce((a, b) => a + b, 0);
    const sumB = setB.reduce((a, b) => a + b, 0);
    const meanA = sumA / 6;
    const meanB = sumB / 6;
    // A mean written exactly when it ends within two decimal places, else approximately.
    const meanTeX = (sum: number) => { const m = sum / 6; const r = Math.round(m * 100) / 100; return `\\frac{${sum}}{6} ${Math.abs(m - r) < 1e-9 ? '=' : '\\approx'} ${r}`; };
    // The low set's mean rounds at least 2 below the high set's, so these differ.
    const rLow = Math.round(Math.min(meanA, meanB)), rHigh = Math.round(Math.max(meanA, meanB));

    const optionsData = [
      { text: `The mean of each data set is ${rLow}.`, isCorrect: false, reason: `the two data sets do not have the same mean` },
      { text: `The mean of each data set is ${rHigh}.`, isCorrect: false, reason: `the two data sets do not have the same mean` },
      { text: "The mean of data set A is less than the mean of data set B.", isCorrect: !aIsHigh, reason: aIsHigh ? `the mean of data set A, ${Math.round(meanA * 100) / 100}, is greater than the mean of data set B, ${Math.round(meanB * 100) / 100}` : '' },
      { text: "The mean of data set A is greater than the mean of data set B.", isCorrect: aIsHigh, reason: aIsHigh ? '' : `the mean of data set A, ${Math.round(meanA * 100) / 100}, is less than the mean of data set B, ${Math.round(meanB * 100) / 100}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `Data set A: ${setA.join(', ')}\nData set B: ${setB.join(', ')}\n\nWhich of the following statements correctly compares the means of data set A and data set B?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The mean of a data set is the sum of the values divided by the number of values. The mean of data set A is $${meanTeX(sumA)}$, and the mean of data set B is $${meanTeX(sumB)}$. Therefore, the mean of data set A is ${aIsHigh ? 'greater' : 'less'} than the mean of data set B. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};

