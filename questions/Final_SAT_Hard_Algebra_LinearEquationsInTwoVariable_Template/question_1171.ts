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
    const gcd = (x: number, y: number): number => y === 0 ? x : gcd(y, x % y);
    // c is coprime to a so the y-intercept c/a in the explanation is in lowest terms.
    let c = getRandomInt(1, 10);
    while (gcd(c, a) !== 1) c = getRandomInt(1, 10);

    // Equation ay + bx = c  =>  y = -(b/a)x + c/a, so slope of line l is -b/a.
    // Perpendicular slope is the negative reciprocal of -b/a, which is +a/b.
    const divisor = gcd(Math.abs(a), Math.abs(b));
    const simplifiedNum = a / divisor; // numerator of a/b
    const simplifiedDen = b / divisor; // denominator of a/b

    const correctAnswer = simplifiedDen === 1 ? simplifiedNum.toString() : `${simplifiedNum}/${simplifiedDen}`;
    const simplifiesFurther = divisor !== 1;
    const answerTex = simplifiedDen === 1 ? `${simplifiedNum}` : `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    const lineSlopeTex = simplifiedNum === 1 ? `-${simplifiedDen}` : `-\\frac{${simplifiedDen}}{${simplifiedNum}}`;
    const slopeValue = simplifiedNum / simplifiedDen;
    // A decimal entry has room for 5 characters: .4286 below 1, 1.333 above.
    const places = slopeValue < 1 ? 4 : 3;
    const rounded = Number(slopeValue.toFixed(places));
    const decimal = (Math.abs(rounded - slopeValue) < 1e-9 ? `${rounded}` : slopeValue.toFixed(places)).replace(/^0(?=\.)/, '');
    const enterNote = simplifiedDen === 1 ? '' : ` Note that ${simplifiedNum}/${simplifiedDen} and ${decimal} are acceptable ways to enter the answer.`;

    return {
      // Before: a stray space before the question mark, and "xy-plane" not set as math.
      questionText: `Line $\\ell$ is defined by $${a}y + ${b}x = ${c}$. Line $n$ is perpendicular to line $\\ell$ in the $xy$-plane. What is the slope of line $n$?`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      // Before: no "The correct answer is" lead, the slope of line l was left
      // unreduced (like -12/3), and the answer had no note on how to enter it.
      explanation: `The correct answer is $${answerTex}$. Subtracting $${b}x$ from both sides of $${a}y + ${b}x = ${c}$ gives $${a}y = -${b}x + ${c}$, and dividing both sides by ${a} gives $y = -\\frac{${b}}{${a}}x + \\frac{${c}}{${a}}$. So the slope of line $\\ell$ is $-\\frac{${b}}{${a}}${simplifiesFurther ? ` = ${lineSlopeTex}` : ''}$. Perpendicular lines have slopes that are negative reciprocals of each other, so the slope of line $n$ is $\\frac{${a}}{${b}}${simplifiesFurther ? ` = ${answerTex}` : ''}$.${enterNote}`
    };
  }
};
