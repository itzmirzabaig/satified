import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 516
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-6, y: exponential growth 5-80]
 * - Difficulty factors: [Identifying exponential curve model]
 * - Distractor patterns: [Linear options (A,B), wrong curve description (C)]
 * - Constraints: [Exponential growth curve]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Exponential scatterplot with model curve]
 */

export const generator_516 = {

  metadata: {
    id: "516",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {

    const base = getRandomInt(3, 6);
    const growthRate = (1.4 + Math.random() * 0.4).toFixed(1);
    const rate = parseFloat(growthRate);
    const maxX = getRandomInt(5, 7);

    // Build the scatter by jittering each point off the exact model value
    // base*rate^x by a signed amount, so the data genuinely straddles the
    // dashed model curve (some points strictly above, some strictly below).
    // This makes the "both above and below" description true for EVERY draw.
    // A bounded retry guarantees at least one point on each side.
    let points: { x: number; y: number }[] = [];
    let tries = 0;
    do {
      points = [];
      for (let x = 1; x <= maxX; x++) {
        const exact = base * Math.pow(rate, x);
        // Jitter grows with the model value so points stay visibly off the
        // curve at larger x; at least +/-1 so rounding can't erase the offset.
        const spread = Math.max(1, Math.round(exact * 0.08));
        const dir = Math.random() < 0.5 ? -1 : 1;
        const mag = getRandomInt(1, spread);
        const y = Math.max(1, Math.round(exact) + dir * mag);
        points.push({ x, y });
      }
    } while (
      tries++ < 50 &&
      // require a genuine split relative to the exact model curve
      !(points.some(p => p.y > base * Math.pow(rate, p.x)) &&
        points.some(p => p.y < base * Math.pow(rate, p.x)))
    );

    const pointElements = points.map(p => `<Point x={${p.x}} y={${p.y}} />`).join('\n ');
    const maxVal = Math.max(...points.map(p => p.y), Math.round(base * Math.pow(rate, maxX))) + 10;

    const mafsCode = `
      <Mafs viewBox={{ x: [0, ${maxX + 1}], y: [0, ${maxVal}] }}>
        <Coordinates.Cartesian />
        ${pointElements}
        <Plot.OfX y={(x) => ${base} * Math.pow(${growthRate}, x)} style="dashed" color="#ff2a7a" />
      </Mafs>
    `;

    const optionsData = [
      { text: "A straight line", isCorrect: false },
      { text: "A decreasing line", isCorrect: false },
      { text: "An increasing curve with all data points below the model", isCorrect: false },
      { text: "An increasing curve with data points both above and below the model", isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: "Which of the following models best fits the scatter plot data?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: "An increasing curve with data points both above and below the model",
      explanation: `Choice ${correctLetter} is correct. The scatterplot shows an increasing curved trend. An appropriate model should be an increasing curve that passes through the data points, having some points above and some below. Choice ${incorrectOptions[0].letter} is incorrect because the data does not follow a linear pattern. Choice ${incorrectOptions[1].letter} is incorrect because the data is increasing, not decreasing. Choice ${incorrectOptions[2].letter} is incorrect because a good model should have points both above and below it, not all on one side.`
    };

  }

};
