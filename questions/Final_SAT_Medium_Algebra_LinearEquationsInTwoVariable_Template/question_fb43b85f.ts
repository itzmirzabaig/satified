import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fb43b85f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (4,6), (15,24), slope: 18/11]
 * - Difficulty factors: [Calculating slope from two points]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Non-integer slope result]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_fb43b85f = {
  metadata: {
    // id: "fb43b85f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const x1 = getRandomInt(1, 10);
    const y1 = getRandomInt(2, 15);
    const x2 = x1 + getRandomInt(5, 15);
    const slopeNum = getRandomInt(10, 30);
    const slopeDen = x2 - x1;
    const y2 = y1 + slopeNum;
    
    // Simplify fraction using while loop (no recursion)
    const gcd = (a: number, b: number): number => {
      let num1 = Math.abs(a);
      let num2 = Math.abs(b);
      while (num2 !== 0) {
        const temp = num2;
        num2 = num1 % num2;
        num1 = temp;
      }
      return num1;
    };
    
    const divisor = gcd(slopeNum, slopeDen);
    const finalNum = slopeNum / divisor;
    const finalDen = slopeDen / divisor;
    
    const slopeStr = finalDen === 1 ? finalNum.toString() : `\\frac{${finalNum}}{${finalDen}}`;
    
    return {
      questionText: `A line passes through the points (${x1}, ${y1}) and (${x2}, ${y2}) in the xy-plane. What is the slope of the line?`,
      figureCode: null,
      options: [], // Empty array for fill-in-blank, not null
      correctAnswer: slopeStr,
      explanation: `The correct answer is $${slopeStr}$. For a line that passes through the points $(${x1},${y1})$ and $(${x2},${y2})$ in the xy-plane, the slope of the line can be calculated using the slope formula, $m=\\frac{y_{2}-y_{1}}{x_{2}-x_{1}}$. Substituting the given points yields $m=\\frac{${y2}-${y1}}{${x2}-${x1}} = \\frac{${slopeNum}}{${slopeDen}} = ${slopeStr}$. Note that $${slopeStr}$ and $${(finalNum/finalDen).toFixed(4)}$ are examples of ways to enter a correct answer.`
    };
  }
};