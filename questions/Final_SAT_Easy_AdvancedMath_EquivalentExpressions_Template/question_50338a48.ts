import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 50338a48
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 15, 8]
 * - Difficulty factors: [Factoring out w]
 * - Distractor patterns: [B: factors out 8w, C: factors incorrectly, D: adds coefficients]
 * - Constraints: [GCF is w]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_50338a48 = {
  metadata: {
    // id: "50338a48",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(12, 20);
    const b = getRandomInt(5, 12);

    const correctText = `$w(${a}w+${b})$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${b}w(${a}w+1)$`, isCorrect: false },
      { text: `$${a}w^{2}(${b}w+1)$`, isCorrect: false },
      { text: `$${a + b}(w^{2}+w)$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}w^{2}+${b}w$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out the common factor $w$: $w(${a}w+${b})$.`
    };
  }
};

/**
 * Question ID: 127b2759
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [constants: 8, 3]
 * - Difficulty factors: [Combining constants]
 * - Distractor patterns: [A: multiplying, C: subtracting, D: negative result]
 * - Constraints: [Simple addition]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */