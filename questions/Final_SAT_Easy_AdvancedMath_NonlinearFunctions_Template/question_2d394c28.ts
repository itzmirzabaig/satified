import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2d394c28
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [initial: 15000-25000, step: 2000-5000]
 * - Difficulty factors: [Interpreting the y-intercept of a linear model in a table]
 * - Distractor patterns: [Origin, max value in table, intermediate value]
 * - Constraints: [x=0 represents the start year]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

export const generator_2d394c28 = {
  metadata: {
    // id: "2d394c28",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const initial = getRandomInt(15, 25) * 1000;
    const step = getRandomInt(2, 5) * 1000;
    const xValues = [0, 2, 4, 6];
    const yValues = xValues.map(x => initial + (x / 2) * step);

    const tableHTML = `<table border="1">
  <tr><th>Years after 2010 (x)</th><th>Residents (y)</th></tr>
  ${xValues.map((x, i) => `<tr><td>${x}</td><td>${yValues[i]}</td></tr>`).join('')}
</table>`;

    // yValues[0] is initial, yValues[3] is max, pick an intermediate value for another distractor
    const maxValue = yValues[yValues.length - 1];
    const intermediateValue = yValues[1]; // value at x=2

    const optionsData = [
      { text: `${initial}`, isCorrect: true },
      { text: `0`, isCorrect: false },
      { text: `${maxValue}`, isCorrect: false },
      { text: `${intermediateValue}`, isCorrect: false }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));

    const correctOption = shuffled.find(o => o.isCorrect)!;

    return {
      questionText: `The table shown models the number of residents of a certain city $x$ years after 2010. How many residents does this model estimate the city had in 2010?`,
      figureCode: tableHTML,
      options: shuffled.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The year 2010 is represented by $x=0$. Looking at the table, when $x=0$, the number of residents $y$ is $${initial}$.`
    };
  }
};

/**
 * Question ID: 2b6c12eb
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [shift: 4-7]
 * - Difficulty factors: [Solving for x-intercept of an exponential function]
 * - Distractor patterns: [None (Grid-in)]
 * - Constraints: [Exponential function must have a whole number intercept]
 * - Question type: [Figure→Fill-in-the-blank]
 * - Figure generation: [Exponential growth plot]
 */