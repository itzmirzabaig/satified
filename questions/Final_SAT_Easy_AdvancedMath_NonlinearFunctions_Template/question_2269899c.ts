import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 2269899c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [c: 4-8, base: 4-10]
 * - Difficulty factors: [Substituting and evaluating square root functions]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [x must be a perfect square]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_2269899c = {
  metadata: {
    // id: "2269899c",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const c = getRandomInt(4, 8);

    const base = getRandomInt(4, 10);

    const x = base * base;

    const result = c + base;

    return {
      questionText: `The function $f$ is defined by $f(x)=${c}+\\sqrt{x}$. What is the value of $f(${x})$?`,
      figureCode: null,
      options: null,
      correctAnswer: result.toString(),
      explanation: `$f(${x}) = ${c} + \\sqrt{${x}} = ${c} + ${base} = ${result}$.`
    };
  }
};

/**
 * Question ID: d84a514a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 100000-300000, growthRate: 1.15-1.25, years: 3-8]
 * - Difficulty factors: [Interpreting exponential function notation in a revenue context]
 * - Distractor patterns: [Total increase interpretation, multiplicative factor, percentage interpretation]
 * - Constraints: [Evaluation results in realistic revenue]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

