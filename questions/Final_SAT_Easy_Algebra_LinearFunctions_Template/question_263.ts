import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 263
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [rate: decimal 4.0-8.9]
 * - Difficulty factors: [Modeling from rate]
 * - Distractor patterns: [divides by rate, adds rate, subtracts rate]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_263 = {
  metadata: {
    id: "263",
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
      questionText: `For a training program, a cyclist rides at an average rate of ${rate} minutes per mile. Which function $m$ models the number of minutes it will take the cyclist to ride $x$ miles at this rate?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `m(x) = ${rate}x`,
      explanation: `Choice ${correctOption.letter} is correct. The total number of minutes equals the rate of ${rate} minutes per mile times the number of miles $x$, giving $m(x) = ${rate}x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
