import { shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 930c2990
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: 0.005-0.020, xValue: 400-600]
 * - Difficulty factors: [Reading value from graph]
 * - Distractor patterns: [zero, rate as volume, reciprocal rate]
 * - Constraints: [None]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX]
 *
 * FIX: rate and xValue are co-selected so that rate * xValue is always an exact
 * integer. This guarantees the <Point> dot sits perfectly on the plotted line.
 * Previously, Math.round() was used which caused the dot to float above/below
 * the line whenever rate * xValue was not a whole number.
 */

// Pre-computed table of (rate, validXValues) pairs where rate * x is always an integer.
// Generated from: for r in 5..20, step = 1000/gcd(r,1000), collect multiples of step in [400,600]
const RATE_X_TABLE: Array<{ rate: number; xOptions: number[] }> = [
  { rate: 0.005, xOptions: [400, 600] },
  { rate: 0.006, xOptions: [500] },
  { rate: 0.008, xOptions: [500] },
  { rate: 0.010, xOptions: [400, 500, 600] },
  { rate: 0.012, xOptions: [500] },
  { rate: 0.014, xOptions: [500] },
  { rate: 0.015, xOptions: [400, 600] },
  { rate: 0.016, xOptions: [500] },
  { rate: 0.018, xOptions: [500] },
  { rate: 0.020, xOptions: [400, 450, 500, 550, 600] },
];

export const generator_930c2990 = {
  metadata: {
    // id: "930c2990",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Pick a random row, then a random valid xValue from that row.
    // This guarantees rate * xValue is an exact integer — no rounding needed.
    const row = RATE_X_TABLE[Math.floor(Math.random() * RATE_X_TABLE.length)];
    const rate = row.rate;
    const xValue = row.xOptions[Math.floor(Math.random() * row.xOptions.length)];
    const yValue = rate * xValue; // exact integer, no Math.round()

    // viewBox: x from 0 to next-100-above-xValue plus 100 buffer
    // y from 0 to yValue + small headroom
    const xMax = Math.ceil(xValue / 100) * 100 + 100;
    const yMax = yValue + 3;

    // x-axis ticks every 100 kelvins; y-axis ticks every 1 liter (yValue is 2-12)
    const mafsCode = `<Mafs viewBox={{ x: [0, ${xMax}], y: [0, ${yMax}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 100, labels: (n) => n % 100 === 0 ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n >= 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => ${rate} * x} color="var(--mafs-blue)" />
  <Point x={${xValue}} y={${yValue}} />
</Mafs>`;

    const optionsData = [
      { text: "0", isCorrect: false, reason: "is the value at the origin" },
      { text: `\\frac{${yValue}}{${xValue}}`, isCorrect: false, reason: "represents the rate, not the volume" },
      { text: yValue.toString(), isCorrect: true },
      { text: `\\frac{${xValue}}{${yValue}}`, isCorrect: false, reason: "is the reciprocal of the rate" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Hydrogen is placed inside a container and kept at a constant pressure. The graph shows the estimated volume, in liters, of the hydrogen when its temperature is $x$ kelvins. What is the estimated volume when its temperature is ${xValue} kelvins?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: yValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. From the graph, when the temperature is ${xValue} kelvins, the point on the line has a y-coordinate of ${yValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1d18794b
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [activationFee: 25-50, monthlyCost: 20-30]
 * - Difficulty factors: [Modeling linear relationship]
 * - Distractor patterns: [division of time, swapped parameters]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */