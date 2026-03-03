import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 00723d16
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3 and 12 in equation]
 * - Difficulty factors: [Finding perpendicular slope from standard form]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Slope must be negative reciprocal]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_00723d16 = {
  metadata: {
    // id: "00723d16",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 3y + 12x = 5
    const a = getRandomInt(2, 8);
    const b = getRandomInt(6, 20);
    const c = getRandomInt(1, 10);
    
    // Slope of line l: -a/b
    const slopeL = -a / b;
    // Perpendicular slope: b/a
    const slopeN = b / a;
    
    // Check if it simplifies
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const divisor = gcd(Math.abs(b), Math.abs(a));
    const simplifiedNum = b / divisor;
    const simplifiedDen = a / divisor;
    
    const correctAnswer = simplifiedDen === 1 ? simplifiedNum.toString() : `${simplifiedNum}/${simplifiedDen}`;
    
    return {
      questionText: `Line \\( \\ell \\) is defined by \\( ${a}y+${b}x=${c} \\). Line \\( n \\) is perpendicular to line \\( \\ell \\) in the xy-plane. What is the slope of line \\( n \\) ?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `First, convert to slope-intercept form: $${a}y=-${b}x+${c}$, so $y=-\\frac{${b}}{${a}}x+\\frac{${c}}{${a}}$. The slope of line $\\ell$ is $-\\frac{${b}}{${a}}$. The perpendicular slope is the negative reciprocal: $\\frac{${b}}{${a}}${simplifiedDen === a ? '' : `=\\frac{${simplifiedNum}}{${simplifiedDen}}`}$.`
    };
  }
};

/**
 * Question ID: 9bbce683
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 18, 23, 26 (double-digit), y: 130, 160, 178 (triple-digit), slope: 6]
 * - Difficulty factors: [Translation down 5 units, finding x-intercept of new line]
 * - Distractor patterns: [A: -26/3, B: -9/2, C: -11/3, D: -17/6]
 * - Constraints: [Translation affects y-intercept only]
 * - Question type: [Table + Figure → Multiple Choice Text]
 * - Figure generation: [Two lines, original and translated]
 */