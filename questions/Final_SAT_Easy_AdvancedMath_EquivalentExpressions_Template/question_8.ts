import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [256=16^2, 676=26^2]
 * - Difficulty factors: [Difference of squares with perfect squares]
 * - Distractor patterns: [A: perfect square trinomial, B,C: wrong square roots]
 * - Constraints: [Both terms must be perfect squares]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_8 = {
  metadata: {
    id: "8",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const root1 = getRandomInt(10, 20);
    const root2 = getRandomInt(10, 30);
    const square1 = root1 * root1;
    const square2 = root2 * root2;

    const correctText = `$(${root1}w-${root2})(${root1}w+${root2})$`;

    const optionsData = [
      { text: `$(${root1}w-${root2})(${root1}w-${root2})$`, isCorrect: false },
      { text: `$(${root1/2}w-${root2/2})(${root1/2}w+${root2/2})$`, isCorrect: false },
      { text: `$(${root1/2}w-${root2/2})(${root1/2}w-${root2/2})$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${square1}w^{2}-${square2}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. This is a difference of squares: $(${root1}w)^2-(${root2})^2 = (${root1}w-${root2})(${root1}w+${root2})$.`
    };
  }
};
