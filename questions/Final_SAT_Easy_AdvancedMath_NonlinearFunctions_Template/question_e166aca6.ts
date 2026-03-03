import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

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

export const generator_e166aca6 = {
  metadata: {
    // id: "e166aca6",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const h = getRandomInt(3, 7);

    const a = getRandomInt(1, 3);

    const mafsCode = `<Mafs viewBox={{ x:, y: [-2, 10] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${a} * Math.pow(x - ${h}, 2)} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `$(${h}, 0)$`, isCorrect: true },
      { text: `$(-${h}, 0)$`, isCorrect: false },
      { text: `$(0, ${h})$`, isCorrect: false },
      { text: `$(0, 0)$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `What is the $x$-intercept of the graph shown?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The x-intercept is the point where the graph touches the x-axis ($y=0$). In the graph, the vertex of the parabola touches the x-axis at $x=${h}$, so the intercept is $(${h}, 0)$.`
    };
  }
};

/**
 * Question ID: cfff8f8e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 40-70]
 * - Difficulty factors: [Constructing an exponential growth equation]
 * - Distractor patterns: [Linear growth, swapped parameters, incorrect grouping]
 * - Constraints: [Doubling period is constant]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

