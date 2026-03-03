import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: cc3e9528
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 9, -10, 19, translate down 4]
 * - Difficulty factors: [Translation down 4 units affects y, find new x-intercept]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Translation: y → y+4 in original equation, or subtract 4 from RHS]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_cc3e9528 = {
  metadata: {
    // id: "cc3e9528",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const a = getRandomInt(3, 12);
    const b = -getRandomInt(5, 15); // Negative as in original
    const c = getRandomInt(10, 30);
    const translation = getRandomInt(2, 6);
    
    // Original: ax + by = c
    // Translated down k: ax + b(y+k) = c => ax + by + bk = c => ax + by = c - bk
    const newC = c - b * translation;
    
    // New x-intercept: x = newC/a
    const xInt = newC / a;
    
    // Check if it's a nice fraction
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const divisor = gcd(Math.abs(newC), a);
    const num = newC / divisor;
    const den = a / divisor;
    
    const answerStr = den === 1 ? num.toString() : `\\frac{${num}}{${den}}`;
    
    return {
      questionText: `The graph of $${a}x ${b >= 0 ? '+' : ''}${b}y = ${c}$ is translated down ${translation} units in the $xy$-plane. What is the $x$-coordinate of the $x$-intercept of the resulting graph?`,
      figureCode: null,
      options: null,
      correctAnswer: answerStr,
      explanation: `Translating down ${translation} replaces $y$ with $y+${translation}$: $${a}x ${b >= 0 ? '+' : ''}${b}(y+${translation}) = ${c}$, which gives $${a}x ${b >= 0 ? '+' : ''}${b}y = ${c} ${-b * translation >= 0 ? '+' : ''}${-b * translation} = ${newC}$. Setting $y=0$: $${a}x = ${newC}$, so $x = ${answerStr}$.`
    };
  }
};

/**
 * Question ID: 0366d965
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2, points with k and n unknown]
 * - Difficulty factors: [Using slope formula twice to find k and n]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [k + n = 30 in original]
 * - Question type: [Table + Figure → Fill in blank]
 * - Figure generation: [Line with three points]
 */