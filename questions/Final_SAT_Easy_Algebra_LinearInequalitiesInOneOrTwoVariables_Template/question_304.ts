import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 304
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [needed: 67, collected: 63]
 * - Difficulty factors: [Simple subtraction, "at least" interpretation]
 * - Distractor patterns: [A=sum, B=collected, C=correct difference, D=zero]
 * - Constraints: [Result must be positive]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_304 = {
  metadata: {
    id: "304",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const needed = getRandomInt(50, 100);
    // Draw "collected" so that no two options coincide. The only possible
    // collision is distractor2 (= collected) equaling the correct answer
    // (additional = needed - collected), which happens iff needed = 2*collected.
    let collected = getRandomInt(30, needed - 5);
    let tries = 0;
    while (collected === needed - collected && tries++ < 50) {
      collected = getRandomInt(30, needed - 5);
    }
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
