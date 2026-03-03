import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9110c120
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base value: 5, outlier: 100]
 * - Difficulty factors: [Comparing mean and median with/without outlier]
 * - Distractor patterns: [Thinking both change, thinking neither changes]
 * - Constraints: [Same values plus outlier changes mean but not median]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9110c120 = {
  metadata: {
    // id: "9110c120",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base value and outlier
    const baseValue = getRandomInt(3, 8);
    const outlier = baseValue * getRandomInt(15, 25); // Large outlier
    
    const setA = Array(9).fill(baseValue);
    const setB = [...setA, outlier];
    
    // STEP 2: Calculate statistics
    const meanA = (baseValue * 9) / 9;
    const meanB = (baseValue * 9 + outlier) / 10;
    const medianA = baseValue;
    const medianB = baseValue; // Middle of 10 values is average of 5th and 6th, both are baseValue
    
    const optionsData = [
      { text: `Only the means are different.`, isCorrect: true },
      { text: `Only the medians are different.`, isCorrect: false },
      { text: `Both the means and the medians are different.`, isCorrect: false },
      { text: `Neither the means nor the medians are different.`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Data set A: ${setA.join(', ')}\nData set B: ${setB.join(', ')}\nWhich of the following statements about the means and medians of data set A and data set B is true?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The mean of data set A is $\\\\frac{${baseValue * 9}}{9} = ${meanA}$. The mean of data set B is $\\\\frac{${baseValue * 9} + ${outlier}}{10} = ${meanB.toFixed(1)}$. Thus, the means are different. The medians of data sets A and B are both ${baseValue}. Therefore, the medians are the same, so only the means are different. Choice ${incorrectOptions[0].letter} is incorrect because the medians are equal, not different. Choice ${incorrectOptions[1].letter} is incorrect because the medians are equal, not different. Choice ${incorrectOptions[2].letter} is incorrect because the means are different.`
    };
  }
};

/**
 * Question ID: 881ef5f5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [9 consecutive integers]
 * - Difficulty factors: [Algebraic proof that mean=median for consecutive integers]
 * - Distractor patterns: [Non-zero differences based on miscalculation]
 * - Constraints: [For consecutive integers, mean always equals median]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */