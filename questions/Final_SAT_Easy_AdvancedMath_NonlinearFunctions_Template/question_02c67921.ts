import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';


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

export const generator_02c67921 = {
  metadata: {
    // id: "02c67921",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const coeff = getRandomInt(2, 6);

    const baseVal = getRandomInt(4, 8) / 10;

    const mafsCode = `<Mafs viewBox={{ x: [-2, 5], y: [0, ${coeff + 2}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${coeff} * Math.pow(${baseVal}, x)} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `The graph of the exponential function $f$ is shown, where $y=f(x)$. The y-intercept of the graph is $(0, y)$. What is the value of $y$?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: coeff.toString(),
      explanation: `The y-intercept occurs where $x=0$. For an exponential decay $f(x)=a(b)^x$, the intercept is $f(0)=a(1)=a$. Here, $a=${coeff}$.`
    };
  }
};

/**
 * Question ID: de362c2f
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [aVal: 2-8, xVal: 5-12]
 * - Difficulty factors: [Evaluating a basic quadratic function]
 * - Distractor patterns: [Linear multiplication, multiplicative error, addition error]
 * - Constraints: [Evaluation results in integer]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

import { getRandomInt, shuffle } from '../../utils/math';

import type { QuestionData } from '../../types';