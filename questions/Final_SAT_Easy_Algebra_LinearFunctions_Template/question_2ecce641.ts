import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2ecce641
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 1-4, intercept: 15-25]
 * - Difficulty factors: [Reading y-intercept from graph]
 * - Constraints: [None]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Plot.OfX]
 */

export const generator_2ecce641 = {
  metadata: {
    // id: "2ecce641",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(1, 4);

    // Constrain intercept to multiples of 5 so it always lands on a labeled gridline.
    // getRandomInt picks from [15, 20, 25] via step-3 → index * 5 + 15
    const interceptMultiplier = getRandomInt(3, 5); // 3→15, 4→20, 5→25
    const intercept = interceptMultiplier * 5;

    // viewBox: x from 0 (deposits start at time=0), y from 0 to yMax with headroom.
    // data-answer aligns y-gridlines so the intercept value is always labeled.
    const xMax = 10;
    const yMax = slope * xMax + intercept + 10;

    const mafsCode = `<Mafs data-answer="${intercept}" viewBox={{ x: [0, ${xMax}], y: [0, ${yMax}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n >= 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${intercept}} color="var(--mafs-blue)" />
</Mafs>`;

    return {
      questionText: `To the nearest whole dollar, what is the amount of the initial deposit estimated by the graph?`,
      figureCode: mafsCode,
      options: null,
      correctAnswer: intercept.toString(),
      explanation: `The initial deposit is the y-intercept, which is the y-coordinate when $x=0$. From the graph, when $x=0$, $y=${intercept}$. Therefore, the initial deposit is $${intercept}$.`
    };
  }
};

/**
 * Question ID: 13909d78
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 80-120, intercept: 1-5, xValue: 7-12]
 * - Difficulty factors: [Evaluation]
 * - Distractor patterns: [adding all numbers, addition error, forgetting intercept]
 * - Constraints: [None]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */