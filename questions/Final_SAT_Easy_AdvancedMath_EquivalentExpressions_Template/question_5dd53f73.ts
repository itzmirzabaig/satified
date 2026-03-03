import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5dd53f73
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [34 both, GCF is 34]
 * - Difficulty factors: [Recognizing common binomial factor]
 * - Distractor patterns: [A: multiplies as 34xy, C/D: combine unlike terms]
 * - Constraints: [Simple factoring]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_5dd53f73 = {
  metadata: {
    // id: "5dd53f73",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcf = getRandomInt(20, 40);

    const correctText = `$${gcf}(x+y)$`;

    const optionsData = [
      { text: `$${gcf}xy$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${2 * gcf}y$`, isCorrect: false },
      { text: `$${2 * gcf}x$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${gcf}x+${gcf}y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out the common factor $${gcf}$: $${gcf}(x+y)$.`
    };
  }
};

/**
 * Question ID: 1e8d7183
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [256=16^2, 676=26^2]
 * - Difficulty factors: [Difference of squares with perfect squares]
 * - Distractor patterns: [A: perfect square trinomial, B,C: wrong square roots]
 * - Constraints: [Both terms must be perfect squares]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */