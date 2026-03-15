import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 49efde89
 * 
 * ANALYSIS:
 * - Skill: Equivalent Expressions (Distributing/Expanding)
 * - Logic: x(bx + c) = bx^2 + cx. Compare to bx^2 + ax. Thus a = c.
 * - Fixes: 
 *   1. Fixed type error: `options` must return objects `{ text: string }`, not strings.
 *   2. Fixed validation error: `correctAnswer` must match the option text exactly (including '$').
 */

export const generator_49efde89 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate values
    // Expression: coeff*x^2 + a*x
    // Factored: x(coeff*x + constant)
    const coeff = getRandomInt(2, 9);
    const constant = getRandomInt(5, 15);
    
    // STEP 2: Logic
    // Expanding x(coeff*x + constant) -> coeff*x^2 + constant*x
    // Comparing to coeff*x^2 + ax -> a = constant
    const answerVal = constant;

    // STEP 3: Format Output
    const correctText = `$${answerVal}$`;

    // STEP 4: Distractors
    const optionsData = [
      { text: `$${coeff}$`, isCorrect: false }, // Confusing a with the x^2 coefficient
      { text: `$${answerVal + coeff}$`, isCorrect: false }, // Arbitrary arithmetic
      { text: `$${answerVal - coeff}$`, isCorrect: false }, // Arbitrary arithmetic
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `The expression $${coeff}x^{2} + ax$ is equivalent to $x(${coeff}x + ${constant})$ for some constant $a$. What is the value of $a$?`,
      figureCode: null,
      // FIX: Map to object with text property, not just string
      options: shuffledOptions.map(o => ({ text: o.text })),
      // FIX: Ensure this string matches the option text exactly
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find the value of $a$, we can expand the expression $x(${coeff}x + ${constant})$ by distributing the $x$:
      
      $$x(${coeff}x + ${constant}) = ${coeff}x^2 + ${constant}x$$
      
      We are given that this is equivalent to $${coeff}x^2 + ax$. By comparing the coefficients of the $x$ terms in both expressions, we can see that:
      
      $$a = ${constant}$$`
    };
  }
};