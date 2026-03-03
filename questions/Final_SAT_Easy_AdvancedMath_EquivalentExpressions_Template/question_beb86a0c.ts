import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: beb86a0c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 9, 5]
 * - Difficulty factors: [Factoring out x]
 * - Distractor patterns: [B: factors out 5x, C: factors out 9x, D: factors out x^2]
 * - Constraints: [GCF is x]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_beb86a0c = {
  metadata: {
    // id: "beb86a0c",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(5, 12);
    const b = getRandomInt(3, 8);

    const correctText = `$x(${a}x+${b})$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${b}x(${a}x+1)$`, isCorrect: false },
      { text: `$${a}x(x+${b})$`, isCorrect: false },
      { text: `$x^{2}(${a}x+${b})$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^{2}+${b}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out the common factor $x$: $x(${a}x+${b})$.`
    };
  }
};

/**
 * Question ID: 6e06a0a7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 2, distributing to (a+3)]
 * - Difficulty factors: [Multiplying monomial by binomial, handling exponents]
 * - Distractor patterns: [A,B: combining wrong, C: not distributing to constant]
 * - Constraints: [Exponent rules]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */