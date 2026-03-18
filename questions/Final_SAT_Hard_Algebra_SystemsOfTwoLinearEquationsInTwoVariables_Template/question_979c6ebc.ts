import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 979c6ebc
 * 
 * ANALYSIS:
 * - Skill: Systems of Linear Equations (Parametric Solutions)
 * - Issue Fixed: "Unsolvable/Duplicate Answers". When coefficients A and B were equal, the symmetric nature of the equation meant the "swapped coordinate" distractor was actually a valid solution, creating two correct answers. Added `while (a === b)` loop to prevent this.
 * - Issue Fixed: "Text Latex". The renderer displayed `\left` as text. Replaced with standard parentheses `()`.
 */

// Helper to compute GCD
const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

// Helper to simplify and format fractions for LaTeX
const formatFrac = (num: number, den: number, variable: string = ''): string => {
  if (den === 0) return '0';
  
  // Handle signs
  const sign = (num * den < 0) ? '-' : '';
  num = Math.abs(num);
  den = Math.abs(den);
  
  // Simplify
  const common = gcd(num, den);
  num /= common;
  den /= common;
  
  let result = sign;
  
  if (den === 1) {
    result += `${num}${variable}`;
  } else {
    result += `\\frac{${num}${variable}}{${den}}`;
  }
  
  // Clean up "1r" -> "r" if it's not part of a fraction denominator
  if (variable && num === 1) {
    if (den === 1) return `${sign}${variable}`;
    return `${sign}\\frac{${variable}}{${den}}`;
  }
  
  return result;
};

export const generator_979c6ebc = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Base Coefficients (Eq 2)
    // Equation: ax + by = c
    let a = getRandomInt(2, 6);
    let b = getRandomInt(2, 6);
    // CONSTRAINT: a must not equal b. 
    // If a = b, the equation is symmetric (e.g. 2x+2y=8), so (r, 4-r) and (4-r, r) are BOTH valid solutions.
    while (a === b) {
        b = getRandomInt(2, 6);
    }

    const c = getRandomInt(5, 15);
    
    // STEP 2: Generate Multiplier (Eq 1)
    const mult = getRandomInt(2, 4);
    
    // Eq 1 coefficients (Scaled up)
    const A = a * mult;
    const B = b * mult;
    const C = c * mult;
    
    // STEP 3: Solve for x in terms of y = r
    // ax + br = c  =>  ax = c - br  =>  x = (c/a) - (b/a)r
    
    // Constant term: c/a
    const constTerm = formatFrac(c, a);
    
    // r term: -b/a
    const slopeTerm = formatFrac(-b, a, 'r');
    
    // Construct Correct Expression
    // Standard format: constant - slopeTerm or -slopeTerm + constant
    let correctExpr = "";
    if (slopeTerm.startsWith('-')) {
        correctExpr = `${constTerm} - ${slopeTerm.substring(1)}`;
    } else {
        correctExpr = `${constTerm} + ${slopeTerm}`;
    }
    
    // Correct Answer: (x, y) = (expr, r)
    // Removed \left and \right to prevent rendering errors
    const correctOpt = `(${correctExpr}, r)`;
    
    // STEP 4: Generate Distractors
    
    // Distractor 1: Sign Error (Add instead of subtract)
    // x = c/a + (b/a)r
    const slopeTermWrong = formatFrac(b, a, 'r');
    const distSign = `(${constTerm} + ${slopeTermWrong}, r)`;
    
    // Distractor 2: Denominator Swap (Dividing by b instead of a)
    // x = c/b - (a/b)r
    const constSwap = formatFrac(c, b);
    const slopeSwap = formatFrac(-a, b, 'r');
    let swapExpr = "";
    if (slopeSwap.startsWith('-')) {
        swapExpr = `${constSwap} - ${slopeSwap.substring(1)}`;
    } else {
        swapExpr = `${constSwap} + ${slopeSwap}`;
    }
    const distSwap = `(${swapExpr}, r)`;
    
    // Distractor 3: Coordinate Swap
    // (r, something)
    // Since a != b, this is guaranteed to be incorrect for the system (unless a line y=x is involved which we avoid)
    const distCoord = `(r, ${correctExpr})`;

    const optionsData = [
      { text: correctOpt, isCorrect: true },
      { text: distSign, isCorrect: false },
      { text: distSwap, isCorrect: false },
      { text: distCoord, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    
    // STEP 5: Explanation
    const explanation = `
      Choice ${correctOption.letter} is correct.
      
      The first equation is $${A}x + ${B}y = ${C}$. Dividing both sides by ${mult}, we get:
      $$${a}x + ${b}y = ${c}$$
      
      This is identical to the second equation. Thus, the system consists of dependent equations representing the same line.
      
      To find the solution set where $y = r$, substitute $r$ for $y$ in the equation:
      $$${a}x + ${b}r = ${c}$$
      
      Subtract $${b}r$ from both sides:
      $$${a}x = ${c} - ${b}r$$
      
      Divide by $${a}$:
      $$x = \\frac{${c}}{${a}} - \\frac{${b}r}{${a}}$$
      
      Simplifying the terms:
      $$x = ${correctExpr}$$
      
      So the point is $(${correctExpr}, r)$.
    `.trim();
    
    return {
      questionText: `For each real number $r$, which of the following points lies on the graph of each equation in the $xy$-plane for the given system?
      $$${A}x + ${B}y = ${C}$$
      $$${a}x + ${b}y = ${c}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOpt,
      explanation: explanation
    };
  }
};