import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_391ae4b2 = {
  metadata: {
    // id: "391ae4b2",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const countF = getRandomInt(45, 65);
    const minF = getRandomInt(150, 200);
    const maxF = minF + getRandomInt(80, 120);
    const outlier = getRandomInt(5, 20); // Much smaller than minF
    
    // STEP 2: Determine effects
    // Mean of G will be less than mean of F (adding a value much smaller than current mean)
    // Median of G will be less than or equal to median of F (adding a small value shifts median position)
    
    const meanFGreater = true; // Mean of F > Mean of G
    const medianFGreater = true; // Median of F >= Median of G
    
    // STEP 3: Determine correct answer
    // Since mean(F) > mean(G), mean is NOT less for F
    // Since median(F) >= median(G), median is NOT less for F
    // So answer is D (Neither)
    
    // STEP 4: Create options
    const optionsData = [
      { text: "I only", isCorrect: false },
      { text: "II only", isCorrect: false },
      { text: "I and II", isCorrect: false },
      { text: "Neither I nor II", isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 6: Return question data
    return {
      questionText: `Data set F consists of ${countF} integers between ${minF} and ${maxF}. Data set G consists of all the integers in data set F as well as the integer ${outlier}. Which of the following must be less for data set F than for data set G?\n\nI. The mean\nII. The median`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Neither I nor II",
      explanation: `Choice ${correctLetter} is correct. Adding ${outlier}, which is much smaller than any value in set F (range ${minF}-${maxF}), decreases the mean of the data set. Therefore, the mean of F is greater than the mean of G, not less. For the median: set F has ${countF} numbers, so the median is the ${Math.floor(countF/2)+1}th value. Set G has ${countF+1} numbers with ${outlier} as the new minimum. The new median is the average of the ${Math.floor((countF+1)/2)}th and ${Math.floor((countF+1)/2)+1}th values, which will be less than or equal to the original median. Therefore, the median of F is also not less than the median of G.`
    };
  }
};

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

// File: generators/onevariable-data-distributions/2a59eb45.ts