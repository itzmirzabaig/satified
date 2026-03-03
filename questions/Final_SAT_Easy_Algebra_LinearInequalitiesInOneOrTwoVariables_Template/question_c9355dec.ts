import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c9355dec
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4/5, y-intercept: -7]
 * - Difficulty factors: [Graph to equation conversion, slope calculation from points]
 * - Distractor patterns: [A=correct y>=2/3x-6, B=wrong intercept sign, C=wrong intercept value, D=wrong intercept sign and value]
 * - Constraints: [Must calculate slope from two points on line]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs: linear inequality y >= (4/5)x - 7]
 */

export const generator_c9355dec = {
  metadata: {
    // id: "c9355dec",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rise = getRandomInt(1, 4);
    const run = getRandomInt(2, 5);
    const yIntercept = -getRandomInt(4, 10);
    const xIntercept = (-yIntercept * run) / rise;

    // Added Coordinates.Cartesian with visible y-axis labels
    const mafsCode = `<Mafs>
  <Coordinates.Cartesian
    xAxis={{ lines: 1, labels: (n) => (n % 2 === 0 ? n : "") }}
    yAxis={{ lines: 1, labels: (n) => n }}
  />
  <Plot.Inequality y={{ '>=': (x) => (${rise}/${run}) * x + ${yIntercept} }} color="gray" fillOpacity={0.3} />
</Mafs>`;

    const wrongIntercept1 = Math.abs(yIntercept);
    const wrongIntercept2 = yIntercept - 3;

    const optionsData = [
      { text: `$y \\ge \\frac{${rise}}{${run}}x ${yIntercept >= 0 ? '+' : '-'}${Math.abs(yIntercept)}$`, isCorrect: true },
      { text: `$y \\ge \\frac{${rise}}{${run}}x + ${wrongIntercept1}$`, isCorrect: false },
      { text: `$y \\ge \\frac{${rise}}{${run}}x ${wrongIntercept2 >= 0 ? '+' : '-'}${Math.abs(wrongIntercept2)}$`, isCorrect: false },
      { text: `$y \\ge \\frac{${rise}}{${run}}x + ${wrongIntercept1 + 3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The line passes through (0, ${yIntercept}) and (${xIntercept.toFixed(1)}, 0) with slope $\\frac{${rise}}{${run}}$. The shaded region is above the line, representing $y \\ge \\frac{${rise}}{${run}}x ${yIntercept >= 0 ? '+' : '-'}${Math.abs(yIntercept)}$.`;

    return {
      questionText: `The shaded region shown represents the solutions to which inequality?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 2869fe95
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min: 31, max: 67]
 * - Difficulty factors: [Temperature range compound inequality]
 * - Distractor patterns: [A=sum of bounds, B=only max bound, C=correct compound, D=only min bound reversed]
 * - Constraints: [Must be inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */