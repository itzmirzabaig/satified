import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 75915e3c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 2-4, base: 2-5, x: 2-4]
 * - Difficulty factors: [Evaluating an exponential function with coefficient]
 * - Distractor patterns: [Ignoring coefficient, multiplication before exponent, multiplying all terms]
 * - Constraints: [Follow order of operations]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_75915e3c = {
  metadata: {
    // id: "75915e3c",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 4);

    const base = getRandomInt(2, 5);

    const x = getRandomInt(2, 4);

    const result = coeff * Math.pow(base, x);

    const optionsData = [
      { text: `$${result}$`, isCorrect: true },
      { text: `$${Math.pow(base, x)}$`, isCorrect: false },
      { text: `$${coeff * base * x}$`, isCorrect: false },
      { text: `$${Math.pow(coeff * base, x)}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `For the function $f(x) = ${coeff}(${base}^x)$, what is the value of $f(${x})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. $f(${x}) = ${coeff}(${base}^${x}) = ${coeff}(${Math.pow(base, x)}) = ${result}$. Exponents must be evaluated before multiplication.`
    };
  }
};

/**
 * Question ID: f547a8b1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yInt: 6-10, baseVal: 0-4]
 * - Difficulty factors: [Identifying y-intercept of a shifted exponential function]
 * - Distractor patterns: [x-intercept, shift value, origin]
 * - Constraints: [Graph must cross y-axis at yInt]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Exponential growth plot]
 */

