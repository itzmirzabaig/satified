import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 2554b413
 *
 * ORIGINAL ANALYSIS: [Slope-intercept from given m and b]
 */

export const generator_2554b413 = {
  metadata: {
    // id: "2554b413",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = getRandomInt(3, 9);
    const b = getRandomInt(3, 12);

    const optionsData = [
      { text: `$y = ${m}x + ${b}$`, isCorrect: true },
      { text: `$y = ${m}x + ${m * b}$`, isCorrect: false, reason: "multiplies coefficients" },
      { text: `$y = ${b}x + ${m}$`, isCorrect: false, reason: "swaps m and b" },
      { text: `$y = ${b}x + ${m * b}$`, isCorrect: false, reason: "swaps and multiplies" }
    ];

    const shuffled = shuffle(optionsData).map((opt, i) => ({ ...opt, letter: String.fromCharCode(65 + i) }));
    const correctLetter = shuffled.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A line has slope ${m} and passes through $(0, ${b})$. Which is the equation?`,
      figureCode: null,
      options: shuffled.map(o => o.text),
      correctAnswer: `$y = ${m}x + ${b}$`,
      explanation: `Choice ${correctLetter} is correct. $m=${m}$ and $b=${b}$ gives $y=${m}x+${b}$.`
    };
  }
};

/**
 * Question ID: 52a8ef85
 *
 * ORIGINAL ANALYSIS: [Sweaters and shirts substitution]
 */