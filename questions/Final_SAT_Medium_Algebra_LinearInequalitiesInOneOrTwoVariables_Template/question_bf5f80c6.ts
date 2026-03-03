import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: bf5f80c6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -4, intercept: 4]
 * - Difficulty factors: [Point testing in strict inequality y < -4x + 4]
 * - Distractor patterns: [Points where calculation error leads to wrong conclusion]
 * - Constraints: [Strict inequality <, not ≤]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_bf5f80c6 = {
  metadata: {
    // id: "bf5f80c6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y < -4x + 4
    // Generate similar: y < mx + b where m is negative
    const slope = -getRandomInt(2, 6); // Negative slope
    const intercept = getRandomInt(2, 8); // Positive intercept
    const absSlope = Math.abs(slope);
    
    // STEP 2: Generate correct point (must satisfy y < slope*x + intercept)
    // Choose x, then y must be less than the boundary value
    const testX = getRandomInt(1, 4);
    const boundaryY = slope * testX + intercept;
    const testY = boundaryY - getRandomInt(1, 5); // Strictly less than
    
    // STEP 3: Generate distractors
    // A: x = -4, y = 0 (might satisfy for some values)
    const dist1X = -getRandomInt(3, 5);
    const dist1Y = 0;
    
    // B: x = 0, y = intercept + 1 (above intercept, should fail)
    const dist2X = 0;
    const dist2Y = intercept + getRandomInt(1, 3);
    
    // C: x = 2, y = 1 (on the line or close)
    const dist3X = 2;
    const dist3Y = slope * dist3X + intercept + getRandomInt(1, 3); // Above line
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `$(${dist1X}, ${dist1Y})$`, isCorrect: false },
      { text: `$(${dist2X}, ${dist2Y})$`, isCorrect: false },
      { text: `$(${dist3X}, ${dist3Y})$`, isCorrect: false },
      { text: `$(${testX}, ${testY})$`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. Testing each point in the inequality $y < ${slope}x + ${intercept}$:\n\n$(${testX}, ${testY})$: $${testY} < ${slope}(${testX}) + ${intercept} = ${boundaryY}$, which is true.\n\nThe other options either result in false statements or are on the wrong side of the boundary line.`;
    
    // STEP 7: Return question data
    return {
      questionText: `Which point $(x, y)$ is a solution to the given inequality in the $xy$-plane?\n\n$$y < ${slope}x + ${intercept}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `(${testX}, ${testY})`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: 80da233d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [birth weight: 200, gain: 2-3 lbs/day, days: 365]
 * - Difficulty factors: [Compound inequality with multiplication, addition of base value]
 * - Distractor patterns: [A=wrong calculation, B=wrong base, C=forgot birth weight]
 * - Constraints: [200 + 365*2 < w < 200 + 365*3]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/80da233d.ts