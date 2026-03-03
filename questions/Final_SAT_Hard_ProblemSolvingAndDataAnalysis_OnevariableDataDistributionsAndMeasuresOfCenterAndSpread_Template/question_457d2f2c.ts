import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_457d2f2c = {
  metadata: {
    // id: "457d2f2c",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const n = getRandomInt(21, 31);
    // Ensure n is odd so median is a single value
    const adjustedN = n % 2 === 0 ? n + 1 : n;
    const medianIndex = Math.floor(adjustedN / 2); // 0-indexed: 13 for n=27
    
    const meanMedian = getRandomInt(25, 45);
    const adjustment = getRandomInt(5, 10);
    
    // STEP 2: Determine answer (always standard deviation for this question type)
    const correctText = "Standard deviation";
    
    // STEP 3: Create options
    const optionsData = [
      { text: "Median", isCorrect: false, reason: "the median remains unchanged because the middle element stays the same" },
      { text: "Mean", isCorrect: false, reason: "the mean remains the same because the sum decreases by (adjustment × countBelow) and increases by (adjustment × countAbove), canceling out" },
      { text: "Sum of the numbers", isCorrect: false, reason: "the sum remains unchanged because the decreases below the median cancel out the increases above" },
      { text: "Standard deviation", isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `A data set of ${adjustedN} different numbers has a mean of ${meanMedian} and a median of ${meanMedian}. A new data set is created by adding ${adjustment} to each number in the original data set that is greater than the median and subtracting ${adjustment} from each number in the original data set that is less than the median. Which of the following measures does NOT have the same value in both the original and new data sets?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Let the original data set be $x_1, x_2, ..., x_{${adjustedN}}$. Since there are ${adjustedN} numbers, the median is the $${medianIndex + 1}$th number, which equals ${meanMedian}. There are ${medianIndex} numbers less than the median and ${medianIndex} numbers greater than the median. When we subtract ${adjustment} from each of the ${medianIndex} lower values and add ${adjustment} to each of the ${medianIndex} higher values, the total change to the sum is $(${medianIndex})(-${adjustment}) + (${medianIndex})(${adjustment}) = 0$. Therefore, the sum and mean remain unchanged. The median also stays ${meanMedian} because the order of elements doesn't change. However, standard deviation measures spread from the mean. The values below the mean are now further from the mean (decreased by ${adjustment}) and values above are also further (increased by ${adjustment}), so the spread increases. Thus, standard deviation does NOT have the same value. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 6c9444cd
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ranges 0-10 for books, different ranges for two classes]
 * - Difficulty factors: [Reading box plots to find min/max, calculating range, finding difference]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Range = max - min for each class, positive difference between ranges]
 * - Question type: [Figure→Fill in the blank]
 */

// File: generators/onevariable-data-distributions/6c9444cd.ts