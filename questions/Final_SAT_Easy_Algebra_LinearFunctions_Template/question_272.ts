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

    const correctEquation = `c = ${dailyRate}d + ${insuranceFee}`;
    const distractorA = `c = ${dailyRate}(d + ${insuranceFee})`;
    const distractorB = `c = ${insuranceFee}(d + ${dailyRate})`;
    const distractorD = `c = ${insuranceFee}d + ${dailyRate}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "incorrectly applies the daily rate to the sum" },
      { text: distractorB, isCorrect: false, reason: "incorrectly uses the insurance fee as the rate" },
      { text: correctEquation, isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "swaps the daily rate and the insurance fee" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `A customer rents a tent at a cost of ${dailyRate} dollars per day plus a onetime insurance fee of ${insuranceFee} dollars. Which equation represents the total cost $c$, in dollars, to rent the tent with insurance for $d$ days?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The total cost is the daily rate of ${dailyRate} dollars times the number of days $d$ plus the one-time insurance fee of ${insuranceFee} dollars, giving $c = ${dailyRate}d + ${insuranceFee}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
