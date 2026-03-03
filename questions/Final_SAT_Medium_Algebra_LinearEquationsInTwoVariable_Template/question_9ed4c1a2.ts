import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9ed4c1a2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/4, 27, 15, 7]
 * - Difficulty factors: [Distributing and combining like terms with fraction]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Clean fraction result]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_9ed4c1a2 = {
  metadata: {
    // id: "9ed4c1a2",
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

// File: generators/LinearEquationsInTwoVariable/sat-fb43b85f.ts
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
