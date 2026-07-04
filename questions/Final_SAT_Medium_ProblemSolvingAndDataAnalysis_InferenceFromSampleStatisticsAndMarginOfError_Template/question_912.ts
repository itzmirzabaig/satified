import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 912
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [total beads: 10,000 (large number), estimated percent: 15% (clean percentage), margin: 2% (clean percentage)]
 * - Difficulty factors: [Converting percentage bounds to actual counts, large number arithmetic]
 * - Distractor patterns: [A=above upper count bound, C=incorrect range calculation, D=below lower count bound]
 * - Constraints: [Must convert % to count correctly: count = (percent/100) * total]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual statistics question]
 */

export const generator_912 = {
  metadata: {
    id: "912",
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
    
    // Arbitrary wrong range distractor (does not match the confidence interval).
    const arbitraryLow = Math.round(lowerCount * 0.15);
    const arbitraryHigh = Math.round(upperCount * 0.88);

    const optionsData = [
      {
        text: `r > ${upperCount.toLocaleString()}`,
        isCorrect: false,
        kind: "high" as const
      },
      {
        text: correctText,
        isCorrect: true,
        kind: "correct" as const
      },
      {
        text: `${arbitraryLow.toLocaleString()} < r < ${arbitraryHigh.toLocaleString()}`,
        isCorrect: false,
        kind: "arbitrary" as const
      },
      {
        text: `r < ${lowerCount.toLocaleString()}`,
        isCorrect: false,
        kind: "low" as const
      }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    // Resolve each distractor's letter by its KIND (not by shuffle position) so
    // the explanation always pairs the right letter with the right description.
    const highLetter = shuffledOptions.find(o => o.kind === "high")!.letter;
    const arbitraryLetter = shuffledOptions.find(o => o.kind === "arbitrary")!.letter;
    const lowLetter = shuffledOptions.find(o => o.kind === "low")!.letter;
    
    // STEP 4: Return question data
    return {
      questionText: `A ${item.container} containing ${totalBeads.toLocaleString()} ${item.name} of assorted colors is purchased from a craft store. To estimate the percent of ${item.color} ${item.name} in the ${item.container}, a sample of ${item.name} is selected at random. The percent of ${item.color} ${item.name} in the ${item.container} was estimated to be ${estimatedPercent}%, with an associated margin of error of ${marginOfError}%. If r is the actual number of ${item.color} ${item.name} in the ${item.container}, which of the following is most plausible?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. To find the most plausible range for the number of ${item.color} ${item.name}, r, we need to calculate the range of percentages given by the estimate and the margin of error, and then convert those percentages into actual counts of ${item.name}.\n\n1. Determine the percentage range:\n   The estimated percent of ${item.color} ${item.name} is ${estimatedPercent}%.\n   The margin of error is ${marginOfError}%.\n   This means the plausible range for the actual percent of ${item.color} ${item.name} is from ${estimatedPercent}% - ${marginOfError}% to ${estimatedPercent}% + ${marginOfError}%.\n   Lower bound percent = ${lowerPercent}%\n   Upper bound percent = ${upperPercent}%\n\n2. Convert percentages to numbers:\n   The total number of ${item.name} in the ${item.container} is ${totalBeads.toLocaleString()}.\n   To find the range for the number of ${item.color} ${item.name} (r), we calculate ${lowerPercent}% and ${upperPercent}% of ${totalBeads.toLocaleString()}.\n\n   • Lower bound for r = ${lowerPercent}% of ${totalBeads.toLocaleString()} = ${(lowerPercent / 100).toFixed(2)} × ${totalBeads.toLocaleString()} = ${lowerCount.toLocaleString()}\n   • Upper bound for r = ${upperPercent}% of ${totalBeads.toLocaleString()} = ${(upperPercent / 100).toFixed(2)} × ${totalBeads.toLocaleString()} = ${upperCount.toLocaleString()}\n\n3. Evaluate the options:\n   Based on the calculation, the most plausible number of ${item.color} ${item.name} r is between ${lowerCount.toLocaleString()} and ${upperCount.toLocaleString()}.\n\n   • Choice ${highLetter} (r > ${upperCount.toLocaleString()}): This represents values greater than the upper limit of our plausible range.\n   • Choice ${correctLetter} (${lowerCount.toLocaleString()} < r < ${upperCount.toLocaleString()}): This matches the range we calculated exactly (${lowerPercent}% to ${upperPercent}% of ${totalBeads.toLocaleString()}).\n   • Choice ${arbitraryLetter} (${arbitraryLow.toLocaleString()} < r < ${arbitraryHigh.toLocaleString()}): This is an arbitrary range that does not correspond to the estimate and margin of error, so it does not represent the confidence interval.\n   • Choice ${lowLetter} (r < ${lowerCount.toLocaleString()}): This represents values less than the lower limit of our plausible range.\n\nTherefore, the correct choice is ${correctLetter}.`
    };
  }
};
