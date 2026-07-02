import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 703
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/4, 27, 15, 7]
 * - Difficulty factors: [Distributing and combining like terms with fraction]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Clean fraction result]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_703 = {
  metadata: {
    id: "703",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const d = getRandomInt(2, 6);
    const a = getRandomInt(15, 40);
    const b = getRandomInt(5, 30);
    const c = getRandomInt(3, 12);
    
    const slopeNum = a + c * d;
    
    // Simplify
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const divisor = gcd(slopeNum, d);
    const finalNum = slopeNum / divisor;
    const finalDen = d / divisor;
    
    const slopeStr = finalDen === 1 ? finalNum.toString() : `\\frac{${finalNum}}{${finalDen}}`;
    
    return {
      questionText: `What is the slope of the graph of \\( y=\\frac{1}{${d}}(${a} x+${b})+${c} x \\) in the xy-plane?`,
      figureCode: null,
      options: null,
      correctAnswer: slopeStr,
      explanation: `The correct answer is \\( ${slopeStr} \\). In the xy-plane, the graph of an equation in the form \\( y=mx+b \\), where \\( m \\) and \\( b \\) are constants, has a slope of \\( m \\) and a y-intercept of \\( (0, b) \\). Applying the distributive property to the right-hand side of the given equation yields \\( y=\\frac{${a}}{${d}} x+\\frac{${b}}{${d}}+${c} x \\). Combining like terms yields \\( y=${slopeStr} x+\\frac{${b}}{${d}} \\). This equation is in the form \\( y=mx+b \\), where \\( m=${slopeStr} \\) and \\( b=\\frac{${b}}{${d}} \\). It follows that the slope is \\( ${slopeStr} \\). Note that ${slopeStr} and ${(finalNum/finalDen).toFixed(4)} are examples of ways to enter a correct answer.`
    };
  }
};
