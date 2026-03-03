import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 04b985e6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [mass: 10-30, velocity: 20-50]
 * - Difficulty factors: [Interpreting function notation K(v) = y in a physics context]
 * - Distractor patterns: [Scaling errors, swapped variables]
 * - Constraints: [Resulting energy must be a whole number]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_04b985e6 = {
  metadata: {
    // id: "04b985e6",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const mass = getRandomInt(5, 15) * 2;

    const velocity = getRandomInt(20, 50);

    const energy = Math.round((mass / 2) * velocity * velocity);

    const optionsData = [
      { text: `The object traveling at ${velocity} meters per second has a kinetic energy of ${energy.toLocaleString()} joules.`, isCorrect: true },
      { text: `The object traveling at ${velocity * 10} meters per second has a kinetic energy of ${energy.toLocaleString()} joules.`, isCorrect: false },
      { text: `The object traveling at ${energy.toLocaleString()} meters per second has a kinetic energy of ${velocity} joules.`, isCorrect: false },
      { text: `The object traveling at ${velocity * velocity} meters per second has a kinetic energy of ${mass} joules.`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The kinetic energy, in joules, of an object with mass ${mass} kilograms traveling at a speed of $v$ meters per second is given by the function $K$, where $K(v)=\\frac{${mass}}{2} v^{2}$. Which of the following is the best interpretation of $K(${velocity})=${energy.toLocaleString()}$ in this context?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In $K(${velocity})=${energy.toLocaleString()}$, ${velocity} is the speed $v$ (in m/s) and ${energy.toLocaleString()} is the energy $K$ (in joules).`
    };
  }
};

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

import { getRandomInt, shuffle } from '../../utils/math';

import type { QuestionData } from '../../types';