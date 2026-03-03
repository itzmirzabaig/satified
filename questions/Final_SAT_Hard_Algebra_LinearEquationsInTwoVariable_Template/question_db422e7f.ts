import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: db422e7f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 8, 6]
 * - Difficulty factors: [Finding perpendicular slope]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Negative reciprocal]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_db422e7f = {
  metadata: {
    // id: "db422e7f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const a = getRandomInt(2, 8);
    const b = getRandomInt(4, 16);
    const c = getRandomInt(2, 12);
    
    // Slope of line p: -a/b
    // Perpendicular slope: b/a
    const slopeP = -a / b;
    
    // Simplify b/a
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const divisor = gcd(b, a);
    const num = b / divisor;
    const den = a / divisor;
    
    const correctAnswer = den === 1 ? num.toString() : `\\frac{${num}}{${den}}`;
    
    return {
      questionText: `Line $p$ is defined by $${a}y+${b}x=${c}$. Line $r$ is perpendicular to line $p$ in the xy-plane. What is the slope of line $r$?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `Converting to slope-intercept form: $${a}y=-${b}x+${c}$, so $y=-\\frac{${b}}{${a}}x+\\frac{${c}}{${a}}$. The slope of line $p$ is $-\\frac{${b}}{${a}}$. The perpendicular slope is the negative reciprocal: $\\frac{${b}}{${a}}${den === a ? '' : `=\\frac{${num}}{${den}}`}$.`
    };
  }
};

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