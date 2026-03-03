import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: bdb0aa23
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, -6, 8]
 * - Difficulty factors: [Factoring out x^3]
 * - Distractor patterns: [A: factors out x^4, C: factors out 8, D: factors out 6]
 * - Constraints: [Must factor out lowest power x^3]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_bdb0aa23 = {
  metadata: {
    // id: "bdb0aa23",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const a = getRandomInt(3, 6);
    const b = getRandomInt(5, 8);
    const c = -getRandomInt(4, 7);

    const correctText = `$x^{3}(${a}x^{2}${c >= 0 ? '+' : ''}${c}x+${b})$`;

    const optionsData = [
      { text: `$x^{4}(${a}x${c >= 0 ? '+' : ''}${c})$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${b}x^{3}(${a}x^{2}${c >= 0 ? '+' : ''}${c}x+1)$`, isCorrect: false },
      { text: `$${-c}x^{5}(${c >= 0 ? '+' : ''}${c}x^{4}+${b}x^{3}+1)$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^{5}${c}x^{4}+${b}x^{3}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out $x^{3}$ (the lowest power of $x$): $x^{3}(${a}x^{2}${c}x+${b})$.`
    };
  }
};

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