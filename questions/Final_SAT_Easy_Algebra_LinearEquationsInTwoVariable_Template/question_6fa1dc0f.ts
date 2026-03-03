import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6fa1dc0f
 *
 * ORIGINAL ANALYSIS: [Line from slope and point]
 */

export const generator_6fa1dc0f = {
  metadata: {
    // id: "6fa1dc0f",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const m = getRandomInt(2, 8);
    const b = getRandomInt(2, 10);

    const optionsData = [
      { text: `$y = ${m}x + ${b}$`, isCorrect: true },
      { text: `$y = -${b}x + ${m}$`, isCorrect: false, reason: "swaps values and sign" },
      { text: `$y = ${b}x + ${m}$`, isCorrect: false, reason: "swaps slope and intercept" },
      { text: `$y = ${m}x - ${b}$`, isCorrect: false, reason: "wrong intercept sign" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Line $r$ has slope ${m} and passes through $(0, ${b})$. What is its equation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$y = ${m}x + ${b}$`,
      explanation: `Choice ${correctLetter} is correct. In $y=mx+b$, $m=${m}$ and $b=${b}$.`
    };
  }
};

/**
 * Question ID: c6b151d4
 *
 * ORIGINAL ANALYSIS: [Interpretation of solution point]
 */