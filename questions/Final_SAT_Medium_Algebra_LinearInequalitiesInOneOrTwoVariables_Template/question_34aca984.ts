import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 34aca984
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [length: 50, width: x, perimeter: ≤ 210]
 * - Difficulty factors: [Perimeter formula, inequality setup]
 * - Distractor patterns: [B=wrong inequality sign, C=wrong formula, D=wrong formula and sign]
 * - Constraints: [2(50) + 2x ≤ 210, or 2x + 100 ≤ 210]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_34aca984 = {
  metadata: {
    // id: "34aca984",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: length 50, perimeter ≤ 210
    const length = getRandomInt(40, 80);
    const maxPerimeter = 2 * length + getRandomInt(50, 150); // Ensure valid range
    
    // STEP 2: Create options
    // Correct: 2x + 2*length ≤ maxPerimeter, simplified to 2x + (2*length) ≤ maxPerimeter
    const doubleLength = 2 * length;
    
    // A: Correct - 2x + 100 ≤ 210
    // B: Wrong sign - 2x + 100 ≥ 210
    // C: Wrong formula - 2x + 50 ≤ 210 (didn't double length)
    // D: Wrong formula and sign - 2x + 50 ≥ 210
    
    const optionsData = [
      { text: `$2x + ${doubleLength} \\leq ${maxPerimeter}$`, isCorrect: true },
      { text: `$2x + ${doubleLength} \\geq ${maxPerimeter}$`, isCorrect: false },
      { text: `$2x + ${length} \\leq ${maxPerimeter}$`, isCorrect: false },
      { text: `$2x + ${length} \\geq ${maxPerimeter}$`, isCorrect: false }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. The perimeter of a rectangle is $P = 2l + 2w$. With length ${length} and width $x$, the perimeter is $2(${length}) + 2x = ${doubleLength} + 2x$. Since the perimeter is at most ${maxPerimeter}, the inequality is $2x + ${doubleLength} \\leq ${maxPerimeter}$. Choice ${incorrectOptions[0].letter} is incorrect because it uses "$\\geq$" (at least) instead of "$\\leq$" (at most). Choice ${incorrectOptions[1].letter} is incorrect because it doesn't double the length (uses ${length} instead of ${doubleLength}). Choice ${incorrectOptions[2].letter} is incorrect because it has both the wrong formula and wrong inequality sign.`;
    
    // STEP 5: Return question data
    return {
      questionText: `The length of a rectangle is $${length}$ inches and the width is $x$ inches. The perimeter is at most $${maxPerimeter}$ inches. Which inequality represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `2x + ${doubleLength} \\leq ${maxPerimeter}`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: 74c98c82
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [venue: 35, per attendee: 10.25, budget: 200]
 * - Difficulty factors: [Same as b78cd5df but with different values, rounding down]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [35 + 10.25x ≤ 200, x ≤ 16.098... → 16]
 * - Question type: [Word Problem→Fill in the Blank]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/74c98c82.ts