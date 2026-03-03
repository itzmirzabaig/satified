import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2cf7f039
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 2-12, sqrtRes: 3-9, targetVal: coeff * sqrtRes, xVal: sqrtRes * sqrtRes]
 * - Difficulty factors: [Solving a radical equation for x]
 * - Distractor patterns: [Root value, coefficient, root value plus one]
 * - Constraints: [x must be a perfect square]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2cf7f039 = {
  metadata: {
    // id: "2cf7f039",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 12);

    const sqrtRes = getRandomInt(3, 9);

    const targetVal = coeff * sqrtRes;

    const xVal = sqrtRes * sqrtRes;

    const optionsData = [
      { text: `${xVal}`, isCorrect: true },
      { text: `${sqrtRes}`, isCorrect: false },
      { text: `${coeff}`, isCorrect: false },
      { text: `${xVal + 1}`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x)=${coeff}\\sqrt{x}$. For what value of $x$ does $f(x)=${targetVal}$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Set $f(x)=${targetVal}$: ${coeff}\\sqrt{x}=${targetVal}$. Divide by ${coeff} to get $\\sqrt{x}=${sqrtRes}$. Squaring both sides gives $x=${xVal}$.`
    };
  }
};

/**
 * Question ID: d45572cc
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f0: 1-5, a: 1-3]
 * - Difficulty factors: [Identifying f(0) for a rational function from its graph]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Graph must have a clearly defined integer y-intercept]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Rational function plot]
 */

import { getRandomInt } from '../../utils/math';

import type { QuestionData } from '../../types';