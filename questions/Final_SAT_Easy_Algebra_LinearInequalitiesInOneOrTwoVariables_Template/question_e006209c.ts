import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e006209c
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [needed: 67, collected: 63]
 * - Difficulty factors: [Simple subtraction, "at least" interpretation]
 * - Distractor patterns: [A=sum, B=collected, C=correct difference, D=zero]
 * - Constraints: [Result must be positive]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_e006209c = {
  metadata: {
    // id: "e006209c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const needed = getRandomInt(50, 100);
    const collected = getRandomInt(30, needed - 5);
    const additional = needed - collected;
    const distractor1 = needed + collected;
    const distractor2 = collected;
    const distractor3 = 0;

    const optionsData = [
      { text: `${distractor1}`, isCorrect: false },
      { text: `${distractor2}`, isCorrect: false },
      { text: `${additional}`, isCorrect: true },
      { text: `${distractor3}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    const explanation = `Choice ${correctLetter} is correct. The geologist needs at least ${needed} samples and has ${collected}. The minimum additional samples needed is ${needed} - ${collected} = ${additional}.`;

    return {
      questionText: `A geologist needs to collect at least $${needed}$ samples of lava from a volcano. If the geologist has already collected $${collected}$ samples from the volcano, what is the minimum number of additional samples the geologist needs to collect?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 59a49431
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: -4, intercept: 8]
 * - Difficulty factors: [Graph interpretation, inequality testing]
 * - Distractor patterns: [A=below line, B=on y-axis above, C=left of origin, D=correct in shaded region]
 * - Constraints: [Must generate valid Mafs inequality graph]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs: linear inequality y >= -4x + 8]
 */