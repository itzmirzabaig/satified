import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 59a49431
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -4, intercept: 8]
 * - Difficulty factors: [Graph interpretation, inequality testing]
 * - Distractor patterns: [A=below line, B=on y-axis above, C=left of origin, D=correct in shaded region]
 * - Constraints: [Must generate valid Mafs inequality graph]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs: linear inequality y >= -4x + 8]
 */

export const generator_59a49431 = {
  metadata: {
    // id: "59a49431",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const slope = getRandomInt(-6, -2);
    const intercept = getRandomInt(4, 12);
    const correctX = getRandomInt(2, 6);
    const correctY = slope * correctX + intercept + getRandomInt(2, 5);
    const distractor1 = { x: 0, y: slope * 0 + intercept - 3 };
    const distractor2 = { x: -getRandomInt(2, 5), y: 0 };
    const distractor3 = { x: 0, y: getRandomInt(2, intercept - 1) };

    const mafsCode = `
      <Plot.Inequality y={{ '>=': (x) => ${slope} * x + ${intercept} }} color="gray" fillOpacity={0.3} />
    `;

    const optionsData = [
      { text: `$(${distractor1.x},${distractor1.y})$`, isCorrect: false },
      { text: `$(${distractor3.x},${distractor3.y})$`, isCorrect: false },
      { text: `$(${distractor2.x},${distractor2.y})$`, isCorrect: false },
      { text: `$(${correctX},${correctY})$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The shaded region represents $y \\ge ${slope}x + ${intercept}$. Testing point (${correctX}, ${correctY}): ${correctY} \\ge ${slope}(${correctX}) + ${intercept} = ${slope * correctX + intercept}, which is true.`;

    return {
      questionText: `The shaded region shown represents solutions to an inequality. Which ordered pair $(x, y)$ is a solution to this inequality?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 915463e0
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [min temp: 97.8, max temp: 99.0]
 * - Difficulty factors: [Decimal range, inclusive bounds, real-world context]
 * - Distractor patterns: [A=below range, B=just below min, C=within range, D=above max]
 * - Constraints: [Must test decimal values against inclusive range]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */