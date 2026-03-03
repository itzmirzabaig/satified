import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 947596
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 20-30, percent: 80-90]
 * - Difficulty factors: [Creating an exponential decay equation from verbal description]
 * - Distractor patterns: [Complementary percentage, swapping initial and rate]
 * - Constraints: [Rate is a percentage decimal]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_947596 = {
  metadata: {
    // id: "947596",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(20, 30);

    const percent = getRandomInt(80, 90);

    const decimal = (percent / 100).toFixed(2);

    const optionsData = [
      { text: `$h(n) = ${initial}(${decimal})^n$`, isCorrect: true },
      { text: `$h(n) = ${initial}(0.${100 - percent})^n$`, isCorrect: false },
      { text: `$h(n) = ${percent}(0.${initial})^n$`, isCorrect: false },
      { text: `$h(n) = ${percent}(${decimal})^n$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `A ball is dropped from an initial height of ${initial} feet and bounces off the ground repeatedly. The function $h$ estimates that the maximum height reached after each time the ball hits the ground is ${percent}% of the maximum height reached after the previous time the ball hit the ground. Which equation defines $h$, where $h(n)$ is the estimated maximum height of the ball after it has hit the ground $n$ times?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The initial height is ${initial} ($a$) and the factor is ${decimal} ($b$ for ${percent}%). This fits the exponential form $h(n) = a(b)^n$.`
    };
  }
};

/**
 * Question ID: 7160cbb3
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yInt: -8 to -5, k: yInt + 1]
 * - Difficulty factors: [Identifying y-intercept of a rational function from a graph]
 * - Distractor patterns: [x-intercept, origin, random point]
 * - Constraints: [Graph must clearly pass through yInt]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Rational function plot]
 */

