import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 903
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [estimated mean: 20.5 (decimal), margin: 1 (whole number)]
 * - Difficulty factors: [Basic confidence interval interpretation, understanding "plausible" vs "possible" vs "exact"]
 * - Distractor patterns: [B=confuse plausible with impossible outside range, C=apply to individual values not mean, D=claim exact value known]
 * - Constraints: [Simple arithmetic: mean ± 1]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_903 = {
  metadata: {
    id: "903",
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
    
    // STEP 2: Create options with tracking.
    // Contexts already begin with an article (e.g. "the average time to
    // complete a task"), so templates must NOT prepend another "the"/"The".
    // Each incorrect option carries its OWN rebuttal so the explanation stays
    // correct no matter where the shuffle places it (reason is emitted per
    // shuffled option, never by positional index).
    const correctText = `It is plausible that the actual value of ${context} is between ${lowerBound} and ${upperBound}.`;

    const optionsData = [
      {
        text: correctText,
        isCorrect: true,
        reason: "correctly identifies the confidence interval as the range of plausible values"
      },
      {
        text: `It is not possible that ${context} is less than ${lowerBound} or greater than ${upperBound}.`,
        isCorrect: false,
        reason: `The estimated mean value and associated margin of error describe only plausible values, not all the possible values, for the actual value of ${context}. A value outside this interval is less likely but not impossible, so this is not an appropriate conclusion.`
      },
      {
        text: `Every value of the variable in the population is between ${lowerBound} and ${upperBound}.`,
        isCorrect: false,
        reason: `The estimated mean value and associated margin of error describe only plausible values for the actual value of ${context}, not all the possible values of the variable, so this is not an appropriate conclusion.`
      },
      {
        text: `The exact value of ${context} is ${estimatedMean}.`,
        isCorrect: false,
        reason: `Since ${estimatedMean} is the estimated mean value based on a random sample, the actual value of ${context} may not be exactly ${estimatedMean}. Therefore, this is not an appropriate conclusion.`
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
      explanation: `Choice ${correctLetter} is correct. It's given that based on a random sample from a population, the estimated value of ${context} is ${estimatedMean}, with an associated margin of error of ${marginOfError}. This means that it is plausible that the actual value of ${context} is between ${estimatedMean} - ${marginOfError} = ${lowerBound} and ${estimatedMean} + ${marginOfError} = ${upperBound}. Therefore, the most appropriate conclusion is that it is plausible that the actual value of ${context} is between ${lowerBound} and ${upperBound}.\n\nChoice ${incorrectOptions[0].letter} is incorrect. ${incorrectOptions[0].reason}\n\nChoice ${incorrectOptions[1].letter} is incorrect. ${incorrectOptions[1].reason}\n\nChoice ${incorrectOptions[2].letter} is incorrect. ${incorrectOptions[2].reason}`
    };
  }
};
