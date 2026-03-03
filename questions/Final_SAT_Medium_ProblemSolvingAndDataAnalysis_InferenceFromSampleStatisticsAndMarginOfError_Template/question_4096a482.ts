import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 4096a482
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [estimated mean: 20.5 (decimal), margin: 1 (whole number)]
 * - Difficulty factors: [Basic confidence interval interpretation, understanding "plausible" vs "possible" vs "exact"]
 * - Distractor patterns: [B=confuse plausible with impossible outside range, C=apply to individual values not mean, D=claim exact value known]
 * - Constraints: [Simple arithmetic: mean ± 1]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_4096a482 = {
  metadata: {
    // id: "4096a482",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Estimated mean: 10-30 range, can be whole or half number
    const baseMean = getRandomInt(10, 30);
    const meanDecimal = getRandomElement([0, 0.5]);
    const estimatedMean = baseMean + meanDecimal;
    // Margin of error: 1-3 range (whole number)
    const marginOfError = getRandomInt(1, 3);
    // Variable name
    const variables = ["x", "y", "z", "t", "h"];
    const variable = getRandomElement(variables);
    // Context
    const contexts = [
      "the mean value of a certain variable for the population",
      "the average score on a standardized test",
      "the mean height of plants in a greenhouse",
      "the average time to complete a task"
    ];
    const context = getRandomElement(contexts);
    
    // Calculate confidence interval
    const lowerBound = estimatedMean - marginOfError;
    const upperBound = estimatedMean + marginOfError;
    
    // STEP 2: Create options with tracking
    const correctText = `It is plausible that the actual ${context} is between ${lowerBound} and ${upperBound}.`;
    
    const optionsData = [
      { 
        text: correctText, 
        isCorrect: true,
        reason: "correctly identifies the confidence interval as the range of plausible values"
      },
      { 
        text: `It is not possible that the ${context} is less than ${lowerBound} or greater than ${upperBound}.`, 
        isCorrect: false,
        reason: "confuses 'plausible' with 'impossible' - values outside the margin are possible just less likely"
      },
      { 
        text: `Every value of the variable in the population is between ${lowerBound} and ${upperBound}.`, 
        isCorrect: false,
        reason: "incorrectly applies the confidence interval for the mean to individual data points"
      },
      { 
        text: `The ${context} is ${estimatedMean}.`, 
        isCorrect: false,
        reason: "claims the exact population mean is known, ignoring the margin of error"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `Based on a random sample from a population, a researcher estimated that ${context} is ${estimatedMean}, with an associated margin of error of ${marginOfError}. Which of the following is the most appropriate conclusion?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. It's given that based on a random sample from a population, the estimated ${context} is ${estimatedMean}, with an associated margin of error of ${marginOfError}. This means that it is plausible that the actual ${context} is between ${estimatedMean} - ${marginOfError} and ${estimatedMean} + ${marginOfError}. Therefore, the most appropriate conclusion is that it is plausible that the actual ${context} is between ${lowerBound} and ${upperBound}.\n\nChoice ${incorrectOptions[0].letter} is incorrect. The estimated mean value and associated margin of error describe only plausible values, not all the possible values, for the actual mean value of the variable, so this is not an appropriate conclusion.\n\nChoice ${incorrectOptions[1].letter} is incorrect. The estimated mean value and associated margin of error describe only plausible values for the actual mean value of the variable, not all the possible values of the variable, so this is not an appropriate conclusion.\n\nChoice ${incorrectOptions[2].letter} is incorrect. Since ${estimatedMean} is the estimated mean value of the variable based on a random sample, the actual mean value of the variable may not be exactly ${estimatedMean}. Therefore, this is not an appropriate conclusion.`
    };
  }
};

/**
 * Question ID: 1e562f24
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [proportion estimate: 0.49 (decimal near 0.5), margin: 0.04 (small decimal)]
 * - Difficulty factors: [Decimal proportion interpretation (not percentage), confidence interval calculation]
 * - Distractor patterns: [B=below lower bound, C=exact value only, D=above upper bound]
 * - Constraints: [Must handle decimal proportions (0-1 scale) not percentages]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

// File: generators/inference-from-sample-statistics-and-margin-of-error/1e562f24.ts