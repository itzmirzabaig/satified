import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: eeebe166
 *
 * ORIGINAL ANALYSIS: [Y-intercept from Mafs graph value]
 * - Number ranges: [slope: 0.3-0.8, intercept: 3-10]
 * - Difficulty factors: [Reading y-intercept from graph]
 * - Constraints: [Simple values for Easy]
 */

export const generator_eeebe166 = {
  metadata: {
    // id: "eeebe166",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (0.3-0.8)
    const m = (getRandomInt(3, 8) / 10);
    // Randomize y-intercept (3-10)
    const b = getRandomInt(3, 10);

    const mafsCode = `<Mafs viewBox={{ x: [-5, 10], y: [0, 15] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${m} * x + ${b}} color="#2563eb" />
</Mafs>`;

    const optionsData = [
      { text: `(0, ${b})`, isCorrect: true },
      { text: `(-${Math.round(b/m)}, 0)`, isCorrect: false, reason: "x-intercept" },
      { text: `(0, 0)`, isCorrect: false, reason: "origin" },
      { text: `(0, ${b + 4})`, isCorrect: false, reason: "wrong value" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `What is the y-intercept of the line graphed?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: `(0, ${b})`,
      explanation: `Choice ${correctLetter} is correct. The line crosses the y-axis at the point $(0, ${b})$.`
    };
  }
};

/**
 * Question ID: b9839f9e
 *
 * ORIGINAL ANALYSIS: [Interpretation of coefficient (salad price)]
 */
