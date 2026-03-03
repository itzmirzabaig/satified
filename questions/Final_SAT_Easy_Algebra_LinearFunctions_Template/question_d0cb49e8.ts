import { shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d0cb49e8
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 0.015-0.025, temp: 500-700]
 * - Difficulty factors: [Reading value from graph]
 * - Distractor patterns: [half pressure, half temp, temp as pressure]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 *
 * FIX: rate and temp co-selected so rate * temp is always an exact integer.
 * Previously Math.round() caused the <Point> dot to float off the line.
 */

// Pre-computed table: rate × any xOption = exact integer (verified via GCD)
const RATE_TEMP_TABLE: Array<{ rate: number; xOptions: number[] }> = [
  { rate: 0.015, xOptions: [600] },
  { rate: 0.016, xOptions: [500, 625] },
  { rate: 0.018, xOptions: [500] },
  { rate: 0.020, xOptions: [500, 550, 600, 650, 700] },
  { rate: 0.022, xOptions: [500] },
  { rate: 0.024, xOptions: [500, 625] },
  { rate: 0.025, xOptions: [520, 560, 600, 640, 680] },
];

export const generator_d0cb49e8 = {
  metadata: {
    // id: "d0cb49e8",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const row = RATE_TEMP_TABLE[Math.floor(Math.random() * RATE_TEMP_TABLE.length)];
    const rate = row.rate;
    const temp = row.xOptions[Math.floor(Math.random() * row.xOptions.length)];
    const pressure = rate * temp; // exact integer, no rounding needed

    const xMax = Math.ceil(temp / 100) * 100 + 100;
    const yMax = pressure + 3;

    const mafsCode = `<Mafs viewBox={{ x: [0, ${xMax}], y: [0, ${yMax}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 100, labels: (n) => n % 100 === 0 ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n >= 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => ${rate} * x} color="var(--mafs-blue)" />
  <Point x={${temp}} y={${pressure}} />
</Mafs>`;

    const optionsData = [
      { text: Math.floor(pressure / 2).toString(), isCorrect: false, reason: "is approximately half the correct pressure" },
      { text: pressure.toString(), isCorrect: true },
      { text: (temp / 2).toString(), isCorrect: false, reason: "is approximately half the temperature" },
      { text: temp.toString(), isCorrect: false, reason: "confuses temperature with pressure" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Argon is placed inside a container with a constant volume. The graph shows the estimated pressure $y$, in pounds per square inch (psi), of the argon when its temperature is $x$ kelvins. What is the estimated pressure of the argon, in psi, when the temperature is ${temp} kelvins?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: pressure.toString(),
      explanation: `Choice ${correctOption.letter} is correct. From the graph, when the temperature is ${temp} kelvins, the point on the line has a y-coordinate of ${pressure}. Therefore, the estimated pressure is ${pressure} psi. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: cee5b352
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [growthRate: 4.8, initialLength: 140-180]
 * - Difficulty factors: [Modeling growth]
 * - Distractor patterns: [no intercept, length as slope, growth as intercept]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */