import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: f2bbd43d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system: y > 14 and 4x + y < 18, y: 53]
 * - Difficulty factors: [System solving with one known coordinate]
 * - Distractor patterns: [B/C/D=don't satisfy second inequality]
 * - Constraints: [Must satisfy y > 14 AND 4x + y < 18 with y=53]
 * - Question type: [System→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_f2bbd43d = {
  metadata: {
    // id: "f2bbd43d",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: y > 14, 4x + y < 18, point (x, 53)
    // Generate similar system
    const minY = getRandomInt(10, 20);
    const slope = getRandomInt(2, 6);
    const intercept = getRandomInt(15, 30);
    
    // Target y value (must be > minY)
    const targetY = minY + getRandomInt(30, 50);
    
    // STEP 2: Solve for valid x range
    // y > minY is satisfied (targetY > minY)
    // slope*x + targetY < intercept
    // x < (intercept - targetY) / slope
    const xThreshold = (intercept - targetY) / slope;
    
    // STEP 3: Generate options
    // Correct: x < xThreshold
    // Others: x > xThreshold
    const correctX = Math.floor(xThreshold) - getRandomInt(1, 3);
    const wrongX1 = Math.floor(xThreshold) + getRandomInt(1, 3);
    const wrongX2 = Math.abs(Math.floor(xThreshold)) + getRandomInt(1, 5);
    const wrongX3 = Math.abs(Math.floor(xThreshold)) + getRandomInt(5, 10);
    
    // Make some positive, some negative based on threshold
    const optionsData = [
      { text: `$${correctX}$`, isCorrect: true },
      { text: `$${wrongX1}$`, isCorrect: false },
      { text: `$${wrongX2}$`, isCorrect: false },
      { text: `$${wrongX3}$`, isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. Substituting ${targetY} for $y$ in $y > ${minY}$ yields ${targetY} > ${minY}$, which is true. Substituting ${targetY} for $y$ in $${slope}x + y < ${intercept}$ yields $${slope}x + ${targetY} < ${intercept}$. Subtracting ${targetY} gives $${slope}x < ${intercept - targetY}$. Dividing by ${slope} gives $x < ${xThreshold.toFixed(2)}$. Therefore, $x$ must be less than ${xThreshold.toFixed(2)}. Of the given choices, only ${correctX} is less than ${xThreshold.toFixed(2)}.`;
    
    // STEP 6: Return question data
    return {
      questionText: `The point $(x, ${targetY})$ is a solution to the system of inequalities in the $xy$-plane. Which of the following could be the value of $x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctX.toString(),
      explanation: explanation
    };
  }
};
/**
 * Question ID: 0ef4a7b6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [threshold: 100, ranges given in options]
 * - Difficulty factors: [Range interpretation, "more than" threshold]
 * - Distractor patterns: [B/C/D=ranges entirely below threshold]
 * - Constraints: [Range must be entirely > 100]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/0ef4a7b6.ts