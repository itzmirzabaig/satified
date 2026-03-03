import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 5e63b9cf
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yInt: 6-10]
 * - Difficulty factors: [Interpretation of y-intercept in context of height over time]
 * - Distractor patterns: [Wrong height at t=0, interpretation of vertex, incorrect minimum]
 * - Constraints: [Function is parabolic]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parabola plot]
 */

export const generator_5e63b9cf = {
  metadata: {
    // id: "5e63b9cf",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yInt = getRandomInt(6, 10);
    const h = 4; // x-coordinate of vertex
    const a = 0.1; // coefficient
    
    // Calculate k (vertex y) so that y(0) = yInt
    // y = a(x-h)^2 + k
    // yInt = a(0-h)^2 + k
    // k = yInt - a*h^2
    const k = yInt - a * h * h;

    const mafsCode = `<Mafs viewBox={{ x: [0, 8], y: [0, ${yInt + 2}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${a} * Math.pow(x - ${h}, 2) + ${k}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: `The marble's height was ${yInt} inches above the ground when it started moving.`, isCorrect: true },
      { text: `The marble's height was 5 inches above the ground 0 seconds after it started moving.`, isCorrect: false },
      { text: `The marble's minimum height was ${parseFloat(k.toFixed(1))} inches above the ground.`, isCorrect: false },
      { text: `The marble's minimum height was ${parseFloat((k + 0.2).toFixed(1))} inches above the ground.`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The graph shows a marble's height above the ground, in inches, seconds after it started moving on an elevated track of a marble run. Which of the following is the best interpretation of the y-intercept of the graph?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The y-intercept occurs at $x=0$, representing the time when the marble started moving. The graph intersects the y-axis at height $y=${yInt}$, so the marble was ${yInt} inches high initially.`
    };
  }
};

/**
 * Question ID: 9471345
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [num: 6-10, den: 4-6, const: 2-4, x: 2]
 * - Difficulty factors: [Evaluating a complex rational expression at a point]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Result must be a simplified fraction]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */