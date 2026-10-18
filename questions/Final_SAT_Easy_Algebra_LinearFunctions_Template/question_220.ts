import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 220
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 30-50, time1: 2-4]
 * - Difficulty factors: [Calculating rate from graph]
 * - Distractor patterns: [time as rate, total amount as rate, arbitrary value]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_220 = {
  metadata: {
    id: "220",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // A rate that is a multiple of 5 puts the line on a gridline (every 5) at
    // each whole second, so the reading is exact. (Answer-aligned gridlines for
    // a prime rate such as 37 meant a gridline at every unit, a dense block.)
    const rate = getRandomInt(6, 10) * 5;
    const time1 = getRandomInt(2, 4);
    const amount1 = rate * time1;

    // x from just left of 0 to time1+1; y from just below 0 to yMax, so the
    // x-axis labels (needed to read the seconds) are not cut off at the bottom.
    const xMax = time1 + 1;
    const yMax = amount1 + rate; // = rate * (time1 + 1)

    const mafsCode = `<Mafs viewBox={{ x: [-0.4, ${xMax}], y: [${-Math.round(yMax * 0.08)}, ${yMax}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n > 0 ? n : "" }}
    yAxis={{ lines: 5, labels: (n) => n > 0 && n % 20 === 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => ${rate} * x} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: time1.toString(), isCorrect: false, reason: `is a number of seconds, not the number of candy bars wrapped per second` },
      { text: rate.toString(), isCorrect: true, reason: '' },
      { text: (amount1 + rate).toString(), isCorrect: false, reason: `is the total number of candy bars wrapped in ${time1 + 1} seconds, not the number wrapped per second` },
      { text: amount1.toString(), isCorrect: false, reason: `is the total number of candy bars wrapped in ${time1} seconds, not the number wrapped per second` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `The graph above models the number of candy bars a machine wraps with a label based on the number of seconds. According to the graph, what is the estimated number of candy bars the machine wraps per second?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: rate.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The slope represents the rate of candy bars wrapped per second. Using points $(0, 0)$ and $(${time1}, ${amount1})$, the slope is $\\frac{${amount1} - 0}{${time1} - 0} = ${rate}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};