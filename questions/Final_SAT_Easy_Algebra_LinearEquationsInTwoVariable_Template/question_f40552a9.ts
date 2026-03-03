import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f40552a9
 *
 * ORIGINAL ANALYSIS: [Reading y-intercept from Mafs graph]
 * - Number ranges: [slope: 0.1-0.5, intercept: 5-12]
 * - Difficulty factors: [Reading y-intercept from graph]
 * - Constraints: [Simple values for Easy]
 */

export const generator_f40552a9 = {
  metadata: {
    // id: "f40552a9",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (0.1-0.5)
    const m = (getRandomInt(1, 5) / 10);
    // Randomize y-intercept (5-12)
    const b = getRandomInt(5, 12);

    const mafsCode = `<Mafs viewBox={{ x: [-5, 15], y: [0, 15] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${m} * x + ${b}} color="#2563eb" />
</Mafs>`;

    const optionsData = [
      { text: `(0, ${b})`, isCorrect: true },
      { text: `(0, -${b})`, isCorrect: false, reason: "negative intercept" },
      { text: `(0, ${Math.round(b/2)})`, isCorrect: false, reason: "wrong value" },
      { text: `(0, 0)`, isCorrect: false, reason: "origin" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `What is the y-intercept of the line graphed?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: `(0, ${b})`,
      explanation: `Choice ${correctLetter} is correct. The line intersects the y-axis at the point $(0, ${b})$.`
    };
  }
};

/**
 * Question ID: 12ae3452
 *
 * ORIGINAL ANALYSIS: [Parallelogram perimeter substitution]
 */
