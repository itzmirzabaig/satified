import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt } from '../../utils/math';

/**
 * Question ID: 255996a6
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [bonus: 800-1200, hourlyRate: 15-25, hours: 30-40]
 * - Difficulty factors: [Solving linear equation from context]
 * - Distractor patterns: [half hours, bonus/rate, totalPay/rate]
 * - Constraints: [Ensure clean result]
 * - Question type: [Solve for x→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_255996a6 = {
  metadata: {
    // id: "255996a6",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const bonus = getRandomInt(800, 1200);

    const hourlyRate = getRandomInt(15, 25);

    const hours = getRandomInt(30, 40);

    const totalPay = bonus + hourlyRate * hours;

    const optionsData = [
      { text: Math.floor(hours / 2).toString(), isCorrect: false, reason: "is approximately half the correct number of hours" },
      { text: hours.toString(), isCorrect: true },
      { text: Math.floor(bonus / hourlyRate).toString(), isCorrect: false, reason: "divides the bonus by the hourly rate" },
      { text: Math.floor(totalPay / hourlyRate).toString(), isCorrect: false, reason: "divides total pay by hourly rate without subtracting bonus" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the equation $T = ${bonus} + ${hourlyRate}h$, $T$ represents Brittany's total take-home pay, in dollars, for her first week of work, where $h$ represents the number of hours she worked that week and $${bonus}$ represents a sign-on bonus. If Brittany's total take-home pay was $${totalPay}$, for how many hours was Brittany paid for her first week of work?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: hours.toString(),
      explanation: `Choice ${correctOption.letter} is correct. Substituting ${totalPay} for $T$: ${totalPay} = ${bonus} + ${hourlyRate}h$. Subtracting ${bonus} gives ${totalPay - bonus} = ${hourlyRate}h$. Dividing by ${hourlyRate} yields $h = ${hours}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: a1696f3e
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4-8, xValue: 3-6, aValue: 5-15]
 * - Difficulty factors: [Solving for parameter in linear function]
 * - Distractor patterns: [calculation error, subtracting slope, sign error]
 * - Constraints: [None]
 * - Question type: [Find parameter→Multiple Choice Text]
 * - Figure generation: null
 */

