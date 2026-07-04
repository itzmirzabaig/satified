import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1032
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [nested radicals]
 * - Difficulty factors: [Nested radical simplification, exponent rules with multiple operations]
 * - Distractor patterns: [Wrong interpretation of nesting, wrong exponent addition, wrong final form]
 * - Constraints: [Interpretation of sqrt((a+c)³ * sqrt(a+c)) vs sqrt((a+c)³) * sqrt(a+c)]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_1032 = {
  metadata: {
    id: "1032",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: This is about interpreting nested vs sequential radicals
    // Correct interpretation: sqrt((a+c)³) * sqrt(a+c) = (a+c)^(3/2) * (a+c)^(1/2) = (a+c)² = a² + 2ac + c²
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$a+c$`, isCorrect: false, reason: "this would result from $(a+c)^{1}$, not $(a+c)^{2}$" },
      { text: `$a^{2}+c^{2}$`, isCorrect: false, reason: "this is a common error when squaring a binomial, missing the middle term $2ac$" },
      { text: `$a^{2}+2ac+c^{2}$`, isCorrect: true },
      { text: `$a^{2}c^{2}$`, isCorrect: false, reason: "this suggests $(ac)^{2}$, which would result from multiplication inside the parentheses, not addition" }
    ];
    
    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Question text
    // The expression is the PRODUCT of two separate radicals (not one nested radical),
    // so it simplifies exactly to (a+c)^2 = a^2 + 2ac + c^2 for all positive a, c.
    const questionText = `If $a$ and $c$ are positive numbers, which of the following is equivalent to $\\sqrt{(a+c)^{3}}\\cdot\\sqrt{a+c}$?`;

    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. Let $x = a+c$. The expression becomes:
$$\\sqrt{x^{3}}\\cdot\\sqrt{x}$$

Rewrite each radical using fractional exponents:
$$\\sqrt{x^{3}} = x^{\\frac{3}{2}} \\quad\\text{and}\\quad \\sqrt{x} = x^{\\frac{1}{2}}$$

Multiply by adding the exponents:
$$x^{\\frac{3}{2}}\\cdot x^{\\frac{1}{2}} = x^{\\frac{3}{2}+\\frac{1}{2}} = x^{2}$$

Substituting back $x = a+c$ and expanding:
$$(a+c)^{2} = a^{2} + 2ac + c^{2}$$

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$a^{2}+2ac+c^{2}$`,
      explanation: explanation
    };
  }
};
