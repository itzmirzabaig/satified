import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1102
 *
 * ORIGINAL ANALYSIS:
 * - Difficulty factors: [Quadratic symmetry, projectile motion]
 * - Distractor patterns: [timeToMax, initialHeight, answer+3, and the correct 2*timeToMax]
 * - Constraints: [Symmetric around vertex, return to initial height at 2*timeToMax]
 * - Question type: [Text -> Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIX: The old distractors could collide (initialH landed on timeToMax, 2*timeToMax,
 * or 2*timeToMax+3), and correctAnswer was a bare number that did not equal any
 * option string. Now initialH is drawn with a bounded retry so all four options
 * are distinct, and correctAnswer is set to the exact correct option text.
 */

export const generator_1102 = {
  metadata: {
    id: "1102",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    const timeToMax = getRandomInt(2, 6);
    const answer = 2 * timeToMax; // return-to-initial time (symmetry about the vertex)
    const maxH = getRandomInt(30, 80);

    // By construction timeToMax, answer, and answer+3 are always mutually
    // distinct (2t != t, 2t != 2t+3, t != 2t+3 for t >= 2). Only initialH can
    // collide, so redraw it until it differs from all three. Always feasible:
    // [5,15] offers 8-10 valid choices for every timeToMax.
    const forbidden = new Set([timeToMax, answer, answer + 3]);
    let initialH = getRandomInt(5, 15);
    let tries = 0;
    while (forbidden.has(initialH) && tries++ < 50) {
      initialH = getRandomInt(5, 15);
    }

    const optionsData = [
      { text: `$${timeToMax}$`, isCorrect: false },
      { text: `$${answer}$`, isCorrect: true },
      { text: `$${initialH}$`, isCorrect: false },
      { text: `$${answer + 3}$`, isCorrect: false },
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index),
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correct.letter;

    return {
      questionText: `A quadratic function models a projectile's height, in meters, above the ground. The model estimates that the projectile was launched from an initial height of ${initialH} meters and reached a maximum height of ${maxH} meters ${timeToMax} seconds after the launch. How many seconds after the launch does the model estimate that the projectile will return to a height of ${initialH} meters?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.text,
      explanation: `Choice ${correctLetter} is correct. The graph of a quadratic function is symmetric about the vertical line through its vertex. The projectile is at a height of ${initialH} meters when $t=0$ and reaches its maximum ${timeToMax} seconds later, so by symmetry it returns to a height of ${initialH} meters at $t = 2 \\times ${timeToMax} = ${answer}$ seconds.`,
    };
  }
};
