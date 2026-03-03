import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

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

export const generator_26f5269a = {
  metadata: {
    // id: "26f5269a",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const aVal = getRandomInt(1, 3);

    const hVal = getRandomInt(1, 5);

    const kVal = getRandomInt(10, 40);

    const yIntVal = aVal * hVal * hVal + kVal;

    const mafsCode = `<Mafs viewBox={{ x: [-2, 10], y: [0, ${yIntVal + 10}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${aVal} * Math.pow(x - ${hVal}, 2) + ${kVal}} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `The y-intercept of the graph shown is $(x, y)$. What is the value of $y$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: yIntVal.toString(),
      explanation: `The y-intercept is at $x=0$. Looking at the graph, the parabola crosses the y-axis at $y=${yIntVal}$.`
    };
  }
};

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

