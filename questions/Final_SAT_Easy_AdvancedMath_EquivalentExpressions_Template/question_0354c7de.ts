import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0354c7de
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [5 and 15, GCF is 5]
 * - Difficulty factors: [Basic factoring GCF]
 * - Distractor patterns: [B,C,D: various arithmetic errors with factoring]
 * - Constraints: [Must divide 15 by 5]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_0354c7de = {
  metadata: {
    // id: "0354c7de",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcf = getRandomInt(3, 8);
    const a = gcf;
    const b = gcf * getRandomInt(2, 5);

    const correctText = `$${gcf}(x+${b/gcf})$`;

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `$${gcf}(x+${b - gcf})$`, isCorrect: false },
      { text: `$${gcf}(x+${b})$`, isCorrect: false },
      { text: `$${gcf}(x+${b + 5})$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which of the following is equivalent to the given expression? $${a}x + ${b}$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. Factor out $${gcf}$: $${gcf}(x+${b/gcf})$.`
    };
  }
};

/**
 * Question ID: 508344ac
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [16 and 15]
 * - Difficulty factors: [Distribution with larger numbers]
 * - Distractor patterns: [A: adds 16+15, C: arbitrary, D: doesn't distribute to 15]
 * - Constraints: [Must multiply 16*15]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */