import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 190be2fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [target mean ~42, sum of 9 values = 378, 10th value must make total sum divisible by 10, range 42 < x < 60]
 * - Difficulty factors: [Multi-step: find sum, determine divisibility constraint, find valid integer in range]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [10th value > 42, < 60, sum of all 10 must be divisible by 10, value must be integer]
 * - Question type: [Text→Fill in the blank]
 */

export const generator_190be2fc = {
  metadata: {
    // id: "190be2fc",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base values similar to original (43, 45, 44, 43, 38, 39, 40, 46, 40)
    // These are 9 values with mean 42
    let valid = false;
    let baseValues: number[] = [];
    let sumOfNine = 0;
    let meanOfNine = 0;
    let finalX = 0;
    let attempts = 0;
    
    // Use while loop instead of recursion to find valid configuration
    while (!valid && attempts < 100) {
      baseValues = [
        getRandomInt(36, 42), // ~38-40 range
        getRandomInt(36, 42),
        getRandomInt(38, 44), // ~39-43 range
        getRandomInt(38, 44),
        getRandomInt(40, 46), // ~40-46 range
        getRandomInt(40, 46),
        getRandomInt(40, 46),
        getRandomInt(42, 48), // ~43-46 range
        getRandomInt(42, 48)
      ];
      
      sumOfNine = baseValues.reduce((a, b) => a + b, 0);
      meanOfNine = sumOfNine / 9;
      
      // Find valid x in range (meanOfNine, 60) where (sumOfNine + x) % 10 === 0
      const targetSumMod = (10 - (sumOfNine % 10)) % 10;
      const candidates: number[] = [];
      for (let candidate = Math.floor(meanOfNine) + 1; candidate < 60; candidate++) {
        if ((sumOfNine + candidate) % 10 === 0) {
          candidates.push(candidate);
        }
      }
      
      if (candidates.length > 0) {
        finalX = candidates[0];
        valid = true;
      }
      attempts++;
    }
    
    // Fallback if no valid configuration found
    if (!valid) {
      baseValues = [38, 39, 40, 40, 43, 43, 44, 45, 46];
      sumOfNine = 378;
      meanOfNine = 42;
      finalX = 52;
    }
    
    // STEP 3: Format the list of 9 values
    const valuesList = baseValues.join(", ");
    
    // STEP 4: Return question data
    return {
      questionText: `Data set A consists of positive integers less than 60. The list shown gives 9 of the integers from data set A.\n\n${valuesList}\n\nThe mean of these integers is ${meanOfNine.toFixed(1).replace('.0', '')}. If the mean of data set A is an integer that is greater than ${meanOfNine.toFixed(1).replace('.0', '')}, what is the value of the largest integer from data set A?`,
      figureCode: null,
      options: null,
      correctAnswer: finalX.toString(),
      explanation: `The correct answer is ${finalX}. The mean of a data set is calculated by dividing the sum of the data values by the number of values. It's given that data set A consists of 10 values, 9 of which are shown. Let x represent the 10th data value in data set A. The mean of data set A can be found using the expression (${sumOfNine} + x)/10. It's given that the mean of the 9 values shown is ${meanOfNine.toFixed(2)} and that the mean of all 10 numbers is greater than ${meanOfNine.toFixed(2)}. Consequently, the 10th data value, x, is larger than ${meanOfNine.toFixed(2)}. It's also given that the data values in data set A are positive integers less than 60. Thus, ${Math.ceil(meanOfNine)} < x < 60. Finally, it's given that the mean of data set A is an integer. This means that the sum of the 10 data values, ${sumOfNine} + x, is divisible by 10. Thus, ${sumOfNine} + x must have a ones digit of 0. It follows that x must have a ones digit of ${(10 - (sumOfNine % 10)) % 10}. Since ${Math.ceil(meanOfNine)} < x < 60 and x satisfies the divisibility constraint, the only possible value of x is ${finalX}. Since ${finalX} is larger than any of the integers shown, the largest integer from data set A is ${finalX}.`
    };
  }
};

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

// File: generators/onevariable-data-distributions/c178d4da.ts