import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1199
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [c: positive constant, f(2) = 35 (double-digit)]
 * - Difficulty factors: [Functional equation f(cx) = x - 8, solving for constant c]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Inverse relationship, algebraic manipulation]
 * - Question type: [Word problem → Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_1199 = {
  metadata: {
    id: "1199",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const fValue = getRandomInt(20, 50); // f(something) = this value
    const targetInput = getRandomInt(1, 5); // The "2" in f(2)
    const rhsConstant = getRandomInt(5, 15); // The "8" in x - 8
    
    // STEP 2: Solve for c
    // f(cx) = x - rhsConstant for all x
    // We know f(targetInput) = fValue
    // So cx = targetInput, meaning x = targetInput/c
    // f(targetInput) = (targetInput/c) - rhsConstant = fValue
    // targetInput/c = fValue + rhsConstant
    // c = targetInput / (fValue + rhsConstant)
    
    const numerator = targetInput;
    const denominator = fValue + rhsConstant;
    
    // Simplify fraction
    function gcd(a: number, b: number): number {
      return b === 0 ? a : gcd(b, a % b);
    }
    const commonDivisor = gcd(numerator, denominator);
    const finalNum = numerator / commonDivisor;
    const finalDen = denominator / commonDivisor;
    
    const correctAnswer = finalDen === 1 ? finalNum.toString() : `\\\\frac{${finalNum}}{${finalDen}}`;
    
    return {
      questionText: `For the function $f, f(cx)=x-${rhsConstant}$ for all values of $x$, where $c$ is a positive constant. If $f(${targetInput})=${fValue}$, what is the value of $c$?`,
      figureCode: null,
      options: null,
      correctAnswer: correctAnswer,
      explanation: `Given $f(cx) = x - ${rhsConstant}$ and $f(${targetInput}) = ${fValue}$, we need $cx = ${targetInput}$, so $x = \\\\frac{${targetInput}}{c}$. Substituting into the functional equation: $f(${targetInput}) = \\\\frac{${targetInput}}{c} - ${rhsConstant} = ${fValue}$. Therefore, $\\\\frac{${targetInput}}{c} = ${fValue + rhsConstant}$, which gives $c = \\\\frac{${targetInput}}{${fValue + rhsConstant}}${commonDivisor > 1 ? ` = \\\\frac{${finalNum}}{${finalDen}}` : ''}$.`
    };
  }
};
