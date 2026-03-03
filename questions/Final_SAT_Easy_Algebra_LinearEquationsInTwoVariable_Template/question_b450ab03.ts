import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: b450ab03
 *
 * ORIGINAL ANALYSIS: [Linear setup with decimals]
 */

export const generator_b450ab03 = {
  metadata: {
    // id: "b450ab03",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const t1 = parseFloat((getRandomInt(1, 2) + getRandomInt(1, 9)/10).toFixed(1));
    const t2 = parseFloat((getRandomInt(1, 2) + getRandomInt(1, 9)/10).toFixed(1));
    const total = parseFloat((t1 * 10 + t2 * 5).toFixed(1));

    const optionsData = [
      { text: `$${t1}x + ${t2}y = ${total}$`, isCorrect: true },
      { text: `$${t2}x + ${t1}y = ${total}$`, isCorrect: false, reason: "swaps coefficients" },
      { text: `$x + y = ${total}$`, isCorrect: false, reason: "ignores unit times" },
      { text: `$${(t1+t2).toFixed(1)}(x+y) = ${total}$`, isCorrect: false, reason: "incorrect distribution" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Sandwiches take ${t1} minutes ($x$) and salads take ${t2} minutes ($y$). If ${total} minutes are spent, which equation represents this?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${t1}x + ${t2}y = ${total}$`,
      explanation: `Choice ${correctLetter} is correct. Summing unit times gives $${t1}x + ${t2}y = ${total}$.`
    };
  }
};

/**
 * Question ID: db0107df
 *
 * ORIGINAL ANALYSIS: [Y-intercept by substitution]
 */