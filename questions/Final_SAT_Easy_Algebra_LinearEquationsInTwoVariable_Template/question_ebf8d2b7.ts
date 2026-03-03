import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ebf8d2b7
 *
 * ORIGINAL ANALYSIS: [Linear equation word problem setup]
 */

export const generator_ebf8d2b7 = {
  metadata: {
    // id: "ebf8d2b7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const tLarge = getRandomInt(8, 15);
    const tSmall = getRandomInt(3, 7);
    const total = getRandomInt(400, 800);

    const optionsData = [
      { text: `$${tLarge}x + ${tSmall}y = ${total}$`, isCorrect: true },
      { text: `$${tSmall}x + ${tLarge}y = ${total}$`, isCorrect: false, reason: "swaps coefficients" },
      { text: `$(x+y)(${tLarge} + ${tSmall}) = ${total}$`, isCorrect: false, reason: "sums times incorrectly" },
      { text: `$(${tLarge} + x)(${tSmall} + y) = ${total}$`, isCorrect: false, reason: "nonlinear form" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `A machine takes ${tLarge} minutes per large box ($x$) and ${tSmall} minutes per small box ($y$). If it runs for ${total} minutes daily, which equation represents this?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${tLarge}x + ${tSmall}y = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. Total time is $${tLarge}x + ${tSmall}y = ${total}$.`
    };
  }
};

/**
 * Question ID: 6fa1dc0f
 *
 * ORIGINAL ANALYSIS: [Line from slope and point]
 */