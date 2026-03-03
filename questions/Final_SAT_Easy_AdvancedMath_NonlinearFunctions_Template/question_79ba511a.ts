import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 79ba511a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cVal: 5-20, xVal: 2-5]
 * - Difficulty factors: [Evaluation of a cubic function with substitution]
 * - Distractor patterns: [Multiplicative error, squared error, result plus one]
 * - Constraints: [Evaluation results in integer]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_79ba511a = {
  metadata: {
    // id: "79ba511a",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const cVal = getRandomInt(5, 20);

    const xVal = getRandomInt(2, 5);

    const result = Math.pow(xVal, 3) + cVal;

    const optionsData = [
      { text: `$${result}$`, isCorrect: true },
      { text: `$${3 * xVal + cVal}$`, isCorrect: false },
      { text: `$${Math.pow(xVal, 2) + cVal}$`, isCorrect: false },
      { text: `$${result + 1}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x) = x^3 + ${cVal}$. What is the value of $f(${xVal})$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting $${xVal}$ for $x$ in $f(x)=x^3+${cVal}$ yields $f(${xVal})=(${xVal})^3+${cVal}=${Math.pow(xVal, 3)}+${cVal}=${result}$.`
    };
  }
};

/**
 * Question ID: 26f5269a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [aVal: 1-3, hVal: 1-5, kVal: 10-40]
 * - Difficulty factors: [Identifying y-intercept of a parabola from its plot]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Function must have clear intercept]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Parabola plot]
 */

