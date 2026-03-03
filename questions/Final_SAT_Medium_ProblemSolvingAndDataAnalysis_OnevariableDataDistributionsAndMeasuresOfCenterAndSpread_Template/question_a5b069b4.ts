import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a5b069b4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values: single and double digit, 4-18 range]
 * - Difficulty factors: [Finding median of even-count data set]
 * - Distractor patterns: [4=mode, 7=average of range, 14=mean]
 * - Constraints: [Must have even number of values for median averaging]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_a5b069b4 = {
  metadata: {
    // id: "a5b069b4",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base values for median calculation (even count)
    const baseValue = getRandomInt(3, 6);
    const pair1 = baseValue;
    const pair2 = baseValue + 1;
    
    // Generate additional values to create 8-element set
    const lowValue = baseValue - getRandomInt(1, 2);
    const highValue = baseValue + getRandomInt(8, 12);
    
    // Create data set with exactly 8 values for even median calculation
    const finalDataSet = [lowValue, lowValue, lowValue, pair1, pair1, pair2, pair2, highValue].sort((a, b) => a - b);
    
    // STEP 2: Calculate median (average of 4th and 5th values, 0-indexed: indices 3 and 4)
    const median = (finalDataSet[3] + finalDataSet[4]) / 2;
    
    // STEP 3: Calculate distractor values
    const mode = lowValue; // Most frequent
    const mean = finalDataSet.reduce((a, b) => a + b, 0) / finalDataSet.length;
    const rangeAvg = (Math.min(...finalDataSet) + Math.max(...finalDataSet)) / 2;
    
    // STEP 4: Create options
    const optionsData = [
      { text: mode.toString(), isCorrect: false },
      { text: median.toString(), isCorrect: true },
      { text: rangeAvg.toString(), isCorrect: false },
      { text: Math.round(mean).toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `What is the median of the data set shown? Data Set: ${finalDataSet.join(', ')}`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the median, organize the data set in ascending order: ${finalDataSet.join(', ')}. Since there are ${finalDataSet.length} values, the median is the average of the 4th and 5th values (${finalDataSet[3]} and ${finalDataSet[4]}), which is ${median}. Choice ${incorrectOptions[0].letter} is incorrect because that is the mode (most frequent value). Choice ${incorrectOptions[1].letter} is incorrect because that is the average of the minimum and maximum values. Choice ${incorrectOptions[2].letter} is incorrect because that is approximately the mean.`
    };
  }
};

/**
 * Question ID: 4c774b00
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ages: 18-30, frequencies: 1-6]
 * - Difficulty factors: [Comparing mean, median, mode from frequency table]
 * - Distractor patterns: [Wrong ordering of measures]
 * - Constraints: [Must create clear distinction between mode < median < mean]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */