import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 39652e93
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [num: 10-30, xVal: num +/- 5]
 * - Difficulty factors: [Evaluating a rational function at a point]
 * - Distractor patterns: [Flipped fraction, using numerator only, using x only]
 * - Constraints: [Evaluation results in a fraction]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_39652e93 = {
  metadata: {
    // id: "39652e93",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const numeratorVal = getRandomInt(10, 30);

    const xVal = getRandomInt(numeratorVal - 5, numeratorVal + 5);

    const resStr = `\\frac{${numeratorVal}}{${xVal}}`;

    const optionsData = [
      { text: `$${resStr}$`, isCorrect: true },
      { text: `$\\frac{${xVal}}{${numeratorVal}}$`, isCorrect: false },
      { text: `$${numeratorVal}$`, isCorrect: false },
      { text: `$${xVal}$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The function $f$ is defined by $f(x)=\\frac{${numeratorVal}}{x}$. What is the value of $f(x)$ when $x=${xVal}$?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${xVal} for $x$ in $f(x)=\\frac{${numeratorVal}}{x}$ gives $f(${xVal})=\\frac{${numeratorVal}}{${xVal}}$.`
    };
  }
};

/**
 * Question ID: 782a8a53
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [aVal: 1-3, bVal: 1-5]
 * - Difficulty factors: [Identifying the vertex of a parabola from its graph]
 * - Distractor patterns: [Opposite sign for intercept, offset intercept]
 * - Constraints: [Vertex occurs at x=0]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parabola plot]
 */

