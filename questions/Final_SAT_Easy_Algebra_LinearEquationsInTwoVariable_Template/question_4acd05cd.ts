import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4acd05cd
 *
 * ORIGINAL ANALYSIS: [Table matching Mafs graph]
 * - Number ranges: [slope: 1-4, intercept: -8 to 8]
 * - Difficulty factors: [Matching table to graphed line]
 * - Constraints: [Simple integers for Easy]
 */

export const generator_4acd05cd = {
  metadata: {
    // id: "4acd05cd",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (1-4 for Easy)
    const m = getRandomInt(1, 4);
    // Randomize y-intercept (-8 to 8, excluding 0 for variety)
    const b = getRandomInt(-8, 8);
    const xVals = [0, 1, 2];
    const yVals = xVals.map(x => m * x + b);

    const mafsCode = `<Mafs viewBox={{ x: [-2, 4], y: [-10, 10] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${m} * x + ${b}} color="#2563eb" />
</Mafs>`;

    const createTable = (ys: number[]) => `<table style="border-collapse: collapse; margin: 0 auto;"><tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">x</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center; font-weight: bold;">y</td></tr>${xVals.map((x, i) => `<tr><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${x}</td><td style="border: 1px solid #ccc; padding: 8px 16px; text-align: center;">${ys[i]}</td></tr>`).join('')}</table>`;

    const optionsData = [
      { text: "Table A", code: createTable(yVals), isCorrect: true },
      { text: "Table B", code: createTable(xVals.map(x => -m * x + b)), isCorrect: false, reason: "negative slope" },
      { text: "Table C", code: createTable(xVals.map(x => (m + 1) * x + b)), isCorrect: false, reason: "wrong slope" },
      { text: "Table D", code: createTable(xVals.map(x => m * x)), isCorrect: false, reason: "zero intercept" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Which table matches the graph?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.code),
      correctAnswer: shuffled.find(o => o.isCorrect)!.code,
      explanation: `Choice ${correctLetter} is correct. The graph has y-intercept $(0, ${b})$ and slope ${m}.`
    };
  }
};

/**
 * Question ID: b2de69bd
 *
 * ORIGINAL ANALYSIS: [Equation from word problem]
 */
