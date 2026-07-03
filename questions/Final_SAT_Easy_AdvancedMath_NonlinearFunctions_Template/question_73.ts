import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 73
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 2-4, base: 2-5, x: 2-4]
 * - Difficulty factors: [Evaluating an exponential function with coefficient]
 * - Distractor patterns: [Ignoring coefficient, multiplication before exponent, multiplying all terms]
 * - Constraints: [Follow order of operations]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_73 = {
  metadata: {
    id: "73",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Known-good fallback draw: values 48, 16, 24, 144 are pairwise distinct.
    let coeff = 3;
    let base = 4;
    let x = 2;

    // Some draws make distractors collide with the correct answer or each
    // other (e.g. base=2, x=2 gives base^x = base*x, so coeff*base^x equals
    // coeff*base*x). Reroll (bounded) until all four values are distinct.
    let tries = 0;
    while (tries < 50) {
      const c = getRandomInt(2, 4);
      const b = getRandomInt(2, 5);
      const e = getRandomInt(2, 4);
      const values = [c * Math.pow(b, e), Math.pow(b, e), c * b * e, Math.pow(c * b, e)];
      if (new Set(values).size === 4) {
        coeff = c;
        base = b;
        x = e;
        break;
      }
      tries++;
    }

    const result = coeff * Math.pow(base, x);

    const optionsData = [
      {
        text: `$${result}$`,
        isCorrect: true,
        reason: ''
      },
      {
        text: `$${Math.pow(base, x)}$`,
        isCorrect: false,
        reason: `The value ${Math.pow(base, x)} results from evaluating the power but not multiplying by the coefficient ${coeff}.`
      },
      {
        text: `$${coeff * base * x}$`,
        isCorrect: false,
        reason: `The value ${coeff * base * x} results from multiplying ${coeff}, ${base}, and ${x} together instead of evaluating the exponent first.`
      },
      {
        text: `$${Math.pow(coeff * base, x)}$`,
        isCorrect: false,
        reason: `The value ${Math.pow(coeff * base, x)} results from multiplying ${coeff} by ${base} before applying the exponent.`
      }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const incorrectOptions = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `For the function $f(x) = ${coeff}(${base}^{x})$, what is the value of $f(${x})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $x=${x}$ gives $f(${x}) = ${coeff}(${base}^{${x}}) = ${coeff}(${Math.pow(base, x)}) = ${result}$. The exponent must be evaluated before multiplying by the coefficient. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect. ${o.reason}`).join(' ')}`
    };
  }
};
