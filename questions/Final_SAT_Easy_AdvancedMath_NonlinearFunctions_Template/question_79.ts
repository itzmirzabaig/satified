import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 79
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [platformHeight: 8-20, shift: 3-8]
 * - Difficulty factors: [Translating a parabola down based on a real-world change]
 * - Distractor patterns: [Original height, increased height, multiplicative error]
 * - Constraints: [Shift is vertical]
 * - Question type: [Multiple Choice Figure]
 * - Figure generation: [Projectile motion parabola plots]
 *
 * FIXED:
 * - Deduplicated option heights: round(1.5 * firstPlatform) could equal
 *   firstPlatform + shiftAmount (e.g. 10 + 5 = 15), causing DUP_OPTIONS.
 * - Plotted h(x) = -16x^2 + 16x + k so the y-intercept is exactly k (the old
 *   -16(x-0.3)^2 + k curve started at k - 1.44, contradicting the explanation).
 * - Stated the first platform's height and showed its graph, so the question
 *   is answerable; capped shiftAmount so the second platform stays >= 4 ft.
 * - All option graphs now share one viewBox so vertical shifts are comparable.
 */

export const generator_79 = {
  metadata: {
    id: "79",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize platform height (8-20 feet for Easy)
    const firstPlatform = getRandomInt(8, 20);
    // Randomize shift amount (3-8 feet), capped so the second platform is at least 4 feet tall
    const shiftAmount = getRandomInt(3, Math.min(8, firstPlatform - 4));
    const secondPlatform = firstPlatform - shiftAmount;

    // Distractor launch heights: unchanged platform, taller platform, multiplicative error.
    const tallerPlatform = firstPlatform + shiftAmount;
    let scaledPlatform = Math.round(firstPlatform * 1.5);
    // round(1.5 * firstPlatform) can land exactly on firstPlatform + shiftAmount;
    // nudging by 2 keeps it distinct from every other height (it always exceeds
    // firstPlatform, and therefore secondPlatform, by at least 4).
    if (scaledPlatform === tallerPlatform) scaledPlatform += 2;

    // h(x) = -16x^2 + 16x + k: y-intercept exactly k, vertex at (0.5, k + 4),
    // so the tallest curve peaks at max(k) + 4. One shared viewBox for all graphs.
    const maxY = Math.max(tallerPlatform, scaledPlatform) + 8;
    const buildGraph = (k: number) => `<Mafs viewBox={{ x: [-0.5, 2], y: [0, ${maxY}] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => -16 * Math.pow(x, 2) + 16 * x + ${k}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      {
        figureCode: buildGraph(secondPlatform),
        isCorrect: true,
        reason: ''
      },
      {
        figureCode: buildGraph(firstPlatform),
        isCorrect: false,
        reason: `its graph starts at a height of ${firstPlatform} feet, the same platform height as in the first part`
      },
      {
        figureCode: buildGraph(tallerPlatform),
        isCorrect: false,
        reason: `its graph starts at a height of ${tallerPlatform} feet, which is ${shiftAmount} feet taller than the first platform, not shorter`
      },
      {
        figureCode: buildGraph(scaledPlatform),
        isCorrect: false,
        reason: `its graph starts at a height of ${scaledPlatform} feet, which is taller than the first platform`
      }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;
    const incorrectOptions = shuffled.filter(o => !o.isCorrect);

    return {
      questionText: `During the first part of an experiment, a ball was launched upward from a platform that was ${firstPlatform} feet tall. The graph shown models the ball's height above the ground, in feet, as a function of time, in seconds, during the first part of the experiment. During the second part of the experiment, the ball was launched upward in the same way from a platform that was ${shiftAmount} feet shorter than the platform used in the first part. Which of the following graphs could model the ball's height above the ground, in feet, as a function of time, in seconds, during the second part of the experiment?`,
      figureCode: buildGraph(firstPlatform),
      options: shuffled.map(o => o.figureCode),
      correctAnswer: correctOption.figureCode,
      explanation: `Choice ${correctOption.letter} is correct. In the first part of the experiment, the platform was ${firstPlatform} feet tall, so the graph shown starts at a height of ${firstPlatform} feet at time 0 (its y-intercept). In the second part, the platform was ${shiftAmount} feet shorter, so its height was ${firstPlatform} - ${shiftAmount} = ${secondPlatform} feet. The graph for the second part must therefore start at a height of ${secondPlatform} feet at time 0, which matches the graph in choice ${correctOption.letter}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
