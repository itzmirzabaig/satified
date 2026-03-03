import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8a1544f1
 *
 * ORIGINAL ANALYSIS: [Graph to equation negative slope]
 * - Number ranges: [slope: -4 to -1, intercept: 2-8]
 * - Difficulty factors: [Identifying equation from graph]
 * - Constraints: [Simple integers for Easy]
 */

export const generator_8a1544f1 = {
  metadata: {
    // id: "8a1544f1",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Randomize slope (-4 to -1)
    const m = -getRandomInt(1, 4);
    // Randomize y-intercept (2-8)
    const b = getRandomInt(2, 8);

    const mafsCode = `<Mafs viewBox={{ x: [-2, 4], y: [-5, 10] }}>
  <Coordinates.Cartesian />
  <Plot.OfX y={(x) => ${m} * x + ${b}} color="#2563eb" />
</Mafs>`;

    const optionsData = [
      { text: `$y = ${m}x + ${b}$`, isCorrect: true },
      { text: `$y = ${-m}x - ${b}$`, isCorrect: false, reason: "wrong slope and intercept signs" },
      { text: `$y = \\frac{1}{${Math.abs(m)}}x - ${b}$`, isCorrect: false, reason: "reciprocal slope" },
      { text: `$y = -\\frac{1}{${Math.abs(m)}}x + ${b}$`, isCorrect: false, reason: "reciprocal slope" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `What is the equation of the line shown in the graph?`,
      figureCode: mafsCode,
      options: shuffled.map(o => o.text),
      correctAnswer: `$y = ${m}x + ${b}$`,
      explanation: `Choice ${correctLetter} is correct. The line has y-intercept $b = ${b}$ and slope $m = ${m}$.`
    };
  }
};

/**
 * Question ID: 8b2a2a63
 *
 * ORIGINAL ANALYSIS: [Y-intercept value extraction]
 */
