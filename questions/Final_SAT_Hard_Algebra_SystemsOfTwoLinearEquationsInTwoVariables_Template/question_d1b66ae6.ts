import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: d1b66ae6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: -1, 1, 3, constants: -3.5, 9.5 (decimals)]
 * - Difficulty factors: [Elimination method with decimals, solving for specific variable]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Solution must be clean decimal or fraction]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */

export const generator_d1b66ae6 = {
  metadata: {
    // id: "d1b66ae6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;
    
    while (attempts < maxAttempts && !result) {
      attempts++;
      
      // STEP 1: Generate system that eliminates nicely
      const yTarget = getRandomInt(1, 5) + 0.5; // 1.5, 2.5, 3.5, 4.5, 5.5
      const sumC = 4 * yTarget;
      
      // Generate c1 and c2 that sum to sumC
      const c1 = getRandomInt(-10, 10) + (getRandomElement([0, 0.5]) as number);
      const c2 = sumC - c1;
      
      // Verify x comes out clean
      const xValue = (c2 - 3 * c1) / 4;
      
      // Check that both equations are satisfied
      const check1 = -xValue + yTarget;
      const check2 = xValue + 3 * yTarget;
      
      if (Math.abs(check1 - c1) > 0.001 || Math.abs(check2 - c2) > 0.001) {
        continue;
      }
      
      // Format decimals nicely
      const formatNum = (n: number) => {
        if (n === Math.floor(n)) return n.toString();
        return n.toFixed(1);
      };
      
      const eq1 = `-x+y=${formatNum(c1)}`;
      const eq2 = `x+3y=${formatNum(c2)}`;
      
      result = {
        questionText: `If $(x, y)$ satisfies the system of equations below, what is the value of $y$? $$${eq1}$$ $$${eq2}$$`,
        figureCode: null,
        options: null,
        correctAnswer: yTarget.toString(),
        explanation: `To solve the system, add the two equations to eliminate $x$: $(-x + y) + (x + 3y) = ${formatNum(c1)} + ${formatNum(c2)}$. This simplifies to $4y = ${formatNum(sumC)}$. Dividing both sides by 4 gives $y = ${yTarget}$.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: ff501705
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 3/2, 1/4, 2/3, 1/2, fractions with p]
 * - Difficulty factors: [Complex fraction manipulation, no solution condition (parallel lines)]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [After clearing fractions, coefficients must be proportional but constants not]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */