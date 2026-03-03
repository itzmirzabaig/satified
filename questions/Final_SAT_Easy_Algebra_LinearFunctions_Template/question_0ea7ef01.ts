import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 0ea7ef01
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 3-7, intercept: 10-50, x: 2-6]
 * - Difficulty factors: [Evaluating function from graph]
 * - Distractor patterns: [x-coord as y-coord, wrong intercept, off-by-one slope]
 * - Constraints: [slope kept small so line fits at readable angle in square viewBox]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX with Mafs viewBox]
 */

export const generator_0ea7ef01 = {
  metadata: {
    // id: "0ea7ef01",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Small slope so the line has a clear, readable angle in a square Mafs viewBox
    const slope = getRandomInt(3, 7);
    const intercept = getRandomInt(10, 50);
    const xValue = getRandomInt(3, 7);
    const yValue = slope * xValue + intercept;

    // viewBox: x from -1 to xValue+2, y from 0 to yValue+10
    // This keeps the line at a natural diagonal rather than near-vertical
    const xMin = -1;
    const xMax = xValue + 2;
    const yMin = 0;
    const yMax = yValue + 10;

    const mafsCode = `<Mafs viewBox={{ x: [${xMin}, ${xMax}], y: [${yMin}, ${yMax}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n >= 0 ? n : "" }}
    yAxis={{ lines: 1, labels: (n) => Number.isInteger(n) ? n : "" }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${intercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: xValue.toString(), isCorrect: false, reason: "is the x-coordinate, not the y-coordinate" },
      { text: intercept.toString(), isCorrect: false, reason: "is the y-intercept, not the value at x = " + xValue },
      { text: yValue.toString(), isCorrect: true },
      { text: (yValue + slope).toString(), isCorrect: false, reason: "overestimates by one extra unit of slope" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Oxygen gas is placed inside a tank with a constant volume. The graph shows the estimated temperature, in kelvins, of the oxygen gas when its pressure is $x$ atmospheres. What is the estimated temperature when the pressure is ${xValue} atmospheres?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: yValue.toString(),
      explanation: `Choice ${correctOption.letter} is correct. From the graph, the point with x-coordinate ${xValue} has a y-coordinate of ${yValue}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};