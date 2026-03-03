import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: df747160
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [17 is GCF outside, 100 is 10^2]
 * - Difficulty factors: [Difference of squares pattern inside GCF]
 * - Distractor patterns: [A,B: wrong factors of 100, C: perfect square trinomial]
 * - Constraints: [Must recognize x^2 - (10y)^2 pattern]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_df747160 = {
  metadata: {
    // id: "df747160",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const outer = getRandomInt(11, 20);
    const base = getRandomInt(6, 15);
    const square = base * base;

    const correctText = `$${outer}(x-${base}y)(x+${base}y)$`;

    const optionsData = [
      { text: `$${outer}(x-${base/2}y)(x-${50}y)$`, isCorrect: false },
      { text: `$${outer}(x-2y)(x+${50}y)$`, isCorrect: false },
      { text: `$${outer}(x-${base}y)(x-${base}y)$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${outer}\\left(x^{2}-${square}y^{2}\\right)$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. This is a difference of squares: $x^{2}-${square}y^{2} = (x-${base}y)(x+${base}y)$.`
    };
  }
};

/**
 * Question ID: e597050f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [9, 6, 2, 3]
 * - Difficulty factors: [Combining multiple like terms x and y]
 * - Distractor patterns: [A: wrong x coefficient, B: wrong y coefficient, C: arbitrary addition]
 * - Constraints: [Two pairs of like terms]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */