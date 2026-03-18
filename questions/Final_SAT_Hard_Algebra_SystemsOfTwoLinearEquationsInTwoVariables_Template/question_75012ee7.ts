import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 75012ee7
 * 
 * ANALYSIS:
 * - Skill: Systems of Linear Equations (Parametric Solutions)
 * - Issue Fixed: "Unsolvable/Duplicate Answers". When coefficients A and B were equal, the symmetric nature of the equation meant the "swapped coordinate" distractor was actually a valid solution, creating two correct answers. Added `while (A === B)` loop.
 * - Issue Fixed: "Text Latex". Removed `\left` and `\right` which were rendering as raw text.
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
  
  // Clean up "1r" to "r"
  if (variable && num === 1) {
    if (den === 1) return `${sign}${variable}`;
    return `${sign}\\frac{${variable}}{${den}}`;
  }
  
  return result;
};

// Helper to combine terms
const formatLinearExpr = (term1: string, term2: string): string => {
    if (term2.startsWith('-')) {
        return `${term1} - ${term2.substring(1)}`;
    }
    return `${term1} + ${term2}`;
};

export const generator_75012ee7 = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate coefficients
    // Equation: Ax + By = C
    const A = getRandomInt(2, 6);
    let B = getRandomInt(2, 6);
    
    // CONSTRAINT: A must not equal B to avoid symmetric solutions
    while (A === B) {
        B = getRandomInt(2, 6);
    }

    const C = getRandomInt(5, 15);
    const mult = getRandomInt(2, 4);
    
    // STEP 2: Solve for x in terms of y = r
    // Ax + Br = C  =>  Ax = -Br + C  =>  x = (-B/A)r + (C/A)
    
    // Slope term: -B/A
    const slopeTerm = formatFrac(-B, A, 'r');
    
    // Constant term: C/A
    const constTerm = formatFrac(C, A);
    
    // Construct Correct Answer String: (x_expr, r)
    let xExprFinal = "";
    if (slopeTerm.startsWith('-')) {
        xExprFinal = `${constTerm} - ${slopeTerm.substring(1)}`; // C/A - (B/A)r
    } else {
        xExprFinal = `${slopeTerm} + ${constTerm}`;
    }

    // Removed \left and \right
    const correctPoint = `(${xExprFinal}, r)`;
    
    // STEP 3: Distractors
    
    // Distractor 1: Swap X and Y coordinates logic (Parametrized by x=r)
    // Solve for y instead: y = (-A/B)r + (C/B)
    const slopeTermY = formatFrac(-A, B, 'r');
    const constTermY = formatFrac(C, B);
    let yExprFinal = "";
    if (slopeTermY.startsWith('-')) {
        yExprFinal = `${constTermY} - ${slopeTermY.substring(1)}`;
    } else {
        yExprFinal = `${slopeTermY} + ${constTermY}`;
    }
    const distSwap = `(r, ${yExprFinal})`;
    
    // Distractor 2: Sign Error (Add instead of subtract)
    // x = (B/A)r + C/A
    const slopeTermWrongSign = formatFrac(B, A, 'r');
    const distSign = `(${slopeTermWrongSign} + ${constTerm}, r)`;
    
    // Distractor 3: Reciprocal/Wrong Denominators
    // e.g. x = (-A/B)r + C/A
    const slopeTermMix = formatFrac(-A, B, 'r');
    let mixExpr = "";
    if (slopeTermMix.startsWith('-')) {
         mixExpr = `${constTerm} - ${slopeTermMix.substring(1)}`;
    } else {
         mixExpr = `${slopeTermMix} + ${constTerm}`;
    }
    const distMix = `(${mixExpr}, r)`;

    const optionsData = [
      { text: correctPoint, isCorrect: true },
      { text: distSwap, isCorrect: false },
      { text: distSign, isCorrect: false },
      { text: distMix, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    
    // STEP 4: Explanation
    const explanation = `
      Choice ${correctOption.letter} is correct.
      
      The second equation is $${mult}(${A}x + ${B}y) = ${mult}(${C})$, which simplifies to $${mult * A}x + ${mult * B}y = ${mult * C}$.
      Since this is a multiple of the first equation, the two equations represent the same line. We can find the solution set using the first equation:
      
      $$${A}x + ${B}y = ${C}$$
      
      The problem states the point is in the form where $y = r$ (implied by the $y$-coordinate being $r$ in the correct answer choice). Substitute $y = r$:
      
      $$${A}x + ${B}r = ${C}$$
      
      Solve for $x$:
      $$${A}x = ${C} - ${B}r$$
      
      $$x = \\frac{${C} - ${B}r}{${A}}$$
      
      $$x = \\frac{${C}}{${A}} - \\frac{${B}r}{${A}}$$
      
      Simplifying the fractions:
      $$x = ${xExprFinal}$$
      
      Thus, the point is $(${xExprFinal}, r)$.
    `.trim();

    return {
      questionText: `For each real number $r$, which of the following points lies on the graph of each equation in the $xy$-plane for the given system?
      $$${A}x + ${B}y = ${C}$$
      $$${mult * A}x + ${mult * B}y = ${mult * C}$$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};