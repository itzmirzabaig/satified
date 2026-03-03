import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c6b151d4
 *
 * ORIGINAL ANALYSIS: [Interpretation of solution point]
 */

export const generator_c6b151d4 = {
  metadata: {
    // id: "c6b151d4",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(200, 500);
    const xVal = getRandomInt(10, 50);
    const yVal = Math.round((total - 3 * xVal) / 4);

    const optionsData = [
      { text: `If ${xVal} triangles were constructed, then ${yVal} rectangles were constructed.`, isCorrect: true },
      { text: `If ${xVal} triangles were constructed, then ${yVal} straws were used.`, isCorrect: false, reason: "confuses rectangles with straws" },
      { text: `If ${yVal} triangles were constructed, then ${xVal} rectangles were constructed.`, isCorrect: false, reason: "swaps x and y" },
      { text: `If ${yVal} triangles were constructed, then ${xVal} straws were used.`, isCorrect: false, reason: "swaps variables and labels" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The equation $3x + 4y = ${total}$ represents $x$ triangles and $y$ rectangles. What does $(x, y) = (${xVal}, ${yVal})$ mean?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: shuffledOptions.find(o => o.isCorrect)!.text,
      explanation: `Choice ${correctLetter} is correct. $x$ is triangles and $y$ is rectangles.`
    };
  }
};

/**
 * Question ID: 8c98c834
 *
 * ORIGINAL ANALYSIS: [Substitution into decimal linear model]
 */