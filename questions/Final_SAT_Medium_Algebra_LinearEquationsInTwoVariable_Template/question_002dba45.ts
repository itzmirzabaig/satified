import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 002dba45
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: -17/3 (specific fraction), constant: 5 (single digit)]
 * - Difficulty factors: [Finding negative reciprocal of a fraction slope]
 * - Distractor patterns: [Not applicable - fill in blank, but could include sign errors, reciprocal without negative, etc.]
 * - Constraints: [Perpendicular slopes are negative reciprocals]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - conceptual question]
 */

export const generator_002dba45 = {
  metadata: {
    // id: "002dba45",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - use medium difficulty numbers similar to original
    // Original: -17/3, so use medium-sized numerators (10-30) and denominators (2-8)
    const numerator = getRandomInt(10, 30);
    const denominator = getRandomInt(2, 8);
    const yIntercept = getRandomInt(1, 9);
    
    // Make slope negative half the time for variety
    const slopeSign = getRandomElement([-1, 1]);
    const slopeNumerator = numerator * slopeSign;
    
    // STEP 2: Calculate perpendicular slope (negative reciprocal)
    // If original slope is -a/b, perpendicular is b/a
    // If original slope is a/b, perpendicular is -b/a
    const perpNumerator = -denominator * slopeSign;
    const perpDenominator = numerator;
    
    // Simplify the perpendicular slope
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(Math.abs(perpNumerator), perpDenominator);
    const finalNum = perpNumerator / divisor;
    const finalDen = perpDenominator / divisor;
    
    const correctAnswer = finalDen === 1 ? finalNum.toString() : `\\frac{${finalNum}}{${finalDen}}`;
    
    return {
      questionText: `Line $k$ is defined by $y=${slopeSign === -1 ? '-' : ''}\\frac{${numerator}}{${denominator}} x+${yIntercept}$. Line $j$ is perpendicular to line $k$ in the xy-plane. What is the slope of line $j$ ?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `The slope of line $j$ is the negative reciprocal of the slope of line $k$. The slope of line $k$ is $${slopeSign === -1 ? '-' : ''}\\frac{${numerator}}{${denominator}}$. The negative reciprocal is $\\frac{-1}{${slopeSign === -1 ? '-' : ''}${numerator}/${denominator}} = ${correctAnswer}$.`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-01682aa5.ts
/**
 * Question ID: 01682aa5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 18, 9 (small integers)]
 * - Difficulty factors: [Converting standard form to slope-intercept, finding perpendicular slope]
 * - Distractor patterns: [A: original slope, B: reciprocal without negative, C: correct answer, D: negative of original slope]
 * - Constraints: [Ensure clean integer division for slope]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
