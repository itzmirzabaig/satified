import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: f547a8b1
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yInt: 6-10, baseVal: 0-4]
 * - Difficulty factors: [Identifying y-intercept of a shifted exponential function]
 * - Distractor patterns: [x-intercept, shift value, origin]
 * - Constraints: [Graph must cross y-axis at yInt]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Exponential growth plot]
 */

export const generator_f547a8b1 = {
  metadata: {
    // id: "f547a8b1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yInt = getRandomInt(6, 10);

    const baseVal = yInt - 6;

    const mafsCode = `<Mafs viewBox={{ x: [-5, 5], y: [0, ${yInt + 5}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${baseVal} * Math.pow(2, x / 2) + 6} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `$(0, ${yInt})$`, isCorrect: true },
      { text: `$(-${yInt}, 0)$`, isCorrect: false },
      { text: `$(-6, 0)$`, isCorrect: false },
      { text: `$(0, 6)$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `What is the y-intercept of the graph shown?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The y-intercept is where $x=0$. The graph crosses the y-axis at $(0, ${yInt})$.`
    };
  }
};

/**
 * Question ID: 2f4eafcc
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [k: 5-10]
 * - Difficulty factors: [Identifying y-intercept from parabola equation]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Standard form quadratic with b=0]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Parabola plot]
 */

