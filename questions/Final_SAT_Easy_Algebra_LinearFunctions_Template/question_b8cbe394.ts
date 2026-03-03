import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: b8cbe394
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [dailyRate: 10-15, insuranceFee: 8-12]
 * - Difficulty factors: [Modeling linear relationship]
 * - Distractor patterns: [rate applied to sum, swapped rate/fee]
 * - Constraints: [None]
 * - Question type: [Modeling→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_b8cbe394 = {
  metadata: {
    // id: "b8cbe394",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const dailyRate = getRandomInt(10, 15);

    const insuranceFee = getRandomInt(8, 12);

    const correctEquation = `c = ${dailyRate}d + ${insuranceFee}`;

    const distractorA = `c = ${dailyRate}(d + ${insuranceFee})`;

    const distractorB = `c = ${insuranceFee}(d + ${dailyRate})`;

    const distractorD = `c = ${insuranceFee}d + ${dailyRate}`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: "incorrectly applies the daily rate to the sum" },
      { text: distractorB, isCorrect: false, reason: "incorrectly uses the insurance fee as the rate" },
      { text: correctEquation, isCorrect: true },
      { text: distractorD, isCorrect: false, reason: "swaps the daily rate and insurance fee" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Sean rents a tent at a cost of ${dailyRate} per day plus a onetime insurance fee of ${insuranceFee}. Which equation represents the total cost $c$, in dollars, to rent the tent with insurance for $d$ days?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctOption.letter} is correct. The total cost is the daily rate (${dailyRate}) times days (d) plus the one-time fee (${insuranceFee}), giving $c = ${dailyRate}d + ${insuranceFee}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 12983c1e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2-5, intercept: 1-5]
 * - Difficulty factors: [Finding linear equation from table]
 * - Distractor patterns: [sum of m and b as coeff, swapped m and b, wrong slope]
 * - Constraints: [None]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

