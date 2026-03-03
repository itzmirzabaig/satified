import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7a5a74a6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 2, 6, 11, 4, 3, 6 (single-digit to double-digit)]
 * - Difficulty factors: [Algebraic manipulation, substitution, solving for expression x-3]
 * - Distractor patterns: [A gives value of x instead of x-3, C and D are values that don't satisfy the equation]
 * - Constraints: [Must solve for x-3 directly or find x then subtract 3]
 * - Question type: [Equation solving - Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_7a5a74a6 = {
  metadata: {
    // id: "7a5a74a6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation of form a(bx - c) - d = e(x - f) + g
    // We want to solve for (x - f) or similar
    const a = getRandomInt(2, 5);
    const b = getRandomInt(2, 4);
    const c = b * getRandomInt(2, 5); // c is multiple of b so (bx - c) = b(x - c/b)
    const d = getRandomInt(5, 15);
    const e = getRandomInt(2, 6);
    const f = c / b; // So that (bx - c) = b(x - f)
    const g = getRandomInt(3, 12);
    
    // Calculate target value (x - f)
    // Equation: a(b(x-f)) - d = e(x-f) + g
    // Let u = x - f, then: ab*u - d = e*u + g
    // (ab - e)*u = g + d
    // u = (g + d) / (ab - e)
    // Ensure ab ≠ e and result is clean
    
    const ab = a * b;
    const targetNumerator = g + d;
    const targetDenominator = ab - e;
    
    // Ensure we get a nice fraction
    const targetValueNum = targetNumerator;
    const targetValueDenom = targetDenominator;
    
    // Generate distractors
    // A: value of x (not x-f)
    const xValueNum = targetValueNum + f * targetValueDenom;
    const xValueDenom = targetValueDenom;
    
    // Format fractions nicely
    const formatFraction = (num: number, denom: number): string => {
      if (denom === 1) return num.toString();
      // Simplify
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const divisor = gcd(Math.abs(num), Math.abs(denom));
      const simplifiedNum = num / divisor;
      const simplifiedDenom = denom / divisor;
      if (simplifiedDenom === 1) return simplifiedNum.toString();
      return `\\frac{${simplifiedNum}}{${simplifiedDenom}}`;
    };
    
    const correctAnswer = formatFraction(targetValueNum, targetValueDenom);
    const distractorA = formatFraction(xValueNum, xValueDenom);
    const distractorC = formatFraction(targetValueNum - 2, targetValueDenom);
    const distractorD = formatFraction(-targetValueNum + 2, targetValueDenom);
    
    const correctText = correctAnswer;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${correctAnswer}$`, isCorrect: true },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: `$${distractorD}$`, isCorrect: false }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    return {
      questionText: `$${a}(${b} x-${c})-${d}=${e}(x-${f})+${g}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Because ${b} is a factor of both $${b}x$ and ${c}, the expression $${b}x - ${c}$ can be rewritten as $${b}(x - ${f})$. Substituting $${b}(x - ${f})$ for $(${b}x - ${c})$ on the left-hand side of the given equation yields $${a}(${b})(x - ${f}) - ${d} = ${e}(x - ${f}) + ${g}$, or $${ab}(x - ${f}) - ${d} = ${e}(x - ${f}) + ${g}$. Subtracting $${e}(x - ${f})$ from both sides of this equation yields $${ab - e}(x - ${f}) - ${d} = ${g}$. Adding ${d} to both sides of this equation yields $${ab - e}(x - ${f}) = ${g + d}$. Dividing both sides of this equation by ${ab - e} yields $x - ${f} = ${correctAnswer}$.`
    };
  }
};

/**
 * Question ID: aa85b138
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, initial height: 6, final height: 14 (small integers)]
 * - Difficulty factors: [Contextual interpretation of linear equation coefficients]
 * - Distractor patterns: [A confuses doubling with rate, C confuses coefficient with initial+rate, D confuses time per growth]
 * - Constraints: [Equation form: rate*years + initial = final]
 * - Question type: [Contextual interpretation - Multiple Choice Text]
 */