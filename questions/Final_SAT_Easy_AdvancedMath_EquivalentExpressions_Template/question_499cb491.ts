import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 499cb491
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, 50, GCF: 5]
 * - Difficulty factors: [Factoring GCF with two variables]
 * - Distractor patterns: [B: not dividing second coefficient by GCF, C,D: wrong GCF]
 * - Constraints: [GCF is 5x]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_499cb491 = {
  metadata: {
    // id: "499cb491",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcf = getRandomInt(3, 6);
    const a = gcf;
    const b = gcf * getRandomInt(8, 12);

    const correctText = `$${gcf}x(x - ${b/gcf}y^2)$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${gcf}x(x - ${b}y^2)$`, isCorrect: false },
      { text: `$${gcf}x^{2}(${b/gcf}xy^2)$`, isCorrect: false },
      { text: `$${gcf}x^{2}(${b}xy^2)$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^2 - ${b}xy^2$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out $${gcf}x$: $${gcf}x(x) - ${gcf}x(${b/gcf}y^2) = ${gcf}x(x - ${b/gcf}y^2)$.`
    };
  }
};

/**
 * Question ID: 67e866b5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 9, 7, 9]
 * - Difficulty factors: [Combining multiple like terms]
 * - Distractor patterns: [A: multiplying, B: wrong x coefficient, C: adding all coefficients]
 * - Constraints: [Keep x^2 and x separate]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */