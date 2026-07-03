import { getRandomInt } from '../../utils/math';
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
    const fValue = getRandomInt(20, 50); // f(targetInput) = this value
    const targetInput = getRandomInt(1, 5); // The "2" in f(2)
    const rhsConstant = getRandomInt(5, 15); // The "8" in x - 8

    // STEP 2: Solve for c.
    // f(cx) = x - rhsConstant for all x, and f(targetInput) = fValue.
    // Set cx = targetInput, so x = targetInput / c.
    // Then f(targetInput) = (targetInput / c) - rhsConstant = fValue.
    // => targetInput / c = fValue + rhsConstant
    // => c = targetInput / (fValue + rhsConstant)
    const numerator = targetInput;
    const denominator = fValue + rhsConstant; // 25..65, always > numerator, so 0 < c < 1

    // Reduce the fraction to lowest terms.
    function gcd(a: number, b: number): number {
      return b === 0 ? a : gcd(b, a % b);
    }
    const commonDivisor = gcd(numerator, denominator);
    const finalNum = numerator / commonDivisor;
    const finalDen = denominator / commonDivisor;

    // Fill-in answer: plain number or a/b fraction (no LaTeX). Since the
    // denominator (>=25) always exceeds the numerator (<=5), the reduced value
    // is a proper fraction that is rarely a clean decimal, so present it as a/b.
    const correctAnswer = finalDen === 1 ? `${finalNum}` : `${finalNum}/${finalDen}`;

    // Explanation fractions use LIVE values; single backslash for \frac in a
    // normal (non-escaped) template literal.
    const reducedTeX = commonDivisor > 1
      ? ` = \\frac{${finalNum}}{${finalDen}}`
      : '';

    return {
      questionText: `For the function $f$, $f(cx)=x-${rhsConstant}$ for all values of $x$, where $c$ is a positive constant. If $f(${targetInput})=${fValue}$, what is the value of $c$? (Enter your answer as a fraction or decimal.)`,
      figureCode: null,
      options: [],
      correctAnswer: correctAnswer,
      explanation: `Since $f(cx) = x - ${rhsConstant}$ holds for all $x$, evaluate it at the input that makes $cx = ${targetInput}$, namely $x = \\frac{${targetInput}}{c}$. Then $f(${targetInput}) = \\frac{${targetInput}}{c} - ${rhsConstant}$. Because $f(${targetInput}) = ${fValue}$, we have $\\frac{${targetInput}}{c} - ${rhsConstant} = ${fValue}$, so $\\frac{${targetInput}}{c} = ${denominator}$. Solving for $c$ gives $c = \\frac{${targetInput}}{${denominator}}${reducedTeX}$.`
    };
  }
};
