import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 968e9e51
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Simple inequalities y ≤ x and y ≤ -x]
 * - Difficulty factors: [System of inequalities, intersection region identification]
 * - Distractor patterns: [Points satisfying only one inequality, points satisfying neither]
 * - Constraints: [Must satisfy both y ≤ x AND y ≤ -x]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_968e9e51 = {
  metadata: {
    // id: "968e9e51",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: System is fixed: y ≤ x and y ≤ -x
    // This creates a "downward V" region below both lines
    // The solution is the intersection: y ≤ min(x, -x), which means y ≤ -|x|
    
    // Generate a correct point in the solution region (y ≤ -|x|)
    // For x=0, y must be ≤ 0. Choose negative y.
    const correctY = -getRandomInt(1, 5);
    const correctX = 0;
    
    // Distractor 1: (1, 0) - satisfies y ≤ x but NOT y ≤ -x (0 > -1)
    const dist1X = 1;
    const dist1Y = 0;
    
    // Distractor 2: (-1, 0) - satisfies y ≤ -x but NOT y ≤ x (0 > -1)
    const dist2X = -1;
    const dist2Y = 0;
    
    // Distractor 3: (0, 1) - satisfies neither
    const dist3X = 0;
    const dist3Y = 1;
    
    // STEP 2: Create options with tracking
    const optionsData = [
      { text: `$(${dist1X}, ${dist1Y})$`, isCorrect: false },
      { text: `$(${dist2X}, ${dist2Y})$`, isCorrect: false },
      { text: `$(${dist3X}, ${dist3Y})$`, isCorrect: false },
      { text: `$(${correctX}, ${correctY})$`, isCorrect: true }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    
    // STEP 4: Build explanation
    const explanation = `Choice ${correctOption.letter} is correct. Testing each option in both inequalities:\n\n$(${dist1X}, ${dist1Y})$: Satisfies $${dist1Y} \\le ${dist1X}$ but not $${dist1Y} \\le ${-dist1X}$.\n$(${dist2X}, ${dist2Y})$: Satisfies $${dist2Y} \\le ${-dist2X}$ but not $${dist2Y} \\le ${dist2X}$.\n$(${dist3X}, ${dist3Y})$: Fails both inequalities.\n$(${correctX}, ${correctY})$: Satisfies $${correctY} \\le ${correctX}$ and $${correctY} \\le ${-correctX}$.\n\nTherefore, $(${correctX}, ${correctY})$ is the only solution that satisfies both inequalities.`;
    
    // STEP 5: Return question data
    return {
      questionText: `Which of the following ordered pairs $(x, y)$ is a solution to the system of inequalities below?\n\n$y \\le x$\n$y \\le -x$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `(${correctX}, ${correctY})`,
      explanation: explanation
    };
  }
};
/**
 * Question ID: dd875c97
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [max weight: 5630, equipment: 190, crate weights: 25, 62]
 * - Difficulty factors: [Multi-step inequality setup, fixed weight subtraction]
 * - Distractor patterns: [B=wrong inequality sign, C/D=swapped coefficients or no equipment subtraction]
 * - Constraints: [190 + 25x + 62y ≤ 5630, simplified to 25x + 62y ≤ 5440]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/LinearInequalitiesInOneOrTwoVariables/dd875c97.ts