import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d45572cc
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f0: 1-5, a: 1-3]
 * - Difficulty factors: [Identifying f(0) for a rational function from its graph]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Graph must have a clearly defined integer y-intercept]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Rational function plot]
 */

export const generator_d45572cc = {
  metadata: {
    // id: "d45572cc",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const f0 = getRandomInt(1, 5);
    const a = getRandomInt(1, 3);
    const vShift = f0 - a;

    // Asymptote at x = -1
    // Extend domains 10 units beyond viewBox to prevent clipping
    const xMin = -6;
    const xMax = 6;
    const asymptote = -1;
    const epsilon = 0.001;

    const mafsCode = `<Mafs viewBox={{ x: [${xMin}, ${xMax}], y: [-5, 8] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${a} / (x + 1) + ${vShift}} color="var(--mafs-blue)" domain={[${(xMin - 10).toFixed(1)}, ${(asymptote - epsilon).toFixed(3)}]} />
  <Plot.OfX y={(x) => ${a} / (x + 1) + ${vShift}} color="var(--mafs-blue)" domain={[${(asymptote + epsilon).toFixed(3)}, ${(xMax + 10).toFixed(1)}]} />
</Mafs>`;

    return {
      questionText: `The graph of $y=f(x)$ is shown in the xy-plane. The value of $f(0)$ is an integer. What is the value of $f(0)$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: f0.toString(),
      explanation: `The value of $f(0)$ is the y-coordinate where the graph intersects the y-axis. From the graph, when $x=0$, $y=${f0}$.`
    };
  }
};

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