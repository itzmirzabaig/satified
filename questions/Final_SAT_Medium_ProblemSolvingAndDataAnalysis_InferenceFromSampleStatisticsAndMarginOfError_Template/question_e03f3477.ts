import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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

export const generator_e03f3477 = {
  metadata: {
    // id: "e03f3477",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Estimated percentage: 20-50% range
    const estimatedPercent = getRandomInt(20, 50);
    // Margin of error: 2-5% range, with 2 decimal places possible
    const marginWhole = getRandomInt(2, 5);
    const marginDecimal = getRandomInt(0, 99) / 100;
    const marginOfError = parseFloat((marginWhole + marginDecimal).toFixed(2));
    // Activity/context
    const contexts = [
      { action: "use their televisions to watch nature shows", group: "adults who own televisions" },
      { action: "use their smartphones for banking", group: "adults who own smartphones" },
      { action: "read books digitally", group: "adults who own e-readers" },
      { action: "stream music daily", group: "adults who use streaming services" }
    ];
    const context = getRandomElement(contexts);
    
    // Calculate confidence interval bounds
    const lowerBound = parseFloat((estimatedPercent - marginOfError).toFixed(2));
    const upperBound = parseFloat((estimatedPercent + marginOfError).toFixed(2));
    
    // STEP 2: Create options with tracking
    const correctText = `Between ${lowerBound}% and ${upperBound}% of all ${context.group} ${context.action}.`;
    
    const optionsData = [
      { 
        text: `More than ${upperBound}% of all ${context.group} ${context.action}.`, 
        isCorrect: false,
        reason: "only considers values above the upper bound of the confidence interval"
      },
      { 
        text: correctText, 
        isCorrect: true,
        reason: "correctly calculates the confidence interval by adding and subtracting the margin of error"
      },
      { 
        text: `Since the sample included ${context.group} and not just those who ${context.action.split(' ').slice(-2).join(' ')}, no conclusion can be made.`, 
        isCorrect: false,
        reason: "incorrectly suggests that sampling the broader population invalidates the estimate"
      },
      { 
        text: `Since the sample did not include all the people who ${context.action.split(' ').slice(-2).join(' ')}, no conclusion can be made.`, 
        isCorrect: false,
        reason: "misunderstands that random sampling allows for valid statistical inference without surveying the entire population"
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
      questionText: `A sample consisting of ${context.group} was selected at random for a study. Based on the sample, it is estimated that ${estimatedPercent}% of all ${context.group} ${context.action}, with an associated margin of error of ${marginOfError}%. Which of the following is the most plausible conclusion about all ${context.group}?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. It's given that based on a sample selected at random, it's estimated that ${estimatedPercent}% of all ${context.group} ${context.action}, with an associated margin of error of ${marginOfError}%. Subtracting the margin of error from the estimate and adding the margin of error to the estimate gives an interval of plausible values for the true percentage of ${context.group} who ${context.action}. This means it's plausible that between ${estimatedPercent}% - ${marginOfError}%, or ${lowerBound}%, and ${estimatedPercent}% + ${marginOfError}%, or ${upperBound}%, of all ${context.group} ${context.action}. Therefore, of the given choices, the most plausible conclusion is that between ${lowerBound}% and ${upperBound}% of all ${context.group} ${context.action}.`
    };
  }
};

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

// File: generators/inference-from-sample-statistics-and-margin-of-error/a2162ea1.ts