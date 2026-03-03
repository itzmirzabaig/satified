import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: b544a348
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, 3, 1, 3, results: 38, 10]
 * - Difficulty factors: [Elimination, solve for x]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Integer answer 7]
 * - Question type: [Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_b544a348 = {
  metadata: {
    // id: "b544a348",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const yCoeff = getRandomInt(2, 5);
    const xCoeff1 = getRandomInt(4, 8);
    const xCoeff2 = getRandomInt(1, 3);
    const xValue = getRandomInt(5, 12);
    const yValue = getRandomInt(2, 8);
    
    const right1 = xCoeff1 * xValue + yCoeff * yValue;
    const right2 = xCoeff2 * xValue + yCoeff * yValue;
    
    // STEP 2: Build question text
    const questionText = `In the solution $(x, y)$ to the system of equations below, what is the value of $x$?\n\n$$${xCoeff1}x+${yCoeff}y=${right1}$$\n$$${xCoeff2}x+${yCoeff}y=${right2}$$`;
    
    // STEP 3: Return fill-in-the-blank
    return {
      questionText: questionText,
      figureCode: null,
      options: null,
      correctAnswer: xValue.toString(),
      explanation: `To solve for $x$ in the given system of equations, we can use the elimination method because the coefficients of $y$ in both equations are the same ($${yCoeff}y$). 1. **Set up the system of equations:** $$${xCoeff1}x + ${yCoeff}y = ${right1}$$ (Equation 1) $$${xCoeff2}x + ${yCoeff}y = ${right2}$$ (Equation 2) 2. **Subtract Equation 2 from Equation 1:** $$(${xCoeff1}x + ${yCoeff}y) - (${xCoeff2}x + ${yCoeff}y) = ${right1} - ${right2}$$ $$${xCoeff1}x - ${xCoeff2}x + ${yCoeff}y - ${yCoeff}y = ${right1 - right2}$$ $$${xCoeff1 - xCoeff2}x = ${right1 - right2}$$ 3. **Solve for $x$:** Divide both sides by $${xCoeff1 - xCoeff2}$: $$x = \\frac{${right1 - right2}}{${xCoeff1 - xCoeff2}}$$ $$x = ${xValue}$$ Therefore, the value of $x$ is $${xValue}$.`
    };
  }
};

/**
 * Question ID: 65833256
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 6, -7, -1, 16, 36]
 * - Difficulty factors: [Substitution with negative numbers]
 * - Distractor patterns: [(-4, -8), (-20/13, -80/13), (4, 40), (20, 136)]
 * - Constraints: [Integer solution with negatives]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */