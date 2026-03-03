import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';
import { shuffle } from '../../utils/math';

/**
 * Question ID: 6abec9a8
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [b: 3-7]
 * - Difficulty factors: [Calculating y-intercept of an exponential function]
 * - Distractor patterns: [Incorrect x=0 calculation, using asymptote, origin]
 * - Constraints: [Function must be exponential decay]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Exponential decay plot]
 */

export const generator_6abec9a8 = {
  metadata: {
    // id: "6abec9a8",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const b = getRandomInt(3, 7);

    const yInt = -(1 + b);

    const mafsCode = `<Mafs viewBox={{ x: [-5, 5], y: [${yInt - 5}, 5] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => -Math.pow(2, -x) - ${b}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `$(0, ${yInt})$`, isCorrect: true },
      { text: `$(0, -${b})$`, isCorrect: false },
      { text: `$(0, 0)$`, isCorrect: false },
      { text: `$(-1, ${yInt})$`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `What is the $y$-intercept of the graph shown?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The $y$-intercept is found by setting $x=0$. $y = -2^{-(0)} - ${b} = -1 - ${b} = ${yInt}$. The point is $(0, ${yInt})$.`
    };
  }
};

/**
 * Question ID: 1ee962ec
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 3-5]
 * - Difficulty factors: [Matching a table to coordinates]
 * - Distractor patterns: [Shifting values, swapping signs, zero values]
 * - Constraints: [Must match the provided points]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

