import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fc46af57
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total beads: 10,000 (large number), estimated percent: 15% (clean percentage), margin: 2% (clean percentage)]
 * - Difficulty factors: [Converting percentage bounds to actual counts, large number arithmetic]
 * - Distractor patterns: [A=above upper count bound, C=incorrect range calculation, D=below lower count bound]
 * - Constraints: [Must convert % to count correctly: count = (percent/100) * total]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_fc46af57 = {
  metadata: {
    // id: "fc46af57",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Total population: large number (5,000 to 20,000)
    const totalBeads = getRandomInt(5, 20) * 1000;
    // Estimated percentage: clean percentage (10-25%)
    const estimatedPercent = getRandomInt(2, 5) * 5;
    // Margin of error: clean percentage (1-4%)
    const marginOfError = getRandomInt(1, 4);
    // Item type
    const items = [
      { name: "beads", color: "red", container: "bag" },
      { name: "marbles", color: "blue", container: "jar" },
      { name: "candies", color: "green", container: "bowl" },
      { name: "tokens", color: "gold", container: "box" }
    ];
    const item = getRandomElement(items);
    
    // Calculate percentage bounds
    const lowerPercent = estimatedPercent - marginOfError;
    const upperPercent = estimatedPercent + marginOfError;
    
    // Convert to actual counts
    const lowerCount = Math.round((lowerPercent / 100) * totalBeads);
    const upperCount = Math.round((upperPercent / 100) * totalBeads);
    
    // STEP 2: Create options with tracking
    // Format: 1,300 < r < 1,700 style
    const correctText = `${lowerCount.toLocaleString()} < r < ${upperCount.toLocaleString()}`;
    
    const optionsData = [
      { 
        text: `r > ${upperCount.toLocaleString()}`, 
        isCorrect: false,
        reason: "represents values greater than the upper confidence bound"
      },
      { 
        text: correctText, 
        isCorrect: true,
        reason: "correctly converts the percentage confidence interval to actual counts"
      },
      { 
        text: `${Math.round(lowerCount * 0.15).toLocaleString()} < r < ${Math.round(upperCount * 0.88).toLocaleString()}`, 
        isCorrect: false,
        reason: "uses arbitrary incorrect ranges that don't match the confidence interval"
      },
      { 
        text: `r < ${lowerCount.toLocaleString()}`, 
        isCorrect: false,
        reason: "represents values less than the lower confidence bound"
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
      questionText: `A ${item.container} containing ${totalBeads.toLocaleString()} ${item.name} of assorted colors is purchased from a craft store. To estimate the percent of ${item.color} ${item.name} in the ${item.container}, a sample of ${item.name} is selected at random. The percent of ${item.color} ${item.name} in the ${item.container} was estimated to be ${estimatedPercent}%, with an associated margin of error of ${marginOfError}%. If r is the actual number of ${item.color} ${item.name} in the ${item.container}, which of the following is most plausible?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. To find the most plausible range for the number of ${item.color} ${item.name}, r, we need to calculate the range of percentages given by the estimate and the margin of error, and then convert those percentages into actual counts of ${item.name}.\n\n1. Determine the percentage range:\n   The estimated percent of ${item.color} ${item.name} is ${estimatedPercent}%.\n   The margin of error is ${marginOfError}%.\n   This means the plausible range for the actual percent of ${item.color} ${item.name} is from ${estimatedPercent}% - ${marginOfError}% to ${estimatedPercent}% + ${marginOfError}%.\n   Lower bound percent = ${lowerPercent}%\n   Upper bound percent = ${upperPercent}%\n\n2. Convert percentages to numbers:\n   The total number of ${item.name} in the ${item.container} is ${totalBeads.toLocaleString()}.\n   To find the range for the number of ${item.color} ${item.name} (r), we calculate ${lowerPercent}% and ${upperPercent}% of ${totalBeads.toLocaleString()}.\n\n   • Lower bound for r = ${lowerPercent}% of ${totalBeads.toLocaleString()} = 0.${lowerPercent} × ${totalBeads.toLocaleString()} = ${lowerCount.toLocaleString()}\n   • Upper bound for r = ${upperPercent}% of ${totalBeads.toLocaleString()} = 0.${upperPercent} × ${totalBeads.toLocaleString()} = ${upperCount.toLocaleString()}\n\n3. Evaluate the options:\n   Based on the calculation, the most plausible number of ${item.color} ${item.name} r is between ${lowerCount.toLocaleString()} and ${upperCount.toLocaleString()}.\n\n   • Choice ${incorrectOptions[0].letter}: r > ${upperCount.toLocaleString()}: This represents values greater than the upper limit of our plausible range.\n   • Choice ${correctLetter}: ${lowerCount.toLocaleString()} < r < ${upperCount.toLocaleString()}: This matches the range we calculated exactly (${lowerPercent}% to ${upperPercent}% of ${totalBeads.toLocaleString()}).\n   • Choice ${incorrectOptions[1].letter}: While this overlaps with part of our range, it does not correctly represent the confidence interval.\n   • Choice ${incorrectOptions[2].letter}: r < ${lowerCount.toLocaleString()}: This represents values less than the lower limit of our plausible range.\n\nTherefore, the correct choice is ${correctLetter}.`
    };
  }
};

/**
 * Question ID: f04d40b2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [population: 50,000 (large), sample: 1,000 (moderate), percent: 35% (clean), margin: 3% (clean)]
 * - Difficulty factors: [Scaling sample proportion to population, large number multiplication]
 * - Distractor patterns: [A=35% of sample, B=65% of sample (complement), D=wrong calculation]
 * - Constraints: [Must calculate population proportion: (percent/100) * total_population]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

// File: generators/inference-from-sample-statistics-and-margin-of-error/f04d40b2.ts