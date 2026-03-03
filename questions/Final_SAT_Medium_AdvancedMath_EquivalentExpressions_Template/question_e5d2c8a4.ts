import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Helper function to format linear expressions like "3x + 2" or "5x - 4"
 */
function formatLinearExpression(a: number, b: number): string {
  if (b === 0) {
    return a === 1 ? 'x' : `${a}x`;
  }
  if (a === 0) {
    return `${b}`;
  }
  
  const sign = b > 0 ? '+' : '-';
  const absB = Math.abs(b);
  
  if (a === 1) {
    return `x ${sign} ${absB}`;
  }
  
  return `${a}x ${sign} ${absB}`;
}

/**
 * Question ID: e5d2c8a4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rational expression with linear numerator and denominator]
 * - Difficulty factors: [Simplifying rational expressions, factoring common terms, domain restrictions]
 * - Distractor patterns: [Canceling terms instead of factors, forgetting domain restriction, incorrect sign distribution]
 * - Constraints: [Must have common factor to cancel, resulting expression must be simpler]
 * - Question type: [Simplification→Multiple Choice Text]
 * - Figure generation: [None - algebraic simplification]
 */

export const generator_e5d2c8a4 = {
  metadata: {
    // id: "e5d2c8a4",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate simplified form first, then add common factor
    // Simplified form: (mx + n) / (px + q)
    const m = getRandomInt(1, 4);
    const n = getRandomInt(1, 6);
    const p = getRandomInt(1, 4);
    const q = getRandomInt(1, 6);
    
    // Choose common factor (usually simple)
    const commonFactor = getRandomInt(2, 4);
    
    // STEP 2: Build original expression by multiplying by common factor
    // Numerator: commonFactor * (mx + n) = (commonFactor*m)x + (commonFactor*n)
    const numA = commonFactor * m;
    const numB = commonFactor * n;
    
    // Denominator: commonFactor * (px + q) = (commonFactor*p)x + (commonFactor*q)
    const denC = commonFactor * p;
    const denD = commonFactor * q;
    
    // STEP 3: Format expressions
    const originalNum = formatLinearExpression(numA, numB);
    const originalDen = formatLinearExpression(denC, denD);
    const simplifiedNum = formatLinearExpression(m, n);
    const simplifiedDen = formatLinearExpression(p, q);
    
    const originalExpr = `\\frac{${originalNum}}{${originalDen}}`;
    const correctAnswer = `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    
    // STEP 4: Generate distractors
    
    // Distractor A: Cancels terms instead of factors (classic error)
    // Incorrectly cancels the x terms or constants
    const wrongNum1 = m;  // Just takes coefficient of x
    const wrongDen1 = p;
    const distractorA = `\\frac{${wrongNum1}}{${wrongDen1}}`;
    
    // Distractor B: Forgets to simplify, keeps original
    const distractorB = originalExpr;
    
    // Distractor C: Wrong sign on constant term
    const wrongNum2 = formatLinearExpression(m, -n);
    const wrongDen2 = formatLinearExpression(p, q);
    const distractorC = `\\frac{${wrongNum2}}{${wrongDen2}}`;
    
    // Create options
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from canceling terms instead of factors" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "fails to factor and simplify the expression" },
      { text: distractorC, isCorrect: false, reason: "results from a sign error when simplifying" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 6: Build explanation (fixed LaTeX formatting - removed $$ display math)
    const explanation = `Choice ${correctLetter} is correct. The numerator $${originalNum}$ can be factored as $${commonFactor}(${simplifiedNum})$, and the denominator $${originalDen}$ can be factored as $${commonFactor}(${simplifiedDen})$. Therefore, $${originalExpr} = \\frac{${commonFactor}(${simplifiedNum})}{${commonFactor}(${simplifiedDen})} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `Which of the following is equivalent to the expression below? $${originalExpr}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: f9a3e7c1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [exponents: 2-5, coefficients: 2-4, variable combinations]
 * - Difficulty factors: [Exponent rules, power of a product, power of a power, combining exponents]
 * - Distractor patterns: [Adding instead of multiplying exponents, mishandling coefficients, forgetting to distribute outer exponent]
 * - Constraints: [Must use power of a power rule: (a^m)^n = a^(mn), clean integer results]
 * - Question type: [Exponent simplification→Multiple Choice Text]
 * - Figure generation: [None - exponent manipulation]
 */