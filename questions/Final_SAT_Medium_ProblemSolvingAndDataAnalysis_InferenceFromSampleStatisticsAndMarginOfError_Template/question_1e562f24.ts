import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_1e562f24 = {
  metadata: {
    // id: "1e562f24",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Proportion estimate: 0.30 to 0.70 range, 2 decimal places
    const baseProportion = getRandomInt(30, 70) / 100;
    // Round to 2 decimal places
    const estimatedProportion = Math.round(baseProportion * 100) / 100;
    // Margin of error: 0.02 to 0.08 range
    const marginOfError = getRandomInt(2, 8) / 100;
    // Characteristic
    const characteristics = [
      "has a college degree",
      "owns a pet",
      "exercises regularly",
      "prefers tea over coffee",
      "speaks more than one language"
    ];
    const characteristic = getRandomElement(characteristics);
    
    // Calculate confidence interval bounds
    const lowerBound = parseFloat((estimatedProportion - marginOfError).toFixed(2));
    const upperBound = parseFloat((estimatedProportion + marginOfError).toFixed(2));
    
    // STEP 2: Create options with tracking
    const correctText = `It is plausible that the proportion is between ${lowerBound} and ${upperBound}.`;
    
    const optionsData = [
      { 
        text: correctText, 
        isCorrect: true,
        reason: "correctly calculates the confidence interval by adding and subtracting the margin of error from the estimate"
      },
      { 
        text: `It is plausible that the proportion is less than ${lowerBound}.`, 
        isCorrect: false,
        reason: "suggests values below the lower confidence bound are plausible"
      },
      { 
        text: `The proportion is exactly ${estimatedProportion}.`, 
        isCorrect: false,
        reason: "ignores the margin of error and claims the estimate is exact"
      },
      { 
        text: `It is plausible that the proportion is greater than ${upperBound}.`, 
        isCorrect: false,
        reason: "suggests values above the upper confidence bound are plausible"
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
      questionText: `To estimate the proportion of a population that ${characteristic}, a random sample was selected from the population. Based on the sample, it is estimated that the proportion of the population that ${characteristic} is ${estimatedProportion}, with an associated margin of error of ${marginOfError}. Based on this estimate and margin of error, which of the following is the most appropriate conclusion about the proportion of the population that ${characteristic}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. It's given that the estimate for the proportion of the population that ${characteristic} is ${estimatedProportion} with an associated margin of error of ${marginOfError}. Subtracting the margin of error from the estimate and adding the margin of error to the estimate gives an interval of plausible values for the true proportion of the population that ${characteristic}. Therefore, it's plausible that the proportion of the population that ${characteristic} is between ${estimatedProportion} - ${marginOfError} = ${lowerBound} and ${estimatedProportion} + ${marginOfError} = ${upperBound}.\n\nChoice ${incorrectOptions[0].letter} is incorrect. A value less than ${lowerBound} is outside the interval of plausible values for the proportion of the population that ${characteristic}.\n\nChoice ${incorrectOptions[1].letter} is incorrect. The value ${estimatedProportion} is an estimate for the proportion based on this sample. However, since the margin of error for this estimate is known, the most appropriate conclusion is not that the proportion is exactly one value but instead lies in an interval of plausible values.\n\nChoice ${incorrectOptions[2].letter} is incorrect. A value greater than ${upperBound} is outside the interval of plausible values for the proportion of the population that ${characteristic}.`
    };
  }
};

/**
 * Question ID: 89f8d08a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 80 (double-digit), sample count: 20 (clean fraction), total: 1,500 (triple-digit)]
 * - Difficulty factors: [Sample proportion scaling, avoiding "exact" claims with estimates]
 * - Distractor patterns: [A=75 (calculation error: 20/80 * 300), B=exact claim with wrong calc, C=estimate but wrong calc]
 * - Constraints: [Must calculate: (sample count/sample size) * total population]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

// File: generators/inference-from-sample-statistics-and-margin-of-error/89f8d08a.ts