import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2a59eb45
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Set A: 75 buildings, mean 32; Set B: 50 buildings, mean 62]
 * - Difficulty factors: [Weighted average calculation, larger numbers than 98958ae8]
 * - Distractor patterns: [Simple average: (32+62)/2 = 47, or wrong weighting]
 * - Constraints: [Combined mean = (75×32 + 50×62) / 125 = 44]
 * - Question type: [Text→Fill in the blank]
 */

export const generator_2a59eb45 = {
  metadata: {
    // id: "2a59eb45",
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
      meanA = getRandomInt(25, 40);
      countB = getRandomInt(40, 60);
      meanB = meanA + getRandomInt(25, 35); // Ensure B is significantly higher
      
      // STEP 2: Calculate combined statistics
      const sumA = countA * meanA;
      const sumB = countB * meanB;
      combinedMean = (sumA + sumB) / (countA + countB);
      valid = true;
      attempts++;
    }
    
    // Fallback
    if (!valid) {
      countA = 75;
      meanA = 32;
      countB = 50;
      meanB = 62;
      combinedMean = 44;
    }
    
    const sumA = countA * meanA;
    const sumB = countB * meanB;
    
    // STEP 3: Return question data
    return {
      questionText: `Data set A consists of the heights of ${countA} buildings and has a mean of ${meanA} meters. Data set B consists of the heights of ${countB} buildings and has a mean of ${meanB} meters. Data set C consists of the heights of the ${countA + countB} buildings from data sets A and B. What is the mean, in meters, of data set C?`,
      figureCode: null,
      options: null,
      correctAnswer: Math.round(combinedMean).toString(),
      explanation: `The correct answer is ${Math.round(combinedMean)}. The mean of a data set is computed by dividing the sum of the values by the number of values. The sum of heights in data set A is ${countA} × ${meanA} = ${sumA} meters. The sum of heights in data set B is ${countB} × ${meanB} = ${sumB} meters. Since data set C consists of all ${countA + countB} buildings, the mean of data set C is (${sumA} + ${sumB}) / ${countA + countB} = ${(sumA + sumB)}/${countA + countB} = ${combinedMean.toFixed(2)}, which is ${Math.round(combinedMean)} meters when rounded.`
    };
  }
};

/**
 * Question ID: 9d935bd8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [7 states with percentages 19.5-36.4, national median 26.95]
 * - Difficulty factors: [Finding median of small data set, subtracting from reference value]
 * - Distractor patterns: [Student may calculate mean instead of median, or wrong subtraction order]
 * - Constraints: [Must order 7 values to find 4th (median), then subtract 26.95]
 * - Question type: [Table→Multiple Choice Text]
 */

// File: generators/onevariable-data-distributions/9d935bd8.ts