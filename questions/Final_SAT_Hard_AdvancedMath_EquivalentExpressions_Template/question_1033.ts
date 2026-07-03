import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1033
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: varied, constants: multiples of b]
 * - Difficulty factors: [Factor theorem application, testing values, finding valid b]
 * - Distractor patterns: [Non-integer b values, zero or negative b when positive required]
 * - Constraints: [b must be positive integer, only one option works]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1033 = {
  metadata: {
    id: "1033",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Choose the positive integer b-value the correct option works for.
    // Every option has the form 3x^2 + Lx + 14b. By the Factor Theorem,
    // x + 2b is a factor exactly when p(-2b) = 12b^2 - (2L - 14)b = 0,
    // i.e. (for b > 0) when b = (L - 7)/6. So the correct option uses
    // L = 6*correctB + 7, which gives b = correctB (a positive integer).
    const correctB = getRandomInt(5, 10);
    const dLinear = 6 * correctB + 7; // 37..67, never equal to 7, 28, or 42

    // Distractor linear coefficients: L = 7 gives b = 0 (not positive),
    // L = 28 gives b = 7/2, L = 42 gives b = 35/6 (not integers).
    const aLinear = 7;
    const bLinear = 28;
    const cLinear = 42;

    const optionsData = [
      { text: `$3x^{2} + ${aLinear}x + 14b$`, isCorrect: false, reason: `this expression has a factor of $x + 2b$ only when $b = \\frac{${aLinear} - 7}{6} = 0$, which is not positive` },
      { text: `$3x^{2} + ${bLinear}x + 14b$`, isCorrect: false, reason: `this expression has a factor of $x + 2b$ only when $b = \\frac{${bLinear} - 7}{6} = \\frac{7}{2}$, which is not an integer` },
      { text: `$3x^{2} + ${cLinear}x + 14b$`, isCorrect: false, reason: `this expression has a factor of $x + 2b$ only when $b = \\frac{${cLinear} - 7}{6} = \\frac{35}{6}$, which is not an integer` },
      { text: `$3x^{2} + ${dLinear}x + 14b$`, isCorrect: true }
    ];
    
    // STEP 2: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 3: Question text
    const questionText = `Which of the following expressions has a factor of $x + 2b$, where $b$ is a positive integer constant?`;
    
    // STEP 4: Explanation using Factor Theorem
    const explanation = `Choice ${correctLetter} is correct. By the Factor Theorem, $x + 2b$ is a factor of a polynomial in $x$ exactly when the polynomial equals zero at $x = -2b$.

Substituting $x = -2b$ into $\\,3x^{2} + ${dLinear}x + 14b$:
$$\\,3(-2b)^{2} + ${dLinear}(-2b) + 14b = 12b^{2} - ${2 * dLinear}b + 14b = 12b^{2} - ${2 * dLinear - 14}b = 12b(b - ${correctB})$$

This equals zero when $b = ${correctB}$, which is a positive integer. So $x + 2b$ is a factor of the expression in choice ${correctLetter} when $b = ${correctB}$.

In general, substituting $x = -2b$ into $\\,3x^{2} + px + 14b$ gives $\\,12b^{2} - (2p - 14)b$, which equals zero for a positive constant $b$ only when $b = \\frac{p - 7}{6}$ is a positive integer.

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
