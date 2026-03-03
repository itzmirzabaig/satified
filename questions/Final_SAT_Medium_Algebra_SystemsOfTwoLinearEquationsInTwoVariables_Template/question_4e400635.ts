import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4e400635
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 4, 2, constants: 6, 4]
 * - Difficulty factors: [Subtraction method, solve for y]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Clean subtraction gives 2 = 2y]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_4e400635 = {
  metadata: {
    // id: "4e400635",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values that give clean subtraction
    const a = getRandomInt(2, 5);
    const b1 = getRandomInt(3, 7);
    const b2 = getRandomInt(1, 3);
    const yValue = 1;
    
    // 3x + c1 = b1*y, 3x + c2 = b2*y
    // Subtract: c1 - c2 = (b1 - b2)*y = b1 - b2 (since y=1)
    const c1 = getRandomInt(4, 8);
    const c2 = c1 - (b1 - b2);
    
    // STEP 2: Build question text
    const questionText = `$$\\begin{cases} ${a}x + ${c1} = ${b1}y \\\\ ${a}x + ${c2} = ${b2}y \\end{cases}$$ \n\nThe solution to the given system of equations is $(x, y)$. What is the value of $y$?`;
    
    // STEP 3: Return fill-in-the-blank
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: "1",
      explanation: `Subtract the second equation from the first: (${a}x+${c1})-(${a}x+${c2}) = ${b1}y-${b2}y \\implies ${c1 - c2} = ${b1 - b2}y \\implies y = ${(c1 - c2)/(b1 - b2)}$.`
    };
  }
};

/**
 * Question ID: dcc4886a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2/7, intercept: 3]
 * - Difficulty factors: [Infinitely many solutions, identify y-intercept]
 * - Distractor patterns: [-3, -1/3, 1/3, 3]
 * - Constraints: [Same line requires same intercept]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */