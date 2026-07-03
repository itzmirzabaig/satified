import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 80
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 4-8, x: 2-5]
 * - Difficulty factors: [Substitution into a rational function]
 * - Distractor patterns: [Addition instead of multiplication, ignoring substitution, using coefficient]
 * - Constraints: [Result should be simplified]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - DUP_OPTIONS: 1/coeff and 1/x collided whenever coeff === x (possible at 4
 *   and 5). Added a bounded retry guard plus deterministic fallback so
 *   coeff !== x for every draw. With that guard all four denominators
 *   (coeff*x, coeff+x, coeff, x) are pairwise distinct across the full ranges:
 *   coeff*x - (coeff+x) = (coeff-1)(x-1) - 1 >= 2, and coeff*x > coeff, x.
 * - DOLLAR_RISK: "substitute $${x}$" rendered a bare $-digit pair; the
 *   substituted value is now plain prose ("substitute 3 for $x$").
 * - Distractor reasons rewritten as full clauses computed from live values.
 */

export const generator_80 = {
  metadata: {
    id: "80",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(4, 8);

    let x = getRandomInt(2, 5);
    // Guard: options 1/coeff and 1/x would collide when coeff === x.
    let tries = 0;
    while (x === coeff && tries++ < 50) {
      x = getRandomInt(2, 5);
    }
    if (x === coeff) x = coeff === 4 ? 5 : 4; // deterministic fallback, stays in [2, 5]

    const result = coeff * x;

    const optionsData = [
      {
        text: `$\\frac{1}{${result}}$`,
        isCorrect: true,
        reason: ""
      },
      {
        text: `$\\frac{1}{${coeff + x}}$`,
        isCorrect: false,
        reason: `results from adding ${coeff} and ${x} in the denominator instead of multiplying them`
      },
      {
        text: `$\\frac{1}{${coeff}}$`,
        isCorrect: false,
        reason: `results from leaving the value of $x$ out of the denominator`
      },
      {
        text: `$\\frac{1}{${x}}$`,
        isCorrect: false,
        reason: `results from leaving the coefficient ${coeff} out of the denominator`
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The function $f$ is defined by $f(x) = \\frac{1}{${coeff}x}$. What is the value of $f(x)$ when $x = ${x}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find $f(${x})$, substitute ${x} for $x$ in the equation $f(x) = \\frac{1}{${coeff}x}$: $f(${x}) = \\frac{1}{${coeff}(${x})} = \\frac{1}{${result}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
