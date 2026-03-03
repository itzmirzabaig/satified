import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 98958ae8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Set A: 75 objects, mean 25; Set B: 50 objects, mean 65]
 * - Difficulty factors: [Weighted average of combined data sets, careful with different sample sizes]
 * - Distractor patterns: [Simple average of means: (25+65)/2 = 45, or wrong weighting]
 * - Constraints: [Combined mean = (sumA + sumB) / (countA + countB)]
 * - Question type: [Text→Fill in the blank]
 */

export const generator_98958ae8 = {
  metadata: {
    // id: "98958ae8",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    let valid = false;
    let countA = 0;
    let meanA = 0;
    let countB = 0;
    let meanB = 0;
    let combinedMean = 0;
    let attempts = 0;
    
    while (!valid && attempts < 100) {
      countA = getRandomInt(60, 90);
      meanA = getRandomInt(20, 35);
      countB = getRandomInt(40, 60);
      meanB = getRandomInt(55, 75);
      
      // Ensure means are different enough
      if (Math.abs(meanA - meanB) >= 20) {
        // STEP 2: Calculate combined statistics
        const sumA = countA * meanA;
        const sumB = countB * meanB;
        combinedMean = (sumA + sumB) / (countA + countB);
        valid = true;
      }
      attempts++;
    }
    
    // Fallback
    if (!valid) {
      countA = 75;
      meanA = 25;
      countB = 50;
      meanB = 65;
      combinedMean = 41;
    }
    
    const sumA = countA * meanA;
    const sumB = countB * meanB;
    
    // STEP 3: Return question data
    return {
      questionText: `Data set A consists of the heights of ${countA} objects and has a mean of ${meanA} meters. Data set B consists of the heights of ${countB} objects and has a mean of ${meanB} meters. Data set C consists of the heights of the ${countA + countB} objects from data sets A and B. What is the mean, in meters, of data set C?`,
      figureCode: null,
      options: null,
      correctAnswer: Math.round(combinedMean).toString(),
      explanation: `The correct answer is ${Math.round(combinedMean)}. The mean of a data set is computed by dividing the sum of the values by the number of values. The sum of heights in data set A is ${countA} × ${meanA} = ${sumA} meters. The sum of heights in data set B is ${countB} × ${meanB} = ${sumB} meters. Since data set C consists of all ${countA + countB} objects, the mean of data set C is (${sumA} + ${sumB}) / ${countA + countB} = ${(sumA + sumB)}/${countA + countB} = ${combinedMean.toFixed(2)}, which rounds to ${Math.round(combinedMean)} meters.`
    };
  }
};

/**
 * Question ID: 391ae4b2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Set F: 55 integers 170-290, adding value 10 to create set G]
 * - Difficulty factors: [Effect of extreme outlier on mean vs median, understanding both statistics change]
 * - Distractor patterns: [Student may think only mean changes, or that median doesn't change]
 * - Constraints: [10 is much less than all values in F (170-290), mean decreases significantly, median may decrease slightly or stay same]
 * - Question type: [Text→Multiple Choice Text]
 */

// File: generators/onevariable-data-distributions/391ae4b2.ts