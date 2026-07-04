import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 906
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 310 (triple-digit), estimated percent: 12% (low double-digit), margin: 3.62% (decimal percentage)]
 * - Difficulty factors: [Manufacturing quality control context, calculating percentage bounds]
 * - Distractor patterns: [A=only margin value, C=exact estimate only, D=only upper bound]
 * - Constraints: [Must calculate percentage ± margin, defect rate context]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_906 = {
  metadata: {
    id: "906",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Sample size: triple-digit (200-400 range)
    const sampleSize = getRandomInt(200, 400);
    // Estimated percentage: 5-20% range (defect rates are typically low)
    const estimatedPercent = getRandomInt(5, 20);
    // Margin of error: 2-6% range with 2 decimal places.
    // Guard against the rare draw where the margin of error renders as the same
    // number as the estimated percent (e.g. marginWhole=5, marginDecimal=0 ->
    // "5" and estimatedPercent=5 -> "5"): that would make the "margin only" and
    // "point estimate only" distractors byte-identical. Redraw the margin with a
    // bounded retry (HOUSE_STYLE rule 4) until the two rendered values differ.
    let marginOfError = 0;
    let marginTries = 0;
    do {
      const marginWhole = getRandomInt(2, 5);
      const marginDecimal = getRandomInt(0, 99) / 100;
      marginOfError = parseFloat((marginWhole + marginDecimal).toFixed(2));
    } while (marginOfError === estimatedPercent && marginTries++ < 50);
    // Product type
    const products = ["socks", "gloves", "hats", "scarves", "belts"];
    const product = getRandomElement(products);
    // Time period
    const periods = ["week", "month", "production run", "batch"];
    const period = getRandomElement(periods);
    
    // Calculate confidence interval bounds
    const lowerBound = parseFloat((estimatedPercent - marginOfError).toFixed(2));
    const upperBound = parseFloat((estimatedPercent + marginOfError).toFixed(2));
    
    // STEP 2: Create options with tracking
    const correctText = `It is plausible that between ${lowerBound}% and ${upperBound}% of the ${product} are defective.`;
    
    const optionsData = [
      { 
        text: `${marginOfError}% of the ${product} are defective.`, 
        isCorrect: false,
        reason: "confuses the margin of error with the actual defect percentage"
      },
      { 
        text: correctText, 
        isCorrect: true,
        reason: "correctly calculates the confidence interval for the defect rate"
      },
      { 
        text: `${estimatedPercent}% of the ${product} are defective.`, 
        isCorrect: false,
        reason: "only uses the point estimate without considering the margin of error"
      },
      { 
        text: `It is plausible that more than ${upperBound}% of the ${product} are defective.`, 
        isCorrect: false,
        reason: "only considers values above the upper confidence bound"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;

    // STEP 4: Return question data
    return {
      questionText: `A company that produces ${product} wants to estimate the percent of the ${product} produced in a typical ${period} that are defective. A random sample of ${sampleSize} ${product} produced in a certain ${period} were inspected. Based on the sample, it is estimated that ${estimatedPercent}% of all ${product} produced by the company in this ${period} are defective, with an associated margin of error of ${marginOfError}%. Based on the estimate and associated margin of error, which of the following is the most appropriate conclusion about all ${product} produced by the company during this ${period}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. It's given that, based on the sample, an estimate of ${estimatedPercent}% of all ${product} produced by the company in a certain ${period} are defective, with an associated margin of error of ${marginOfError}%. This estimate, plus or minus the margin of error, gives an interval of plausible values for the actual percent of all ${product} produced by the company that ${period} that are defective. Subtracting ${marginOfError}% from ${estimatedPercent}% yields ${lowerBound}%. Adding ${marginOfError}% to ${estimatedPercent}% yields ${upperBound}%. Therefore, it is plausible that between ${lowerBound}% and ${upperBound}% of all ${product} produced by the company are defective.`
    };
  }
};
