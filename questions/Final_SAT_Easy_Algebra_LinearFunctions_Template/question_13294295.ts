import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 13294295
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 30-50, time1: 2-4]
 * - Difficulty factors: [Calculating rate from graph]
 * - Distractor patterns: [time as rate, total amount as rate, arbitrary value]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 */

export const generator_13294295 = {
  metadata: {
    // id: "13294295",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rate = getRandomInt(30, 50);
    const time1 = getRandomInt(2, 4);
    const amount1 = rate * time1;

    // viewBox: x from 0 to time1+1, y from 0 to yMax with a little headroom
    const xMax = time1 + 1;
    const yMax = amount1 + rate; // = rate * (time1 + 1)

    // data-answer tells GraphRenderer to align y-gridlines so `rate` lands
    // exactly on a labeled line. The renderer's computeAnswerAlignedStep handles
    // all values including primes automatically.
    // We only set xAxis explicitly; yAxis is computed by the renderer from data-answer.
    const mafsCode = `<Mafs data-answer="${rate}" viewBox={{ x: [0, ${xMax}], y: [0, ${yMax}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n >= 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => ${rate} * x} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: time1.toString(), isCorrect: false, reason: "is the time in seconds, not the rate" },
      { text: rate.toString(), isCorrect: true },
      { text: (amount1 - 2).toString(), isCorrect: false, reason: "is an arbitrary value" },
      { text: amount1.toString(), isCorrect: false, reason: "is the total amount, not the rate" }
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
      explanation: `Choice ${correctOption.letter} is correct. The slope represents the rate of candy bars wrapped per second. Using points $(0, 0)$ and $(${time1}, ${amount1})$, the slope is $\\frac{${amount1} - 0}{${time1} - 0} = ${rate}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};