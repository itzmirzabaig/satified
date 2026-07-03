import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 12
 *
 * ANALYSIS:
 * - Skill: Equivalent Expressions (Distributing/Expanding)
 * - Logic: x(coeff*x + constant) = coeff*x^2 + constant*x. Compare to
 *   coeff*x^2 + ax. Thus a = constant.
 * - Constraints: constant !== coeff (would duplicate the "x^2 coefficient"
 *   distractor) and constant !== 2*coeff (would make constant - coeff
 *   collide with coeff). Bounded retry plus a deterministic fallback.
 */

export const generator_12 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Expression: coeff*x^2 + a*x, factored form: x(coeff*x + constant).
    const coeff = getRandomInt(2, 9);
    let constant = getRandomInt(5, 15);
    let tries = 0;
    while ((constant === coeff || constant === 2 * coeff) && tries++ < 50) {
      constant = getRandomInt(5, 15);
    }
    // Deterministic fallback: 13 is odd (never 2*coeff) and > 9 (never coeff).
    if (constant === coeff || constant === 2 * coeff) constant = 13;

    // Expanding x(coeff*x + constant) -> coeff*x^2 + constant*x, so a = constant.
    const answerVal = constant;
    const correctText = `$${answerVal}$`;

    const optionsData = [
      {
        text: `$${coeff}$`,
        isCorrect: false,
        reason: `the coefficient of the $x^{2}$ term, not the coefficient of the $x$ term`
      },
      {
        text: `$${answerVal + coeff}$`,
        isCorrect: false,
        reason: `the sum of the two coefficients, $ ${coeff} + ${constant} = ${coeff + constant}$`
      },
      {
        text: `$${answerVal - coeff}$`,
        isCorrect: false,
        reason: `the difference of the two coefficients, $ ${constant} - ${coeff} = ${constant - coeff}$`
      },
      {
        text: correctText,
        isCorrect: true,
        reason: ''
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const distractorNotes = shuffledOptions
      .filter(opt => !opt.isCorrect)
      .map(opt => `Choice ${opt.letter} is incorrect; it is ${opt.reason}.`)
      .join(' ');

    return {
      questionText: `The expression $ ${coeff}x^{2} + ax$ is equivalent to $x(${coeff}x + ${constant})$ for some constant $a$. What is the value of $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Distribute the $x$ across the parentheses: $x(${coeff}x + ${constant}) = ${coeff}x^{2} + ${constant}x$. This must be equivalent to $ ${coeff}x^{2} + ax$, so comparing the coefficients of the $x$ terms gives $a = ${constant}$. ${distractorNotes}`
    };
  }
};
