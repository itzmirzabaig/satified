import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 8adf1335
 *
 * ORIGINAL ANALYSIS: [Budget subtraction relationship]
 */

export const generator_8adf1335 = {
  metadata: {
    // id: "8adf1335",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const other = getRandomInt(100, 300);

    const optionsData = [
      { text: `$x - y = ${other}$`, isCorrect: true },
      { text: `$x + y = ${other}$`, isCorrect: false, reason: "incorrectly adds total and part" },
      { text: `$2x - y = ${other}$`, isCorrect: false, reason: "wrong coefficient" },
      { text: `$y - x = ${other}$`, isCorrect: false, reason: "implies negative other expenses" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `Total budget is $x$. Dept expenses are $y$ and other expenses are $${other}$. Which relates $x$ and $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$x - y = ${other}$`,
      explanation: `Choice ${correctLetter} is correct. $x = y + ${other}$, so $x - y = ${other}$.`
    };
  }
};

/**
 * Question ID: e7343559
 *
 * ORIGINAL ANALYSIS: [Table matching negative slope]
 */