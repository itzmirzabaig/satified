import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1171
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3 and 12 in equation]
 * - Difficulty factors: [Finding perpendicular slope from standard form]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Slope must be negative reciprocal]
 * - Question type: [Text → Fill in blank]
 * - Figure generation: [None]
 */

export const generator_1171 = {
  metadata: {
    id: "1171",
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
    
    // Equation ay + bx = c  =>  y = -(b/a)x + c/a, so slope of line l is -b/a.
    // Perpendicular slope is the negative reciprocal of -b/a, which is +a/b.
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    const divisor = gcd(Math.abs(a), Math.abs(b));
    const simplifiedNum = a / divisor; // numerator of a/b
    const simplifiedDen = b / divisor; // denominator of a/b

    const correctAnswer = simplifiedDen === 1 ? simplifiedNum.toString() : `${simplifiedNum}/${simplifiedDen}`;
    const simplifiesFurther = divisor !== 1;

    return {
      questionText: `Line \\( \\ell \\) is defined by \\( ${a}y+${b}x=${c} \\). Line \\( n \\) is perpendicular to line \\( \\ell \\) in the xy-plane. What is the slope of line \\( n \\) ?`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `First, convert to slope-intercept form: $${a}y=-${b}x+${c}$, so $y=-\\frac{${b}}{${a}}x+\\frac{${c}}{${a}}$. The slope of line $\\ell$ is $-\\frac{${b}}{${a}}$. The slope of a perpendicular line is the negative reciprocal, so the slope of line $n$ is $\\frac{${a}}{${b}}${simplifiesFurther ? `=\\frac{${simplifiedNum}}{${simplifiedDen}}` : ''}$.`
    };
  }
};
