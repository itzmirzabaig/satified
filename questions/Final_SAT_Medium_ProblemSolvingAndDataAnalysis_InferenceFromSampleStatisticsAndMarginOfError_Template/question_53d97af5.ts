import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 53d97af5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 150 (double-digit, 100-200 range), percentage: 30% (simple percentage)]
 * - Difficulty factors: [Statistical inference, sample generalization scope]
 * - Distractor patterns: [A=generalize to all fish, B=assume average based on threshold, C=generalize percent to wrong population]
 * - Constraints: [Must maintain random sampling, proper scope limitation to sample population]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_53d97af5 = {
  metadata: {
    // id: "53d97af5",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Sample size: double-digit to low triple-digit (100-200 range)
    const sampleSize = getRandomInt(100, 200);
    // Percentage: simple, clean percentage (20-40% range, multiples of 5 for clean numbers)
    const percentage = getRandomInt(2, 8) * 5;
    // Fish type: specific type sampled
    const fishTypes = ["largemouth bass", "trout", "catfish", "bluegill", "walleye"];
    const fishType = getRandomElement(fishTypes);
    // Weight threshold: 1-5 pounds (simple numbers)
    const weightThreshold = getRandomInt(1, 5);
    
    // Calculate number of fish above threshold for verification
    const fishAboveThreshold = Math.round((sampleSize * percentage) / 100);
    
    // STEP 2: Create options with tracking
    const correctText = `Approximately ${percentage}% of all ${fishType} in the pond weigh more than ${weightThreshold} pounds.`;
    
    const optionsData = [
      { 
        text: `The majority of all fish in the pond weigh less than ${weightThreshold} pounds.`, 
        isCorrect: false,
        reason: "generalizes beyond the sampled fish type to all fish"
      },
      { 
        text: `The average weight of all fish in the pond is approximately ${weightThreshold} pounds.`, 
        isCorrect: false,
        reason: "incorrectly interprets threshold percentage as average"
      },
      { 
        text: `Approximately ${percentage}% of all fish in the pond weigh more than ${weightThreshold} pounds.`, 
        isCorrect: false,
        reason: "generalizes the percentage to all fish instead of just the sampled type"
      },
      { 
        text: correctText, 
        isCorrect: true,
        reason: "correctly limits inference to the sampled population"
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
      questionText: `A study was done on the weights of different types of fish in a pond. A random sample of fish were caught and marked in order to ensure that none were weighed more than once. The sample contained ${sampleSize} ${fishType}, of which ${percentage}% weighed more than ${weightThreshold} pounds. Which of the following conclusions is best supported by the sample data?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The sample of ${sampleSize} ${fishType} was selected at random from all the ${fishType} in the pond, and since ${percentage}% of the fish in the sample weighed more than ${weightThreshold} pounds, it can be concluded that approximately ${percentage}% of all ${fishType} in the pond weigh more than ${weightThreshold} pounds.\n\nChoice ${incorrectOptions[0].letter}, ${incorrectOptions[1].letter}, and ${incorrectOptions[2].letter} are incorrect. Since the sample contained ${sampleSize} ${fishType}, of which ${percentage}% weighed more than ${weightThreshold} pounds, this result can be generalized only to ${fishType} in the pond, not to all fish in the pond.`
    };
  }
};

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

// File: generators/inference-from-sample-statistics-and-margin-of-error/f8f79e11.ts