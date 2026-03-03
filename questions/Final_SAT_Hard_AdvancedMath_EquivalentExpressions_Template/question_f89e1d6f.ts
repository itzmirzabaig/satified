import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f89e1d6f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [difference of squares pattern with substitution]
 * - Difficulty factors: [Recognizing hidden difference of squares, substitution, factoring pattern]
 * - Distractor patterns: [Wrong expansion, wrong pattern, forgetting difference of squares]
 * - Constraints: [a = c + d]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_f89e1d6f = {
  metadata: {
    // id: "f89e1d6f",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: This is a fixed pattern question
    // Pattern: x² - c² - 2cd - d² with a = c + d
    // Simplifies to x² - (c+d)² = x² - a² = (x+a)(x-a)
    
    // STEP 2: Create options
    const optionsData = [
      { text: `$(x+a)^{2}$`, isCorrect: false, reason: "incorrectly expands to $x^{2} + 2ax + a^{2}$, not $x^{2} - a^{2}$" },
      { text: `$(x-a)^{2}$`, isCorrect: false, reason: "incorrectly expands to $x^{2} - 2ax + a^{2}$, not $x^{2} - a^{2}$" },
      { text: `$(x+a)(x-a)$`, isCorrect: true },
      { text: `$x^{2}-ax-a^{2}$`, isCorrect: false, reason: "does not match the required form and incorrectly handles the relationship" }
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
    const questionText = `If $a=c+d$, which of the following is equivalent to the expression $x^{2}-c^{2}-2cd-d^{2}$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. Group the last three terms:
$$x^{2}-(c^{2}+2cd+d^{2})$$

Recognize that $c^{2}+2cd+d^{2} = (c+d)^{2}$ (perfect square trinomial).

Since $a = c+d$, substitute:
$$x^{2}-(c+d)^{2} = x^{2}-a^{2}$$

This is a difference of squares, which factors as:
$$x^{2}-a^{2} = (x+a)(x-a)$$

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `$(x+a)(x-a)$`,
      explanation: explanation
    };
  }
};

/**
 * Question ID: e117d3b8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [nested radicals]
 * - Difficulty factors: [Nested radical simplification, exponent rules with multiple operations]
 * - Distractor patterns: [Wrong interpretation of nesting, wrong exponent addition, wrong final form]
 * - Constraints: [Interpretation of sqrt((a+c)³ * sqrt(a+c)) vs sqrt((a+c)³) * sqrt(a+c)]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */