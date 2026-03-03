import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: e0f59119
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1/3, 29, 10, 5]
 * - Difficulty factors: [Distributing fraction, combining like terms]
 * - Distractor patterns: [Not applicable - fill in blank]
 * - Constraints: [Final slope should be clean fraction]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_e0f59119 = {
  metadata: {
    // id: "e0f59119",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters ensuring clean result
    // y = (1/d)(ax + b) + cx = (a/d + c)x + b/d
    const d = getRandomInt(2, 6);
    const a = getRandomInt(10, 40);
    const b = getRandomInt(5, 30);
    const c = getRandomInt(2, 10);
    
    // Calculate slope: a/d + c = (a + cd)/d
    const slopeNum = a + c * d;
    
    // Simplify if possible
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const divisor = gcd(slopeNum, d);
    const finalNum = slopeNum / divisor;
    const finalDen = d / divisor;
    
    const slopeStr = finalDen === 1 ? finalNum.toString() : `\\frac{${finalNum}}{${finalDen}}`;
    const decimalVal = (finalNum / finalDen).toFixed(4);
    
    return {
      questionText: `What is the slope of the graph of $y=\\frac{1}{${d}}(${a} x+${b})+${c} x$ in the xy-plane?`,
      figureCode: null,
      options: null,
      correctAnswer: slopeStr,
      explanation: `The correct answer is $${slopeStr}$. A linear equation can be written in the form $y=mx+b$, where $m$ is the slope of the graph of the equation in the xy-plane and $(0, b)$ is the y-intercept. Distributing the $\\frac{1}{${d}}$ in the equation $y=\\frac{1}{${d}}(${a} x+${b})+${c} x$ yields $y=\\frac{${a}}{${d}} x+\\frac{${b}}{${d}}+${c} x$. Combining like terms on the right-hand side of this equation yields $y=${slopeStr} x+\\frac{${b}}{${d}}$. This equation is in the form $y=mx+b$, where $m=${slopeStr}$. Therefore, the slope of the graph of the given equation in the xy-plane is $${slopeStr}$. Note that ${slopeStr}, ${decimalVal}, and ${Math.round(finalNum/finalDen * 100)/100} are examples of ways to enter a correct answer.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-c307283c.ts
/**
 * Question ID: c307283c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -1, intercept: -8, points: (0,-8), (-8,0)]
 * - Difficulty factors: [Identifying slope and intercept from graph]
 * - Distractor patterns: [A: wrong slope, B: wrong sign, C: correct, D: wrong slope]
 * - Constraints: [Line passes through clear integer points]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs line plot with intercept points]
 */
