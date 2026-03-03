import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 50418728
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cVal: -5 to 5, aVal: -5 to 5]
 * - Difficulty factors: [Identifying y-intercept of a higher-degree polynomial from its graph]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Polynomial of degree 4]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Polynomial plot]
 */

export const generator_50418728 = {
  metadata: {
    // id: "50418728",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const cVal = getRandomInt(-5, 5);

    const aVal = getRandomInt(1, 5) * (Math.random() > 0.5 ? 1 : -1);

    const mafsCode = `<Mafs viewBox={{ x: [-3, 3], y: [-20, 20] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${cVal} + ${aVal} * Math.pow(x, 4)} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `The graph of the polynomial function $f$, where $y=f(x)$, is shown. The y-intercept of the graph is $(0, y)$. What is the value of $y$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: cVal.toString(),
      explanation: `The y-intercept of the graph is the point where it crosses the y-axis ($x=0$). From the figure, the graph crosses at $(0, ${cVal})$.`
    };
  }
};

/**
 * Question ID: 02c67921
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coeff: 2-6, baseVal: 0.4-0.8]
 * - Difficulty factors: [Calculating y-intercept for an exponential decay function]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Initial value 'a' is the intercept]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Exponential decay plot]
 */

