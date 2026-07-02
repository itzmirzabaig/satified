import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 67
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [xInput: -2 to -1, denomSub: 1-3, b: -8 to -5, c: 2-5]
 * - Difficulty factors: [Evaluating a rational expression with substitution]
 * - Distractor patterns: [Sign errors, arithmetic errors in numerator/denominator]
 * - Constraints: [Denominator must not be zero]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_67 = {
  metadata: {
    id: "67",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = 1;

    const b = -getRandomInt(5, 8);

    const c = getRandomInt(2, 5);

    const denomSub = getRandomInt(1, 3);

    const xInput = -getRandomInt(1, 2);

    const numerVal = a * xInput * xInput + b * xInput + c;

    const denomVal = xInput - denomSub;

    const result = numerVal / denomVal;

    const optionsData = [
      { text: `$${result}$`, isCorrect: true },
      { text: `$${result + 3}$`, isCorrect: false },
      { text: `$${-result}$`, isCorrect: false },
      { text: `$${Math.abs(result)}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;

    return {
      questionText: `If $f(x) = \\frac{x^2 ${bSign}x + ${c}}{x - ${denomSub}}$, what is $f(${xInput})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $${xInput}$ for $x$: $f(${xInput}) = \\frac{(${xInput})^2 + (${b})(${xInput}) + ${c}}{${xInput} - ${denomSub}} = \\frac{${numerVal}}{${denomVal}} = ${result}$.`
    };
  }
};
