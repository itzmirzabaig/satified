import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1482
 * 
 * ANALYSIS:
 * - Context: Linear Equation Solving.
 * - Function: f(x) = mx + b.
 * - Task: Given f(x) = k, find x.
 * - Logic: k = mx + b => x = (k - b) / m.
 */
export const generator_1482 = {
  metadata: {
    id: "1482",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Math Setup
    const mNum = getRandomInt(2, 9);
    const mDen = getRandomInt(2, 9);
    const bNum = getRandomInt(1, 15);
    const bDen = mDen; // Keep denominators same for simplicity
    
    // f(x) = (mNum/mDen)x + (bNum/bDen)
    // Solve f(x) = k
    // Let's choose k such that x is an integer.
    // k = (mNum/mDen)x + (bNum/mDen)
    // k * mDen = mNum * x + bNum
    // x = (k * mDen - bNum) / mNum
    
    // Pick integer x
    const xSol = getRandomInt(1, 10);
    const kNum = mNum * xSol + bNum;
    const kVal = kNum / mDen; 
    
    // We display kVal. If integer, great. If fraction, display fraction?
    // Usually "f(x) = 5".
    // Let's ensure kVal is integer.
    // This requires (mNum * x + bNum) is divisible by mDen.
    
    // Retry logic if not integer (or just construct it backwards)
    // Let k be integer.
    // k * mDen - bNum must be divisible by mNum.
    // This is getting complex. Let's just pick integer coefficients.
    
    // Simpler: f(x) = m*x + b.
    // But analysis says fractions "9/7 x + 8/7".
    // Let's stick to the fraction form but ensure x is integer.
    
    // f(x) = \frac{A}{B}x + \frac{C}{B}
    // f(x) = Target
    // A/B x + C/B = Target
    // Ax + C = Target * B
    // Ax = Target * B - C
    // x = (Target * B - C) / A
    
    const A = getRandomInt(2, 9);
    const B = getRandomInt(2, 9);
    const C = getRandomInt(1, 15);
    const xTarget = getRandomInt(1, 8);
    
    const numerator = A * xTarget + C;
    // We need numerator / B = Target (integer).
    // So Target * B = A * x + C.
    // This means Target = (A*x + C)/B.
    // We need (Ax+C) to be divisible by B.
    
    // Let's force it:
    // Calculate raw value, if not integer, adjust C.
    // We want (A*x + C) % B === 0.
    const remainder = (A * xTarget + C) % B;
    const C_adjusted = C + (B - remainder) % B; // Add difference to make it divisible
    const targetVal = (A * xTarget + C_adjusted) / B;
    
    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{${A}}{${B}}x + \\frac{${C_adjusted}}{${B}}$. For what value of $x$ is $f(x) = ${targetVal}$?`,
      figureCode: null,
      options: [], // Fill in blank
      correctAnswer: xTarget.toString(),
      explanation: `Set $f(x) = ${targetVal}$:
      
$\\frac{${A}}{${B}}x + \\frac{${C_adjusted}}{${B}} = ${targetVal}$

Multiply the entire equation by ${B} to clear the denominators:
$${A}x + ${C_adjusted} = ${targetVal * B}$

Subtract ${C_adjusted} from both sides:
$${A}x = ${targetVal * B} - ${C_adjusted}$
$${A}x = ${A * xTarget}$

Divide by ${A}:
$x = ${xTarget}$`
    };
  }
};
