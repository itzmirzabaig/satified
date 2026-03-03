import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4fbffc0a
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0.8-1.2, y: 4.0-5.5, coeff: 5.76]
 * - Difficulty factors: [Interpretation of a specific point on a projectile motion graph]
 * - Distractor patterns: [Swapping x and y, interpretation of vertex, interpretation of intercept]
 * - Constraints: [Point must lie on the parabola]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parabola representing height over time]
 */

export const generator_4fbffc0a = {
  metadata: {
    // id: "4fbffc0a",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Generate a point that lies on the parabola y = -5.76(x - 0.8)^2 + 5.6
    // x ranges from 0 to ~1.6 (where it hits ground)
    const xVal = parseFloat((getRandomInt(6, 14) / 10).toFixed(1));
    
    // Calculate y based on the parabola equation to ensure point lies on curve
    const a = 5.76;
    const h = 0.8;
    const k = 5.6;
    const yVal = parseFloat((-a * Math.pow(xVal - h, 2) + k).toFixed(1));

    const mafsCode = `<Mafs viewBox={{ x: [0, 2], y: [0, 7] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => -${a} * Math.pow(x - ${h}, 2) + ${k}} color="var(--mafs-blue)" />
  <Point x={${xVal}} y={${yVal}} />
</Mafs>`;

    const optionsData = [
      { text: `${xVal.toFixed(1)} second${xVal === 1 ? '' : 's'} after being launched, the ball's height is ${yVal.toFixed(1)} meters.`, isCorrect: true },
      { text: `${yVal.toFixed(1)} seconds after being launched, the ball's height is ${xVal.toFixed(1)} meters.`, isCorrect: false },
      { text: `The ball reaches a maximum height of ${yVal.toFixed(1)} meters.`, isCorrect: false },
      { text: `The ball was launched from an initial height of ${yVal.toFixed(1)} meters.`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The graph shows the height above ground, in meters, of a ball $x$ seconds after the ball was launched. Which statement is the best interpretation of the marked point $(${xVal.toFixed(1)}, ${yVal.toFixed(1)})$?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. In this context, the x-axis represents the time in seconds and the y-axis represents the height in meters. For the marked point $(${xVal.toFixed(1)}, ${yVal.toFixed(1)})$, the x-coordinate $x = ${xVal.toFixed(1)}$ represents time, and the y-coordinate $y = ${yVal.toFixed(1)}$ represents height. Therefore, ${xVal.toFixed(1)} second${xVal === 1 ? '' : 's'} after being launched, the ball is at a height of ${yVal.toFixed(1)} meters.`
    };
  }
};

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