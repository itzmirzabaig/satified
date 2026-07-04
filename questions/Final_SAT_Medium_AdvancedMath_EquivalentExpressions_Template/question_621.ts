import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

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
 * Question 621
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rational expression with linear numerator and denominator]
 * - Difficulty factors: [Simplifying rational expressions, factoring common terms, domain restrictions]
 * - Distractor patterns: [Canceling terms instead of factors, forgetting domain restriction, incorrect sign distribution]
 * - Constraints: [Must have common factor to cancel, resulting expression must be simpler]
 * - Question type: [Simplification→Multiple Choice Text]
 * - Figure generation: [None - algebraic simplification]
 */

export const generator_621 = {
  metadata: {
    id: "621",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

    // STEP 1: Generate the fully-simplified form first: (mx + n) / (px + q).
    // Two well-posedness guards (bounded retry):
    //   (1) mq !== np  — otherwise (mx+n) and (px+q) are proportional, so the
    //       "answer" collapses to the constant m/p and would tie distractor A.
    //   (2) gcd(m,n,p,q) === 1 — otherwise (mx+n)/(px+q) still shares an integer
    //       common factor and is NOT fully reduced, so it wouldn't be the unique
    //       simplest form.
    // Together these make (mx+n)/(px+q) the one genuinely-simplest equivalent.
    let m = getRandomInt(1, 4);
    let n = getRandomInt(1, 6);
    let p = getRandomInt(1, 4);
    let q = getRandomInt(1, 6);
    let guard = 0;
    while ((m * q === n * p || gcd(gcd(m, n), gcd(p, q)) !== 1) && guard++ < 50) {
      m = getRandomInt(1, 4);
      n = getRandomInt(1, 6);
      p = getRandomInt(1, 4);
      q = getRandomInt(1, 6);
    }

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

    // STEP 4: Generate distractors. Every distractor must be genuinely NOT
    // equivalent to the given expression for every draw (the stem asks "which
    // is equivalent", so an equivalent distractor would be a second right
    // answer). None of these reduces to (mx+n)/(px+q) given the guards above.

    // Distractor A: cancels terms instead of factors — cancels the x-terms and
    // the constants separately, yielding the constant m/p (shown reduced).
    // Not equivalent because mq !== np means (mx+n)/(px+q) is non-constant.
    const gA = gcd(m, p);
    const distractorA = `\\frac{${m / gA}}{${p / gA}}`;

    // Distractor B: cancels the common factor from the numerator only, leaving
    // the original denominator. Not equivalent because the denominator keeps
    // the factor of commonFactor (commonFactor >= 2).
    const distractorB = `\\frac{${simplifiedNum}}{${originalDen}}`;

    // Distractor C: sign error on the numerator's constant term (mx - n).
    // Not equivalent because n >= 1, so mx - n != mx + n.
    const wrongNum2 = formatLinearExpression(m, -n);
    const distractorC = `\\frac{${wrongNum2}}{${simplifiedDen}}`;

    // Create options
    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "results from canceling terms instead of common factors" },
      { text: correctAnswer, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "cancels the common factor from the numerator but not the denominator" },
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
