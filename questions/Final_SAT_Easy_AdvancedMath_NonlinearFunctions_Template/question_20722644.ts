import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 20722644
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [c: 7-12, x: 2]
 * - Difficulty factors: [Evaluating a cubic function at a point]
 * - Distractor patterns: [Arithmetic errors, incorrect exponentiation]
 * - Constraints: [Substitution result is an integer]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_20722644 = {
  metadata: {
    // id: "20722644",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const x = 2;

    const c = getRandomInt(7, 12);

    const result = Math.pow(x, 3) + c;

    const optionsData = [
      { text: `$${result}$`, isCorrect: true },
      { text: `$${result - 3}$`, isCorrect: false },
      { text: `$${result - 2}$`, isCorrect: false },
      { text: `$${result + 1}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x) = x^3 + ${c}$. What is the value of $f(${x})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. To find $f(${x})$, substitute $${x}$ for $x$ in the equation: $f(${x}) = (${x})^3 + ${c} = 8 + ${c} = ${result}$.`
    };
  }
};

/**
 * Question ID: 7fe7cf26
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [platformHeight: 10, shift: 5]
 * - Difficulty factors: [Translating a parabola down based on a real-world change]
 * - Distractor patterns: [Original height, increased height, multiplicative error]
 * - Constraints: [Shift is vertical]
 * - Question type: [Multiple Choice Figure]
 * - Figure generation: [Projectile motion parabola plots]
 */

