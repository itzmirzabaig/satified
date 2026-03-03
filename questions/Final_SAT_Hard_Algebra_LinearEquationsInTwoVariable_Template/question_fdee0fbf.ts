import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fdee0fbf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y-intercept: -6, point: (2,2), find w at x=20]
 * - Difficulty factors: [Find slope from two points, then evaluate at new x]
 * - Distractor patterns: [Fill in blank]
 * - Constraints: [Slope calculation, point-slope form]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_fdee0fbf = {
  metadata: {
    // id: "fdee0fbf",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    let yIntercept: number;
    let xPoint: number;
    let yPoint: number;
    let targetX: number;
    let finalSlope: number;
    let w: number;
    
    // Use while loop to ensure we get valid integer slope
    let valid = false;
    let attempts = 0;
    const maxAttempts = 100;
    
    while (!valid && attempts < maxAttempts) {
      yIntercept = getRandomInt(-10, -2);
      xPoint = getRandomInt(1, 5);
      yPoint = getRandomInt(1, 10);
      targetX = getRandomInt(15, 25);
      
      // Calculate slope: (yPoint - yIntercept) / (xPoint - 0)
      const slope = (yPoint - yIntercept) / xPoint;
      
      // Ensure slope is integer
      if (Number.isInteger(slope)) {
        finalSlope = Math.round(slope);
        w = finalSlope * targetX + yIntercept;
        valid = true;
      }
      attempts++;
    }
    
    // Fallback if no valid combination found
    if (!valid) {
      yIntercept = -6;
      xPoint = 2;
      yPoint = 2;
      targetX = 20;
      finalSlope = 4;
      w = 74;
    }
    
    return {
      questionText: `In the xy-plane, line $k$ intersects the $y$-axis at the point $(0,${yIntercept})$ and passes through the point $(${xPoint},${yPoint})$. If the point $(${targetX}, w)$ lies on line $k$, what is the value of $w$?`,
      figureCode: null,
      options: null,
      correctAnswer: w.toString(),
      explanation: `The slope is $\\frac{${yPoint}-(${yIntercept})}{${xPoint}-0} = \\frac{${yPoint - yIntercept}}{${xPoint}} = ${finalSlope}$. The equation is $y = ${finalSlope}x ${yIntercept >= 0 ? '+' : ''}${yIntercept}$. When $x=${targetX}$, $w = ${finalSlope}(${targetX}) ${yIntercept >= 0 ? '+' : ''}${yIntercept} = ${w}$.`
    };
  }
};

/**
 * Question ID: d0e614a6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fractions: 3/5, 3/4, result: 7]
 * - Difficulty factors: [Matching table to linear equation with fractions]
 * - Distractor patterns: [A, B, C, D table options]
 * - Constraints: [Must verify all three points satisfy equation]
 * - Question type: [Figure → Multiple Choice with Table in options]
 * - Figure generation: [Line graph]
 */