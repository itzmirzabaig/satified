import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f8f79e11
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [mean: 4.5 (single decimal), margin of error: 0.5 (simple decimal)]
 * - Difficulty factors: [Understanding confidence intervals, margin of error interpretation]
 * - Distractor patterns: [A=apply to individuals not population mean, B=assume exact mean is most likely, C=exclude values beyond margin]
 * - Constraints: [Must preserve confidence interval concept, proper interpretation of "plausible" vs "certain"]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_f8f79e11 = {
  metadata: {
    // id: "f8f79e11",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Estimated mean: reasonable distance metric (2-8 range)
    const estimatedMean = getRandomInt(2, 8);
    // Allow for half increments to match original's 4.5 style
    const meanDecimal = getRandomElement([0, 0.5]);
    const finalMean = estimatedMean + meanDecimal;
    // Margin of error: small decimal (0.1 to 1.0, increments of 0.1 or 0.5)
    const marginOfError = getRandomElement([0.5, 1.0, 1.5]);
    // Activity type
    const activities = ["hiked", "walked", "biked", "ran"];
    const activity = getRandomElement(activities);
    // Distance unit
    const units = ["miles", "kilometers"];
    const unit = getRandomElement(units);
    
    // Calculate confidence interval
    const lowerBound = finalMean - marginOfError;
    const upperBound = finalMean + marginOfError;
    
    // STEP 2: Create options with tracking
    const correctText = `It is plausible that the mean distance ${activity} for all visitors is between ${lowerBound} and ${upperBound} ${unit}.`;
    
    const optionsData = [
      { 
        text: `It is likely that all visitors ${activity} between ${lowerBound} and ${upperBound} ${unit}.`, 
        isCorrect: false,
        reason: "applies the confidence interval to individuals rather than the population mean"
      },
      { 
        text: `It is likely that most visitors ${activity} exactly ${finalMean} ${unit}.`, 
        isCorrect: false,
        reason: "misinterprets the estimate as the exact value for most individuals"
      },
      { 
        text: `It is not possible that any visitor ${activity} less than ${lowerBound - 1} ${unit}.`, 
        isCorrect: false,
        reason: "incorrectly treats the margin of error as absolute bounds for individuals"
      },
      { 
        text: correctText, 
        isCorrect: true,
        reason: "correctly interprets the confidence interval for the population mean"
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
      questionText: `A park ranger asked a random sample of visitors how far they ${activity} during their visit. Based on the responses, the estimated mean was found to be ${finalMean} ${unit}, with an associated margin of error of ${marginOfError} ${unit}. Which of the following is the best conclusion from these data?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The given estimated mean has an associated margin of error because from sample data, the population mean can't be determined precisely. Rather, from the sample mean, an interval can be determined within which it's plausible that the population's mean is likely to lie. Since the estimated mean is ${finalMean} ${unit} with an associated margin of error of ${marginOfError} ${unit}, it follows that between ${finalMean} - ${marginOfError} ${unit} and ${finalMean} + ${marginOfError} ${unit}, or between ${lowerBound} and ${upperBound} ${unit}, is plausibly the mean distance ${activity} for all visitors.\n\nChoice ${incorrectOptions[0].letter}, ${incorrectOptions[1].letter}, and ${incorrectOptions[2].letter} are incorrect. Based on the estimated mean, no determination can be made about the number of ${unit} ${activity} for all visitors to the park.`
    };
  }
};

/**
 * Question ID: e03f3477
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage estimate: 32% (double-digit percentage), margin of error: 3.41% (decimal percentage)]
 * - Difficulty factors: [Calculating confidence interval bounds, percentage arithmetic]
 * - Distractor patterns: [A=only upper bound, C=claim no conclusion possible (wrong), D=claim no conclusion possible (wrong reasoning)]
 * - Constraints: [Must calculate percentage ± margin correctly, maintain proper decimal precision]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

// File: generators/inference-from-sample-statistics-and-margin-of-error/e03f3477.ts