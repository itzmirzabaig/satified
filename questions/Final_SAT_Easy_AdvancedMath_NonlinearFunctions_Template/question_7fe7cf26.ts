import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7fe7cf26
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [platformHeight: 8-20, shift: 3-8]
 * - Difficulty factors: [Translating a parabola down based on a real-world change]
 * - Distractor patterns: [Original height, increased height, multiplicative error]
 * - Constraints: [Shift is vertical]
 * - Question type: [Multiple Choice Figure]
 * - Figure generation: [Projectile motion parabola plots]
 */

export const generator_7fe7cf26 = {
  metadata: {
    // id: "7fe7cf26",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize platform height (8-20 feet for Easy)
    const firstPlatform = getRandomInt(8, 20);
    // Randomize shift amount (3-8 feet)
    const shiftAmount = getRandomInt(3, 8);
    const secondPlatform = firstPlatform - shiftAmount;

    const buildGraph = (k: number) => `<Mafs viewBox={{ x: [-1, 2], y: [0, ${k + 5}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => -16 * Math.pow(x - 0.3, 2) + ${k}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { figureCode: buildGraph(secondPlatform), isCorrect: true },
      { figureCode: buildGraph(firstPlatform), isCorrect: false },
      { figureCode: buildGraph(firstPlatform + shiftAmount), isCorrect: false },
      { figureCode: buildGraph(Math.round(firstPlatform * 1.5)), isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `During the first part of an experiment, a ball was launched from a platform. The height of the ball, in feet, is represented by a graph. During the second part of the experiment, the platform the ball was launched from was ${shiftAmount} feet shorter than the platform in the first part of the experiment. Which graph represents the second part of the experiment?`,
      figureCode: null,
      options: shuffled.map(o => o.figureCode),
      correctAnswer: correctOption.figureCode,
      explanation: `Choice ${correctOption.letter} is correct. The first platform is ${firstPlatform} feet tall. The second platform is ${shiftAmount} feet shorter, so its height (y-intercept) is ${secondPlatform} feet. Only Choice ${correctOption.letter} shows a graph starting at $y=${secondPlatform}$.`
    };
  }
};

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
