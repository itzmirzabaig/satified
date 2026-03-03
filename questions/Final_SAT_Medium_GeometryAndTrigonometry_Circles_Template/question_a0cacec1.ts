import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: a0cacec1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [numerator: 16, denominator: 15 (both double-digit, reasonable fractions)]
 * - Difficulty factors: [Radian to degree conversion, fraction simplification]
 * - Distractor patterns: [None - fill in the blank]
 * - Constraints: [Must simplify 180/15 = 12, then multiply]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_a0cacec1 = {
  metadata: {
    // id: "a0cacec1",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random angle in radians (similar magnitude to 16π/15)
    // Use fractions that simplify nicely: kπ/n where 180/n is clean
    const denominators = [5, 6, 9, 10, 12, 15, 18]; // divisors of 180 or easy to compute
    const n = getRandomElement(denominators);
    const maxNumerator = Math.floor(3 * n); // Keep it reasonable (less than 3π, i.e., 540°)
    const minNumerator = Math.floor(n * 0.5); // At least 0.5π (90°)
    const k = getRandomInt(minNumerator, maxNumerator);
    
    // STEP 2: Calculate degree measure
    // (kπ/n) × (180/π) = (k × 180) / n
    const degrees = (k * 180) / n;
    
    // STEP 3: Return question data (fill-in-the-blank)
    return {
      questionText: `An angle has a measure of $\\frac{${k}\\pi}{${n}}$ radians. What is the measure of the angle, in degrees?`,
      figureCode: null,
      options: null,
      correctAnswer: degrees.toString(),
      explanation: `To convert an angle from radians to degrees, multiply by $\\frac{180^{\\circ}}{\\pi}$. $$\\frac{${k}\\pi}{${n}} \\times \\frac{180^{\\circ}}{\\pi} = \\frac{${k}}{${n}} \\times 180^{\\circ} = ${k} \\times ${180/n}^{\\circ} = ${degrees}^{\\circ}$$ The measure of the angle in degrees is ${degrees}.`
    };
  }
};

/**
 * Question ID: f1c1e971
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angle R: 2π/3, difference: 5π/12 (fractions with different denominators)]
 * - Difficulty factors: [Adding fractions with different denominators, converting to degrees]
 * - Distractor patterns: [A=just the difference in degrees, B=angle R in degrees only, C=correct, D=calculation error]
 * - Constraints: [Must find common denominator 12, convert final result to degrees]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/Circles/f1c1e971.ts