import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 64c85440
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min width: 7.5, max width: 9.0, curb length: 135]
 * - Difficulty factors: [Inverse relationship, division with decimals, compound inequality]
 * - Distractor patterns: [A=wrong variable range, B=width range not count, C=equated curb length with max spaces]
 * - Constraints: [n must satisfy 135/9 ≤ n ≤ 135/7.5]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_64c85440 = {
  metadata: {
    // id: "64c85440",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original uses 7.5-9.0 width range with 135 ft curb
    // Generate similar: min width, max width, and total length
    const minWidth = getRandomInt(6, 9) + (getRandomInt(0, 1) * 0.5); // 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0
    const maxWidth = minWidth + getRandomInt(1, 3) + (getRandomInt(0, 1) * 0.5); // Ensure max > min
    
    const curbLength = getRandomInt(100, 200); // Total length
    
    // STEP 2: Calculate min and max number of spaces
    // Max spaces = curbLength / minWidth (use narrower spaces to fit more)
    // Min spaces = curbLength / maxWidth (use wider spaces, fit fewer)
    const maxSpaces = Math.floor(curbLength / minWidth);
    const minSpaces = Math.ceil(curbLength / maxWidth);
    
    // STEP 3: Create distractors based on SAT patterns
    const distractorA = `${minSpaces} \\leq n \\leq ${curbLength}`; // Wrong upper bound
    const distractorB = `${minWidth} \\leq n \\leq ${Math.floor(maxWidth)}`; // Width range, not count
    const distractorC = `${minSpaces} \\leq n \\leq ${curbLength}`; // Same as A essentially
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${minSpaces} \\leq n \\leq ${maxSpaces}$`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. Using the minimum width of ${minWidth} feet gives the maximum number of spaces: $${curbLength} / ${minWidth} = ${maxSpaces}$. Using the maximum width of ${maxWidth} feet gives the minimum number of spaces: $${curbLength} / ${maxWidth} = ${minSpaces}$. Therefore, $${minSpaces} \\leq n \\leq ${maxSpaces}$. Choice ${incorrectOptions[0].letter} and ${incorrectOptions[2].letter} are incorrect because they equate the curb length with the number of spaces. Choice ${incorrectOptions[1].letter} is incorrect because this is the range of possible values for the width of a parking space instead of the range of possible values for the number of parking spaces.`;
    
    // STEP 7: Return question data
    return {
      questionText: `In North America, the standard width of a parking space is at least ${minWidth} feet and no more than ${maxWidth} feet. A restaurant owner recently resurfaced the restaurant's parking lot and wants to determine the number of parking spaces, $n$, in the parking lot that could be placed perpendicular to a curb that is ${curbLength} feet long, based on the standard width of a parking space. Which of the following describes all the possible values of $n$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${minSpaces} \\leq n \\leq ${maxSpaces}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: 0b221d05
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4, y-intercept: -4, test point: (6, -2)]
 * - Difficulty factors: [Graph interpretation, point-in-region testing]
 * - Distractor patterns: [Points not in shaded region or on wrong side of boundary]
 * - Constraints: [Must satisfy y ≤ 4x - 4]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs inequality graph]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/0b221d05.ts