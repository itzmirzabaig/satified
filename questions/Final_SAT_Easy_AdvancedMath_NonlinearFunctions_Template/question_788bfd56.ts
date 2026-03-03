import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 788bfd56
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base: 8-14, constant: 2-6]
 * - Difficulty factors: [Substitution and evaluating square roots]
 * - Distractor patterns: [Forgetting constant, multiplication instead of addition, forgetting square root]
 * - Constraints: [x must be a perfect square]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_788bfd56 = {
  metadata: {
    // id: "788bfd56",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const base = getRandomInt(8, 14);

    const x = base * base;

    const constant = getRandomInt(2, 6);

    const result = constant + base;

    const optionsData = [
      { text: `$${result}$`, isCorrect: true },
      { text: `$${base}$`, isCorrect: false },
      { text: `$${constant * base}$`, isCorrect: false },
      { text: `$${constant + x}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x) = ${constant} + \\sqrt{x}$. What is the value of $f(${x})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substitute $${x}$ for $x$: $f(${x}) = ${constant} + \\sqrt{${x}}$. Since $\\sqrt{${x}} = ${base}$, then $f(${x}) = ${constant} + ${base} = ${result}$.`
    };
  }
};

/**
 * Question ID: 369b7bb7
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 8, x: 3, inside: 25, result: 5]
 * - Difficulty factors: [Evaluating square root functions]
 * - Distractor patterns: [Forgetting square root, division by coeff, multiplication error]
 * - Constraints: [Result must be a perfect square for Easy difficulty]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

