import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 216
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 3-7, intercept: 10-50, x: 2-6]
 * - Difficulty factors: [Evaluating function from graph]
 * - Distractor patterns: [x-coord as y-coord, wrong intercept, off-by-one slope]
 * - Constraints: [slope kept small so line fits at readable angle in square viewBox]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Plot.OfX with Mafs viewBox]
 */

export const generator_216 = {
  metadata: {
    id: "216",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Slope 5 or 10 and an intercept that is a multiple of 5 put every value at
    // a whole number of atmospheres on a gridline (gridlines every 5 kelvins,
    // labels every 10). The old figure labeled every single kelvin up to ~95,
    // which stacked the labels into an unreadable column, and with the bottom
    // of the window at y = 0 the x-axis labels were clipped off.
    const slope = getRandomInt(1, 2) * 5;
    const intercept = getRandomInt(2, 10) * 5;
    const xValue = getRandomInt(3, 7);
    const yValue = slope * xValue + intercept;

    const xMin = -1;
    const xMax = xValue + 2;
    const yMax = Math.ceil((yValue + slope + 5) / 10) * 10;
    const yMin = -Math.round(yMax / 10);   // room below the x-axis for its labels

    const mafsCode = `<Mafs viewBox={{ x: [${xMin}, ${xMax}], y: [${yMin}, ${yMax}] }}>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => Number.isInteger(n) && n > 0 ? n : "" }}
    yAxis={{ lines: 5, labels: (n) => n > 0 && n % 10 === 0 ? n : "" }}
  />
  <Plot.OfX y={(x) => ${slope} * x + ${intercept}} color="var(--mafs-blue)" />
</Mafs>`;

    const optionsData = [
      { text: xValue.toString(), isCorrect: false, reason: `is the pressure, ${xValue} atmospheres, not the temperature` },
      { text: intercept.toString(), isCorrect: false, reason: `is the estimated temperature when the pressure is 0 atmospheres, the $y$-intercept of the graph` },
      { text: yValue.toString(), isCorrect: true, reason: '' },
      { text: (yValue + slope).toString(), isCorrect: false, reason: `is the estimated temperature when the pressure is ${xValue + 1} atmospheres, not ${xValue}` }
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
      explanation: `Choice ${correctOption.letter} is correct. On the graph, the point on the line with $x$-coordinate ${xValue} has $y$-coordinate ${yValue}. So the estimated temperature when the pressure is ${xValue} atmospheres is ${yValue} kelvins. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because it ${o.reason}.`).join(' ')}`
    };
  }
};