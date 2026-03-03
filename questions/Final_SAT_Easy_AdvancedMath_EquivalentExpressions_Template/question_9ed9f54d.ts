import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 9ed9f54d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 2, 3]
 * - Difficulty factors: [Treating binomial as single unit or expanding then combining]
 * - Distractor patterns: [B: wrong sign, C: loses squared terms, D: loses linear terms]
 * - Constraints: [Must combine like coefficients of the binomial]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9ed9f54d = {
  metadata: {
    // id: "9ed9f54d",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const c1 = getRandomInt(2, 4);
    const c2 = getRandomInt(3, 6);
    const sum = c1 + c2;

    const correctText = `$${sum}x^2-${sum}x$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${sum}x^2+${sum}x$`, isCorrect: false },
      { text: `$${sum}x$`, isCorrect: false },
      { text: `$${sum}x^2$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which of the following is equivalent to $${c1}(x^2-x)+${c2}(x^2-x)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out $(x^2-x)$ to get $(${c1}+${c2})(x^2-x) = ${sum}(x^2-x) = ${sum}x^2-${sum}x$.`
    };
  }
};

/**
 * Question ID: 18c7c3e0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 13, 7]
 * - Difficulty factors: [Subtracting like terms]
 * - Distractor patterns: [A: multiplies, C: adds, D: arbitrary]
 * - Constraints: [Simple subtraction]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */