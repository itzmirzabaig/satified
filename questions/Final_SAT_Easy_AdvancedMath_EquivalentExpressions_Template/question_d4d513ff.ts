import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d4d513ff
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [12 and 27, GCF is 3]
 * - Difficulty factors: [Basic GCF factoring]
 * - Distractor patterns: [A,B: wrong GCFs, D: arithmetic error]
 * - Constraints: [3 is GCF]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_d4d513ff = {
  metadata: {
    // id: "d4d513ff",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcf = getRandomInt(3, 6);
    const a = gcf * getRandomInt(3, 5);
    const b = gcf * getRandomInt(7, 10);

    const correctText = `$${gcf}(${a/gcf}x+${b/gcf})$`;

    const optionsData = [
      { text: `$${a}(${gcf}x+1)$`, isCorrect: false },
      { text: `$${b}(${a/gcf}x+1)$`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `$${gcf}(${b}x+${a})$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x+${b}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out $${gcf}$: $${gcf}(${a/gcf}x+${b/gcf})$.`
    };
  }
};