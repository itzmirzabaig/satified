import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: a396ed75
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: decimal 4.0-8.9]
 * - Difficulty factors: [Modeling from rate]
 * - Distractor patterns: [divides by rate, adds rate, subtracts rate]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_a396ed75 = {
  metadata: {
    // id: "a396ed75",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rate = (getRandomInt(40, 89) / 10);

    const optionsData = [
      { text: `m(x) = \\frac{x}{${rate}}`, isCorrect: false, reason: "divides by the rate instead of multiplying" },
      { text: `m(x) = x + ${rate}`, isCorrect: false, reason: "adds instead of multiplying" },
      { text: `m(x) = x - ${rate}`, isCorrect: false, reason: "subtracts instead of multiplying" },
      { text: `m(x) = ${rate}x`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `For a training program, Juan rides his bike at an average rate of $${rate}$ minutes per mile. Which function $m$ models the number of minutes it will take Juan to ride $x$ miles at this rate?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `m(x) = ${rate}x`,
      explanation: `Choice ${correctOption.letter} is correct. The total minutes equals the rate ($${rate}$ minutes per mile) times the number of miles ($x$), giving $m(x) = ${rate}x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: e4a588ca
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [xValue: 3-8, result: 3-8, constant: calculated]
 * - Difficulty factors: [Fraction evaluation, order of operations]
 * - Distractor patterns: [wrong order ops, forgot 1/2, forgot coefficient]
 * - Constraints: [Ensure integer result]
 * - Question type: [Function evaluation→Multiple Choice Text]
 * - Figure generation: null
 */

