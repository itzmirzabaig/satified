import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e53688cb
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, 3, 0, 3, results: 29, 11]
 * - Difficulty factors: [Simple substitution, solve for x]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Integer answer 18]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_e53688cb = {
  metadata: {
    // id: "e53688cb",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const yCoeff = getRandomInt(2, 5);
    const right1 = getRandomInt(15, 40);
    const right2 = getRandomInt(5, 15);
    const xValue = right1 - right2;
    
    // STEP 2: Build question text
    const questionText = `The solution to the given system of equations is $(x, y)$. What is the value of $x$?\n\n$$x+${yCoeff} y=${right1}$$\n$$${yCoeff} y=${right2}$$`;
    
    // STEP 3: Return fill-in-the-blank
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: xValue.toString(),
      explanation: `The correct answer is ${xValue}. It's given by the second equation in the system that \\( ${yCoeff} y=${right2} \\). Substituting ${right2} for \\( ${yCoeff} y \\) in the first equation in the system, \\( x+${yCoeff} y=${right1} \\), yields \\( x+${right2}=${right1} \\). Subtracting ${right2} from both sides of this equation yields \\( x=${xValue} \\).`
    };
  }
};