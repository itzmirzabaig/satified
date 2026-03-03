import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a2162ea1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 344 (triple-digit), estimated mean: 23.1 (decimal), margin: 0.19 (small decimal), target weight: 23 (whole number)]
 * - Difficulty factors: [Interpreting confidence interval for mean, weight measurement context]
 * - Distractor patterns: [B=outside interval, C=below lower bound only, D=above upper bound only]
 * - Constraints: [Must calculate mean ± margin correctly, preserve manufacturing context]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_a2162ea1 = {
  metadata: {
    // id: "a2162ea1",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Target/approximate weight: 20-30 pounds
    const targetWeight = getRandomInt(20, 30);
    // Sample size: triple-digit (200-500 range)
    const sampleSize = getRandomInt(200, 500);
    // Estimated mean: close to target but slightly off (±0.1 to ±0.5)
    const meanOffset = getRandomElement([-0.5, -0.4, -0.3, -0.2, -0.1, 0.1, 0.2, 0.3, 0.4, 0.5]);
    const estimatedMean = parseFloat((targetWeight + meanOffset).toFixed(1));
    // Margin of error: small decimal (0.1 to 0.5 range)
    const marginOfError = parseFloat((getRandomInt(1, 5) / 10).toFixed(2));
    // Product type
    const products = [
      { item: "boxes of oranges", unit: "pounds", period: "8-hour period" },
      { item: "bags of apples", unit: "pounds", period: "6-hour period" },
      { item: "crates of vegetables", unit: "kilograms", period: "day" },
      { item: "packages of materials", unit: "pounds", period: "shift" }
    ];
    const product = getRandomElement(products);
    
    // Calculate confidence interval
    const lowerBound = parseFloat((estimatedMean - marginOfError).toFixed(2));
    const upperBound = parseFloat((estimatedMean + marginOfError).toFixed(2));
    
    // STEP 2: Create options with tracking
    const correctText = `Plausible values for the average weight of all ${product.item} filled by the company are between ${lowerBound} ${product.unit} and ${upperBound} ${product.unit}.`;
    
    const optionsData = [
      { 
        text: correctText, 
        isCorrect: true,
        reason: "correctly interprets the confidence interval as the range of plausible values for the population mean"
      },
      { 
        text: `Plausible values for the average weight of all ${product.item} filled by the company are less than ${lowerBound} ${product.unit} or greater than ${upperBound} ${product.unit}.`, 
        isCorrect: false,
        reason: "incorrectly suggests values outside the confidence interval are plausible"
      },
      { 
        text: `The average weight of all ${product.item} filled by the company is less than ${lowerBound} ${product.unit}.`, 
        isCorrect: false,
        reason: "incorrectly assumes the mean is below the lower bound"
      },
      { 
        text: `The average weight of all ${product.item} filled by the company is greater than ${upperBound} ${product.unit}.`, 
        isCorrect: false,
        reason: "incorrectly assumes the mean is above the upper bound"
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
      questionText: `A company fills ${product.item} with approximately ${targetWeight} ${product.unit}. To test the accuracy of the filling process, ${sampleSize} ${product.item} were selected at random and weighed. Based on the sample, it is estimated that the average weight of all ${product.item} filled by the company in an ${product.period} is ${estimatedMean} ${product.unit}, with an associated margin of error of ${marginOfError} ${product.unit}. Which of the following is the best interpretation of this estimate?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. It's given that the estimate for the average weight of all ${product.item} filled by the company in an ${product.period} is ${estimatedMean} ${product.unit}, with an associated margin of error of ${marginOfError} ${product.unit}. It follows that plausible values for this average weight are between ${estimatedMean} - ${marginOfError} ${product.unit} and ${estimatedMean} + ${marginOfError} ${product.unit}. Therefore, plausible values for the average weight of all ${product.item} filled by the company are between ${lowerBound} ${product.unit} and ${upperBound} ${product.unit}.`
    };
  }
};

/**
 * Question ID: 9bedc4a0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 310 (triple-digit), estimated percent: 12% (low double-digit), margin: 3.62% (decimal percentage)]
 * - Difficulty factors: [Manufacturing quality control context, calculating percentage bounds]
 * - Distractor patterns: [A=only margin value, C=exact estimate only, D=only upper bound]
 * - Constraints: [Must calculate percentage ± margin, defect rate context]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

// File: generators/inference-from-sample-statistics-and-margin-of-error/9bedc4a0.ts