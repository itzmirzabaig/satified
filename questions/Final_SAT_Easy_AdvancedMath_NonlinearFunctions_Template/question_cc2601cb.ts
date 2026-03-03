import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: cc2601cb
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [root: 4-10]
 * - Difficulty factors: [Identifying x-intercept from a vertex-form parabola]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Vertex must be on the x-axis]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Parabola plot]
 */

export const generator_cc2601cb = {
  metadata: {
    // id: "cc2601cb",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const root = getRandomInt(4, 10);

    const mafsCode = `<Mafs viewBox={{ x:, y: [-5, 10] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => Math.pow(x - ${root}, 2)} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `The x-intercept of the graph shown is $(x, 0)$. What is the value of $x$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: root.toString(),
      explanation: `The x-intercept is the point where the graph touches the x-axis ($y=0$). From the graph, the vertex of the parabola sits on the x-axis at $x=${root}$.`
    };
  }
};

/**
 * Question ID: b39d74a0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0, 1, 2, 3; y: 0, 1, 8, 27]
 * - Difficulty factors: [Matching a cubic table to its graph]
 * - Distractor patterns: [Linear graph, Quadratic graph, Linear shift]
 * - Constraints: [Graphs must represent power functions]
 * - Question type: [Table→Multiple Choice Figure]
 * - Figure generation: [HTML Table and Plots]
 */

