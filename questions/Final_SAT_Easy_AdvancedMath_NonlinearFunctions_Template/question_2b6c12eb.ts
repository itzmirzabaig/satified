import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 2b6c12eb
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shift: 4-7]
 * - Difficulty factors: [Solving for x-intercept of an exponential function]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Exponential function must have a whole number intercept]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Exponential growth plot]
 */

export const generator_2b6c12eb = {
  metadata: {
    // id: "2b6c12eb",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const shift = getRandomInt(4, 7);

    const intercept = shift + 1;

    const mafsCode = `<Mafs viewBox={{ x:, y: [-5, 10] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => Math.pow(2, x - ${shift}) - 2} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `What is the $x$-coordinate of the $x$-intercept of the graph shown?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: intercept.toString(),
      explanation: `The x-intercept is where $y=0$. Setting the equation $2^{x-${shift}} - 2 = 0$ leads to $2^{x-${shift}} = 2^1$. Therefore, $x - ${shift} = 1$, which gives $x = ${intercept}$.`
    };
  }
};

/**
 * Question ID: 79e6ec70
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h: 3-7]
 * - Difficulty factors: [Identifying x-intercept from vertex-form parabola]
 * - Distractor patterns: [Opposite sign, unrelated constants]
 * - Constraints: [Vertex touches the x-axis]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parabola plot]
 */

