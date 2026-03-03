import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 2fec8bf4
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 1500-2500, rate: 1.01-1.06]
 * - Difficulty factors: [Interpreting the y-intercept of an exponential growth function in context]
 * - Distractor patterns: [Interpretation at end of study, linear increase, percentage rate]
 * - Constraints: [Years must be non-negative]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2fec8bf4 = {
  metadata: {
    // id: "2fec8bf4",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(15, 25) * 100;

    const rate = (Math.random() * 0.05 + 1.01).toFixed(2);

    const optionsData = [
      { text: `The estimated number of marine mammals in the area was ${initial} when the study began.`, isCorrect: true },
      { text: `The estimated number of marine mammals in the area was ${initial} when the study ended.`, isCorrect: false },
      { text: `The estimated number of marine mammals in the area increased by ${initial} each year.`, isCorrect: false },
      { text: `The estimated number of marine mammals in the area increased by approximately ${Math.round((parseFloat(rate)-1)*100)}% each year.`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $P(t) = ${initial}(${rate})^t$ gives the estimated number of marine mammals in a certain area, where $t$ is the number of years since a study began. What is the best interpretation of $P(0)=${initial}$ in this context?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. $P(0)$ is the value of the function when $t=0$. In this context, $t=0$ represents 0 years after the study began, which is the start of the study. $P(0) = ${initial}$ means the initial number of mammals was ${initial}.`
    };
  }
};

/**
 * Question ID: e166aca6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h: 3-7, a: 1-3]
 * - Difficulty factors: [Calculating x-intercept from vertex-form parabola]
 * - Distractor patterns: [Opposite sign, y-axis intercept, origin]
 * - Constraints: [Vertex touches the x-axis]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parabola plot]
 */

