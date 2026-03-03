import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: c178d4da
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values: 30, 34, 38, 42, 46 - evenly spaced by 4, frequencies vary 2-9]
 * - Difficulty factors: [Weighted mean calculation, comparing two distributions with same values but different weights]
 * - Distractor patterns: [C: means equal (if student doesn't calculate), D: not enough info (if student is confused)]
 * - Constraints: [Must calculate weighted mean for both data sets]
 * - Question type: [Table→Multiple Choice Text]
 */

export const generator_c178d4da = {
  metadata: {
    // id: "c178d4da",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base values (evenly spaced)
    const startValue = getRandomInt(10, 40);
    const step = getRandomInt(3, 6); // Step of 3-6 between values
    const values = [0, 1, 2, 3, 4].map(i => startValue + i * step);
    
    // STEP 2: Generate frequencies - make A skew toward higher values, B toward lower
    // Data set A: higher frequencies for higher values
    const freqA = [
      getRandomInt(1, 3),  // low value
      getRandomInt(2, 4),
      getRandomInt(3, 5),  // middle
      getRandomInt(5, 8),  // higher
      getRandomInt(7, 11)  // highest
    ];
    
    // Data set B: higher frequencies for lower values (inverse pattern)
    const freqB = [
      getRandomInt(6, 10), // low value - high freq
      getRandomInt(5, 8),
      getRandomInt(3, 5),  // middle - same
      getRandomInt(2, 4),
      getRandomInt(1, 3)   // highest - low freq
    ];
    
    // STEP 3: Calculate means
    const sumA = values.reduce((acc, val, i) => acc + val * freqA[i], 0);
    const countA = freqA.reduce((a, b) => a + b, 0);
    const meanA = sumA / countA;
    
    const sumB = values.reduce((acc, val, i) => acc + val * freqB[i], 0);
    const countB = freqB.reduce((a, b) => a + b, 0);
    const meanB = sumB / countB;
    
    // STEP 4: Build table HTML
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto;">
  <thead>
    <tr>
      <th style="border: 1px solid currentColor; padding: 8px;">Value</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Data set A frequency</th>
      <th style="border: 1px solid currentColor; padding: 8px;">Data set B frequency</th>
    </tr>
  </thead>
  <tbody>
    ${values.map((v, i) => `
    <tr>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${v}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${freqA[i]}</td>
      <td style="border: 1px solid currentColor; padding: 8px; text-align: center;">${freqB[i]}</td>
    </tr>`).join('')}
  </tbody>
</table>`;
    
    // STEP 5: Create options
    const comparison = meanA > meanB ? "greater than" : "less than";
    const correctText = meanA > meanB 
      ? "The mean of data set A is greater than the mean of data set B."
      : "The mean of data set A is less than the mean of data set B.";
    
    const optionsData = [
      { text: `The mean of data set A is greater than the mean of data set B.`, isCorrect: meanA > meanB },
      { text: `The mean of data set A is less than the mean of data set B.`, isCorrect: meanA < meanB },
      { text: `The mean of data set A is equal to the mean of data set B.`, isCorrect: false },
      { text: `There is not enough information to compare the means of the data sets.`, isCorrect: false }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 7: Return question data
    return {
      questionText: "Data set A and data set B each consist of values. The table shows the frequencies of the values for each data set. Which of the following statements best compares the means of the two data sets?",
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The mean is the sum of products (value × frequency) divided by the total count. Data set A's mean is ${meanA.toFixed(2)} (${sumA}/${countA}), while data set B's mean is ${meanB.toFixed(2)} (${sumB}/${countB}). Therefore, the mean of data set A is ${comparison} the mean of data set B. Choice ${incorrectOptions[0].letter} is incorrect. Choice ${incorrectOptions[1].letter} is incorrect. Choice ${incorrectOptions[2].letter} is incorrect.`
    };
  }
};

/**
 * Question ID: 457d2f2c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [27 data points, mean=33, median=33 (the 14th value), adjustment of ±7]
 * - Difficulty factors: [Understanding effect of linear transformations on statistics, recognizing median/mean vs spread]
 * - Distractor patterns: [Student may think all statistics change, may not realize median stays the same]
 * - Constraints: [13 values below median, 13 above, sum changes cancel out, spread increases]
 * - Question type: [Text→Multiple Choice Text]
 */

// File: generators/onevariable-data-distributions/457d2f2c.ts