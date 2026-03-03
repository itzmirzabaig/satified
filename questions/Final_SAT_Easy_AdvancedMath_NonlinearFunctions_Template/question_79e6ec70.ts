import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

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

export const generator_79e6ec70 = {
  metadata: {
    // id: "79e6ec70",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const h = getRandomInt(3, 7);

    const mafsCode = `<Mafs viewBox={{ x:, y: [-5, 5] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => -0.1 * Math.pow(x - ${h}, 2)} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `$(${h}, 0)$`, isCorrect: true },
      { text: `$(-${h}, 0)$`, isCorrect: false },
      { text: `$(-2, 0)$`, isCorrect: false },
      { text: `$(2, 0)$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `What is the x-intercept of the graph shown?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. An x-intercept is the point where the graph crosses the x-axis. The graph shown intersects the x-axis at its vertex, which is $(${h}, 0)$.`
    };
  }
};

/**
 * Question ID: 5377d9cf
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [xInput: -2 to -1, denomSub: 1-3, b: -8 to -5, c: 2-5]
 * - Difficulty factors: [Evaluating a rational expression with substitution]
 * - Distractor patterns: [Sign errors, arithmetic errors in numerator/denominator]
 * - Constraints: [Denominator must not be zero]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

