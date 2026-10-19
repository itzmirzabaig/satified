import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 272
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [dailyRate: 10-15, insuranceFee: 8-12]
 * - Difficulty factors: [Modeling linear relationship]
 * - Distractor patterns: [rate applied to sum, swapped rate/fee]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_272 = {
  metadata: {
    id: "272",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const insuranceFee = getRandomInt(8, 12);

    // Keep the daily rate distinct from the insurance fee so the correct
    // equation can never coincide with the "swapped" distractor (nor the two
    // factored distractors with each other). Bounded retry; always resolvable.
    let dailyRate = getRandomInt(10, 15);
    let tries = 0;
    while (dailyRate === insuranceFee && tries++ < 50) {
      dailyRate = getRandomInt(10, 15);
    }

    const correctEquation = `$c = ${dailyRate}d + ${insuranceFee}$`;
    const distractorA = `$c = ${dailyRate}(d + ${insuranceFee})$`;
    const distractorB = `$c = ${insuranceFee}(d + ${dailyRate})$`;
    const distractorD = `$c = ${insuranceFee}d + ${dailyRate}$`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `it multiplies the \\$${insuranceFee} insurance fee by ${dailyRate} as well, which charges the fee ${dailyRate} times instead of once` },
      { text: distractorB, isCorrect: false, reason: `it charges \\$${insuranceFee} per day instead of \\$${dailyRate} per day and multiplies the \\$${dailyRate} by ${insuranceFee}` },
      { text: correctEquation, isCorrect: true, reason: '' },
      { text: distractorD, isCorrect: false, reason: `it charges \\$${insuranceFee} per day and a \\$${dailyRate} insurance fee, which reverses the two amounts` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A customer rents a tent at a cost of \\$${dailyRate} per day plus an insurance fee of \\$${insuranceFee} that is charged only once. Which equation represents the total cost $c$, in dollars, to rent the tent with insurance for $d$ days?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. Renting the tent for $d$ days at \\$${dailyRate} per day costs $${dailyRate}d$ dollars. Adding the \\$${insuranceFee} insurance fee, which is charged only once, gives a total cost of $c = ${dailyRate}d + ${insuranceFee}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
